"""
Feature engineering module for pairwise evidence correlation and contradiction detection.
"""

from typing import Any, Dict, List, Optional
import numpy as np

from .text_normalizer import TextNormalizer
from .entity_normalizer import EntityNormalizer
from .amount_normalizer import AmountNormalizer
from .timestamp_normalizer import TimestampNormalizer


class FeatureBuilder:
    """Extracts numerical and categorical feature vectors between pairs of evidence records."""

    FEATURE_NAMES = [
        "amount_diff_ratio",
        "has_amount_match",
        "has_amount_conflict",
        "time_diff_minutes",
        "has_time_conflict",
        "has_missing_timestamp",
        "phone_match",
        "email_match",
        "url_match",
        "txn_id_match",
        "entity_overlap_jaccard",
        "source_type_match",
        "is_independent_source",
        "text_token_jaccard"
    ]

    @staticmethod
    def jaccard_similarity(set_a: set, set_b: set) -> float:
        """Computes Jaccard index between two sets."""
        if not set_a and not set_b:
            return 1.0
        if not set_a or not set_b:
            return 0.0
        intersection = len(set_a.intersection(set_b))
        union = len(set_a.union(set_b))
        return intersection / union if union > 0 else 0.0

    @classmethod
    def extract_pair_features(
        cls,
        rec_a: Dict[str, Any],
        rec_b: Dict[str, Any],
        entities_a: Optional[List[str]] = None,
        entities_b: Optional[List[str]] = None,
        amount_tolerance_ratio: float = 0.01,
        time_tolerance_minutes: float = 4.0
    ) -> Dict[str, float]:
        """
        Builds a comprehensive feature dictionary comparing two evidence records.
        """
        # 1. Amount features
        amt_a = AmountNormalizer.parse_amount(rec_a.get("amount"))
        amt_b = AmountNormalizer.parse_amount(rec_b.get("amount"))

        if amt_a is not None and amt_b is not None:
            is_consistent, diff_ratio = AmountNormalizer.compare_amounts(amt_a, amt_b, amount_tolerance_ratio)
            has_amount_match = 1.0 if is_consistent else 0.0
            has_amount_conflict = 1.0 if not is_consistent else 0.0
        else:
            diff_ratio = 0.0
            has_amount_match = 0.0
            has_amount_conflict = 0.0

        # 2. Timestamp features
        ts_a = rec_a.get("timestamp")
        ts_b = rec_b.get("timestamp")
        time_diff = TimestampNormalizer.time_diff_minutes(ts_a, ts_b)

        if time_diff is not None:
            has_time_conflict = 1.0 if time_diff > time_tolerance_minutes else 0.0
            has_missing_timestamp = 0.0
            norm_time_diff = min(time_diff, 120.0)  # cap at 2 hours
        else:
            has_time_conflict = 0.0
            has_missing_timestamp = 1.0
            norm_time_diff = 0.0

        # 3. Entity identifiers
        phone_a = EntityNormalizer.normalize_phone(rec_a.get("phone"))
        phone_b = EntityNormalizer.normalize_phone(rec_b.get("phone"))
        phone_match = 1.0 if (phone_a and phone_b and phone_a == phone_b) else 0.0

        email_a = EntityNormalizer.normalize_email(rec_a.get("email"))
        email_b = EntityNormalizer.normalize_email(rec_b.get("email"))
        email_match = 1.0 if (email_a and email_b and email_a == email_b) else 0.0

        url_a = EntityNormalizer.normalize_url(rec_a.get("url"))
        url_b = EntityNormalizer.normalize_url(rec_b.get("url"))
        url_match = 1.0 if (url_a and url_b and url_a == url_b) else 0.0

        txn_a = EntityNormalizer.normalize_transaction_id(rec_a.get("transaction_id") or rec_a.get("rrn"))
        txn_b = EntityNormalizer.normalize_transaction_id(rec_b.get("transaction_id") or rec_b.get("rrn"))
        txn_id_match = 1.0 if (txn_a and txn_b and txn_a == txn_b) else 0.0

        # 4. Entity set overlap
        set_ent_a = set(entities_a or [])
        set_ent_b = set(entities_b or [])
        entity_overlap = cls.jaccard_similarity(set_ent_a, set_ent_b)

        # 5. Source type and independence
        source_a = str(rec_a.get("source_type", "")).lower()
        source_b = str(rec_b.get("source_type", "")).lower()
        source_type_match = 1.0 if (source_a and source_a == source_b) else 0.0
        # If identical files or duplicate copies, they are not independent
        is_duplicate = rec_a.get("file_hash") and rec_a.get("file_hash") == rec_b.get("file_hash")
        is_independent = 0.0 if is_duplicate else (0.5 if source_type_match else 1.0)

        # 6. Text token overlap
        tokens_a = set(TextNormalizer.normalize(rec_a.get("text", "")).split())
        tokens_b = set(TextNormalizer.normalize(rec_b.get("text", "")).split())
        text_jaccard = cls.jaccard_similarity(tokens_a, tokens_b)

        return {
            "amount_diff_ratio": float(diff_ratio),
            "has_amount_match": float(has_amount_match),
            "has_amount_conflict": float(has_amount_conflict),
            "time_diff_minutes": float(norm_time_diff),
            "has_time_conflict": float(has_time_conflict),
            "has_missing_timestamp": float(has_missing_timestamp),
            "phone_match": float(phone_match),
            "email_match": float(email_match),
            "url_match": float(url_match),
            "txn_id_match": float(txn_id_match),
            "entity_overlap_jaccard": float(entity_overlap),
            "source_type_match": float(source_type_match),
            "is_independent_source": float(is_independent),
            "text_token_jaccard": float(text_jaccard)
        }

    @classmethod
    def features_to_vector(cls, features_dict: Dict[str, float]) -> np.ndarray:
        """Converts feature dictionary to dense numpy array in canonical column order."""
        return np.array([features_dict.get(name, 0.0) for name in cls.FEATURE_NAMES], dtype=float)
