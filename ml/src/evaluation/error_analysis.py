"""
Error analysis module diagnosing false positives and false negatives.
"""

from typing import Any, Dict, List


class ErrorAnalyzer:
    """Diagnoses prediction failure modes across evidence pairs."""

    @staticmethod
    def analyze_errors(
        test_samples: List[Dict[str, Any]],
        y_true: List[int],
        y_pred: List[int]
    ) -> Dict[str, List[Dict[str, Any]]]:
        """Categorizes prediction outcomes into false positives and false negatives."""
        false_positives = []
        false_negatives = []

        for sample, actual, predicted in zip(test_samples, y_true, y_pred):
            info = {
                "sample_id": sample.get("id") or sample.get("pair_id") or "UNKNOWN",
                "actual": "Conflicting" if actual == 1 else "Corroborated",
                "predicted": "Conflicting" if predicted == 1 else "Corroborated",
                "details": sample.get("details", {})
            }
            if actual == 0 and predicted == 1:
                false_positives.append(info)
            elif actual == 1 and predicted == 0:
                false_negatives.append(info)

        return {
            "false_positives": false_positives,
            "false_negatives": false_negatives,
            "false_positive_count": len(false_positives),
            "false_negative_count": len(false_negatives)
        }
