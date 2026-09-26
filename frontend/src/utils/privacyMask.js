/**
 * FraudTrace AI - Privacy Layer Masking Utilities
 * Anonymizes sensitive digital identifiers across views and reports
 */

export function maskPhone(phone, enabled = true) {
  if (!enabled || !phone) return phone;
  const str = String(phone).trim();
  // Keep country code and last 3 digits, mask middle e.g. +91 XXXXXXX210
  if (str.length >= 10) {
    const prefix = str.startsWith('+91') ? '+91 ' : str.startsWith('+') ? str.slice(0, 3) + ' ' : '';
    const last3 = str.slice(-3);
    return `${prefix}XXXXXXX${last3}`;
  }
  return 'XXXXXXX' + str.slice(-2);
}

export function maskEmail(email, enabled = true) {
  if (!enabled || !email) return email;
  const parts = String(email).split('@');
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  const maskedName = name.length > 2 ? `${name[0]}***${name[name.length - 1]}` : `${name[0]}***`;
  return `${maskedName}@${domain}`;
}

export function maskAccount(account, enabled = true) {
  if (!enabled || !account) return account;
  const str = String(account).trim();
  if (str.length > 6) {
    return `ACC-XXXXX-${str.slice(-4)}`;
  }
  return 'ACC-XXXXXX';
}

export function maskUpi(upi, enabled = true) {
  if (!enabled || !upi) return upi;
  const parts = String(upi).split('@');
  if (parts.length !== 2) return upi;
  return `${parts[0].slice(0, 2)}***@${parts[1]}`;
}

export function maskName(name, enabled = true) {
  if (!enabled || !name) return name;
  const str = String(name).trim();
  if (str.toLowerCase().startsWith('subject')) return str; // keep generic Subject tags
  const parts = str.split(' ');
  return parts.map(p => p[0] + '***').join(' ');
}

export function maskGeneric(val, type, options = {}) {
  const { maskAll = false, phones = true, emails = true, accounts = true, upis = true, names = true } = options;
  if (!maskAll && !options.active) return val;

  switch (type) {
    case 'PHONE':
      return maskPhone(val, phones);
    case 'EMAIL':
      return maskEmail(val, emails);
    case 'BANK_ACCOUNT':
      return maskAccount(val, accounts);
    case 'UPI_ID':
      return maskUpi(val, upis);
    case 'PERSON':
      return maskName(val, names);
    default:
      return val;
  }
}
