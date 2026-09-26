"""
Dataset validation and integrity checking for FraudTrace AI.
"""

from typing import Any, Dict, List, Tuple
import pandas as pd


class DataValidator:
    """Validates structure and integrity of synthetic evidence datasets."""

    REQUIRED_TABLES = ["incidents", "evidence", "entities", "events", "ground_truth"]

    REQUIRED_COLUMNS = {
        "incidents": ["incident_id", "incident_type"],
        "evidence": ["evidence_id", "incident_id", "source_type"],
        "entities": ["entity_id", "entity_type", "normalized_value"],
        "events": ["event_id", "incident_id", "evidence_id", "timestamp"],
        "ground_truth": ["incident_id", "expected_label"]
    }

    def validate_master_tables(self, tables: Dict[str, pd.DataFrame]) -> Tuple[bool, List[str]]:
        """Validates presence and schema of all master tables."""
        errors = []
        for table_name in self.REQUIRED_TABLES:
            if table_name not in tables:
                errors.append(f"Missing required master table: {table_name}")
                continue
            df = tables[table_name]
            for col in self.REQUIRED_COLUMNS.get(table_name, []):
                if col not in df.columns:
                    errors.append(f"Table '{table_name}' missing column: '{col}'")

        is_valid = len(errors) == 0
        return is_valid, errors

    def validate_golden_tests(self, tests: List[Dict[str, Any]]) -> Tuple[bool, List[str]]:
        """Validates that golden tests have testId, input, and expected status."""
        errors = []
        if not isinstance(tests, list) or len(tests) == 0:
            return False, ["Golden tests must be a non-empty list of test specs."]
        for idx, t in enumerate(tests):
            if "testId" not in t:
                errors.append(f"Test at index {idx} missing 'testId'")
            if "input" not in t:
                errors.append(f"Test {t.get('testId', idx)} missing 'input'")
            if "expectedStatus" not in t and "expectedConfidence" not in t:
                errors.append(f"Test {t.get('testId', idx)} missing expected assertion")
        return len(errors) == 0, errors
