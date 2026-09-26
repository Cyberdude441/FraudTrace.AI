"""
Event correlation and semantic grouping model.
"""

from typing import Any, Dict, List
import numpy as np
from ..preprocessing.feature_builder import FeatureBuilder


class EventCorrelationModel:
    """Calculates pairwise correlation probabilities between evidence candidates."""

    def __init__(self, correlation_threshold: float = 0.65):
        self.correlation_threshold = correlation_threshold

    def score_pair(self, rec_a: Dict[str, Any], rec_b: Dict[str, Any]) -> float:
        """Computes a correlation affinity score between two evidence items."""
        feats = FeatureBuilder.extract_pair_features(rec_a, rec_b)
        # Weighted combination of temporal proximity, entity match, and text overlap
        score = (
            0.30 * feats.get("phone_match", 0.0) +
            0.25 * feats.get("txn_id_match", 0.0) +
            0.20 * feats.get("has_amount_match", 0.0) +
            0.15 * (1.0 if feats.get("time_diff_minutes", 100) <= 15.0 else 0.0) +
            0.10 * feats.get("text_token_jaccard", 0.0)
        )
        return float(min(1.0, score))
