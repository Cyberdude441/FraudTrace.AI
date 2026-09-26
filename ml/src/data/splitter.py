"""
Incident-aware dataset splitting to prevent data leakage.
"""

from typing import Dict, List, Tuple
import numpy as np
import pandas as pd


class DatasetSplitter:
    """Splits evidence datasets by incident_id to prevent intra-incident leakage."""

    def __init__(self, test_size: float = 0.2, val_size: float = 0.1, seed: int = 42):
        self.test_size = test_size
        self.val_size = val_size
        self.seed = seed

    def split_incidents(self, incident_ids: List[str]) -> Tuple[List[str], List[str], List[str]]:
        """Splits a list of unique incident IDs into train, val, and test subsets."""
        rng = np.random.default_rng(self.seed)
        shuffled = rng.permutation(incident_ids).tolist()

        n = len(shuffled)
        n_test = max(1, int(n * self.test_size))
        n_val = max(1, int(n * self.val_size)) if self.val_size > 0 else 0

        test_ids = shuffled[:n_test]
        val_ids = shuffled[n_test:n_test + n_val]
        train_ids = shuffled[n_test + n_val:]

        return train_ids, val_ids, test_ids

    def split_dataframe(self, df: pd.DataFrame, incident_col: str = "incident_id") -> Dict[str, pd.DataFrame]:
        """Splits a DataFrame based on incident ID."""
        if incident_col not in df.columns:
            raise ValueError(f"Column '{incident_col}' not found in DataFrame.")

        unique_incidents = df[incident_col].unique().tolist()
        train_ids, val_ids, test_ids = self.split_incidents(unique_incidents)

        return {
            "train": df[df[incident_col].isin(train_ids)].reset_index(drop=True),
            "val": df[df[incident_col].isin(val_ids)].reset_index(drop=True),
            "test": df[df[incident_col].isin(test_ids)].reset_index(drop=True),
        }
