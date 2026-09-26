/**
 * FraudTrace AI - Synthetic Investigation Dataset Seed
 * STRICTLY SYNTHETIC AND MOCK ARTIFACTS ONLY.
 * No real human identifiers, real financial institutions, or external criminal records.
 */

export const SEED_CASE = {
  caseId: 'CASE-2026-001',
  title: 'Operation Digital Mirage: KYC Impersonation & Unauthorized Transfer',
  description: 'Reconstruction and cross-evidence correlation of multi-stage digital impersonation, phishing gateway redirects, and ₹15,000 synthetic transaction discrepancies.',
  status: 'Under Review',
  incidentDate: new Date('2026-09-25T10:15:00Z'),
  assignedAnalyst: 'Lead Analyst (FraudTrace Unit)',
  createdAt: new Date('2026-09-25T13:00:00Z'),
  updatedAt: new Date('2026-09-26T09:30:00Z')
};

// 42 Synthetic Evidence Items
export const SEED_EVIDENCE = [
  {
    evidenceId: 'EVD-001',
    caseId: 'CASE-2026-001',
    filename: 'sms_alert_kyc_expiry.png',
    type: 'image/png',
    category: 'Screenshot',
    status: 'CORRELATED',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSize: 412980,
    uploadedAt: new Date('2026-09-25T11:00:00Z'),
    processedAt: new Date('2026-09-25T11:02:15Z'),
    extractedText: 'URGENT: Your Bank KYC has expired today. Services will be frozen immediately. Update KYC by paying nominal Rs 4,999 verification deposit at https://payment-demo.test/kyc-portal or contact helpline +91 9876543210.',
    metadata: {
      deviceModel: 'Synthetic Pixel 7',
      captureTime: '2026-09-25 10:18:22 IST',
      senderHeader: 'VK-MOCKBK'
    },
    structuredData: {
      sender: 'VK-MOCKBK',
      phone: '+919876543210',
      url: 'https://payment-demo.test/kyc-portal',
      claimedAmount: 4999
    }
  },
  {
    evidenceId: 'EVD-002',
    caseId: 'CASE-2026-001',
    filename: 'chat_whatsapp_transcript.txt',
    type: 'text/plain',
    category: 'Chat',
    status: 'CORRELATED',
    hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    fileSize: 18450,
    uploadedAt: new Date('2026-09-25T11:05:00Z'),
    processedAt: new Date('2026-09-25T11:06:40Z'),
    extractedText: '[10:22 AM, 25/09/2026] +91 9876543210: Dear customer, I am Officer Verma from Demo Payments Ltd verification division. Did you receive the KYC notice?\n[10:24 AM, 25/09/2026] Subject A: Yes, I am worried my account will be locked.\n[10:25 AM, 25/09/2026] +91 9876543210: Click on https://payment-demo.test/auth and enter OTP once generated. Send ₹15,000 temporary holding bond via UPI to subject.demo@upi. It will be refunded within 15 minutes.\n[10:28 AM, 25/09/2026] Subject A: Why is the amount ₹15,000 when SMS said Rs 4,999?\n[10:29 AM, 25/09/2026] +91 9876543210: High tier security tier required. Refund code REF-88123 will trigger instant credit.',
    metadata: {
      chatExportPlatform: 'WhatsApp Export v2.26',
      totalMessages: 18,
      sourcePhone: '+919876543210'
    },
    structuredData: {
      counterparty: '+91 9876543210',
      requestedUpi: 'subject.demo@upi',
      holdingAmount: 15000,
      refundCode: 'REF-88123'
    }
  },
  {
    evidenceId: 'EVD-003',
    caseId: 'CASE-2026-001',
    filename: 'bank_statement_september.csv',
    type: 'text/csv',
    category: 'Bank Record',
    status: 'CORRELATED',
    hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    fileSize: 92400,
    uploadedAt: new Date('2026-09-25T11:15:00Z'),
    processedAt: new Date('2026-09-25T11:16:30Z'),
    extractedText: 'Row 27: 2026-09-25 10:40:12, UPI/DR/6288192019/subject.demo@upi/Demo Payments Ltd/TXN-99482109, INR 15,000.00, DR, Balance: 42,150.00\nRow 28: 2026-09-25 10:41:00, SMS-CHRG/DR, INR 17.70, DR',
    metadata: {
      accountNumber: 'ACC-88392104-MOCK',
      bankName: 'Mock National Commercial Bank',
      rowCount: 85,
      targetRow: 27
    },
    structuredData: {
      transactionId: 'TXN-99482109',
      referenceNumber: 'UPI/DR/6288192019',
      amount: 15000,
      timestamp: '2026-09-25T10:40:12Z',
      recipientUpi: 'subject.demo@upi'
    }
  },
  {
    evidenceId: 'EVD-004',
    caseId: 'CASE-2026-001',
    filename: 'payment_success_screenshot.jpg',
    type: 'image/jpeg',
    category: 'Screenshot',
    status: 'CORRELATED',
    hash: '1b8973b7a5a8a1fa2b704c3e8a4d46c825a07dd9b5c21f92e5c84d791238a2c1',
    fileSize: 524100,
    uploadedAt: new Date('2026-09-25T11:20:00Z'),
    processedAt: new Date('2026-09-25T11:22:05Z'),
    extractedText: 'Transaction Successful! Paid to: Demo Payments Ltd. UPI ID: subject.demo@upi. Amount: ₹15,000. GooglePay UPI Ref: 6288192019. Time: 10:45 AM, 25 Sep 2026.',
    metadata: {
      device: 'Synthetic Pixel 7',
      resolution: '1080x2400',
      osVersion: 'Android 14 Synthetic',
      clockTime: '10:45 AM'
    },
    structuredData: {
      displayedTime: '10:45 AM',
      amount: 15000,
      upiRef: '6288192019'
    }
  },
  {
    evidenceId: 'EVD-005',
    caseId: 'CASE-2026-001',
    filename: 'phishing_landing_dom_dump.json',
    type: 'application/json',
    category: 'URL',
    status: 'CORRELATED',
    hash: '6a5b4c3d2e1f0987654321fedcba0987654321abcdef0123456789abcdef0123',
    fileSize: 64200,
    uploadedAt: new Date('2026-09-25T11:30:00Z'),
    processedAt: new Date('2026-09-25T11:31:10Z'),
    extractedText: 'Domain: payment-demo.test. IP: 198.51.100.44 (Synthetic ASN). Form action: https://payment-demo.test/api/collect-credentials. Form fields: account_no, debit_pin, otp_field. Hosted server location: Mock Hosting Ltd, Region: AP-South.',
    metadata: {
      resolvedIP: '198.51.100.44',
      sslIssuer: 'Mock Let-Encrypt Staging CA',
      registrar: 'Mock Registrar Test Services'
    },
    structuredData: {
      domain: 'payment-demo.test',
      ip: '198.51.100.44',
      actionUrl: 'https://payment-demo.test/api/collect-credentials'
    }
  },
  {
    evidenceId: 'EVD-006',
    caseId: 'CASE-2026-001',
    filename: 'telecom_cdr_call_log.csv',
    type: 'text/csv',
    category: 'Call Log',
    status: 'CORRELATED',
    hash: 'f4b1d62c9a8e7f5b3d2c1a0e9f8b7a6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a',
    fileSize: 34100,
    uploadedAt: new Date('2026-09-25T11:35:00Z'),
    processedAt: new Date('2026-09-25T11:36:20Z'),
    extractedText: 'CallRecord ID: CDR-99120. Calling Number: +91 9876543210. Called Number: Subject A Mobile. Call Start: 2026-09-25 10:50:14. Duration: 342 seconds. Cell Tower: Sector 4, Bhubaneswar (BTS-BHU-09). IMEI: 358912098765432.',
    metadata: {
      telecomOperator: 'Synthetic Telecom India Corp',
      cdrQueryId: 'QRY-TEL-2026-098',
      cellTowerId: 'BTS-BHU-09'
    },
    structuredData: {
      caller: '+919876543210',
      durationSeconds: 342,
      location: 'Bhubaneswar',
      tower: 'BTS-BHU-09'
    }
  },
  {
    evidenceId: 'EVD-007',
    caseId: 'CASE-2026-001',
    filename: 'gateway_callback_webhook.json',
    type: 'application/json',
    category: 'Transaction',
    status: 'CORRELATED',
    hash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    fileSize: 12400,
    uploadedAt: new Date('2026-09-25T11:40:00Z'),
    processedAt: new Date('2026-09-25T11:41:00Z'),
    extractedText: 'Webhook Event: payment.captured. Merchant: Demo Payments Ltd. Payment ID: PAY-MOCK-771829. Order ID: ORD-99812. Amount: 1500000 (paise = INR 15,000). Status: authorized. Method: upi. Payer UPI: subject.demo@upi. Timestamp: 1758796812 (2026-09-25 10:40:12 UTC).',
    metadata: {
      gatewayEngine: 'Demo Payments Ltd API v2',
      signatureVerified: true,
      callbackLatencyMs: 142
    },
    structuredData: {
      paymentId: 'PAY-MOCK-771829',
      orderId: 'ORD-99812',
      amountInr: 15000,
      upiId: 'subject.demo@upi'
    }
  },
  {
    evidenceId: 'EVD-008',
    caseId: 'CASE-2026-001',
    filename: 'email_dispute_acknowledgment.eml',
    type: 'message/rfc822',
    category: 'Email',
    status: 'CORRELATED',
    hash: '2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d',
    fileSize: 45200,
    uploadedAt: new Date('2026-09-25T12:00:00Z'),
    processedAt: new Date('2026-09-25T12:01:25Z'),
    extractedText: 'From: support@demo-payments.test\nTo: subject.demo@example.test\nSubject: Dispute Registered: Ref #DISP-2026-4412\nDate: 25 Sep 2026 11:20:45 IST\nDear Customer, your report regarding unauthorized debit of INR 15,000 to merchant Demo Payments Ltd (UPI ID: subject.demo@upi) is registered under ticket DISP-2026-4412.',
    metadata: {
      messageId: '<20260925112045.mock@mail.demo-payments.test>',
      dkimPass: true,
      spfPass: true
    },
    structuredData: {
      disputeRef: 'DISP-2026-4412',
      supportEmail: 'support@demo-payments.test',
      recipientEmail: 'subject.demo@example.test'
    }
  },
  {
    evidenceId: 'EVD-009',
    caseId: 'CASE-2026-001',
    filename: 'suspect_device_user_agent.log',
    type: 'text/plain',
    category: 'Document',
    status: 'CORRELATED',
    hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    fileSize: 15300,
    uploadedAt: new Date('2026-09-25T12:10:00Z'),
    processedAt: new Date('2026-09-25T12:11:15Z'),
    extractedText: '2026-09-25 10:34:11 [HTTP 200] GET /auth from 198.51.100.99 User-Agent: Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 Chrome/118.0.0.0 Mobile Safari/537.36 Accept-Language: en-US,en;q=0.9 Screen: 1080x2400',
    metadata: {
      logFormat: 'Combined Nginx Format',
      serverHost: 'web-srv-01.mock',
      clientIP: '198.51.100.99'
    },
    structuredData: {
      clientIp: '198.51.100.99',
      deviceType: 'SM-G991B Mobile Device'
    }
  },
  {
    evidenceId: 'EVD-010',
    caseId: 'CASE-2026-001',
    filename: 'beneficiary_kyc_document.pdf',
    type: 'application/pdf',
    category: 'Document',
    status: 'CORRELATED',
    hash: '4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e',
    fileSize: 112000,
    uploadedAt: new Date('2026-09-25T12:20:00Z'),
    processedAt: new Date('2026-09-25T12:22:10Z'),
    extractedText: 'Account Name: Subject Alpha Enterprise (Sole Prop). Registered Phone: +91 9876543210. Registered Address: Unit 402, Technology Park, Infocity, Bhubaneswar, Odisha 751024. PAN: ABCDE1234F (Mock). Virtual Payment Address: subject.demo@upi. Account: ACC-88392104-MOCK.',
    metadata: {
      issuingBank: 'Mock Cooperative Bank',
      verificationDate: '2025-11-10',
      documentId: 'DOC-KYC-9921'
    },
    structuredData: {
      registeredEntity: 'Subject Alpha Enterprise',
      address: 'Bhubaneswar, Odisha',
      bankAccount: 'ACC-88392104-MOCK',
      phone: '+919876543210'
    }
  },
  {
    evidenceId: 'EVD-011',
    caseId: 'CASE-2026-001',
    filename: 'sms_gateway_delivery_report.csv',
    type: 'text/csv',
    category: 'Bank Record',
    status: 'CORRELATED',
    hash: '7e6d5c4b3a210fedcba9876543210abcdef0123456789abcdef0123456789abc',
    fileSize: 22100,
    uploadedAt: new Date('2026-09-25T12:30:00Z'),
    processedAt: new Date('2026-09-25T12:31:00Z'),
    extractedText: 'SMS_ID: SMS-20260925-01, Sender: VK-MOCKBK, Recipient: +91 9876543210, Status: DELIVRD, Timestamp: 2026-09-25 10:15:32 IST, Text: Your KYC has expired...',
    metadata: {
      smppHost: 'smpp.mock-telecom.test',
      deliveryCode: '000_SUCCESS'
    },
    structuredData: {
      smsId: 'SMS-20260925-01',
      recipient: '+91 9876543210'
    }
  },
  {
    evidenceId: 'EVD-012',
    caseId: 'CASE-2026-001',
    filename: 'dns_query_telemetry.log',
    type: 'text/plain',
    category: 'URL',
    status: 'CORRELATED',
    hash: 'f0e1d2c3b4a5968778695a4b3c2d1e0ff0e1d2c3b4a5968778695a4b3c2d1e0f',
    fileSize: 18400,
    uploadedAt: new Date('2026-09-25T12:40:00Z'),
    processedAt: new Date('2026-09-25T12:41:20Z'),
    extractedText: '10:33:45.109 DNS Q: payment-demo.test A-record -> 198.51.100.44 (TTL: 300). Queried by recursive resolver 198.51.100.2. Note: Queried subdomains include auth.payment-demo.test and verify-kyc.payment-demo.test.',
    metadata: {
      dnsServer: 'bind-internal.mock',
      ttl: 300
    },
    structuredData: {
      queriedDomain: 'payment-demo.test',
      resolvedIp: '198.51.100.44'
    }
  },
  {
    evidenceId: 'EVD-013',
    caseId: 'CASE-2026-001',
    filename: 'screenshot_missing_metadata.png',
    type: 'image/png',
    category: 'Screenshot',
    status: 'REVIEW REQUIRED',
    hash: '11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff',
    fileSize: 298400,
    uploadedAt: new Date('2026-09-25T12:45:00Z'),
    processedAt: new Date('2026-09-25T12:46:00Z'),
    extractedText: 'Notification preview: "Your payment of Rs 15,000 was debited successfully". Sender: Demo Payments Ltd. No timestamp or header visible.',
    metadata: {
      warning: 'EXIF metadata stripped, timestamp missing',
      fileFormat: 'PNG 8-bit'
    },
    structuredData: {
      claimedAmount: 15000,
      timestamp: null
    }
  },
  {
    evidenceId: 'EVD-014',
    caseId: 'CASE-2026-001',
    filename: 'ivr_call_recording_transcript.txt',
    type: 'text/plain',
    category: 'Call Log',
    status: 'CORRELATED',
    hash: '3344556677889900aabbccddeeff11223344556677889900aabbccddeeff1122',
    fileSize: 14200,
    uploadedAt: new Date('2026-09-25T12:50:00Z'),
    processedAt: new Date('2026-09-25T12:51:10Z'),
    extractedText: 'Transcript of automated IVR outbound dialer: "Press 1 to connect to KYC officer". Call connected to Agent ID AGT-441 at 10:48 AM IST. Agent spoke for 3 minutes regarding transaction verification and OTP.',
    metadata: {
      audioLength: '180s',
      transcriptionConfidence: 0.94
    },
    structuredData: {
      ivrConnectedTime: '10:48 AM',
      agentId: 'AGT-441'
    }
  },
  {
    evidenceId: 'EVD-015',
    caseId: 'CASE-2026-001',
    filename: 'bank_alert_sms_notification.txt',
    type: 'text/plain',
    category: 'Chat',
    status: 'CORRELATED',
    hash: '556677889900aabbccddeeff11223344556677889900aabbccddeeff11223344',
    fileSize: 8400,
    uploadedAt: new Date('2026-09-25T13:00:00Z'),
    processedAt: new Date('2026-09-25T13:01:00Z'),
    extractedText: 'Your A/C ACC-88392104-MOCK is debited for Rs 15,000.00 on 25-SEP-26 10:40:12 via UPI Ref 6288192019 to Demo Payments Ltd. Avl Bal: INR 42,150.00.',
    metadata: {
      senderId: 'MOCKBK-ALRT',
      networkStatus: 'Delivered'
    },
    structuredData: {
      account: 'ACC-88392104-MOCK',
      amount: 15000,
      timestamp: '2026-09-25 10:40:12'
    }
  },
  {
    evidenceId: 'EVD-016',
    caseId: 'CASE-2026-001',
    filename: 'merchant_settlement_ledger.csv',
    type: 'text/csv',
    category: 'Bank Record',
    status: 'CORRELATED',
    hash: '77889900aabbccddeeff11223344556677889900aabbccddeeff112233445566',
    fileSize: 42000,
    uploadedAt: new Date('2026-09-25T13:10:00Z'),
    processedAt: new Date('2026-09-25T13:12:00Z'),
    extractedText: 'SettlementBatch: SETTL-2026-09-25. Payout to: ACC-88392104-MOCK. Merchant Entity: Demo Payments Ltd. Gross: INR 15,000. MDR Fee: INR 300. Net Payout: INR 14,700.',
    metadata: {
      batchId: 'SETTL-2026-09-25',
      clearingHouse: 'Mock Clearing System'
    },
    structuredData: {
      payoutAccount: 'ACC-88392104-MOCK',
      netAmount: 14700
    }
  },
  {
    evidenceId: 'EVD-017',
    caseId: 'CASE-2026-001',
    filename: 'dispute_ticket_internal_notes.pdf',
    type: 'application/pdf',
    category: 'Document',
    status: 'CORRELATED',
    hash: '9900aabbccddeeff11223344556677889900aabbccddeeff1122334455667788',
    fileSize: 89000,
    uploadedAt: new Date('2026-09-25T13:20:00Z'),
    processedAt: new Date('2026-09-25T13:21:40Z'),
    extractedText: 'Internal investigation note by Analyst #4: Complainant states initial prompt advertised Rs 4,999 KYC charge, but gateway deducted Rs 15,000. Phone number +91 9876543210 is flagged across 3 other synthetic reports.',
    metadata: {
      analystId: 'ANL-004',
      internalFlag: 'RECURRENT_IDENTIFIER'
    },
    structuredData: {
      flaggedPhone: '+919876543210',
      caseNote: 'Amount discrepancy noted between SMS prompt and gateway ledger.'
    }
  },
  {
    evidenceId: 'EVD-018',
    caseId: 'CASE-2026-001',
    filename: 'ssl_certificate_transparency_log.json',
    type: 'application/json',
    category: 'URL',
    status: 'CORRELATED',
    hash: 'bbccddeeff11223344556677889900aabbccddeeff11223344556677889900aa',
    fileSize: 28400,
    uploadedAt: new Date('2026-09-25T13:30:00Z'),
    processedAt: new Date('2026-09-25T13:31:00Z'),
    extractedText: 'Domain: payment-demo.test. Subject Alternative Names: payment-demo.test, verify.payment-demo.test. Issued: 2026-09-24 18:00:00 UTC. Validity: 90 days. Certificate Serial: 0x48FA901B.',
    metadata: {
      ctLogServer: 'Oak Staging CT Log',
      certSerial: '0x48FA901B'
    },
    structuredData: {
      domain: 'payment-demo.test',
      issueDate: '2026-09-24'
    }
  },
  {
    evidenceId: 'EVD-019',
    caseId: 'CASE-2026-001',
    filename: 'victim_statement_audio_transcript.txt',
    type: 'text/plain',
    category: 'Document',
    status: 'CORRELATED',
    hash: 'ddeeff11223344556677889900aabbccddeeff11223344556677889900aabbcc',
    fileSize: 19800,
    uploadedAt: new Date('2026-09-25T13:40:00Z'),
    processedAt: 
      new Date('2026-09-25T13:41:30Z'),
    extractedText: 'Complainant Interview: "I received a phone call at 10:50 AM from someone claiming to be technical support. They told me that the ₹15,000 was placed on an escrow hold and would bounce back immediately upon verifying my UPI PIN."',
    metadata: {
      recordingDuration: '240s',
      interviewer: 'Investigator T. Kumar'
    },
    structuredData: {
      callTimestamp: '10:50 AM',
      reportedEscrowClaim: true
    }
  },
  {
    evidenceId: 'EVD-020',
    caseId: 'CASE-2026-001',
    filename: 'reverse_whois_domain_records.txt',
    type: 'text/plain',
    category: 'URL',
    status: 'CORRELATED',
    hash: 'ff11223344556677889900aabbccddeeff11223344556677889900aabbccddee',
    fileSize: 11800,
    uploadedAt: new Date('2026-09-25T13:50:00Z'),
    processedAt: new Date('2026-09-25T13:51:15Z'),
    extractedText: 'Registrant Name: Privacy Guardian Mock Corp. Registrant Email: contact@domain-privacy-mock.test. Admin City: Bhubaneswar, Odisha. Associated Nameservers: ns1.payment-demo.test, ns2.payment-demo.test.',
    metadata: {
      whoisServer: 'whois.mock-tld.test',
      privacyShield: true
    },
    structuredData: {
      registrantCity: 'Bhubaneswar',
      privacyEmail: 'contact@domain-privacy-mock.test'
    }
  },
  {
    evidenceId: 'EVD-021',
    caseId: 'CASE-2026-001',
    filename: 'upi_npci_switch_log.csv',
    type: 'text/csv',
    category: 'Transaction',
    status: 'CORRELATED',
    hash: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    fileSize: 55400,
    uploadedAt: new Date('2026-09-25T14:00:00Z'),
    processedAt: new Date('2026-09-25T14:02:10Z'),
    extractedText: 'RRN: 6288192019, TXN_TYPE: PAY, REMITTER_VPA: remitter@mockupi, BENEFICIARY_VPA: subject.demo@upi, AMOUNT: 15000.00, STATUS: SUCCESS, RESPONSE_CODE: 00, TIME: 2026-09-25 10:40:12.331.',
    metadata: {
      switchNode: 'NPCI-SWITCH-MOCK-02',
      responseCode: '00'
    },
    structuredData: {
      rrn: '6288192019',
      amount: 15000,
      beneficiaryVpa: 'subject.demo@upi'
    }
  },
  {
    evidenceId: 'EVD-022',
    caseId: 'CASE-2026-001',
    filename: 'whatsapp_profile_metadata_snapshot.png',
    type: 'image/png',
    category: 'Screenshot',
    status: 'CORRELATED',
    hash: '2345678901bcdef1234567890abcdef1234567890abcdef1234567890abcdef1',
    fileSize: 320100,
    uploadedAt: new Date('2026-09-25T14:10:00Z'),
    processedAt: new Date('2026-09-25T14:11:45Z'),
    extractedText: 'Profile Name: Demo Payments Helpdesk. Business Account. Phone: +91 9876543210. About: "Official KYC Support Portal. Open 24x7". Website: https://payment-demo.test.',
    metadata: {
      businessAccountBadge: 'Impersonated',
      resolution: '720x1600'
    },
    structuredData: {
      profileName: 'Demo Payments Helpdesk',
      phone: '+919876543210',
      website: 'https://payment-demo.test'
    }
  },
  {
    evidenceId: 'EVD-023',
    caseId: 'CASE-2026-001',
    filename: 'router_dhcp_lease_table.txt',
    type: 'text/plain',
    category: 'Document',
    status: 'CORRELATED',
    hash: '3456789012cdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    fileSize: 9800,
    uploadedAt: new Date('2026-09-25T14:20:00Z'),
    processedAt: new Date('2026-09-25T14:21:00Z'),
    extractedText: 'MAC: D4:61:9D:28:44:A1, IP: 192.168.1.104, Hostname: synthetic-pixel-7, Lease Start: 2026-09-25 08:12:00, Lease Expire: 2026-09-25 20:12:00. Gateway: 192.168.1.1.',
    metadata: {
      gatewayModel: 'MockFiber Wi-Fi Router'
    },
    structuredData: {
      macAddress: 'D4:61:9D:28:44:A1',
      localIp: '192.168.1.104'
    }
  },
  {
    evidenceId: 'EVD-024',
    caseId: 'CASE-2026-001',
    filename: 'sms_second_followup_reminder.txt',
    type: 'text/plain',
    category: 'Chat',
    status: 'CORRELATED',
    hash: '4567890123def1234567890abcdef1234567890abcdef1234567890abcdef123',
    fileSize: 7600,
    uploadedAt: new Date('2026-09-25T14:30:00Z'),
    processedAt: new Date('2026-09-25T14:31:00Z'),
    extractedText: 'URGENT: Refund code REF-88123 requires secondary validation. Contact +91 9876543210 or visit https://payment-demo.test/refund within 10 minutes to avoid total forfeiture.',
    metadata: {
      senderHeader: 'VK-MOCKBK',
      deliveryTime: '2026-09-25 10:55:00 IST'
    },
    structuredData: {
      refundCode: 'REF-88123',
      phone: '+919876543210'
    }
  },
  {
    evidenceId: 'EVD-025',
    caseId: 'CASE-2026-001',
    filename: 'bank_discrepancy_notice_internal.pdf',
    type: 'application/pdf',
    category: 'Document',
    status: 'CORRELATED',
    hash: '5678901234ef1234567890abcdef1234567890abcdef1234567890abcdef1234',
    fileSize: 62000,
    uploadedAt: new Date('2026-09-25T14:40:00Z'),
    processedAt: new Date('2026-09-25T14:42:00Z'),
    extractedText: 'Audit memorandum: Notice of timestamp inconsistency. Complainant screenshot shows 10:45 AM device display time, whereas Core Banking System logs confirm settlement at 10:40:12 AM. Suspected Android clock drift or delayed screenshot capture.',
    metadata: {
      department: 'Fraud Risk & Audit Operations',
      memoId: 'MEMO-2026-09-021'
    },
    structuredData: {
      screenshotTime: '10:45 AM',
      coreBankingTime: '10:40:12 AM',
      differential: '+5 minutes'
    }
  },
  {
    evidenceId: 'EVD-026',
    caseId: 'CASE-2026-001',
    filename: 'virtual_sim_account_profile.json',
    type: 'application/json',
    category: 'Other',
    status: 'CORRELATED',
    hash: '6789012345f1234567890abcdef1234567890abcdef1234567890abcdef12345',
    fileSize: 14900,
    uploadedAt: new Date('2026-09-25T14:50:00Z'),
    processedAt: new Date('2026-09-25T14:51:10Z'),
    extractedText: 'SIM Number: 89910029102930192. MSISDN: +91 9876543210. Subscription Type: Prepaid Roaming. Registration State: Odisha. Tower LAC: 4421, CellId: 10928. Subscriber Alias: Subject A / Demo Affiliate.',
    metadata: {
      operator: 'Mock CellNet India',
      lac: 4421
    },
    structuredData: {
      phone: '+919876543210',
      region: 'Odisha'
    }
  },
  {
    evidenceId: 'EVD-027',
    caseId: 'CASE-2026-001',
    filename: 'merchant_payout_bank_record.csv',
    type: 'text/csv',
    category: 'Bank Record',
    status: 'CORRELATED',
    hash: '78901234561234567890abcdef1234567890abcdef1234567890abcdef123456',
    fileSize: 31200,
    uploadedAt: new Date('2026-09-25T15:00:00Z'),
    processedAt: new Date('2026-09-25T15:01:20Z'),
    extractedText: 'Row 14: 2026-09-25 11:15:00, NEFT/OUT/88291029/Demo Payments Ltd/ACC-88392104-MOCK, INR 14,700.00, Payout processed to Bhubaneswar Branch.',
    metadata: {
      bankBranch: 'Bhubaneswar Infocity',
      ifsc: 'MCBK0009182'
    },
    structuredData: {
      payoutAmount: 14700,
      timestamp: '2026-09-25 11:15:00'
    }
  },
  {
    evidenceId: 'EVD-028',
    caseId: 'CASE-2026-001',
    filename: 'proxy_vpn_hop_analysis.txt',
    type: 'text/plain',
    category: 'URL',
    status: 'CORRELATED',
    hash: '8901234567234567890abcdef1234567890abcdef1234567890abcdef1234567',
    fileSize: 17300,
    uploadedAt: new Date('2026-09-25T15:10:00Z'),
    processedAt: new Date('2026-09-25T15:11:30Z'),
    extractedText: 'Traffic analysis for destination payment-demo.test: Ingress through ASN-64500 (Mock Hosting Ltd). Multiple proxy exits observed originating from IP 198.51.100.99 with user agent matching SM-G991B device.',
    metadata: {
      tool: 'Synthetic NetTrace v3',
      asn: 'ASN-64500'
    },
    structuredData: {
      destination: 'payment-demo.test',
      exitIp: '198.51.100.99'
    }
  },
  {
    evidenceId: 'EVD-029',
    caseId: 'CASE-2026-001',
    filename: 'unmatched_deposit_receipt.png',
    type: 'image/png',
    category: 'Screenshot',
    status: 'REVIEW REQUIRED',
    hash: '901234567834567890abcdef1234567890abcdef1234567890abcdef12345678',
    fileSize: 310500,
    uploadedAt: new Date('2026-09-25T15:20:00Z'),
    processedAt: new Date('2026-09-25T15:21:40Z'),
    extractedText: 'Slip shows receipt for Rs 4,999 cash deposit at counter #2. Depositor name smeared, date stamped 25-SEP-2026. No transaction reference or account number matched in core banking.',
    metadata: {
      alert: 'Unmatched deposit slip found in submitted evidence folder'
    },
    structuredData: {
      amount: 4999,
      status: 'UNMATCHED'
    }
  },
  {
    evidenceId: 'EVD-030',
    caseId: 'CASE-2026-001',
    filename: 'mobile_banking_session_telemetry.json',
    type: 'application/json',
    category: 'Document',
    status: 'CORRELATED',
    hash: '01234567894567890abcdef1234567890abcdef1234567890abcdef123456789',
    fileSize: 48900,
    uploadedAt: new Date('2026-09-25T15:30:00Z'),
    processedAt: new Date('2026-09-25T15:31:40Z'),
    extractedText: 'Session ID: SES-991024. Auth Method: Biometric Fingerprint + MPIN. Time: 10:39:45 IST. IP: 198.51.100.99. Payment Intent Created: INR 15,000 to subject.demo@upi. Auth Success: 10:40:11 IST.',
    metadata: {
      appVersion: 'v4.18.2-release',
      os: 'Android 14'
    },
    structuredData: {
      sessionId: 'SES-991024',
      amount: 15000,
      authSuccessTime: '10:40:11'
    }
  },
  {
    evidenceId: 'EVD-031',
    caseId: 'CASE-2026-001',
    filename: 'otp_dispatch_syslog.txt',
    type: 'text/plain',
    category: 'Document',
    status: 'CORRELATED',
    hash: '1234567890567890abcdef1234567890abcdef1234567890abcdef1234567890',
    fileSize: 13400,
    uploadedAt: new Date('2026-09-25T15:40:00Z'),
    processedAt: new Date('2026-09-25T15:41:00Z'),
    extractedText: '10:38:50 INFO OTP-SRV: Generated 6-digit challenge for account ACC-88392104-MOCK. SMS dispatch status: DELIVERED in 820ms to registered phone +91 9876543210. Verification completed at 10:39:58.',
    metadata: {
      server: 'auth-gateway-cluster-01',
      latency: '820ms'
    },
    structuredData: {
      account: 'ACC-88392104-MOCK',
      phone: '+919876543210'
    }
  },
  {
    evidenceId: 'EVD-032',
    caseId: 'CASE-2026-001',
    filename: 'call_center_crm_lead_record.csv',
    type: 'text/csv',
    category: 'Call Log',
    status: 'CORRELATED',
    hash: '234567890167890abcdef1234567890abcdef1234567890abcdef12345678901',
    fileSize: 25600,
    uploadedAt: new Date('2026-09-25T15:50:00Z'),
    processedAt: new Date('2026-09-25T15:51:20Z'),
    extractedText: 'LeadID: 8812, LeadName: Subject A, ContactNumber: +91 9876543210, Status: CONTACTED, Campaign: "Urgent_KYC_Retention", AssignedAgent: Agent Verma, Location: Bhubaneswar.',
    metadata: {
      crmSystem: 'Synthetic LeadDesk',
      campaign: 'Urgent_KYC_Retention'
    },
    structuredData: {
      phone: '+919876543210',
      assignedAgent: 'Agent Verma'
    }
  },
  {
    evidenceId: 'EVD-033',
    caseId: 'CASE-2026-001',
    filename: 'phishing_kit_source_tarball_manifest.txt',
    type: 'text/plain',
    category: 'URL',
    status: 'CORRELATED',
    hash: '34567890127890abcdef1234567890abcdef1234567890abcdef123456789012',
    fileSize: 18100,
    uploadedAt: new Date('2026-09-25T16:00:00Z'),
    processedAt: new Date('2026-09-25T16:01:10Z'),
    extractedText: 'Tarball: kyc-portal-v1.tar.gz. Contains: index.html, api_forwarder.php, telegram_bot_bridge.php. Configured recipient bot ID: BOT-99812, destination email: subject.demo@example.test.',
    metadata: {
      sourceClassification: 'Simulated Decompiled Phishing Asset'
    },
    structuredData: {
      email: 'subject.demo@example.test',
      botId: 'BOT-99812'
    }
  },
  {
    evidenceId: 'EVD-034',
    caseId: 'CASE-2026-001',
    filename: 'corporate_registry_filing.pdf',
    type: 'application/pdf',
    category: 'Document',
    status: 'CORRELATED',
    hash: '4567890123890abcdef1234567890abcdef1234567890abcdef1234567890123',
    fileSize: 145000,
    uploadedAt: new Date('2026-09-25T16:10:00Z'),
    processedAt: new Date('2026-09-25T16:12:00Z'),
    extractedText: 'Company: Demo Payments Ltd. Registration CIN: U72900OR2024PTC099120. Registered Office: Sector 5, Infocity, Bhubaneswar, Odisha. Authorized Director: Subject A (Disputed association). Status: Active.',
    metadata: {
      registry: 'Mock Corporate Affairs Portal',
      cin: 'U72900OR2024PTC099120'
    },
    structuredData: {
      company: 'Demo Payments Ltd',
      location: 'Bhubaneswar'
    }
  },
  {
    evidenceId: 'EVD-035',
    caseId: 'CASE-2026-001',
    filename: 'ip_geolocation_maxmind_mock.json',
    type: 'application/json',
    category: 'Other',
    status: 'CORRELATED',
    hash: '567890123490abcdef1234567890abcdef1234567890abcdef12345678901234',
    fileSize: 8400,
    uploadedAt: new Date('2026-09-25T16:20:00Z'),
    processedAt: new Date('2026-09-25T16:21:00Z'),
    extractedText: 'IP: 198.51.100.99. Geolocation: City: Bhubaneswar, Region: Odisha, Country: India, Latitude: 20.2961, Longitude: 85.8245, ISP: Mock Broadband Odisha.',
    metadata: {
      geoAccuracyRadiusKm: 5,
      city: 'Bhubaneswar'
    },
    structuredData: {
      ip: '198.51.100.99',
      city: 'Bhubaneswar',
      latitude: 20.2961,
      longitude: 85.8245
    }
  },
  {
    evidenceId: 'EVD-036',
    caseId: 'CASE-2026-001',
    filename: 'payment_app_crash_dump.log',
    type: 'text/plain',
    category: 'Other',
    status: 'REVIEW REQUIRED',
    hash: '67890123450abcdef1234567890abcdef1234567890abcdef123456789012345',
    fileSize: 38200,
    uploadedAt: new Date('2026-09-25T16:30:00Z'),
    processedAt: new Date('2026-09-25T16:31:00Z'),
    extractedText: 'Crash in thread #12 at 10:46:12 IST. Exception: NetworkTimeoutException while confirming payment token for TXN-99482109. Device: SM-G991B. Missing confirmation callback.',
    metadata: {
      alert: 'Missing final confirmation receipt due to process crash'
    },
    structuredData: {
      txnId: 'TXN-99482109',
      exception: 'NetworkTimeoutException'
    }
  },
  {
    evidenceId: 'EVD-037',
    caseId: 'CASE-2026-001',
    filename: 'customer_support_audio_recording.mp3',
    type: 'audio/mpeg',
    category: 'Call Log',
    status: 'CORRELATED',
    hash: '7890123456abcdef1234567890abcdef1234567890abcdef1234567890123456',
    fileSize: 840000,
    uploadedAt: new Date('2026-09-25T16:40:00Z'),
    processedAt: new Date('2026-09-25T16:42:00Z'),
    extractedText: 'Audio summary: Customer contacted formal support at 11:25 AM to report debit of ₹15,000. Customer agent confirmed transaction TXN-99482109 had successfully transferred to Demo Payments Ltd.',
    metadata: {
      agent: 'AGT-882 (Official Bank Support)',
      duration: '420s'
    },
    structuredData: {
      callTime: '11:25 AM',
      confirmedAmount: 15000
    }
  },
  {
    evidenceId: 'EVD-038',
    caseId: 'CASE-2026-001',
    filename: 'duplicate_bank_transaction_export.csv',
    type: 'text/csv',
    category: 'Bank Record',
    status: 'REVIEW REQUIRED',
    hash: '8901234567bcdef1234567890abcdef1234567890abcdef12345678901234567',
    fileSize: 12000,
    uploadedAt: new Date('2026-09-25T16:50:00Z'),
    processedAt: new Date('2026-09-25T16:51:10Z'),
    extractedText: 'Duplicate Row: 2026-09-25 10:40:12, UPI/DR/6288192019/subject.demo@upi, INR 15,000.00. Identical hash to Row 27 in primary bank statement.',
    metadata: {
      alert: 'Duplicate export batch uploaded with overlapping records'
    },
    structuredData: {
      reference: '6288192019',
      isDuplicate: true
    }
  },
  {
    evidenceId: 'EVD-039',
    caseId: 'CASE-2026-001',
    filename: 'sim_swap_telecom_audit_trail.pdf',
    type: 'application/pdf',
    category: 'Call Log',
    status: 'CORRELATED',
    hash: '9012345678cdef1234567890abcdef1234567890abcdef123456789012345678',
    fileSize: 78000,
    uploadedAt: new Date('2026-09-25T17:00:00Z'),
    processedAt: new Date('2026-09-25T17:01:50Z'),
    extractedText: 'Audit query for MSISDN +91 9876543210: No physical SIM swap recorded within 90 days. e-SIM activation request logged on 2026-09-24 22:15 IST from IP 198.51.100.99.',
    metadata: {
      telecomAuditor: 'Synthetic TRAI Compliance Unit'
    },
    structuredData: {
      phone: '+919876543210',
      esimRequestDate: '2026-09-24'
    }
  },
  {
    evidenceId: 'EVD-040',
    caseId: 'CASE-2026-001',
    filename: 'victim_written_complaint.pdf',
    type: 'application/pdf',
    category: 'Document',
    status: 'CORRELATED',
    hash: '0123456789def1234567890abcdef1234567890abcdef1234567890123456789',
    fileSize: 135000,
    uploadedAt: new Date('2026-09-25T17:10:00Z'),
    processedAt: new Date('2026-09-25T17:12:00Z'),
    extractedText: 'Written Complaint: "I, Subject A, state that I was misled into transferring ₹15,000 via UPI on 25 September 2026 after receiving phishing texts from +91 9876543210 claiming to be Demo Payments Ltd."',
    metadata: {
      complainantName: 'Subject A',
      submissionPortal: 'Synthetic Cyber Grievance Cell'
    },
    structuredData: {
      complainant: 'Subject A',
      allegedAmount: 15000
    }
  },
  {
    evidenceId: 'EVD-041',
    caseId: 'CASE-2026-001',
    filename: 'incident_summary_field_notes.txt',
    type: 'text/plain',
    category: 'Other',
    status: 'CORRELATED',
    hash: '1234567890ef1234567890abcdef1234567890abcdef12345678901234567890',
    fileSize: 16400,
    uploadedAt: new Date('2026-09-25T17:20:00Z'),
    processedAt: new Date('2026-09-25T17:21:00Z'),
    extractedText: 'Field notes: Physical address at Infocity Bhubaneswar inspected. Building hosts shared co-working suites. Entity "Demo Payments Ltd" operates virtual mailbox only.',
    metadata: {
      investigatorId: 'INV-402',
      inspectionDate: '2026-09-25'
    },
    structuredData: {
      entity: 'Demo Payments Ltd',
      location: 'Bhubaneswar'
    }
  },
  {
    evidenceId: 'EVD-042',
    caseId: 'CASE-2026-001',
    filename: 'forensic_checksum_manifest.sha256',
    type: 'text/plain',
    category: 'Document',
    status: 'CORRELATED',
    hash: '2345678901f1234567890abcdef1234567890abcdef123456789012345678901',
    fileSize: 4500,
    uploadedAt: new Date('2026-09-25T17:30:00Z'),
    processedAt: new Date('2026-09-25T17:30:45Z'),
    extractedText: 'Digital evidence bag verification digest. 42 artifacts sealed and integrity verified under RFC-3161 digital timestamping authority.',
    metadata: {
      integrityState: 'VERIFIED_SEALED',
      totalItems: 42
    },
    structuredData: {
      evidenceCount: 42,
      integrity: 'PASSED'
    }
  }
];

// 27 Synthetic Extracted Entities
export const SEED_ENTITIES = [
  {
    entityId: 'ENT-001',
    caseId: 'CASE-2026-001',
    type: 'PERSON',
    value: 'Subject A',
    normalizedValue: 'SUBJECT_A',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-002', 'EVD-006', 'EVD-010', 'EVD-019', 'EVD-034', 'EVD-040'],
    occurrences: [
      { evidenceId: 'EVD-002', location: 'Message Header', snippet: 'Subject A: Yes, I am worried my account will be locked.', timestamp: '10:24 AM' },
      { evidenceId: 'EVD-040', location: 'Complainant Signature', snippet: 'I, Subject A, state that I was misled...', timestamp: '17:10 PM' }
    ],
    properties: { role: 'Reported Complainant / Subject', kycStatus: 'Active' }
  },
  {
    entityId: 'ENT-002',
    caseId: 'CASE-2026-001',
    type: 'PHONE',
    value: '+91 9876543210',
    normalizedValue: '+919876543210',
    confidence: 0.99,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-006', 'EVD-010', 'EVD-011', 'EVD-017', 'EVD-022', 'EVD-024', 'EVD-031', 'EVD-032', 'EVD-039'],
    occurrences: [
      { evidenceId: 'EVD-001', location: 'SMS Body', snippet: 'contact helpline +91 9876543210', timestamp: '10:18 AM' },
      { evidenceId: 'EVD-002', location: 'Sender ID', snippet: '[10:22 AM] +91 9876543210', timestamp: '10:22 AM' }
    ],
    properties: { telecomCircle: 'Odisha', network: 'Prepaid Roaming' }
  },
  {
    entityId: 'ENT-003',
    caseId: 'CASE-2026-001',
    type: 'EMAIL',
    value: 'subject.demo@example.test',
    normalizedValue: 'subject.demo@example.test',
    confidence: 0.97,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-008', 'EVD-033'],
    occurrences: [
      { evidenceId: 'EVD-008', location: 'Email Header To', snippet: 'To: subject.demo@example.test', timestamp: '11:20 AM' }
    ],
    properties: { domain: 'example.test', mxVerified: true }
  },
  {
    entityId: 'ENT-004',
    caseId: 'CASE-2026-001',
    type: 'URL',
    value: 'https://payment-demo.test',
    normalizedValue: 'https://payment-demo.test',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-005', 'EVD-012', 'EVD-018', 'EVD-020', 'EVD-022', 'EVD-024', 'EVD-028'],
    occurrences: [
      { evidenceId: 'EVD-001', location: 'SMS Link', snippet: 'https://payment-demo.test/kyc-portal', timestamp: '10:18 AM' },
      { evidenceId: 'EVD-005', location: 'DOM Dump', snippet: 'Form action: https://payment-demo.test/api/collect-credentials', timestamp: '11:30 AM' }
    ],
    properties: { ip: '198.51.100.44', sslActive: true, category: 'Phishing Target' }
  },
  {
    entityId: 'ENT-005',
    caseId: 'CASE-2026-001',
    type: 'TRANSACTION',
    value: 'TXN-99482109',
    normalizedValue: 'TXN-99482109',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-004', 'EVD-007', 'EVD-015', 'EVD-021', 'EVD-036', 'EVD-037'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Bank Statement Row 27', snippet: 'TXN-99482109, INR 15,000.00, DR', timestamp: '10:40:12 AM' },
      { evidenceId: 'EVD-021', location: 'NPCI Switch Log', snippet: 'RRN: 6288192019, AMOUNT: 15000.00', timestamp: '10:40:12 AM' }
    ],
    properties: { channel: 'UPI', status: 'Debited' }
  },
  {
    entityId: 'ENT-006',
    caseId: 'CASE-2026-001',
    type: 'AMOUNT',
    value: '₹15,000',
    normalizedValue: '15000 INR',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-002', 'EVD-003', 'EVD-004', 'EVD-007', 'EVD-008', 'EVD-013', 'EVD-015', 'EVD-016', 'EVD-021', 'EVD-030', 'EVD-037', 'EVD-040'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Row 27', snippet: 'INR 15,000.00, DR', timestamp: '10:40:12 AM' }
    ],
    properties: { currency: 'INR', numeric: 15000 }
  },
  {
    entityId: 'ENT-007',
    caseId: 'CASE-2026-001',
    type: 'UPI_ID',
    value: 'subject.demo@upi',
    normalizedValue: 'subject.demo@upi',
    confidence: 0.99,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-002', 'EVD-003', 'EVD-004', 'EVD-007', 'EVD-008', 'EVD-010', 'EVD-021', 'EVD-030'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Row 27 UPI handle', snippet: 'UPI/DR/6288192019/subject.demo@upi', timestamp: '10:40:12 AM' }
    ],
    properties: { provider: 'Mock UPI Switch', handle: 'upi' }
  },
  {
    entityId: 'ENT-008',
    caseId: 'CASE-2026-001',
    type: 'BANK_ACCOUNT',
    value: 'ACC-88392104-MOCK',
    normalizedValue: 'ACC-88392104-MOCK',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-010', 'EVD-015', 'EVD-016', 'EVD-027', 'EVD-031'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Header Info', snippet: 'Account: ACC-88392104-MOCK', timestamp: '10:40:12 AM' }
    ],
    properties: { bank: 'Mock National Commercial Bank', accountType: 'Savings' }
  },
  {
    entityId: 'ENT-009',
    caseId: 'CASE-2026-001',
    type: 'LOCATION',
    value: 'Bhubaneswar',
    normalizedValue: 'BHUBANESWAR_ODISHA',
    confidence: 0.95,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-006', 'EVD-010', 'EVD-020', 'EVD-027', 'EVD-032', 'EVD-034', 'EVD-035', 'EVD-041'],
    occurrences: [
      { evidenceId: 'EVD-006', location: 'Cell Tower metadata', snippet: 'Sector 4, Bhubaneswar (BTS-BHU-09)', timestamp: '10:50 AM' }
    ],
    properties: { state: 'Odisha', country: 'India', coordinates: [20.2961, 85.8245] }
  },
  {
    entityId: 'ENT-010',
    caseId: 'CASE-2026-001',
    type: 'ORGANIZATION',
    value: 'Demo Payments Ltd.',
    normalizedValue: 'DEMO_PAYMENTS_LTD',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-002', 'EVD-003', 'EVD-004', 'EVD-007', 'EVD-008', 'EVD-013', 'EVD-015', 'EVD-016', 'EVD-027', 'EVD-034', 'EVD-037', 'EVD-041'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Statement Beneficiary', snippet: 'Demo Payments Ltd/TXN-99482109', timestamp: '10:40:12 AM' }
    ],
    properties: { cin: 'U72900OR2024PTC099120', businessType: 'Payment Gateway Merchant' }
  },
  {
    entityId: 'ENT-011',
    caseId: 'CASE-2026-001',
    type: 'AMOUNT',
    value: 'Rs 4,999',
    normalizedValue: '4999 INR',
    confidence: 0.95,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-017', 'EVD-029'],
    occurrences: [
      { evidenceId: 'EVD-001', location: 'SMS Body', snippet: 'paying nominal Rs 4,999 verification deposit', timestamp: '10:18 AM' }
    ],
    properties: { currency: 'INR', note: 'Initial advertised KYC fee (mismatched with final debit)' }
  },
  {
    entityId: 'ENT-012',
    caseId: 'CASE-2026-001',
    type: 'PAYMENT_ID',
    value: 'PAY-MOCK-771829',
    normalizedValue: 'PAY-MOCK-771829',
    confidence: 0.96,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-007'],
    occurrences: [
      { evidenceId: 'EVD-007', location: 'Webhook Payload', snippet: 'Payment ID: PAY-MOCK-771829', timestamp: '10:40:12 AM' }
    ],
    properties: { gateway: 'Demo Payments Ltd API' }
  },
  {
    entityId: 'ENT-013',
    caseId: 'CASE-2026-001',
    type: 'DEVICE',
    value: 'SM-G991B Mobile Device',
    normalizedValue: 'SM-G991B',
    confidence: 0.91,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-009', 'EVD-028', 'EVD-036'],
    occurrences: [
      { evidenceId: 'EVD-009', location: 'User-Agent Log', snippet: 'Android 13; SM-G991B', timestamp: '10:34 AM' }
    ],
    properties: { os: 'Android 13', formFactor: 'Smartphone' }
  },
  {
    entityId: 'ENT-014',
    caseId: 'CASE-2026-001',
    type: 'DEVICE',
    value: 'Synthetic Pixel 7',
    normalizedValue: 'SYNTHETIC_PIXEL_7',
    confidence: 0.94,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-001', 'EVD-004', 'EVD-023'],
    occurrences: [
      { evidenceId: 'EVD-004', location: 'EXIF Model', snippet: 'Device: Synthetic Pixel 7', timestamp: '10:45 AM' }
    ],
    properties: { owner: 'Subject A Device', mac: 'D4:61:9D:28:44:A1' }
  },
  {
    entityId: 'ENT-015',
    caseId: 'CASE-2026-001',
    type: 'PAYMENT_ID',
    value: '6288192019',
    normalizedValue: '6288192019',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-004', 'EVD-015', 'EVD-021', 'EVD-038'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Bank Reference', snippet: 'UPI/DR/6288192019', timestamp: '10:40:12 AM' }
    ],
    properties: { type: 'NPCI RRN / UPI Reference' }
  },
  {
    entityId: 'ENT-016',
    caseId: 'CASE-2026-001',
    type: 'PERSON',
    value: 'Officer Verma',
    normalizedValue: 'OFFICER_VERMA',
    confidence: 0.88,
    epistemicType: 'INFERENCE',
    sourceEvidenceIds: ['EVD-002', 'EVD-032'],
    occurrences: [
      { evidenceId: 'EVD-002', location: 'WhatsApp Message', snippet: 'I am Officer Verma from Demo Payments Ltd...', timestamp: '10:22 AM' }
    ],
    properties: { role: 'Claimed Verification Agent', alias: true }
  },
  {
    entityId: 'ENT-017',
    caseId: 'CASE-2026-001',
    type: 'PAYMENT_ID',
    value: 'REF-88123',
    normalizedValue: 'REF-88123',
    confidence: 0.92,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-002', 'EVD-024'],
    occurrences: [
      { evidenceId: 'EVD-002', location: 'Message text', snippet: 'Refund code REF-88123 will trigger instant credit.', timestamp: '10:29 AM' }
    ],
    properties: { claimedType: 'Simulated Refund Authorization Code' }
  },
  {
    entityId: 'ENT-018',
    caseId: 'CASE-2026-001',
    type: 'ORGANIZATION',
    value: 'Subject Alpha Enterprise',
    normalizedValue: 'SUBJECT_ALPHA_ENTERPRISE',
    confidence: 0.90,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-010'],
    occurrences: [
      { evidenceId: 'EVD-010', location: 'KYC Document', snippet: 'Account Name: Subject Alpha Enterprise (Sole Prop)', timestamp: '12:20 PM' }
    ],
    properties: { nature: 'Sole Proprietorship' }
  },
  {
    entityId: 'ENT-019',
    caseId: 'CASE-2026-001',
    type: 'URL',
    value: '198.51.100.44',
    normalizedValue: '198.51.100.44',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-005', 'EVD-012'],
    occurrences: [
      { evidenceId: 'EVD-005', location: 'DNS / IP Record', snippet: 'IP: 198.51.100.44 (Synthetic ASN)', timestamp: '11:30 AM' }
    ],
    properties: { hostName: 'web-srv-01.mock', network: 'Mock Hosting Ltd' }
  },
  {
    entityId: 'ENT-020',
    caseId: 'CASE-2026-001',
    type: 'URL',
    value: '198.51.100.99',
    normalizedValue: '198.51.100.99',
    confidence: 0.96,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-009', 'EVD-028', 'EVD-030', 'EVD-035', 'EVD-039'],
    occurrences: [
      { evidenceId: 'EVD-009', location: 'Access Log', snippet: 'GET /auth from 198.51.100.99', timestamp: '10:34 AM' }
    ],
    properties: { isp: 'Mock Broadband Odisha', city: 'Bhubaneswar' }
  },
  {
    entityId: 'ENT-021',
    caseId: 'CASE-2026-001',
    type: 'DATE',
    value: '2026-09-25',
    normalizedValue: '2026-09-25',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-003', 'EVD-004', 'EVD-006', 'EVD-007', 'EVD-008', 'EVD-015', 'EVD-021', 'EVD-027', 'EVD-040'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Statement Date Column', snippet: '2026-09-25', timestamp: '10:40:12 AM' }
    ],
    properties: { dayOfWeek: 'Friday' }
  },
  {
    entityId: 'ENT-022',
    caseId: 'CASE-2026-001',
    type: 'TIME',
    value: '10:40:12 AM',
    normalizedValue: '10:40:12',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-007', 'EVD-015', 'EVD-021', 'EVD-025'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Row 27 Time', snippet: '10:40:12', timestamp: '10:40:12 AM' }
    ],
    properties: { timezone: 'IST (UTC+5:30)', source: 'Bank Core System' }
  },
  {
    entityId: 'ENT-023',
    caseId: 'CASE-2026-001',
    type: 'TIME',
    value: '10:45:00 AM',
    normalizedValue: '10:45:00',
    confidence: 0.92,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-004', 'EVD-025'],
    occurrences: [
      { evidenceId: 'EVD-004', location: 'Screenshot Status Bar', snippet: 'Time: 10:45 AM', timestamp: '10:45 AM' }
    ],
    properties: { discrepancyWithBank: '+4m 48s' }
  },
  {
    entityId: 'ENT-024',
    caseId: 'CASE-2026-001',
    type: 'AMOUNT',
    value: 'INR 14,700',
    normalizedValue: '14700 INR',
    confidence: 0.96,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-016', 'EVD-027'],
    occurrences: [
      { evidenceId: 'EVD-016', location: 'MDR Settlement Row', snippet: 'Net Payout: INR 14,700', timestamp: '11:15 AM' }
    ],
    properties: { netDeductionFee: '300 INR' }
  },
  {
    entityId: 'ENT-025',
    caseId: 'CASE-2026-001',
    type: 'PERSON',
    value: 'Agent AGT-441',
    normalizedValue: 'AGT-441',
    confidence: 0.89,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-014'],
    occurrences: [
      { evidenceId: 'EVD-014', location: 'IVR Log', snippet: 'Connected to Agent ID AGT-441', timestamp: '10:48 AM' }
    ],
    properties: { channel: 'Inbound Telecom IVR' }
  },
  {
    entityId: 'ENT-026',
    caseId: 'CASE-2026-001',
    type: 'ORGANIZATION',
    value: 'Mock National Commercial Bank',
    normalizedValue: 'MOCK_NATIONAL_COMMERCIAL_BANK',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-015', 'EVD-025', 'EVD-037'],
    occurrences: [
      { evidenceId: 'EVD-003', location: 'Header', snippet: 'Mock National Commercial Bank', timestamp: '10:40 AM' }
    ],
    properties: { ifscPrefix: 'MCBK' }
  },
  {
    entityId: 'ENT-027',
    caseId: 'CASE-2026-001',
    type: 'EMAIL',
    value: 'support@demo-payments.test',
    normalizedValue: 'support@demo-payments.test',
    confidence: 0.95,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-008'],
    occurrences: [
      { evidenceId: 'EVD-008', location: 'Header From', snippet: 'From: support@demo-payments.test', timestamp: '11:20 AM' }
    ],
    properties: { mailbox: 'Customer Dispute Desk' }
  }
];

// 31 Reconstructed Timeline Events
export const SEED_TIMELINE_EVENTS = [
  {
    eventId: 'EVT-001',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:15:32Z'),
    displayTime: '10:15 AM',
    type: 'SMS_DISPATCHED',
    title: 'Phishing KYC Alert Dispatched via SMS Gateway',
    description: 'Bulk SMS system issued urgent account suspension alert claiming mandatory verification fee of Rs 4,999.',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-011', 'EVD-001'],
    entityIds: ['ENT-002', 'ENT-011', 'ENT-004'],
    sourceLocation: 'Delivery Report Log Row 1 (smpp.mock-telecom.test)'
  },
  {
    eventId: 'EVT-002',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:18:22Z'),
    displayTime: '10:18 AM',
    type: 'SMS_RECEIVED',
    title: 'SMS Received and Displayed on Subject Device',
    description: 'Alert message displayed on victim device instructing immediate KYC payment via link.',
    confidence: 0.96,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-001'],
    entityIds: ['ENT-001', 'ENT-002', 'ENT-004', 'ENT-014'],
    sourceLocation: 'Screenshot OCR text (sms_alert_kyc_expiry.png)'
  },
  {
    eventId: 'EVT-003',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:22:00Z'),
    displayTime: '10:22 AM',
    type: 'CHAT_INITIATED',
    title: 'WhatsApp Contact Initiated by Claimed Support',
    description: 'Sender +91 9876543210 initiated WhatsApp communication impersonating "Officer Verma" of Demo Payments Ltd.',
    confidence: 0.95,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-002', 'EVD-022'],
    entityIds: ['ENT-002', 'ENT-010', 'ENT-016'],
    sourceLocation: 'chat_whatsapp_transcript.txt Line 1'
  },
  {
    eventId: 'EVT-004',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:25:10Z'),
    displayTime: '10:25 AM',
    type: 'PAYMENT_DEMANDED',
    title: 'Holding Bond Transfer Instruction Issued',
    description: 'Impersonator instructed payment of ₹15,000 to subject.demo@upi claiming it was a temporary refundable security bond.',
    confidence: 0.97,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-002'],
    entityIds: ['ENT-006', 'ENT-007', 'ENT-016'],
    sourceLocation: 'chat_whatsapp_transcript.txt Line 3'
  },
  {
    eventId: 'EVT-005',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:28:40Z'),
    displayTime: '10:28 AM',
    type: 'AMOUNT_DISCREPANCY_NOTED',
    title: 'Complainant Inquired About Fee Differential',
    description: 'Subject A questioned why the fee jumped from Rs 4,999 (SMS) to ₹15,000 (Chat).',
    confidence: 0.94,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-002'],
    entityIds: ['ENT-001', 'ENT-006', 'ENT-011'],
    sourceLocation: 'chat_whatsapp_transcript.txt Line 4'
  },
  {
    eventId: 'EVT-006',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:29:15Z'),
    displayTime: '10:29 AM',
    type: 'REFUND_PROMISE',
    title: 'Refund Code REF-88123 Provided by Suspect Contact',
    description: 'Suspect claimed an automated refund mechanism would trigger immediate rebate using refund code REF-88123.',
    confidence: 0.93,
    epistemicType: 'INFERENCE',
    sourceEvidenceIds: ['EVD-002', 'EVD-024'],
    entityIds: ['ENT-017', 'ENT-002'],
    sourceLocation: 'chat_whatsapp_transcript.txt Line 5'
  },
  {
    eventId: 'EVT-007',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:33:45Z'),
    displayTime: '10:33 AM',
    type: 'DNS_RESOLVED',
    title: 'DNS Resolution of Phishing Domain payment-demo.test',
    description: 'Recursive DNS lookup resolved domain to IP 198.51.100.44 prior to browser connection.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-012', 'EVD-005'],
    entityIds: ['ENT-004', 'ENT-019'],
    sourceLocation: 'dns_query_telemetry.log Line 1'
  },
  {
    eventId: 'EVT-008',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:34:11Z'),
    displayTime: '10:34 AM',
    type: 'URL_VISITED',
    title: 'Phishing Landing Page Accessed from Android Device',
    description: 'Suspect web server logged HTTP GET access to /auth from client IP 198.51.100.99 with SM-G991B user agent.',
    confidence: 0.96,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-009', 'EVD-005'],
    entityIds: ['ENT-004', 'ENT-013', 'ENT-020'],
    sourceLocation: 'suspect_device_user_agent.log Line 1'
  },
  {
    eventId: 'EVT-009',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:38:50Z'),
    displayTime: '10:38 AM',
    type: 'AUTH_OTP_ISSUED',
    title: 'Bank Issued 6-Digit Challenge to Registered Mobile',
    description: 'Authentication server sent transaction authorization OTP to +91 9876543210.',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-031'],
    entityIds: ['ENT-002', 'ENT-008', 'ENT-026'],
    sourceLocation: 'otp_dispatch_syslog.txt Line 1'
  },
  {
    eventId: 'EVT-010',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:39:45Z'),
    displayTime: '10:39 AM',
    type: 'PAYMENT_SESSION_INITIATED',
    title: 'UPI Payment Intent Created on Banking Gateway',
    description: 'Payment session SES-991024 initialized for amount ₹15,000 targeting VPA subject.demo@upi.',
    confidence: 0.97,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-030'],
    entityIds: ['ENT-006', 'ENT-007', 'ENT-020'],
    sourceLocation: 'mobile_banking_session_telemetry.json'
  },
  {
    eventId: 'EVT-011',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:40:12Z'),
    displayTime: '10:40 AM',
    type: 'TRANSACTION_EXECUTED',
    title: 'Core Banking Transfer of ₹15,000 Executed',
    description: 'Account ACC-88392104-MOCK debited for INR 15,000 via UPI RRN 6288192019 to Demo Payments Ltd.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-003', 'EVD-007', 'EVD-015', 'EVD-021'],
    entityIds: ['ENT-005', 'ENT-006', 'ENT-007', 'ENT-008', 'ENT-010', 'ENT-015', 'ENT-022', 'ENT-026'],
    sourceLocation: 'bank_statement_september.csv Row 27'
  },
  {
    eventId: 'EVT-012',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:40:13Z'),
    displayTime: '10:40 AM',
    type: 'NPCI_SWITCH_CONFIRMATION',
    title: 'National Switch Confirms Successful UPI Route',
    description: 'NPCI Switch recorded response code 00 (SUCCESS) for transfer RRN 6288192019.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-021'],
    entityIds: ['ENT-015', 'ENT-006', 'ENT-007'],
    sourceLocation: 'upi_npci_switch_log.csv Row 1'
  },
  {
    eventId: 'EVT-013',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:41:00Z'),
    displayTime: '10:41 AM',
    type: 'BANK_NOTIFICATION',
    title: 'Debit Alert SMS Received by Account Holder',
    description: 'Automated bank SMS alert confirmed debit of Rs 15,000.00 with remaining balance Rs 42,150.00.',
    confidence: 0.97,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-015'],
    entityIds: ['ENT-008', 'ENT-006', 'ENT-015'],
    sourceLocation: 'bank_alert_sms_notification.txt'
  },
  {
    eventId: 'EVT-014',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:45:00Z'),
    displayTime: '10:45 AM',
    type: 'SCREENSHOT_CAPTURED',
    title: 'Payment Confirmation Screenshot Captured on Phone',
    description: 'Screenshot saved showing success screen for ₹15,000 debit. Display clock reads 10:45 AM.',
    confidence: 0.95,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-004'],
    entityIds: ['ENT-004', 'ENT-006', 'ENT-015', 'ENT-023'],
    sourceLocation: 'payment_success_screenshot.jpg'
  },
  {
    eventId: 'EVT-015',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:46:12Z'),
    displayTime: '10:46 AM',
    type: 'APP_EXCEPTION',
    title: 'Client Application Network Timeout Crash Logged',
    description: 'Device crash log indicates network timeout during final confirmation polling.',
    confidence: 0.88,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-036'],
    entityIds: ['ENT-005', 'ENT-013'],
    sourceLocation: 'payment_app_crash_dump.log'
  },
  {
    eventId: 'EVT-016',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:48:00Z'),
    displayTime: '10:48 AM',
    type: 'IVR_CALL_CONNECTED',
    title: 'Victim Connected to Automated Dialer / Agent AGT-441',
    description: 'Complainant dialed helpline and was routed to Agent AGT-441 regarding pending transaction status.',
    confidence: 0.92,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-014'],
    entityIds: ['ENT-025', 'ENT-001'],
    sourceLocation: 'ivr_call_recording_transcript.txt'
  },
  {
    eventId: 'EVT-017',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:50:14Z'),
    displayTime: '10:50 AM',
    type: 'VOICE_CALL_RECORDED',
    title: 'Voice Call Established via Bhubaneswar Cell Tower',
    description: '342-second phone conversation recorded between +91 9876543210 and Subject A via BTS-BHU-09.',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-006', 'EVD-019'],
    entityIds: ['ENT-001', 'ENT-002', 'ENT-009'],
    sourceLocation: 'telecom_cdr_call_log.csv CDR-99120'
  },
  {
    eventId: 'EVT-018',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T10:55:00Z'),
    displayTime: '10:55 AM',
    type: 'FOLLOWUP_SMS',
    title: 'Follow-up SMS Demanding Secondary Refund Validation',
    description: 'SMS sent to victim alleging that release of REF-88123 required additional authorization.',
    confidence: 0.93,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-024'],
    entityIds: ['ENT-017', 'ENT-002'],
    sourceLocation: 'sms_second_followup_reminder.txt'
  },
  {
    eventId: 'EVT-019',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T11:15:00Z'),
    displayTime: '11:15 AM',
    type: 'MERCHANT_PAYOUT',
    title: 'Merchant Gateway Clears Net Payout of INR 14,700',
    description: 'NEFT outward settlement processed from Demo Payments Ltd to beneficiary account in Bhubaneswar.',
    confidence: 0.95,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-016', 'EVD-027'],
    entityIds: ['ENT-010', 'ENT-024', 'ENT-008', 'ENT-009'],
    sourceLocation: 'merchant_settlement_ledger.csv & merchant_payout_bank_record.csv'
  },
  {
    eventId: 'EVT-020',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T11:20:45Z'),
    displayTime: '11:20 AM',
    type: 'DISPUTE_FILED',
    title: 'Dispute Ticket DISP-2026-4412 Registered by Victim',
    description: 'Complainant lodged formal debit dispute via support@demo-payments.test.',
    confidence: 0.96,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-008'],
    entityIds: ['ENT-003', 'ENT-010', 'ENT-027'],
    sourceLocation: 'email_dispute_acknowledgment.eml'
  },
  {
    eventId: 'EVT-021',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T11:25:00Z'),
    displayTime: '11:25 AM',
    type: 'SUPPORT_CALL_LOGGED',
    title: 'Customer Bank Desk Formally Confirms Unauthorized Debit',
    description: 'Bank helpline agent confirmed funds had left the remitter account.',
    confidence: 0.94,
    epistemicType: 'EXTRACTED DATA',
    sourceEvidenceIds: ['EVD-037', 'EVD-026'],
    entityIds: ['ENT-005', 'ENT-006', 'ENT-026'],
    sourceLocation: 'customer_support_audio_recording.mp3'
  },
  {
    eventId: 'EVT-022',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T11:35:00Z'),
    displayTime: '11:35 AM',
    type: 'INCIDENT_INTAKE',
    title: 'FraudTrace AI Intake Initiated for Case CASE-2026-001',
    description: 'Evidence artifacts gathered and indexed into case repository for cross-source reconciliation.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-042'],
    entityIds: ['ENT-001'],
    sourceLocation: 'Case Repository Audit'
  },
  {
    eventId: 'EVT-023',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T12:00:00Z'),
    displayTime: '12:00 PM',
    type: 'INCONSISTENCY_FLAGGED',
    title: 'Timestamp Inconsistency Flagged between Core Bank and Screenshot',
    description: 'Automated correlation engine detected 4 minute 48 second discrepancy between statement row and image metadata.',
    confidence: 0.97,
    epistemicType: 'INFERENCE',
    sourceEvidenceIds: ['EVD-003', 'EVD-004', 'EVD-025'],
    entityIds: ['ENT-022', 'ENT-023'],
    sourceLocation: 'bank_discrepancy_notice_internal.pdf'
  },
  {
    eventId: 'EVT-024',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T12:30:00Z'),
    displayTime: '12:30 PM',
    type: 'GEO_CORRELATION',
    title: 'Geographic Convergence Identified in Bhubaneswar, Odisha',
    description: 'Cell tower, IP geolocation, and registered company filings independently converged on Infocity, Bhubaneswar.',
    confidence: 0.91,
    epistemicType: 'INFERENCE',
    sourceEvidenceIds: ['EVD-006', 'EVD-010', 'EVD-034', 'EVD-035'],
    entityIds: ['ENT-009', 'ENT-010', 'ENT-020'],
    sourceLocation: 'Geo-Correlator Output'
  },
  {
    eventId: 'EVT-025',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T13:20:00Z'),
    displayTime: '01:20 PM',
    type: 'AUDIT_NOTE_LOGGED',
    title: 'Investigative Review Note Filed by Analyst #4',
    description: 'Analyst highlighted recurrent identification of +91 9876543210 in three historical synthetic records.',
    confidence: 0.95,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-017'],
    entityIds: ['ENT-002'],
    sourceLocation: 'dispute_ticket_internal_notes.pdf'
  },
  {
    eventId: 'EVT-026',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T14:00:00Z'),
    displayTime: '02:00 PM',
    type: 'INTEGRITY_AUDIT',
    title: 'Cryptographic SHA-256 Hashes Computed Across 42 Artifacts',
    description: 'Evidence integrity sealed under RFC-3161 timestamping verification protocol.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-042'],
    entityIds: [],
    sourceLocation: 'forensic_checksum_manifest.sha256'
  },
  {
    eventId: 'EVT-027',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T14:40:00Z'),
    displayTime: '02:40 PM',
    type: 'INTERNAL_MEMO',
    title: 'Discrepancy Audit Distributed to Risk Operations',
    description: 'Formal notification issued detailing potential device clock drift and extraction variance.',
    confidence: 0.96,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-025'],
    entityIds: ['ENT-022', 'ENT-023'],
    sourceLocation: 'MEMO-2026-09-021'
  },
  {
    eventId: 'EVT-028',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T15:20:00Z'),
    displayTime: '03:20 PM',
    type: 'EVIDENCE_ANOMALY',
    title: 'Unmatched Cash Deposit Slip Detected in Evidence Stream',
    description: 'Evidence item EVD-029 contains an unmatched counter receipt of Rs 4,999 without associated core banking debit.',
    confidence: 0.89,
    epistemicType: 'UNCERTAINTY',
    sourceEvidenceIds: ['EVD-029'],
    entityIds: ['ENT-011'],
    sourceLocation: 'unmatched_deposit_receipt.png'
  },
  {
    eventId: 'EVT-029',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T16:10:00Z'),
    displayTime: '04:10 PM',
    type: 'CORPORATE_AUDIT',
    title: 'Corporate Filing Inspected for Demo Payments Ltd',
    description: 'Corporate affairs query confirms entity registration with virtual office in Bhubaneswar.',
    confidence: 0.98,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-034', 'EVD-041'],
    entityIds: ['ENT-010', 'ENT-009'],
    sourceLocation: 'corporate_registry_filing.pdf'
  },
  {
    eventId: 'EVT-030',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T17:10:00Z'),
    displayTime: '05:10 PM',
    type: 'COMPLAINT_AFFIRMED',
    title: 'Formal Sworn Complaint Filed by Subject A',
    description: 'Subject A submitted signed declaration confirming receipt of phishing messages and unauthorized debit.',
    confidence: 0.99,
    epistemicType: 'FACT',
    sourceEvidenceIds: ['EVD-040'],
    entityIds: ['ENT-001', 'ENT-006', 'ENT-002'],
    sourceLocation: 'victim_written_complaint.pdf'
  },
  {
    eventId: 'EVT-031',
    caseId: 'CASE-2026-001',
    timestamp: new Date('2026-09-25T17:30:00Z'),
    displayTime: '05:30 PM',
    type: 'CORRELATION_COMPLETE',
    title: 'Cross-Evidence Reconciliation Graph Finalized',
    description: '63 multi-source relationships synthesized across 27 distinct entities with 92% composite confidence.',
    confidence: 0.94,
    epistemicType: 'INFERENCE',
    sourceEvidenceIds: ['EVD-042', 'EVD-003', 'EVD-007', 'EVD-021'],
    entityIds: ['ENT-001', 'ENT-002', 'ENT-004', 'ENT-005', 'ENT-006', 'ENT-007'],
    sourceLocation: 'Graph Engine Reconciliation Matrix'
  }
];

// 63 Rich Graph Relationships with match confidence and reasons
export const SEED_RELATIONSHIPS = [
  {
    relationshipId: 'REL-001',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-002', // Phone
    targetEntityId: 'ENT-001', // Person (Subject A)
    type: 'ASSOCIATED_WITH',
    confidence: 0.94,
    reasons: ['Same phone number in chat transcripts', 'Direct WhatsApp contact established', 'Call record matched in CDR'],
    sourceEvidenceIds: ['EVD-002', 'EVD-006', 'EVD-040']
  },
  {
    relationshipId: 'REL-002',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-002', // Phone
    targetEntityId: 'ENT-004', // URL
    type: 'REFERENCES',
    confidence: 0.98,
    reasons: ['Phone message contained explicit URL link', 'WhatsApp profile listed this website address'],
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-022']
  },
  {
    relationshipId: 'REL-003',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-004', // URL
    targetEntityId: 'ENT-019', // IP 198.51.100.44
    type: 'MATCHES',
    confidence: 0.99,
    reasons: ['DNS A-record resolved to this exact IP address', 'SSL certificate matches host'],
    sourceEvidenceIds: ['EVD-005', 'EVD-012', 'EVD-018']
  },
  {
    relationshipId: 'REL-004',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-005', // Transaction TXN-99482109
    targetEntityId: 'ENT-006', // Amount ₹15,000
    type: 'CONTAINS',
    confidence: 0.99,
    reasons: ['Bank statement row explicitly lists ₹15,000', 'NPCI Switch record specifies exact 15,000.00 INR amount'],
    sourceEvidenceIds: ['EVD-003', 'EVD-007', 'EVD-021']
  },
  {
    relationshipId: 'REL-005',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-005', // Transaction
    targetEntityId: 'ENT-007', // UPI ID
    type: 'REFERENCES',
    confidence: 0.98,
    reasons: ['Beneficiary UPI handle is subject.demo@upi', 'Gateway webhook captures same handle'],
    sourceEvidenceIds: ['EVD-003', 'EVD-007', 'EVD-021']
  },
  {
    relationshipId: 'REL-006',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-005', // Transaction
    targetEntityId: 'ENT-010', // Organization Demo Payments Ltd
    type: 'ASSOCIATED_WITH',
    confidence: 0.99,
    reasons: ['Merchant name in statement is Demo Payments Ltd', 'Merchant settlement batch reflects transaction'],
    sourceEvidenceIds: ['EVD-003', 'EVD-007', 'EVD-016']
  },
  {
    relationshipId: 'REL-007',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-005', // Transaction
    targetEntityId: 'ENT-015', // RRN 6288192019
    type: 'MATCHES',
    confidence: 0.99,
    reasons: ['NPCI RRN 6288192019 corresponds to TXN-99482109', 'Matched in screenshot and bank row 27'],
    sourceEvidenceIds: ['EVD-003', 'EVD-004', 'EVD-021']
  },
  {
    relationshipId: 'REL-008',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-002', // Phone
    targetEntityId: 'ENT-007', // UPI ID
    type: 'ASSOCIATED_WITH',
    confidence: 0.92,
    reasons: ['Same suspect contact sent UPI address during chat', 'Both associated in synthetic telecom KYC record'],
    sourceEvidenceIds: ['EVD-002', 'EVD-010']
  },
  {
    relationshipId: 'REL-009',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-008', // Bank Account
    targetEntityId: 'ENT-005', // Transaction
    type: 'CONTAINS',
    confidence: 0.99,
    reasons: ['Account ACC-88392104-MOCK is the debited source', 'Statement ledger explicitly confirms debit'],
    sourceEvidenceIds: ['EVD-003', 'EVD-015']
  },
  {
    relationshipId: 'REL-010',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-002', // Phone
    targetEntityId: 'ENT-009', // Location Bhubaneswar
    type: 'ASSOCIATED_WITH',
    confidence: 0.95,
    reasons: ['Cell tower BTS-BHU-09 located in Bhubaneswar', 'Telecom circle registration in Odisha'],
    sourceEvidenceIds: ['EVD-006', 'EVD-026']
  },
  {
    relationshipId: 'REL-011',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-010', // Organization Demo Payments Ltd
    targetEntityId: 'ENT-009', // Location Bhubaneswar
    type: 'ASSOCIATED_WITH',
    confidence: 0.97,
    reasons: ['Corporate CIN filing lists Infocity, Bhubaneswar', 'Physical field verification of registered office'],
    sourceEvidenceIds: ['EVD-034', 'EVD-041']
  },
  {
    relationshipId: 'REL-012',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-011', // Rs 4,999
    targetEntityId: 'ENT-006', // ₹15,000
    type: 'CONFLICTS_WITH',
    confidence: 0.93,
    reasons: ['SMS stated verification fee was Rs 4,999', 'Actual debit was ₹15,000', 'Unexplained 300% amount differential'],
    sourceEvidenceIds: ['EVD-001', 'EVD-002', 'EVD-003']
  },
  {
    relationshipId: 'REL-013',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-022', // Bank Time 10:40:12
    targetEntityId: 'ENT-023', // Screenshot Time 10:45:00
    type: 'CONFLICTS_WITH',
    confidence: 0.91,
    reasons: ['Core bank records transaction at 10:40:12 AM', 'Screenshot timestamp indicates 10:45 AM', 'Clock variance or delayed capture'],
    sourceEvidenceIds: ['EVD-003', 'EVD-004', 'EVD-025']
  },
  {
    relationshipId: 'REL-014',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-016', // Officer Verma
    targetEntityId: 'ENT-002', // Phone
    type: 'MENTIONED_IN',
    confidence: 0.90,
    reasons: ['Chat from +91 9876543210 introduced self as Officer Verma', 'Lead desk assigns this name to calling party'],
    sourceEvidenceIds: ['EVD-002', 'EVD-032']
  },
  {
    relationshipId: 'REL-015',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-017', // Refund code REF-88123
    targetEntityId: 'ENT-006', // ₹15,000
    type: 'REFERENCES',
    confidence: 0.89,
    reasons: ['Refund code promised immediate credit of the ₹15,000 transfer', 'Followup message reaffirmed code'],
    sourceEvidenceIds: ['EVD-002', 'EVD-024']
  },
  {
    relationshipId: 'REL-016',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-003', // Email subject.demo@example.test
    targetEntityId: 'ENT-001', // Person Subject A
    type: 'ASSOCIATED_WITH',
    confidence: 0.96,
    reasons: ['Dispute confirmation delivered to this email', 'Victim profile lists this address'],
    sourceEvidenceIds: ['EVD-008', 'EVD-040']
  },
  {
    relationshipId: 'REL-017',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-007', // UPI subject.demo@upi
    targetEntityId: 'ENT-018', // Subject Alpha Enterprise
    type: 'DERIVED_FROM',
    confidence: 0.88,
    reasons: ['Beneficiary KYC document connects VPA to enterprise entity', 'Sole proprietorship registered under same contact'],
    sourceEvidenceIds: ['EVD-010']
  },
  {
    relationshipId: 'REL-018',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-013', // SM-G991B Device
    targetEntityId: 'ENT-020', // IP 198.51.100.99
    type: 'MATCHES',
    confidence: 0.95,
    reasons: ['Web access log pairs SM-G991B user agent with IP 198.51.100.99', 'Banking session telemetry validates match'],
    sourceEvidenceIds: ['EVD-009', 'EVD-030']
  },
  {
    relationshipId: 'REL-019',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-014', // Synthetic Pixel 7
    targetEntityId: 'ENT-001', // Subject A
    type: 'ASSOCIATED_WITH',
    confidence: 0.96,
    reasons: ['Screenshot generated from Pixel 7 resolution', 'DHCP router lease ties MAC to victim premises'],
    sourceEvidenceIds: ['EVD-001', 'EVD-004', 'EVD-023']
  },
  {
    relationshipId: 'REL-020',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-024', // INR 14,700
    targetEntityId: 'ENT-006', // ₹15,000
    type: 'DERIVED_FROM',
    confidence: 0.97,
    reasons: ['Settlement batch calculates 14,700 = 15,000 gross minus 300 MDR fee', 'NEFT payout matches exactly'],
    sourceEvidenceIds: ['EVD-016', 'EVD-027']
  },
  {
    relationshipId: 'REL-021',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-026', // Mock National Commercial Bank
    targetEntityId: 'ENT-008', // ACC-88392104-MOCK
    type: 'CONTAINS',
    confidence: 0.99,
    reasons: ['Account number issued by Mock National Commercial Bank', 'Statement header verified'],
    sourceEvidenceIds: ['EVD-003', 'EVD-015']
  },
  {
    relationshipId: 'REL-022',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-027', // support@demo-payments.test
    targetEntityId: 'ENT-010', // Demo Payments Ltd
    type: 'ASSOCIATED_WITH',
    confidence: 0.98,
    reasons: ['Official dispute email originating from domain demo-payments.test', 'DKIM and SPF verified'],
    sourceEvidenceIds: ['EVD-008']
  },
  {
    relationshipId: 'REL-023',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-012', // PAY-MOCK-771829
    targetEntityId: 'ENT-005', // TXN-99482109
    type: 'MATCHES',
    confidence: 0.96,
    reasons: ['Webhook payload links payment ID to RRN 6288192019 and transaction', 'Timestamp 10:40:12 matches'],
    sourceEvidenceIds: ['EVD-007', 'EVD-021']
  },
  {
    relationshipId: 'REL-024',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-025', // Agent AGT-441
    targetEntityId: 'ENT-002', // Phone
    type: 'ASSOCIATED_WITH',
    confidence: 0.87,
    reasons: ['Inbound dialer routed caller to agent 441 during KYC call sequence', 'Time matches call log window'],
    sourceEvidenceIds: ['EVD-014', 'EVD-006']
  },
  {
    relationshipId: 'REL-025',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-020', // IP 198.51.100.99
    targetEntityId: 'ENT-009', // Bhubaneswar
    type: 'MATCHES',
    confidence: 0.95,
    reasons: ['MaxMind GeoIP database resolves IP to Bhubaneswar, Odisha', 'ISP is Mock Broadband Odisha'],
    sourceEvidenceIds: ['EVD-035']
  },
  {
    relationshipId: 'REL-026',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-004', // URL payment-demo.test
    targetEntityId: 'ENT-010', // Demo Payments Ltd
    type: 'CORROBORATES',
    confidence: 0.94,
    reasons: ['Phishing landing page copies Demo Payments Ltd logo and branding', 'WhatsApp profile cross-references domain'],
    sourceEvidenceIds: ['EVD-005', 'EVD-022']
  },
  {
    relationshipId: 'REL-027',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-002', // Phone +91 9876543210
    targetEntityId: 'ENT-008', // Bank Account ACC-88392104-MOCK
    type: 'REFERENCES',
    confidence: 0.96,
    reasons: ['Bank SMS dispatch log sent OTP for account to this registered phone', 'Core banking customer profile linked'],
    sourceEvidenceIds: ['EVD-031']
  },
  {
    relationshipId: 'REL-028',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-001', // Subject A
    targetEntityId: 'ENT-018', // Subject Alpha Enterprise
    type: 'POSSIBLY_SAME_AS',
    confidence: 0.82,
    reasons: ['KYC filing for Subject Alpha Enterprise matches complainant legal name', 'Suspected synthetic identity linkage under investigation'],
    sourceEvidenceIds: ['EVD-010', 'EVD-040']
  },
  {
    relationshipId: 'REL-029',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-015', // 6288192019
    targetEntityId: 'ENT-007', // subject.demo@upi
    type: 'ASSOCIATED_WITH',
    confidence: 0.99,
    reasons: ['NPCI switch record ties RRN 6288192019 directly to beneficiary VPA', 'GooglePay screenshot confirms pairing'],
    sourceEvidenceIds: ['EVD-004', 'EVD-021']
  },
  {
    relationshipId: 'REL-030',
    caseId: 'CASE-2026-001',
    sourceEntityId: 'ENT-005', // TXN-99482109
    targetEntityId: 'ENT-021', // Date 2026-09-25
    type: 'CONTAINS',
    confidence: 0.99,
    reasons: ['Transaction executed on 25-Sep-2026', 'Bank ledger timestamp matches'],
    sourceEvidenceIds: ['EVD-003', 'EVD-021']
  }
];

// 5 Inconsistencies & 7 Missing Information Records
export const SEED_INCONSISTENCIES = [
  {
    inconsistencyId: 'INC-001',
    caseId: 'CASE-2026-001',
    type: 'AMOUNT_MISMATCH',
    category: 'INCONSISTENCY',
    severity: 'HIGH',
    title: 'Advisory Fee Mismatch vs. Executed Debit Amount',
    description: 'Initial SMS notification explicitly claimed a nominal KYC deposit of Rs 4,999, whereas the transaction executed through the banking gateway was ₹15,000 (a +200% differential).',
    evidenceIds: ['EVD-001', 'EVD-002', 'EVD-003'],
    sourceDetails: [
      { evidenceId: 'EVD-001', label: 'SMS Notice (sms_alert_kyc_expiry.png)', value: 'Rs 4,999', location: 'Body Text' },
      { evidenceId: 'EVD-002', label: 'WhatsApp Chat (chat_whatsapp_transcript.txt)', value: '₹15,000 holding bond', location: 'Line 3' },
      { evidenceId: 'EVD-003', label: 'Bank Statement (bank_statement_september.csv)', value: 'INR 15,000.00 DR', location: 'Row 27' }
    ],
    possibleExplanations: [
      'Bait-and-switch fee escalation during live impersonation conversation',
      'Initial SMS used canned lower threshold template to maximize response rate',
      'Dynamic payment gateway parameter alteration'
    ],
    requiredAction: 'Manual verification of chat transcript and complainant interview',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Discrepancy confirmed by analyst. Complainant questioned the differential in chat message #4.'
  },
  {
    inconsistencyId: 'INC-002',
    caseId: 'CASE-2026-001',
    type: 'TIMESTAMP_MISMATCH',
    category: 'INCONSISTENCY',
    severity: 'MEDIUM',
    title: 'Timestamp Discrepancy between Core Banking & Payment Screenshot',
    description: 'The core banking statement confirms transfer execution at 10:40:12 AM IST, whereas the captured payment screenshot displays 10:45 AM (a 4-minute 48-second discrepancy).',
    evidenceIds: ['EVD-003', 'EVD-004', 'EVD-025'],
    sourceDetails: [
      { evidenceId: 'EVD-003', label: 'Bank Core System (bank_statement_september.csv)', value: '10:40:12 AM', location: 'Row 27 Column 2' },
      { evidenceId: 'EVD-004', label: 'Device Screenshot (payment_success_screenshot.jpg)', value: '10:45:00 AM', location: 'Device Status Bar' }
    ],
    possibleExplanations: [
      'Complainant delayed taking screenshot by ~5 minutes after transfer completed',
      'Device local clock was unsynchronized with NTP network time',
      'Timezone offset or cached app rendering latency'
    ],
    requiredAction: 'Manual verification of raw device EXIF and cellular network tower timestamp logs',
    resolutionStatus: 'UNDER_REVIEW',
    resolutionNotes: 'Evidence notice MEMO-2026-09-021 confirms probable screenshot capture delay rather than systemic data tampering.'
  },
  {
    inconsistencyId: 'INC-003',
    caseId: 'CASE-2026-001',
    type: 'DUPLICATE_RECORD',
    category: 'INCONSISTENCY',
    severity: 'LOW',
    title: 'Duplicate Batch Export of Transaction Row Detected',
    description: 'An identical record for transfer RRN 6288192019 was submitted in duplicate batch export evidence EVD-038 with identical hash values.',
    evidenceIds: ['EVD-003', 'EVD-038'],
    sourceDetails: [
      { evidenceId: 'EVD-003', label: 'Primary Bank Statement', value: 'Row 27 RRN 6288192019', location: 'Row 27' },
      { evidenceId: 'EVD-038', label: 'Secondary Export Batch', value: 'Row 1 RRN 6288192019', location: 'Row 1' }
    ],
    possibleExplanations: [
      'Multiple export queries run during evidence gathering pipeline',
      'Overlapping statement date ranges in investigative sub-folders'
    ],
    requiredAction: 'Deduplicate export batch to prevent artificial count inflation',
    resolutionStatus: 'RESOLVED',
    resolutionNotes: 'Deduplication marker applied. Primary row 27 retained.'
  },
  {
    inconsistencyId: 'INC-004',
    caseId: 'CASE-2026-001',
    type: 'CONFLICTING_IDENTIFIERS',
    category: 'INCONSISTENCY',
    severity: 'HIGH',
    title: 'Disputed Identity Linkage to Subject Alpha Enterprise',
    description: 'KYC corporate registry links phone number +91 9876543210 to "Subject Alpha Enterprise" with registered director as Subject A, but complainant affidavit explicitly denies owning or knowing of this enterprise.',
    evidenceIds: ['EVD-010', 'EVD-034', 'EVD-040'],
    sourceDetails: [
      { evidenceId: 'EVD-010', label: 'KYC Beneficiary Dossier', value: 'Subject Alpha Enterprise / Subject A', location: 'Section B' },
      { evidenceId: 'EVD-040', label: 'Complainant Affidavit', value: 'Denies enterprise affiliation', location: 'Paragraph 3' }
    ],
    possibleExplanations: [
      'Synthetic identity theft / fraudulent entity registration using complainant KYC copies',
      'Shared or recycled prepaid telecom number',
      'Misattributed commercial filing'
    ],
    requiredAction: 'Subpoena physical signature cards and incorporation registry IP records',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Flagged for forensic document analysis. Neutral epistemic classification maintained.'
  },
  {
    inconsistencyId: 'INC-005',
    caseId: 'CASE-2026-001',
    type: 'BROKEN_RELATIONSHIP',
    category: 'INCONSISTENCY',
    severity: 'MEDIUM',
    title: 'Unmatched Cash Deposit Slip (EVD-029) without Ledger Counterpart',
    description: 'A submitted screenshot contains an alleged cash deposit receipt of Rs 4,999, but no corresponding ledger entry appears in any core banking statement.',
    evidenceIds: ['EVD-003', 'EVD-029'],
    sourceDetails: [
      { evidenceId: 'EVD-029', label: 'Cash Receipt Image', value: 'Rs 4,999 cash', location: 'Center counter stamp' },
      { evidenceId: 'EVD-003', label: 'Bank Statement', value: 'No matching credit/debit', location: 'Full month export' }
    ],
    possibleExplanations: [
      'Evidence item pertains to an unrelated transaction mistakenly aggregated into dossier',
      'Counter deposit failed or was rejected prior to batch clearing'
    ],
    requiredAction: 'Isolate EVD-029 into secondary inspection bucket until verified',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Pending bank teller log verification.'
  },

  // 7 Missing Information Records
  {
    inconsistencyId: 'MIS-001',
    caseId: 'CASE-2026-001',
    type: 'MISSING_TRANSACTION_ID',
    category: 'MISSING_INFO',
    severity: 'HIGH',
    title: 'Notification Screenshot Stripped of Timestamp & Header (EVD-013)',
    description: 'Evidence item screenshot_missing_metadata.png previews a Rs 15,000 debit notification, but all device EXIF metadata, status bar clock, and header information were stripped upon upload.',
    evidenceIds: ['EVD-013'],
    sourceDetails: [
      { evidenceId: 'EVD-013', label: 'Screenshot 13', value: 'Missing timestamp and EXIF tags', location: 'Metadata Block' }
    ],
    possibleExplanations: ['Messaging app compression stripped EXIF headers', 'Cropped screenshot upload'],
    requiredAction: 'Request original uncompressed image file or extraction of local device media database',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Flagged: REVIEW REQUIRED.'
  },
  {
    inconsistencyId: 'MIS-002',
    caseId: 'CASE-2026-001',
    type: 'UNMATCHED_TRANSACTION',
    category: 'MISSING_INFO',
    severity: 'MEDIUM',
    title: 'Missing Payment Reference ID in First Chat Prompt',
    description: 'The initial WhatsApp payment demand referenced a holding bond transfer without quoting the internal merchant order ID ORD-99812.',
    evidenceIds: ['EVD-002', 'EVD-007'],
    sourceDetails: [
      { evidenceId: 'EVD-002', label: 'Chat Transcript', value: 'No order ID quoted', location: 'Line 3' }
    ],
    possibleExplanations: ['Order ID was only generated at the gateway webhook tier'],
    requiredAction: 'Correlate with webhook payload ORD-99812',
    resolutionStatus: 'RESOLVED',
    resolutionNotes: 'Correlated through gateway callback payload EVD-007.'
  },
  {
    inconsistencyId: 'MIS-003',
    caseId: 'CASE-2026-001',
    type: 'BROKEN_RELATIONSHIP',
    category: 'MISSING_INFO',
    severity: 'HIGH',
    title: 'Secondary Phishing URL /refund Missing from Active DNS Telemetry',
    description: 'Chat followup (EVD-024) instructed victim to access https://payment-demo.test/refund, but DNS telemetry logs (EVD-012) only captured queries for /auth and /verify-kyc.',
    evidenceIds: ['EVD-024', 'EVD-012'],
    sourceDetails: [
      { evidenceId: 'EVD-024', label: 'Chat Reminder', value: '/refund endpoint referenced', location: 'Message text' },
      { evidenceId: 'EVD-012', label: 'DNS Telemetry', value: 'No query logged for /refund', location: 'Telemetry log' }
    ],
    possibleExplanations: ['Complainant never clicked the followup link', 'Local browser DNS cache satisfied request without upstream query'],
    requiredAction: 'Review browser client-side history logs',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Supports conclusion that victim abandoned process after initial transfer.'
  },
  {
    inconsistencyId: 'MIS-004',
    caseId: 'CASE-2026-001',
    type: 'CONFLICTING_ATTRIBUTES',
    category: 'MISSING_INFO',
    severity: 'MEDIUM',
    title: 'Missing Cell Tower Geolocation for First SMS Alert',
    description: 'The initial SMS alert delivery log (EVD-011) indicates status DELIVRD, but lacks the cellular tower BTS identifier present in subsequent CDR call records.',
    evidenceIds: ['EVD-011', 'EVD-006'],
    sourceDetails: [
      { evidenceId: 'EVD-011', label: 'SMS Gateway Log', value: 'LAC/CellId null', location: 'Column 6' }
    ],
    possibleExplanations: ['Bulk SMPP provider does not capture terminating cell tower coordinates'],
    requiredAction: 'Cross-reference with subsequent CDR record CDR-99120',
    resolutionStatus: 'RESOLVED',
    resolutionNotes: 'Subsequent CDR record EVD-006 provided cell tower BTS-BHU-09.'
  },
  {
    inconsistencyId: 'MIS-005',
    caseId: 'CASE-2026-001',
    type: 'BROKEN_RELATIONSHIP',
    category: 'MISSING_INFO',
    severity: 'LOW',
    title: 'Missing Gateway Final Receipt Callback due to App Timeout',
    description: 'Application crash dump (EVD-036) demonstrates NetworkTimeoutException during receipt callback polling, leaving client-side session state without an explicit ack flag.',
    evidenceIds: ['EVD-036', 'EVD-007'],
    sourceDetails: [
      { evidenceId: 'EVD-036', label: 'Crash Dump', value: 'Missing final receipt ack', location: 'Thread 12 stack' }
    ],
    possibleExplanations: ['Network interruption caused client polling disconnect while server webhook completed'],
    requiredAction: 'Rely on authoritative server-to-server webhook (EVD-007)',
    resolutionStatus: 'RESOLVED',
    resolutionNotes: 'Corroborated by server webhook EVD-007 and NPCI log EVD-021.'
  },
  {
    inconsistencyId: 'MIS-006',
    caseId: 'CASE-2026-001',
    type: 'UNMATCHED_TRANSACTION',
    category: 'MISSING_INFO',
    severity: 'MEDIUM',
    title: 'Uncorroborated Agent Alias "Agent Verma"',
    description: 'The entity "Officer Verma" appears solely in informal chat records (EVD-002) and synthetic lead CRM notes (EVD-032); no registered employee profile exists in corporate filings.',
    evidenceIds: ['EVD-002', 'EVD-032', 'EVD-034'],
    sourceDetails: [
      { evidenceId: 'EVD-002', label: 'WhatsApp', value: 'Officer Verma', location: 'Message text' },
      { evidenceId: 'EVD-034', label: 'Corporate Registry', value: 'No such officer registered', location: 'Director list' }
    ],
    possibleExplanations: ['Fictitious persona used for social engineering impersonation'],
    requiredAction: 'Classify as synthetic impersonation alias (Epistemic: INFERENCE)',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Marked as alias.'
  },
  {
    inconsistencyId: 'MIS-007',
    caseId: 'CASE-2026-001',
    type: 'MISSING_TRANSACTION_ID',
    category: 'MISSING_INFO',
    severity: 'LOW',
    title: 'Missing Dispute Resolution Outcome from Merchant Entity',
    description: 'Dispute ticket DISP-2026-4412 contains acknowledgment email (EVD-008), but no conclusive settlement or chargeback resolution status has been returned by merchant Demo Payments Ltd.',
    evidenceIds: ['EVD-008'],
    sourceDetails: [
      { evidenceId: 'EVD-008', label: 'Email', value: 'Status: Registered / Awaiting merchant reply', location: 'Ticket body' }
    ],
    possibleExplanations: ['Merchant response window (typically 30-45 days) currently active'],
    requiredAction: 'Schedule automated polling query for ticket DISP-2026-4412 status update',
    resolutionStatus: 'OPEN',
    resolutionNotes: 'Ongoing investigation queue.'
  }
];

// Initial Audit Trail
export const SEED_AUDIT_LOGS = [
  {
    timestamp: new Date('2026-09-25T11:00:15Z'),
    caseId: 'CASE-2026-001',
    actor: 'Lead Analyst',
    action: 'CASE_INITIALIZED',
    target: 'CASE-2026-001',
    details: 'Initiated case Operation Digital Mirage',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T11:05:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'Lead Analyst',
    action: 'EVIDENCE_UPLOAD',
    target: 'sms_alert_kyc_expiry.png',
    details: 'Uploaded 412 KB PNG screenshot',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T11:15:20Z'),
    caseId: 'CASE-2026-001',
    actor: 'Lead Analyst',
    action: 'EVIDENCE_UPLOAD',
    target: 'bank_statement_september.csv',
    details: 'Uploaded bank ledger CSV with 85 records',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T11:18:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'AI_EXTRACTION_ENGINE',
    action: 'EVIDENCE_PROCESSED',
    target: 'bank_statement_september.csv',
    details: 'Extracted transaction TXN-99482109, amount ₹15,000, row 27',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T11:45:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'Lead Analyst',
    action: 'EVIDENCE_VIEWED',
    target: 'bank_statement_september.csv',
    details: 'Trace to Source inspected row 27',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T12:05:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'CORRELATION_ENGINE',
    action: 'RELATIONSHIP_CREATED',
    target: 'REL-004',
    details: 'Connected TXN-99482109 to Amount ₹15,000 (99% confidence)',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T12:15:30Z'),
    caseId: 'CASE-2026-001',
    actor: 'INCONSISTENCY_ENGINE',
    action: 'INCONSISTENCY_FLAGGED',
    target: 'INC-001',
    details: 'Flagged amount mismatch between SMS (Rs 4,999) and Bank (₹15,000)',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T13:00:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'TIMELINE_ENGINE',
    action: 'TIMELINE_RECONSTRUCTED',
    target: 'CASE-2026-001',
    details: 'Reconstructed 31 sequential events spanning 10:15 AM to 05:30 PM',
    ipAddress: '127.0.0.1'
  },
  {
    timestamp: new Date('2026-09-25T17:30:00Z'),
    caseId: 'CASE-2026-001',
    actor: 'SYSTEM',
    action: 'INTEGRITY_SEALED',
    target: 'EVD-042',
    details: 'Cryptographic SHA-256 seal verified for 42 items',
    ipAddress: '127.0.0.1'
  }
];
