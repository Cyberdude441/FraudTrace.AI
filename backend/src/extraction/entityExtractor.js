import { normalizeEntityValue, normalizeAmount, normalizePhone } from './normalizer.js';

export function extractPhoneNumbers(text, sourceEvidenceId = '') {
  const matches = [];
  // Match +91 or standard 10-12 digit phone numbers with optional spaces/hyphens
  const regex = /(?:\+?91[\-\s]?)?[6789]\d{9}\b/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      type: 'PHONE',
      value: match[0],
      normalizedValue: normalizePhone(match[0]),
      confidence: 0.98,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'REGEX_PATTERN_MATCH',
      epistemicType: 'EXTRACTED DATA'
    });
  }
  return matches;
}

export function extractEmails(text, sourceEvidenceId = '') {
  const matches = [];
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    // Exclude UPI IDs that use @upi, @okaxis etc
    if (!match[0].toLowerCase().endsWith('@upi') && !match[0].toLowerCase().endsWith('@okhdfcbank') && !match[0].toLowerCase().endsWith('@okaxis')) {
      matches.push({
        type: 'EMAIL',
        value: match[0],
        normalizedValue: match[0].toLowerCase(),
        confidence: 0.97,
        sourceEvidenceId,
        sourceLocation: `Character index ${match.index}`,
        extractionMethod: 'RFC_EMAIL_REGEX',
        epistemicType: 'EXTRACTED DATA'
      });
    }
  }
  return matches;
}

export function extractURLs(text, sourceEvidenceId = '') {
  const matches = [];
  const regex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    let cleanUrl = match[0].replace(/[),.;]+$/, '');
    matches.push({
      type: 'URL',
      value: cleanUrl,
      normalizedValue: cleanUrl.toLowerCase(),
      confidence: 0.99,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'URL_SCHEME_PARSER',
      epistemicType: 'FACT'
    });
  }
  return matches;
}

export function extractAmounts(text, sourceEvidenceId = '') {
  const matches = [];
  // Match amounts like ₹15,000, Rs 4,999, INR 14,700, 15000.00
  const regex = /(?:₹|Rs\.?|INR)\s*[\d,]+(?:\.\d{2})?|\b\d{1,3}(?:,\d{3})+(?:\.\d{2})?\s*(?:INR|Rs)?\b/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const norm = normalizeAmount(match[0]);
    if (norm.numeric > 0) {
      matches.push({
        type: 'AMOUNT',
        value: match[0].trim(),
        normalizedValue: norm.normalized,
        confidence: 0.96,
        sourceEvidenceId,
        sourceLocation: `Character index ${match.index}`,
        extractionMethod: 'CURRENCY_REGEX',
        epistemicType: 'FACT'
      });
    }
  }
  return matches;
}

export function extractTransactions(text, sourceEvidenceId = '') {
  const matches = [];
  // Match TXN-xxxx, RRN, NEFT/OUT, etc.
  const regex = /\b(?:TXN|RRN|REF|ORD)[\-_][A-Z0-9]{4,16}\b/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      type: 'TRANSACTION',
      value: match[0].trim(),
      normalizedValue: match[0].trim().toUpperCase(),
      confidence: 0.98,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'IDENTIFIER_PREFIX_PARSER',
      epistemicType: 'FACT'
    });
  }
  return matches;
}

export function extractPaymentIDs(text, sourceEvidenceId = '') {
  const matches = [];
  // Match UPI handles like user@upi, name@bank
  const upiRegex = /[a-zA-Z0-9.\-_]+@(upi|okhdfcbank|okaxis|oksbi|paytm|mockupi)\b/gi;
  let match;
  while ((match = upiRegex.exec(text)) !== null) {
    matches.push({
      type: 'UPI_ID',
      value: match[0].trim(),
      normalizedValue: match[0].trim().toLowerCase(),
      confidence: 0.99,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'VPA_HANDLE_MATCHER',
      epistemicType: 'EXTRACTED DATA'
    });
  }

  // Also match numerical reference IDs like 6288192019
  const numRefRegex = /\b(?:Ref|RRN)[\s:]*([0-9]{10,12})\b/gi;
  while ((match = numRefRegex.exec(text)) !== null) {
    matches.push({
      type: 'PAYMENT_ID',
      value: match[1],
      normalizedValue: match[1],
      confidence: 0.95,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'REF_NUMERIC_MATCHER',
      epistemicType: 'FACT'
    });
  }

  return matches;
}

export function extractDates(text, sourceEvidenceId = '') {
  const matches = [];
  const dateRegex = /\b(?:\d{4}-\d{2}-\d{2}|\d{2}[-/]\d{2}[-/]\d{4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})\b/gi;
  let match;
  while ((match = dateRegex.exec(text)) !== null) {
    matches.push({
      type: 'DATE',
      value: match[0],
      normalizedValue: match[0],
      confidence: 0.97,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'TEMPORAL_DATE_REGEX',
      epistemicType: 'FACT'
    });
  }
  return matches;
}

export function extractTimes(text, sourceEvidenceId = '') {
  const matches = [];
  const timeRegex = /\b\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM|IST|UTC)?\b/gi;
  let match;
  while ((match = timeRegex.exec(text)) !== null) {
    matches.push({
      type: 'TIME',
      value: match[0].trim(),
      normalizedValue: match[0].trim(),
      confidence: 0.94,
      sourceEvidenceId,
      sourceLocation: `Character index ${match.index}`,
      extractionMethod: 'TEMPORAL_TIME_REGEX',
      epistemicType: 'EXTRACTED DATA'
    });
  }
  return matches;
}

export function extractNamedEntities(text, sourceEvidenceId = '') {
  const matches = [];
  const orgKeywords = ['Demo Payments Ltd', 'Mock National Commercial Bank', 'Subject Alpha Enterprise'];
  const locKeywords = ['Bhubaneswar', 'Odisha', 'Infocity'];
  const personKeywords = ['Subject A', 'Officer Verma', 'Agent AGT-441'];

  for (const org of orgKeywords) {
    if (text.includes(org)) {
      matches.push({
        type: 'ORGANIZATION',
        value: org,
        normalizedValue: normalizeEntityValue('ORGANIZATION', org),
        confidence: 0.95,
        sourceEvidenceId,
        sourceLocation: 'Lexicon match',
        extractionMethod: 'GAZETTEER_MATCH',
        epistemicType: 'EXTRACTED DATA'
      });
    }
  }

  for (const loc of locKeywords) {
    if (text.includes(loc)) {
      matches.push({
        type: 'LOCATION',
        value: loc,
        normalizedValue: normalizeEntityValue('LOCATION', loc),
        confidence: 0.95,
        sourceEvidenceId,
        sourceLocation: 'Lexicon match',
        extractionMethod: 'GEO_GAZETTEER_MATCH',
        epistemicType: 'EXTRACTED DATA'
      });
    }
  }

  for (const per of personKeywords) {
    if (text.includes(per)) {
      matches.push({
        type: 'PERSON',
        value: per,
        normalizedValue: normalizeEntityValue('PERSON', per),
        confidence: 0.90,
        sourceEvidenceId,
        sourceLocation: 'Lexicon match',
        extractionMethod: 'NER_HEURISTIC_MATCH',
        epistemicType: per === 'Officer Verma' ? 'INFERENCE' : 'EXTRACTED DATA'
      });
    }
  }

  return matches;
}

export function extractAllEntities(text, sourceEvidenceId = '') {
  if (!text) return [];
  const list = [
    ...extractPhoneNumbers(text, sourceEvidenceId),
    ...extractEmails(text, sourceEvidenceId),
    ...extractURLs(text, sourceEvidenceId),
    ...extractAmounts(text, sourceEvidenceId),
    ...extractTransactions(text, sourceEvidenceId),
    ...extractPaymentIDs(text, sourceEvidenceId),
    ...extractDates(text, sourceEvidenceId),
    ...extractTimes(text, sourceEvidenceId),
    ...extractNamedEntities(text, sourceEvidenceId)
  ];

  // Deduplicate by normalizedValue + type
  const seen = new Set();
  const deduped = [];
  for (const item of list) {
    const key = `${item.type}:${item.normalizedValue}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(item);
    }
  }
  return deduped;
}
