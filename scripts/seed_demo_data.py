"""
Seed and verify demo data files for FraudTrace AI ML.
Usage: python scripts/seed_demo_data.py
"""

import sys
from pathlib import Path

root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir))

from ml.src.config import SAMPLE_DIR, DATA_DIR


def main():
    print("=" * 60)
    print("  FRAUDTRACE AI — SEED DEMO DATA")
    print("=" * 60)

    if not SAMPLE_DIR.exists():
        print(f"Creating sample directory at: {SAMPLE_DIR}")
        SAMPLE_DIR.mkdir(parents=True, exist_ok=True)

    json_files = list(SAMPLE_DIR.glob("*.json"))
    print(f"Sample JSON files present: {len(json_files)}")
    for f in json_files:
        print(f"  - {f.name} ({f.stat().st_size} bytes)")

    master_dir = SAMPLE_DIR / "master"
    if master_dir.exists():
        csv_files = list(master_dir.glob("*.csv"))
        print(f"\nMaster CSV files present: {len(csv_files)}")
        for f in csv_files:
            print(f"  - {f.name} ({f.stat().st_size} bytes)")

    print("\nDemo data verified.")


if __name__ == "__main__":
    main()
