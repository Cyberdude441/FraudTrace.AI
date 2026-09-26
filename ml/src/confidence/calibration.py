"""
Confidence calibration metrics: Brier score and reliability binning.
"""

from typing import Dict, List, Tuple
import numpy as np


class ConfidenceCalibrator:
    """Evaluates probability calibration of confidence scores."""

    @staticmethod
    def brier_score(y_true: List[int], y_prob: List[float]) -> float:
        """Calculates mean squared error between probabilities and binary outcomes."""
        if not y_true or not y_prob or len(y_true) != len(y_prob):
            return 0.0
        y_t = np.array(y_true, dtype=float)
        y_p = np.array(y_prob, dtype=float)
        return float(np.mean((y_p - y_t) ** 2))

    @staticmethod
    def calibration_curve(
        y_true: List[int],
        y_prob: List[float],
        n_bins: int = 5
    ) -> Dict[str, List[float]]:
        """Computes true frequencies and mean predicted probabilities per bin."""
        bins = np.linspace(0.0, 1.0, n_bins + 1)
        prob_pred = []
        prob_true = []

        y_t = np.array(y_true)
        y_p = np.array(y_prob)

        for i in range(n_bins):
            mask = (y_p >= bins[i]) & (y_p < bins[i + 1]) if i < n_bins - 1 else (y_p >= bins[i]) & (y_p <= bins[i + 1])
            if np.sum(mask) > 0:
                prob_pred.append(float(np.mean(y_p[mask])))
                prob_true.append(float(np.mean(y_t[mask])))

        return {
            "predicted_prob": prob_pred,
            "empirical_prob": prob_true
        }
