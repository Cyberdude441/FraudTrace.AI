"""
Explainable confidence scoring engine based on independent source agreement and diversity.
"""

from typing import Any, Dict, List, Optional


class ConfidenceScorer:
    """Computes explainable forensic confidence metrics strictly following policy rules."""

    LEVEL_MAP = {
        1: ("LOW", 0.40),
        2: ("MEDIUM", 0.75),
        3: ("HIGH", 0.90),
        4: ("VERY HIGH", 0.96)
    }

    @classmethod
    def calculate_confidence(
        cls,
        status: str,
        independent_sources: int,
        has_conflict: bool = False,
        has_missing_data: bool = False
    ) -> Dict[str, Any]:
        """
        Determines confidence score and qualitative level.
        Enforces Rule: Source count alone must NEVER override conflicts or convert conflict into high confidence.
        """
        if has_conflict or status in ("CONFLICTING", "TIMESTAMP_INCONSISTENCY"):
            return {
                "score": None,
                "level": "CONFLICTING",
                "explanation": "Contradictory observations detected across sources. Confidence is undefined until conflict is resolved.",
                "reviewRequired": True
            }

        if has_missing_data or status == "MISSING_DATA":
            return {
                "score": 0.25,
                "level": "MISSING_DATA",
                "explanation": "Critical forensic metadata (e.g. timestamp or headers) is absent.",
                "reviewRequired": True
            }

        if status == "POSSIBLE_DUPLICATE":
            return {
                "score": 0.50,
                "level": "DUPLICATE_FLAGGED",
                "explanation": "Duplicate source records detected. Sources cannot be counted as independent corroboration.",
                "reviewRequired": True
            }

        # Corroborated / independent agreement scoring
        if independent_sources <= 0:
            return {
                "score": 0.0,
                "level": "UNSUPPORTED",
                "explanation": "Zero independent sources.",
                "reviewRequired": True
            }
        elif independent_sources == 1:
            level, score = cls.LEVEL_MAP[1]
            return {
                "score": score,
                "level": level,
                "explanation": "Single source record. Needs secondary corroboration.",
                "reviewRequired": False
            }
        elif independent_sources == 2:
            level, score = cls.LEVEL_MAP[2]
            return {
                "score": score,
                "level": level,
                "explanation": "Two independent agreeing sources provide moderate corroboration.",
                "reviewRequired": False
            }
        elif independent_sources == 3:
            level, score = cls.LEVEL_MAP[3]
            return {
                "score": score,
                "level": level,
                "explanation": "Three independent agreeing sources provide high corroboration.",
                "reviewRequired": False
            }
        else:
            level, score = cls.LEVEL_MAP[4]
            return {
                "score": score,
                "level": level,
                "explanation": f"{independent_sources} independent agreeing sources provide very high corroboration.",
                "reviewRequired": False
            }
