# FraudTrace AI — REST API Documentation

Base URI: `http://localhost:5000/api`

---

## 1. Authentication

### `POST /auth/login`
Authenticates an investigator or initiates Demo Mode.
- **Request Body**:
  ```json
  {
    "email": "analyst@fraudtrace.ai",
    "password": "demo-password",
    "demoMode": true
  }
  ```
- **Response**: Returns JWT token, investigator profile (`name`, `role`, `badgeNumber`).

---

## 2. Cases

### `GET /cases`
Retrieves all investigation cases with enriched statistics (evidence count, entities, events, inconsistencies).

### `GET /cases/:id`
Retrieves single case details and summary metrics.

### `POST /cases`
Initializes a new investigation case dossier.

### `PATCH /cases/:id`
Updates case title, description, or workflow status (`Active`, `Under Review`, `Escalated`, `Archived`).

---

## 3. Evidence

### `GET /evidence`
Lists evidence items for a case with optional query filters:
- `caseId`: e.g. `CASE-2026-001`
- `category`: `Chat`, `Screenshot`, `Bank Record`, `Call Log`, `Transaction`, `URL`, `Document`, `Other`
- `status`: `UPLOADED`, `PROCESSING`, `EXTRACTED`, `CORRELATED`, `REVIEW REQUIRED`

### `POST /evidence/upload`
Uploads a new forensic artifact (multipart form with `file` or JSON with `textContent`).
Computes and assigns cryptographic SHA-256 hash automatically.

### `GET /evidence/:id`
Retrieves full evidence record, associated entities, and linked timeline events.

### `POST /evidence/:id/process`
Executes OCR, document parsing, and entity extraction. Updates status to `CORRELATED`.

---

## 4. Entities & Resolution

### `GET /entities`
Retrieves all canonical entities for a case with optional `type` filter (`PERSON`, `PHONE`, `EMAIL`, `URL`, `TRANSACTION`, `AMOUNT`, `UPI_ID`, `BANK_ACCOUNT`, `LOCATION`, `ORGANIZATION`, `DEVICE`).

### `GET /entities/:id`
Retrieves entity details, normalized values, source evidence occurrences, and relationship links.

---

## 5. Evidence Graph

### `GET /graph/:caseId`
Generates graph topology formatted for React Flow (`nodes`, `edges`, `stats`).
Includes entity type angles, degree clustering, and color-coded edge relationships (`CORROBORATES`, `CONFLICTS_WITH`, `ASSOCIATED_WITH`).

---

## 6. Timeline Reconstruction

### `GET /timeline/:caseId`
Returns chronological timeline events with source locations, confidence scores, and linked entity IDs.

---

## 7. Inconsistency & Missing Evidence Engine

### `GET /inconsistencies/:caseId`
Returns detected factual inconsistencies (amount mismatches, timestamp discrepancies) and missing information records.

### `PATCH /inconsistencies/:id`
Updates resolution status (`OPEN`, `UNDER_REVIEW`, `RESOLVED`, `DISMISSED`) and notes.

---

## 8. AI Copilot

### `POST /ai/query`
Queries the Evidence Copilot assistant.
- **Request Body**:
  ```json
  {
    "query": "What evidence supports the ₹15,000 transaction?",
    "caseId": "CASE-2026-001"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "result": {
      "answer": "...",
      "evidenceBasis": [
        { "evidenceId": "EVD-003", "filename": "bank_statement.csv", "citation": "Row 27: INR 15,000.00 DR" }
      ],
      "confidenceContext": "High",
      "confidenceScore": 0.98,
      "reasoning": "...",
      "limitations": "...",
      "epistemicType": "FACT"
    }
  }
  ```

---

## 9. Reports

### `POST /reports/generate`
Compiles complete 14-section incident report with source references.

### `GET /reports/case/:caseId`
Retrieves existing compiled reports.

---

## 10. Audit & Search

### `GET /audit/:caseId`
Retrieves immutable chain-of-custody audit logs.

### `GET /audit/search?q=query&caseId=caseId`
Global search across evidence, entities, transactions, phone numbers, and timeline events.
