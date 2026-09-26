"""
Comprehensive evaluation metrics for contradiction detection and entity resolution.
"""

from typing import Any, Dict, List, Optional
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)


class ModelEvaluator:
    """Computes standard and domain-specific forensic evaluation metrics."""

    @classmethod
    def evaluate_contradiction_detection(
        cls,
        y_true: List[int],
        y_pred: List[int],
        class_names: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Calculates accuracy, precision, recall, and contradiction-specific metrics.
        Class 1 is assumed to be CONTRADICTION / CONFLICT.
        """
        if class_names is None:
            class_names = ["Corroborated", "Conflicting"]

        acc = float(accuracy_score(y_true, y_pred))
        prec_macro = float(precision_score(y_true, y_pred, average="macro", zero_division=0))
        rec_macro = float(recall_score(y_true, y_pred, average="macro", zero_division=0))
        f1_macro = float(f1_score(y_true, y_pred, average="macro", zero_division=0))

        # Contradiction specific (class 1)
        contra_prec = float(precision_score(y_true, y_pred, pos_label=1, zero_division=0))
        contra_rec = float(recall_score(y_true, y_pred, pos_label=1, zero_division=0))
        contra_f1 = float(f1_score(y_true, y_pred, pos_label=1, zero_division=0))

        cm = confusion_matrix(y_true, y_pred).tolist()

        return {
            "accuracy": acc,
            "precision_macro": prec_macro,
            "recall_macro": rec_macro,
            "f1_macro": f1_macro,
            "contradiction_precision": contra_prec,
            "contradiction_recall": contra_rec,
            "contradiction_f1": contra_f1,
            "confusion_matrix": cm,
            "class_names": class_names,
            "support": len(y_true)
        }

    @classmethod
    def evaluate_entity_resolution(
        cls,
        y_true: List[int],
        y_pred: List[int]
    ) -> Dict[str, Any]:
        """Computes pairwise precision, recall, and F1 for entity linkage."""
        return {
            "pairwise_precision": float(precision_score(y_true, y_pred, zero_division=0)),
            "pairwise_recall": float(recall_score(y_true, y_pred, zero_division=0)),
            "pairwise_f1": float(f1_score(y_true, y_pred, zero_division=0)),
            "pairwise_accuracy": float(accuracy_score(y_true, y_pred))
        }
