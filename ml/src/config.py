"""
Configuration and Environment Management for FraudTrace AI ML.
Supports dynamic repository root detection for local execution and Google Colab.
"""

import os
import random
from pathlib import Path
from typing import Any, Dict
import yaml
import numpy as np


def find_repo_root() -> Path:
    """Dynamically locates repository root by searching upward for markers."""
    current = Path(__file__).resolve().parent
    for parent in [current] + list(current.parents):
        if (parent / ".git").exists() or (parent / "package.json").exists() or (parent / "ml").exists():
            return parent
    return Path.cwd()


REPO_ROOT = find_repo_root()
ML_ROOT = REPO_ROOT / "ml"
DATA_DIR = ML_ROOT / "data"
SAMPLE_DIR = DATA_DIR / "sample"
RAW_DIR = DATA_DIR / "raw"
INTERIM_DIR = DATA_DIR / "interim"
PROCESSED_DIR = DATA_DIR / "processed"
ARTIFACTS_DIR = ML_ROOT / "artifacts"
MODELS_DIR = ARTIFACTS_DIR / "models"
METRICS_DIR = ARTIFACTS_DIR / "metrics"
CONFIGS_DIR = ML_ROOT / "configs"


def load_config(config_name: str = "development.yaml") -> Dict[str, Any]:
    """Loads a YAML config file from ml/configs/."""
    config_path = CONFIGS_DIR / config_name
    if not config_path.exists():
        # Fallback to default dictionary if file is missing
        return {
            "seed": 42,
            "thresholds": {
                "entity_match": 0.80,
                "contradiction": 0.70,
                "timestamp_drift_minutes": 4.0,
                "amount_tolerance_ratio": 0.01,
            },
            "confidence": {
                "one_source": "LOW",
                "two_agreeing": "MEDIUM",
                "three_agreeing": "HIGH",
                "four_plus_agreeing": "VERY HIGH",
                "conflict": "CONFLICTING",
            }
        }
    with open(config_path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def set_seed(seed: int = 42) -> None:
    """Sets random seeds for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)
    os.environ["PYTHONHASHSEED"] = str(seed)


# Set default random seed upon module import
DEFAULT_CONFIG = load_config()
set_seed(DEFAULT_CONFIG.get("seed", 42))
