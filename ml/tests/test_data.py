"""
Unit tests for data loading, validation, cleaning, and splitting.
"""

import pytest
from ml.src.data.loader import DataLoader
from ml.src.data.validator import DataValidator
from ml.src.data.cleaner import DataCleaner
from ml.src.data.splitter import DatasetSplitter


def test_data_loader_demo_case():
    loader = DataLoader()
    demo = loader.load_demo_case()
    assert "case" in demo
    assert "evidence" in demo
    assert "events" in demo
    assert len(demo["evidence"]) >= 10


def test_data_loader_golden_tests():
    loader = DataLoader()
    tests = loader.load_golden_tests()
    assert len(tests) >= 8
    validator = DataValidator()
    is_valid, errors = validator.validate_golden_tests(tests)
    assert is_valid, f"Validation errors: {errors}"


def test_data_validator_master_tables():
    loader = DataLoader()
    tables = loader.load_master_csvs()
    validator = DataValidator()
    is_valid, errors = validator.validate_master_tables(tables)
    assert is_valid, f"Validation errors: {errors}"


def test_dataset_splitter():
    splitter = DatasetSplitter(test_size=0.2, val_size=0.1, seed=42)
    incident_ids = [f"INC{i:03d}" for i in range(1, 21)]
    train, val, test = splitter.split_incidents(incident_ids)

    # Disjoint sets check
    assert len(set(train).intersection(set(test))) == 0
    assert len(set(train).intersection(set(val))) == 0
    assert len(train) + len(val) + len(test) == 20
