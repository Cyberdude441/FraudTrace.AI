/**
 * FraudTrace AI - Entity Normalization Engine
 * Handles deterministic canonicalization of phones, currencies, emails, URLs, dates
 */

export function normalizePhone(rawPhone) {
  if (!rawPhone) return '';
  // Strip non-digits except '+'
  let cleaned = rawPhone.trim().replace(/[^\d+]/g, '');
  if (cleaned.startsWith('00')) cleaned = '+' + cleaned.slice(2);
  // Default India +91 if 10 digits
  if (/^\d{10}$/.test(cleaned)) {
    cleaned = '+91' + cleaned;
  } else if (!cleaned.startsWith('+') && cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = '+' + cleaned;
  }
  return cleaned;
}

export function normalizeAmount(rawAmount) {
  if (!rawAmount) return { normalized: '', numeric: 0, currency: 'INR' };
  let str = String(rawAmount).trim();
  let currency = 'INR';

  if (/usd|\$/i.test(str)) currency = 'USD';
  else if (/eur|€/i.test(str)) currency = 'EUR';

  // Check for 'k' or 'K' e.g. '15k'
  let multiplier = 1;
  if (/(\d+)\s*k\b/i.test(str)) {
    multiplier = 1000;
  }

  // Extract digits and optional decimals
  let numStr = str.replace(/[^\d.]/g, '');
  let val = parseFloat(numStr) || 0;
  val = val * multiplier;

  return {
    normalized: `${val} ${currency}`,
    numeric: val,
    currency
  };
}

export function normalizeEmail(rawEmail) {
  if (!rawEmail) return '';
  return rawEmail.trim().toLowerCase();
}

export function normalizeUrl(rawUrl) {
  if (!rawUrl) return '';
  let cleaned = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }
  try {
    const parsed = new URL(cleaned);
    return parsed.origin + (parsed.pathname !== '/' ? parsed.pathname.replace(/\/+$/, '') : '');
  } catch {
    return cleaned.toLowerCase();
  }
}

export function normalizeEntityValue(type, rawValue) {
  switch (type) {
    case 'PHONE':
      return normalizePhone(rawValue);
    case 'AMOUNT':
      return normalizeAmount(rawValue).normalized;
    case 'EMAIL':
      return normalizeEmail(rawValue);
    case 'URL':
      return normalizeUrl(rawValue);
    case 'UPI_ID':
      return rawValue.trim().toLowerCase();
    case 'TRANSACTION':
    case 'PAYMENT_ID':
    case 'BANK_ACCOUNT':
      return rawValue.trim().toUpperCase().replace(/\s+/g, '');
    case 'PERSON':
    case 'ORGANIZATION':
    case 'LOCATION':
      return rawValue.trim().toUpperCase().replace(/[^A-Z0-9\s]/gi, '').replace(/\s+/g, '_');
    default:
      return rawValue.trim();
  }
}
