# FraudTrace AI — Machine Learning Pipeline

> **DISCLAIMER: SYNTHETIC DATA ONLY**  
> All data in this directory is synthetically generated for testing and demonstration. FraudTrace AI does not make legal guilt determinations; it reconstructs and correlates evidence relationships.

---

## Quick Navigation

- **Notebooks (Google Colab)**: [`ml/notebooks/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/notebooks/) — 11 self-contained notebooks for exploration, training, and inference.
- **Python Source Library**: [`ml/src/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/src/) — Modular core logic for normalization, entity resolution, correlation, contradiction detection, and confidence scoring.
- **FastAPI Inference Microservice**: [`ml/api/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/api/) — REST API server running on port 8000.
- **Datasets**: [`ml/data/sample/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/data/sample/) — Lightweight committed sample data (~200 KB) and 50-incident master tables.
- **Trained Artifacts**: [`ml/artifacts/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/artifacts/) — Serialized Random Forest model and evaluation metrics.
- **Unit Tests**: [`ml/tests/`](file:///c:/Users/KIIT/Desktop/K-1000/ml/tests/) — Pytest suite covering all pipeline components.

---

## Running in Google Colab

Every notebook in `ml/notebooks/` includes an automated self-cloning cell:
```python
if 'google.colab' in str(get_ipython()):
    !git clone https://github.com/Cyberdude441/FraudTrace.AI.git
    %cd FraudTrace.AI
    !pip install -r ml/requirements-colab.txt
```
To run, simply open the notebook on [Google Colab](https://colab.research.google.com) from GitHub: `https://github.com/Cyberdude441/FraudTrace.AI`.

---

## Local Development

```bash
# 1. Install dependencies
pip install -r ml/requirements.txt

# 2. Run unit tests
python -m pytest ml/tests -v

# 3. Start the FastAPI microservice
python -m uvicorn ml.api.main:app --host 0.0.0.0 --port 8000
```
