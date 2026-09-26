# FraudTrace AI — Machine Learning Data Catalog

> **SYNTHETIC DATA ONLY**: All datasets contained herein are 100% synthetically generated for algorithmic testing, model training, and product demonstration. No real personal, financial, or telecom records are included.

## Directory Structure

- `sample/`: Lightweight canonical sample dataset committed directly to Git. Contains golden test cases (`golden_tests.json`), case JSONs, and master relational CSVs.
- `raw/`: Unpacked full raw archives (gitignored in production repository).
  - `demo_dataset/`: Unpacked `fraudtrace_demo_dataset.zip`
  - `synthetic_dataset/`: Unpacked `fraudtrace_synthetic_dataset.zip` (50 simulated multi-modal incidents)
- `interim/`: Intermediate cleaned data structures created during data cleaning notebooks.
- `processed/`: Serialized feature matrices ready for model training.

## Loading Data in Python

```python
from ml.src.data.loader import DataLoader

loader = DataLoader()
# Loads sample dataset by default, or raw dataset if available
case_data = loader.load_case()
master_tables = loader.load_master_csvs()
golden_tests = loader.load_golden_tests()
```
