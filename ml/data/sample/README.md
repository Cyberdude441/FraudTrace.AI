# FraudTrace AI — Contradiction & Corroboration Engine Demo Dataset

100% synthetic/demo data. Intended for product demonstration and automated tests only.

## Files
- cases.json — primary demo case
- evidence.json — 12 evidence records
- entities.json — normalized synthetic entities
- events.json — 7 canonical events with supporting/contradicting evidence
- relationships.json — graph edges
- inconsistencies.json — contradiction, timestamp, missing-data and duplicate findings
- golden_tests.json — expected engine behavior
- confidence_model.json — transparent confidence rules
- source_types.json — optional source-type metadata

## UI
Display `SYNTHETIC DEMO DATA` on evidence details and:
`Demo Environment — All evidence shown here is synthetic.`

## Important engine behavior
Do not select a winning value when sources conflict. Do not count duplicate copies as independent corroboration. Preserve source traceability and generate explanations from the observations.

This package does not determine legal guilt.
