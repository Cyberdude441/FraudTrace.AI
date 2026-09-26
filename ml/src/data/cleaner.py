"""
Data cleaning and standardization module for FraudTrace AI.
"""

from typing import Dict
import pandas as pd


class DataCleaner:
    """Cleans and standardizes raw relational tables."""

    @staticmethod
    def clean_text_series(series: pd.Series) -> pd.Series:
        """Trims whitespace and standardizes null representations."""
        return series.astype(str).str.strip().replace({"nan": None, "None": None, "": None})

    def clean_tables(self, tables: Dict[str, pd.DataFrame]) -> Dict[str, pd.DataFrame]:
        """Performs cleaning across all master DataFrames."""
        cleaned = {}
        for name, df in tables.items():
            df_copy = df.copy()
            for col in df_copy.select_dtypes(include=["object"]).columns:
                df_copy[col] = self.clean_text_series(df_copy[col])

            # Deduplicate by primary key if exists
            id_col = f"{name[:-1]}_id" if name.endswith("s") else f"{name}_id"
            if id_col in df_copy.columns:
                df_copy = df_copy.drop_duplicates(subset=[id_col])

            cleaned[name] = df_copy
        return cleaned
