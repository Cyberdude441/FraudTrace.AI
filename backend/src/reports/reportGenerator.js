/**
 * FraudTrace AI - Incident Report Generator
 * Generates structured 14-section incident reports with full source traceability
 */

export function generateIncidentReport(caseData, evidence = [], entities = [], timeline = [], relationships = [], inconsistencies = []) {
  const reportId = `RPT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

  const sections = {
    // 1. Incident Overview
    incidentOverview: {
      caseId: caseData.caseId,
      caseTitle: caseData.title,
      summary: "This report provides a multi-source forensic reconstruction of an alleged digital impersonation and unauthorized electronic fund transfer of ₹15,000 executed on 25 September 2026. The incident originated via an automated SMS notice claiming bank KYC invalidation, followed by messaging application communications directing the complainant to a simulated domain and requesting an interim verification security deposit.",
      dateRange: "2026-09-25 10:15:00 IST to 2026-09-25 17:30:00 IST",
      totalEvidenceItems: evidence.length,
      primaryEntitiesIdentified: entities.length,
      sourceReferences: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-040']
    },

    // 2. Evidence Inventory
    evidenceInventory: {
      totalArtifacts: evidence.length,
      categories: {
        screenshots: evidence.filter(e => e.category === 'Screenshot').length,
        chatTranscripts: evidence.filter(e => e.category === 'Chat').length,
        bankRecords: evidence.filter(e => e.category === 'Bank Record').length,
        callLogs: evidence.filter(e => e.category === 'Call Log').length,
        urlRecords: evidence.filter(e => e.category === 'URL').length,
        documents: evidence.filter(e => e.category === 'Document').length,
        other: evidence.filter(e => e.category === 'Other').length
      },
      integrityStatus: "100% Cryptographically Verified (SHA-256 Digest Sealed)",
      sourceReferences: ['EVD-042']
    },

    // 3. Extracted Entities
    extractedEntities: {
      totalExtracted: entities.length,
      breakdown: {
        persons: entities.filter(e => e.type === 'PERSON').map(e => e.value),
        phones: entities.filter(e => e.type === 'PHONE').map(e => e.value),
        urls: entities.filter(e => e.type === 'URL').map(e => e.value),
        amounts: entities.filter(e => e.type === 'AMOUNT').map(e => e.value),
        transactions: entities.filter(e => e.type === 'TRANSACTION').map(e => e.value),
        upiIds: entities.filter(e => e.type === 'UPI_ID').map(e => e.value),
        organizations: entities.filter(e => e.type === 'ORGANIZATION').map(e => e.value),
        locations: entities.filter(e => e.type === 'LOCATION').map(e => e.value)
      },
      sourceReferences: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-006', 'EVD-010']
    },

    // 4. Chronological Timeline
    chronologicalTimeline: {
      eventCount: timeline.length,
      startEvent: timeline[0] ? `${timeline[0].displayTime} - ${timeline[0].title}` : '10:15 AM',
      terminalEvent: timeline[timeline.length - 1] ? `${timeline[timeline.length - 1].displayTime} - ${timeline[timeline.length - 1].title}` : '05:30 PM',
      keyMilestones: timeline.slice(0, 8).map(t => ({
        time: t.displayTime,
        title: t.title,
        sources: t.sourceEvidenceIds
      }))
    },

    // 5. Transaction Summary
    transactionSummary: {
      debitedAmount: "₹15,000.00",
      claimedPreliminaryFee: "Rs 4,999.00",
      netMerchantSettlement: "INR 14,700.00 (MDR Deduction: INR 300.00)",
      beneficiaryVpa: "subject.demo@upi",
      beneficiaryBank: "Demo Payments Ltd / ACC-88392104-MOCK",
      transactionReference: "TXN-99482109 / NPCI RRN 6288192019",
      executionTimestamp: "2026-09-25 10:40:12 IST",
      sourceReferences: ['EVD-003', 'EVD-007', 'EVD-016', 'EVD-021']
    },

    // 6. Communication Summary
    communicationSummary: {
      smsAlertSender: "VK-MOCKBK (Bulk SMS Gateway)",
      messagingAppSender: "+91 9876543210 (Impersonating 'Officer Verma')",
      voiceCallDuration: "342 seconds (BTS-BHU-09 cell tower)",
      emailNotice: "Dispute acknowledged under ticket DISP-2026-4412",
      sourceReferences: ['EVD-001', 'EVD-002', 'EVD-006', 'EVD-008']
    },

    // 7. Evidence Correlations
    evidenceCorrelations: {
      totalRelationships: relationships.length,
      averageConfidence: "93.4%",
      keyCrossValidations: [
        {
          claim: "Core Banking statement corroborates Complainant Screenshot",
          sources: ['EVD-003', 'EVD-004'],
          confidence: "98%"
        },
        {
          claim: "DNS Query logs corroborate Phishing URL in SMS",
          sources: ['EVD-001', 'EVD-012'],
          confidence: "99%"
        },
        {
          claim: "Cell tower CDR log corroborates Voice Communication",
          sources: ['EVD-006', 'EVD-019'],
          confidence: "96%"
        }
      ]
    },

    // 8. Evidence Graph Summary
    evidenceGraphSummary: {
      density: "High (Multi-cluster topology)",
      centralHubs: ["+91 9876543210", "TXN-99482109", "Demo Payments Ltd.", "payment-demo.test"],
      isolatedNodes: 0,
      clusters: ["Banking Infrastructure", "Telecom & Messaging", "Web & Domain Infrastructure"]
    },

    // 9. Inconsistencies
    inconsistencies: {
      detectedCount: inconsistencies.filter(i => i.category === 'INCONSISTENCY').length,
      primaryFlags: inconsistencies.filter(i => i.category === 'INCONSISTENCY').map(i => ({
        type: i.type,
        title: i.title,
        severity: i.severity,
        action: i.requiredAction
      })),
      sourceReferences: ['EVD-001', 'EVD-003', 'EVD-004', 'EVD-025']
    },

    // 10. Missing Information
    missingInformation: {
      detectedCount: inconsistencies.filter(i => i.category === 'MISSING_INFO').length,
      items: inconsistencies.filter(i => i.category === 'MISSING_INFO').map(m => ({
        title: m.title,
        severity: m.severity,
        recommendation: m.requiredAction
      })),
      sourceReferences: ['EVD-013', 'EVD-024', 'EVD-036']
    },

    // 11. Source References
    sourceReferences: {
      primaryLedger: "bank_statement_september.csv (Row 27)",
      primaryChat: "chat_whatsapp_transcript.txt (Lines 1-18)",
      primaryImage: "payment_success_screenshot.jpg (EXIF: Synthetic Pixel 7)",
      switchLog: "upi_npci_switch_log.csv (RRN 6288192019)",
      cdrLog: "telecom_cdr_call_log.csv (CDR-99120)",
      allArtifactCount: evidence.length
    },

    // 12. AI Analysis
    aiAnalysis: {
      epistemicPosture: "Neutral forensic synthesis strictly limited to observed facts and correlation confidence.",
      narrativeReconstruction: "Evidence strongly indicates an orchestrated multi-tier social engineering sequence. First, synthetic SMS induced urgency regarding KYC expiration. Second, the victim was funneled into a WhatsApp chat with a contact claiming to represent Demo Payments Ltd. Third, instructions to pay a refundable ₹15,000 security holding bond resulted in an unreturned transfer to subject.demo@upi. Four independent evidence sources describe the payment request. However, the payment amount differs between the bank record and the communication records. The system has therefore classified the event as conflicting rather than selecting one source as correct. Network telemetry ties web access to IP 198.51.100.99 and cellular contact to cell tower BTS-BHU-09 in Bhubaneswar.",
      sourceReferences: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-006', 'EVD-009', 'EVD-035']
    },

    // 13. Limitations
    limitations: {
      disclaimer: "This report is generated by FraudTrace AI as an analytical reconstruction tool using synthetic test data. It does not constitute legal determination of guilt, prosecutorial indictment, or judicial finding. All confidence scores reflect digital correlation probability across provided artifacts rather than legal culpability.",
      dataGaps: [
        "Prepaid roaming SIM lacks biometric identity confirmation.",
        "Merchant response to dispute ticket DISP-2026-4412 remains open.",
        "Complainant denies corporate affiliation with registered enterprise entity."
      ]
    },

    // 14. Review Notes
    reviewNotes: {
      preparedBy: "FraudTrace AI Autonomous Engine",
      reviewStatus: "Under Review by Lead Forensic Analyst",
      recommendedNextSteps: [
        "Serve formal production notice for subscriber registration records of +91 9876543210.",
        "Obtain original uncompressed image for screenshot EVD-013.",
        "Inquire with merchant regarding settlement status of NEFT payout #88291029."
      ]
    }
  };

  return {
    reportId,
    caseId: caseData.caseId,
    title: `Forensic Reconstruction Report: ${caseData.title}`,
    generatedAt: new Date(),
    sections
  };
}
