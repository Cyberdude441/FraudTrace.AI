# FraudTrace AI — Google Colab Running Guide

> **CRITICAL FORENSIC DISCLAIMER: SYNTHETIC DATA ONLY**  
> All data used in these notebooks is synthetically generated for research, testing, and demonstration. Zero authentic personal or financial data is included.

---

## 1. Quick Start (1-Click Run)

All 11 notebooks in `ml/notebooks/` are pre-configured to execute in **Google Colab** with zero manual directory management.

### Steps:
1. Open [Google Colab](https://colab.research.google.com).
2. Click **File** > **Open notebook**.
3. Select the **GitHub** tab.
4. Enter repository URL:
   ```
   https://github.com/Cyberdude441/FraudTrace.AI
   ```
5. Click on any notebook, for example:
   - `ml/notebooks/00_setup_colab.ipynb` (Environment Smoke Test)
   - `ml/notebooks/06_contradiction_detection.ipynb` (Contradiction Engine)
   - `ml/notebooks/10_inference_demo.ipynb` (Live Interactive Demo)

---

## 2. Automated Colab Setup Cell

Every notebook begins with an automated environment bootstrapping cell:

```python
# ====================================================================
# GOOGLE COLAB ENVIRONMENT SETUP
# ====================================================================
import os
import sys

# Clone repository if running inside Google Colab
if 'google.colab' in str(get_ipython()):
    if not os.path.exists('FraudTrace.AI'):
        !git clone https://github.com/Cyberdude441/FraudTrace.AI.git
    %cd FraudTrace.AI
    !pip install -r ml/requirements-colab.txt

# Ensure repository root is on sys.path for local and Colab execution
repo_root = os.path.abspath('.')
if repo_root not in sys.path:
    sys.path.insert(0, repo_root)

print(f"[OK] Environment initialized. Working directory: {os.getcwd()}")
```

This guarantees:
1. The repository is cloned if not already present.
2. The working directory is changed to the repository root.
3. Lightweight Colab dependencies from `ml/requirements-colab.txt` are installed.
4. Python imports (`from ml.src...`) work reliably.

---

## 3. Hardware Requirements

- **Recommended Runtime**: **Standard CPU** (Free tier).
- **GPU Accelerator**: Not required. The Scikit-Learn models and deterministic rule engines execute in under 2 seconds on standard CPU.
- **Memory**: Less than 1 GB RAM is required for all sample datasets and benchmarks.

---

## 4. Notebook Catalog

| # | Notebook | Focus Area | Runtime |
| :-: | :--- | :--- | :-: |
| **00** | `00_setup_colab.ipynb` | Environment diagnostics, directory verification, smoke test | ~5s |
| **01** | `01_data_exploration.ipynb` | Corpus statistics, evidence/source distribution, ground truth | ~8s |
| **02** | `02_data_cleaning.ipynb` | Phone, amount, timestamp normalization; save to `ml/data/processed/` | ~6s |
| **03** | `03_feature_engineering.ipynb` | 14-dimensional pairwise forensic feature vector extraction | ~5s |
| **04** | `04_entity_resolution.ipynb` | Canonical & fuzzy matching (Phone, UPI, Account, Name) | ~6s |
| **05** | `05_event_correlation.ipynb` | Time-windowed clustering preserving independent sources | ~5s |
| **06** | `06_contradiction_detection.ipynb` | Multi-class contradiction detection (50k vs 48k mismatch) | ~5s |
| **07** | `07_confidence_scoring.ipynb` | 4-tier calibrated scoring & contradiction guardrail verification | ~5s |
| **08** | `08_model_training.ipynb` | Logistic Regression vs Random Forest training on pairwise data | ~10s |
| **09** | `09_model_evaluation.ipynb` | Precision/Recall metrics & automated 8 Golden Tests suite | ~6s |
| **10** | `10_inference_demo.ipynb` | Live interactive demonstration of FIR vs Bank statement dispute | ~5s |

---

## 5. Troubleshooting & FAQ

### Issue: `ModuleNotFoundError: No module named 'ml'`
**Cause**: The current working directory is not the repository root.  
**Fix**: Re-run the top Colab setup cell, which calls `%cd FraudTrace.AI` and appends `repo_root` to `sys.path`.

### Issue: `FileNotFoundError: ml/data/sample/golden_tests.json`
**Cause**: Running from a subfolder or incomplete clone.  
**Fix**: Verify working directory using `!pwd`. Ensure you are at the repository root containing the `ml` folder.

### Issue: Visualizing Matplotlib Figures
**Fix**: All plotting code utilizes `plt.tight_layout()` and `plt.show()`, supported natively in Colab output cells.
