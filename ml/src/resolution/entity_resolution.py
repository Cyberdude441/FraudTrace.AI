"""
Entity resolution module determining whether two mentions refer to the same entity.
"""

from typing import Any, Dict, List, Optional
from ..preprocessing.entity_normalizer import EntityNormalizer
from .similarity import EntitySimilarity


class EntityResolver:
    """Performs deterministic and probabilistic entity resolution across evidence records."""

    def __init__(self, match_threshold: float = 0.80):
        self.match_threshold = match_threshold

    def resolve_pair(
        self,
        mention_a: Dict[str, Any],
        mention_b: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Evaluates whether mention_a and mention_b refer to the same canonical entity.
        Returns:
            same_entity (bool)
            confidence (float)
            matching_features (dict)
            source_ids (list)
        """
        val_a = mention_a.get("value") or mention_a.get("original_value") or mention_a.get("normalized_value")
        val_b = mention_b.get("value") or mention_b.get("original_value") or mention_b.get("normalized_value")
        type_a = (mention_a.get("type") or mention_a.get("entity_type") or "").lower()
        type_b = (mention_b.get("type") or mention_b.get("entity_type") or "").lower()

        src_a = mention_a.get("evidence_id") or mention_a.get("source_id") or "SOURCE-A"
        src_b = mention_b.get("evidence_id") or mention_b.get("source_id") or "SOURCE-B"
        source_ids = list({s for s in [src_a, src_b] if s})

        # Type mismatch check
        type_match = type_a == type_b if (type_a and type_b) else True

        # Normalized values
        norm_a = EntityNormalizer.normalize_entity(type_a, val_a) if type_a else val_a
        norm_b = EntityNormalizer.normalize_entity(type_b, val_b) if type_b else val_b

        exact_match = bool(val_a and val_b and str(val_a).strip() == str(val_b).strip())
        normalized_match = bool(norm_a and norm_b and str(norm_a) == str(norm_b))

        fuzzy_sim = EntitySimilarity.compare_mentions(str(norm_a or val_a), str(norm_b or val_b))

        matching_features = {
            "type_match": type_match,
            "exact_match": exact_match,
            "normalized_match": normalized_match,
            "similarity_score": round(fuzzy_sim, 4),
            "normalized_value_a": norm_a,
            "normalized_value_b": norm_b
        }

        # Resolution decision
        if not type_match:
            return {
                "same_entity": False,
                "confidence": 0.0,
                "matching_features": matching_features,
                "source_ids": source_ids
            }

        if normalized_match:
            confidence = 1.0 if exact_match else 0.96
            same_entity = True
        elif fuzzy_sim >= self.match_threshold:
            confidence = round(fuzzy_sim, 2)
            same_entity = True
        else:
            confidence = round(fuzzy_sim, 2)
            same_entity = False

        return {
            "same_entity": same_entity,
            "confidence": confidence,
            "matching_features": matching_features,
            "source_ids": source_ids
        }
