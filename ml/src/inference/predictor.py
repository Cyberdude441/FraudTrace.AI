"""
Predictor wrapper loading serialized model artifacts with deterministic rule fallback.
"""

from pathlib import Path
from typing import Any, Dict, List, Optional
import numpy as np

from ..config import MODELS_DIR
from ..models.contradiction_model import ContradictionClassifier
from ..preprocessing.feature_builder import FeatureBuilder


class EvidencePredictor:
    """Inference predictor for contradiction probability between evidence records."""

    def __init__(self, model_version: str = "v1"):
        self.model_version = model_version
        self.classifier = ContradictionClassifier()
        self.model_path = MODELS_DIR / f"contradiction_model_{model_version}.pkl"
        self.loaded = False

        if self.model_path.exists():
            try:
                self.classifier.load(self.model_path)
                self.loaded = True
            except Exception as e:
                print(f"[EvidencePredictor] Could not load model: {e}. Using rule-based fallback.")

    def predict_pair_conflict(self, rec_a: Dict[str, Any], rec_b: Dict[str, Any]) -> Dict[str, Any]:
        """Predicts whether two records conflict."""
        feats = FeatureBuilder.extract_pair_features(rec_a, rec_b)
        vec = FeatureBuilder.features_to_vector(feats).reshape(1, -1)

        if self.loaded:
            prob_conflict = float(self.classifier.predict_proba(vec)[0][1])
            is_conflict = prob_conflict >= 0.50
        else:
            # Deterministic rule engine fallback
            has_amount_conflict = feats.get("has_amount_conflict", 0.0) == 1.0
            has_time_conflict = feats.get("has_time_conflict", 0.0) == 1.0
            is_conflict = has_amount_conflict or has_time_conflict
            prob_conflict = 0.95 if is_conflict else 0.05

        return {
            "is_conflict": is_conflict,
            "conflict_probability": round(prob_conflict, 4),
            "features": feats
        }
