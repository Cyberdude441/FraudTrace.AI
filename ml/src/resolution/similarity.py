"""
String and semantic similarity computation for entity mentions.
"""

from typing import Optional


class EntitySimilarity:
    """Computes similarity metrics between raw and normalized entity values."""

    @staticmethod
    def levenshtein_similarity(s1: str, s2: str) -> float:
        """Computes normalized Levenshtein similarity between 0.0 and 1.0."""
        if not s1 and not s2:
            return 1.0
        if not s1 or not s2:
            return 0.0
        if s1 == s2:
            return 1.0

        len1, len2 = len(s1), len(s2)
        matrix = [[0] * (len2 + 1) for _ in range(len1 + 1)]

        for i in range(len1 + 1):
            matrix[i][0] = i
        for j in range(len2 + 1):
            matrix[0][j] = j

        for i in range(1, len1 + 1):
            for j in range(1, len2 + 1):
                cost = 0 if s1[i - 1] == s2[j - 1] else 1
                matrix[i][j] = min(
                    matrix[i - 1][j] + 1,       # deletion
                    matrix[i][j - 1] + 1,       # insertion
                    matrix[i - 1][j - 1] + cost # substitution
                )

        dist = matrix[len1][len2]
        max_len = max(len1, len2)
        return max(0.0, 1.0 - (dist / max_len))

    @classmethod
    def compare_mentions(cls, val_a: Optional[str], val_b: Optional[str]) -> float:
        """Compares two mention strings and returns similarity score in [0.0, 1.0]."""
        if not val_a or not val_b:
            return 0.0
        s_a = str(val_a).strip().lower()
        s_b = str(val_b).strip().lower()
        if s_a == s_b:
            return 1.0
        return cls.levenshtein_similarity(s_a, s_b)
