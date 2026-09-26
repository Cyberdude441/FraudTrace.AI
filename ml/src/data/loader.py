"""
Data loading utilities for FraudTrace AI.
Supports loading sample JSONs and full master CSV tables.
"""

import json
from pathlib import Path
from typing import Any, Dict, List, Optional
import pandas as pd

from ..config import DATA_DIR, SAMPLE_DIR, RAW_DIR


class DataLoader:
    """Loads synthetic data from local directory or repository sample store."""

    def __init__(self, data_dir: Optional[Path] = None):
        self.data_dir = Path(data_dir) if data_dir else DATA_DIR
        self.sample_dir = self.data_dir / "sample"
        self.raw_dir = self.data_dir / "raw"

    def _resolve_file(self, filename: str) -> Path:
        """Finds file in sample_dir, raw_dir, or subfolders."""
        candidates = [
            self.sample_dir / filename,
            self.sample_dir / "master" / filename,
            self.raw_dir / "demo_dataset" / filename,
            self.raw_dir / "synthetic_dataset" / "master" / filename,
            self.raw_dir / "synthetic_dataset" / filename,
            self.data_dir / filename
        ]
        for path in candidates:
            if path.exists():
                return path
        raise FileNotFoundError(f"Could not locate dataset file: {filename}")

    def load_json(self, filename: str) -> Any:
        """Loads a JSON file by name."""
        path = self._resolve_file(filename)
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def load_csv(self, filename: str) -> pd.DataFrame:
        """Loads a CSV file into a pandas DataFrame."""
        path = self._resolve_file(filename)
        return pd.read_csv(path)

    def load_golden_tests(self) -> List[Dict[str, Any]]:
        """Loads the official golden verification tests."""
        return self.load_json("golden_tests.json")

    def load_confidence_model(self) -> Dict[str, Any]:
        """Loads the confidence rulebook specification."""
        return self.load_json("confidence_model.json")

    def load_demo_case(self) -> Dict[str, Any]:
        """Loads the comprehensive demo case bundle (CASE-001)."""
        return {
            "case": self.load_json("cases.json"),
            "evidence": self.load_json("evidence.json"),
            "entities": self.load_json("entities.json"),
            "events": self.load_json("events.json"),
            "relationships": self.load_json("relationships.json"),
            "inconsistencies": self.load_json("inconsistencies.json"),
        }

    def load_master_csvs(self) -> Dict[str, pd.DataFrame]:
        """Loads all master relational tables into a dictionary of DataFrames."""
        tables = [
            "incidents.csv",
            "evidence.csv",
            "entities.csv",
            "events.csv",
            "matches.csv",
            "ground_truth.csv",
            "inconsistencies.csv",
            "indicators.csv",
            "evidence_entities.csv"
        ]
        result = {}
        for table in tables:
            try:
                name = table.replace(".csv", "")
                result[name] = self.load_csv(table)
            except FileNotFoundError:
                pass
        return result
