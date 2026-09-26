"""
Pairwise entity matching machine learning model.
"""

from pathlib import Path
from typing import Any, Dict, Optional
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression
from ..config import MODELS_DIR


class EntityMatchingModel:
    """Supervised pairwise entity matching model."""

    def __init__(self, seed: int = 42):
        self.model = LogisticRegression(random_state=seed, max_iter=200)
        self.is_fitted = False

    def fit(self, X: np.ndarray, y: np.ndarray) -> Dict[str, float]:
        self.model.fit(X, y)
        self.is_fitted = True
        return {"train_score": float(self.model.score(X, y))}

    def predict(self, X: np.ndarray) -> np.ndarray:
        return self.model.predict(X)

    def predict_proba(self, X: np.ndarray) -> np.ndarray:
        return self.model.predict_proba(X)

    def save(self, filepath: Optional[Path] = None, version: str = "v1") -> Path:
        if filepath is None:
            filepath = MODELS_DIR / f"entity_model_{version}.pkl"
        filepath.parent.mkdir(parents=True, exist_ok=True)
        joblib.dump(self.model, filepath)
        return filepath

    def load(self, filepath: Optional[Path] = None, version: str = "v1") -> None:
        if filepath is None:
            filepath = MODELS_DIR / f"entity_model_{version}.pkl"
        self.model = joblib.load(filepath)
        self.is_fitted = True
