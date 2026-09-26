"""
Machine learning classifier for contradiction and inconsistency detection.
"""

from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, f1_score, accuracy_score

from ..config import MODELS_DIR


class ContradictionClassifier:
    """Classifies pairs/sets of evidence into CORROBORATED (0) or CONFLICTING (1)."""

    def __init__(self, model_type: str = "random_forest", n_estimators: int = 100, max_depth: int = 6, seed: int = 42):
        self.model_type = model_type
        self.seed = seed
        if model_type == "logistic_regression":
            self.model = LogisticRegression(random_state=seed, max_iter=500)
        else:
            self.model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=seed)
        self.is_fitted = False

    def fit(self, X: np.ndarray, y: np.ndarray) -> Dict[str, float]:
        """Trains the classifier and returns training metrics."""
        self.model.fit(X, y)
        self.is_fitted = True
        preds = self.model.predict(X)
        return {
            "accuracy": float(accuracy_score(y, preds)),
            "f1": float(f1_score(y, preds, average="macro", zero_division=0))
        }

    def predict(self, X: np.ndarray) -> np.ndarray:
        """Predicts class labels (0: Corroborated, 1: Conflicting)."""
        if not self.is_fitted:
            raise RuntimeError("Model is not fitted. Call fit() or load() first.")
        return self.model.predict(X)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        """Returns prediction probabilities."""
        if not self.is_fitted:
            raise RuntimeError("Model is not fitted. Call fit() or load() first.")
        return self.model.predict_proba(X)

    def save(self, filepath: Optional[Path] = None, version: str = "v1") -> Path:
        """Saves serialized model artifact."""
        if filepath is None:
            filepath = MODELS_DIR / f"contradiction_model_{version}.pkl"
        filepath.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(self.model, filepath)
        return filepath

    def load(self, filepath: Optional[Path] = None, version: str = "v1") -> None:
        """Loads serialized model artifact."""
        if filepath is None:
            filepath = MODELS_DIR / f"contradiction_model_{version}.pkl"
        if not filepath.exists():
            raise FileNotFoundError(f"Model artifact not found: {filepath}")
        self.model = joblib.load(filepath)
        self.is_fitted = True
