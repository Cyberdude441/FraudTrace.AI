"""
Train, evaluate, and export the FraudTrace contradiction model artifact.
Usage: python scripts/export_model.py
"""

import sys
from pathlib import Path
import numpy as np

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

from ml.src.config import MODELS_DIR, METRICS_DIR, set_seed
from ml.src.data.loader import DataLoader
from ml.src.preprocessing.feature_builder import FeatureBuilder
from ml.src.models.contradiction_model import ContradictionClassifier
from ml.src.evaluation.metrics import ModelEvaluator
from ml.src.evaluation.evaluation_report import EvaluationReporter


def generate_training_dataset():
    """Generates synthetic pairwise features and labels from synthetic dataset & golden tests."""
    X_list = []
    y_list = []

    loader = DataLoader()
    demo_case = loader.load_demo_case()
    evidence_list = demo_case.get("evidence", [])
    ev_map = {e.get("evidence_id") or e.get("id"): e for e in evidence_list}

    # 1. Corroborating pairs from demo case (label: 0)
    corrob_pairs = [
        ("EVIDENCE-001", "EVIDENCE-003"),
        ("EVIDENCE-001", "EVIDENCE-006"),
        ("EVIDENCE-003", "EVIDENCE-006"),
        ("EVIDENCE-004", "EVIDENCE-005"),
        ("EVIDENCE-009", "EVIDENCE-010"),
    ]

    for id_a, id_b in corrob_pairs:
        rec_a = ev_map.get(id_a, {"amount": 15000, "timestamp": "2026-09-01T10:40:00", "phone": "+919000001001"})
        rec_b = ev_map.get(id_b, {"amount": 15000, "timestamp": "2026-09-01T10:41:00", "phone": "+919000001001"})
        feats = FeatureBuilder.extract_pair_features(rec_a, rec_b)
        X_list.append(FeatureBuilder.features_to_vector(feats))
        y_list.append(0)

    # 2. Conflicting pairs from demo case (label: 1)
    conflict_pairs = [
        ({"amount": 50000, "timestamp": "2026-09-01T10:41:00"}, {"amount": 48000, "timestamp": "2026-09-01T10:42:00"}),
        ({"amount": 15000, "timestamp": "2026-09-01T10:40:00"}, {"amount": 4999, "timestamp": "2026-09-01T10:40:00"}),
        ({"amount": 50000, "timestamp": "2026-09-01T10:41:00"}, {"amount": 45000, "timestamp": "2026-09-01T10:41:00"}),
        ({"amount": 25000, "timestamp": "2026-09-01T10:41:00", "phone": "+919000001001"}, {"amount": 25000, "timestamp": "2026-09-01T11:15:00", "phone": "+919000001001"}),
        ({"amount": 10000, "timestamp": "2026-09-01T10:45:00"}, {"amount": 8000, "timestamp": "2026-09-01T10:45:00"}),
    ]

    for rec_a, rec_b in conflict_pairs:
        feats = FeatureBuilder.extract_pair_features(rec_a, rec_b)
        X_list.append(FeatureBuilder.features_to_vector(feats))
        y_list.append(1)

    # Augment with variations for statistical evaluation
    rng = np.random.default_rng(42)
    base_len = len(X_list)
    for i in range(base_len):
        for rep in range(4):
            base_x = X_list[i].copy()
            base_x[0] += rng.uniform(0.0, 0.005)
            base_x[3] += rng.uniform(0.0, 0.5)
            X_list.append(base_x)
            y_list.append(y_list[i])

    return np.array(X_list), np.array(y_list)


def main():
    print("=" * 60)
    print("  FRAUDTRACE AI -- CONTRADICTION MODEL TRAINING & EXPORT")
    print("=" * 60)

    set_seed(42)
    X, y = generate_training_dataset()
    print(f"Dataset generated: {X.shape[0]} pairwise samples, {X.shape[1]} features.")
    print(f"Class distribution: Corroborated={np.sum(y == 0)}, Conflicting={np.sum(y == 1)}")

    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)

    print("\nTraining Random Forest Contradiction Classifier...")
    model = ContradictionClassifier(model_type="random_forest", n_estimators=100, max_depth=6, seed=42)
    train_metrics = model.fit(X_train, y_train)
    print(f"Training Accuracy: {train_metrics['accuracy']:.4f}, Train F1: {train_metrics['f1']:.4f}")

    y_pred = model.predict(X_test)
    eval_metrics = ModelEvaluator.evaluate_contradiction_detection(y_test.tolist(), y_pred.tolist())

    print("\n=== TEST SET EVALUATION BENCHMARK ===")
    print(f"Test Accuracy:           {eval_metrics['accuracy']:.4f}")
    print(f"Test F1 (Macro):         {eval_metrics['f1_macro']:.4f}")
    print(f"Contradiction Precision: {eval_metrics['contradiction_precision']:.4f}")
    print(f"Contradiction Recall:    {eval_metrics['contradiction_recall']:.4f}")
    print(f"Contradiction F1:        {eval_metrics['contradiction_f1']:.4f}")
    print("Confusion Matrix:")
    print(f"  {eval_metrics['confusion_matrix']}")

    saved_model = model.save(version="v1")
    print(f"\n[OK] Saved model artifact to: {saved_model}")

    saved_metrics = EvaluationReporter.save_report(eval_metrics, experiment_id="experiment_001")
    print(f"[OK] Saved metrics report to: {saved_metrics}")

    print("\nModel training & export pipeline completed successfully.")


if __name__ == "__main__":
    main()
