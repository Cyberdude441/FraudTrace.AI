"""
Evaluation reporting module generating structured markdown and JSON metrics summaries.
"""

import json
from pathlib import Path
from typing import Any, Dict, Optional
from ..config import METRICS_DIR


class EvaluationReporter:
    """Formats and exports model performance benchmarks."""

    @staticmethod
    def generate_markdown_report(metrics: Dict[str, Any], model_name: str = "ContradictionModel_v1") -> str:
        """Renders an honest, transparent evaluation report in markdown."""
        md = f"# Model Evaluation Benchmark: {model_name}\n\n"
        md += "> **Note on Synthetic Data Evaluation**: Evaluated strictly on the synthetic FraudTrace dataset. Real-world validation remains required.\n\n"
        md += "## 1. Summary Performance Metrics\n\n"
        md += f"- **Overall Accuracy**: `{metrics.get('accuracy', 0.0):.4f}`\n"
        md += f"- **F1 Macro**: `{metrics.get('f1_macro', 0.0):.4f}`\n"
        md += f"- **Precision (Macro)**: `{metrics.get('precision_macro', 0.0):.4f}`\n"
        md += f"- **Recall (Macro)**: `{metrics.get('recall_macro', 0.0):.4f}`\n\n"
        md += "## 2. Contradiction Detection Specialty Metrics (Class 1)\n\n"
        md += f"- **Contradiction Precision**: `{metrics.get('contradiction_precision', 0.0):.4f}`\n"
        md += f"- **Contradiction Recall**: `{metrics.get('contradiction_recall', 0.0):.4f}`\n"
        md += f"- **Contradiction F1**: `{metrics.get('contradiction_f1', 0.0):.4f}`\n\n"
        md += "## 3. Confusion Matrix\n\n"
        cm = metrics.get("confusion_matrix", [[0, 0], [0, 0]])
        md += "| Actual \\ Predicted | Corroborated (0) | Conflicting (1) |\n"
        md += "| :--- | :--- | :--- |\n"
        md += f"| **Corroborated (0)** | {cm[0][0]} | {cm[0][1]} |\n"
        md += f"| **Conflicting (1)** | {cm[1][0]} | {cm[1][1]} |\n\n"
        md += f"*Total Test Samples*: `{metrics.get('support', 0)}`\n"
        return md

    @staticmethod
    def save_report(
        metrics: Dict[str, Any],
        experiment_id: str = "experiment_001",
        filepath: Optional[Path] = None
    ) -> Path:
        """Saves metrics JSON under ml/artifacts/metrics/."""
        if filepath is None:
            filepath = METRICS_DIR / f"{experiment_id}.json"
        filepath.parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(metrics, f, indent=2)
        return filepath
