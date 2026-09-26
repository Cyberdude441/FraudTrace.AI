"""
Script to validate dataset schema and golden test integrity.
Usage: python scripts/validate_dataset.py
"""

import sys
from pathlib import Path

# Configure utf-8 stdout for cross-platform support
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add repo root to sys.path
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

from ml.src.data.loader import DataLoader
from ml.src.data.validator import DataValidator


def main():
    print("=" * 60)
    print("  FRAUDTRACE AI -- DATASET INTEGRITY VALIDATOR")
    print("=" * 60)

    loader = DataLoader()
    validator = DataValidator()

    # 1. Validate master CSVs
    print("\n[1/2] Checking Relational Master CSV Tables...")
    try:
        tables = loader.load_master_csvs()
        is_valid, errors = validator.validate_master_tables(tables)
        if is_valid:
            print(f"  [OK] All {len(tables)} master tables present and schema-valid:")
            for name, df in tables.items():
                print(f"    - {name}.csv: {len(df)} rows, {len(df.columns)} columns")
        else:
            print("  [FAIL] Master table validation errors:")
            for err in errors:
                print(f"    - {err}")
    except Exception as e:
        print(f"  [FAIL] Failed to load master CSVs: {e}")

    # 2. Validate golden tests
    print("\n[2/2] Checking Golden Test Suite...")
    try:
        golden_tests = loader.load_golden_tests()
        is_valid, errors = validator.validate_golden_tests(golden_tests)
        if is_valid:
            print(f"  [OK] {len(golden_tests)} golden tests loaded and validated:")
            for t in golden_tests:
                exp = t.get("expectedStatus") or t.get("expectedConfidence")
                print(f"    - [{t.get('testId')}] {t.get('name')} -> {exp}")
        else:
            print("  [FAIL] Golden test validation errors:")
            for err in errors:
                print(f"    - {err}")
    except Exception as e:
        print(f"  [FAIL] Failed to load golden tests: {e}")

    print("\nValidation completed successfully.")


if __name__ == "__main__":
    main()
