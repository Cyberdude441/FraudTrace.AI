import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';

/**
 * Transforms a single plain word into Bionic Reading format
 * Bolds the fixation point (first ~40-50% of characters)
 */
export function bionicWord(word) {
  if (!word || word.length <= 1) return word;

  // Preserve leading/trailing punctuation
  const match = word.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/);
  if (!match) return word;

  const [, leading, core, trailing] = match;
  if (!core) return word;

  // Exclude technical IDs, codes, all-caps acronyms (NPCI, KYC, SMS, UPI), or single chars
  if (/^(EVD|CASE|TXN|INC|ACC|CDR|BTS|DNS|KYC|NPCI|RRN|URL|HTTP|SSL|SHA|UPI|API|DR|CR)\b/i.test(core)) {
    return word;
  }
  if (/^[A-Z0-9_-]{3,}$/.test(core) || /^\d+$/.test(core)) {
    return word;
  }

  // Calculate fixation length
  const len = core.length;
  let fixLen = 1;
  if (len === 2) fixLen = 1;
  else if (len === 3) fixLen = 2;
  else if (len <= 5) fixLen = 2;
  else if (len <= 8) fixLen = 3;
  else if (len <= 11) fixLen = 4;
  else fixLen = Math.min(Math.ceil(len * 0.45), 6);

  const boldPart = core.slice(0, fixLen);
  const restPart = core.slice(fixLen);

  return (
    <>
      {leading}
      <strong className="bionic-fixation">{boldPart}</strong>
      {restPart}
      {trailing}
    </>
  );
}

/**
 * Transforms a full string into Bionic Reading JSX tokens
 */
export function renderBionicText(text) {
  if (typeof text !== 'string') return text;

  // Split by whitespace while preserving delimiters
  const tokens = text.split(/(\s+)/);

  return tokens.map((token, idx) => {
    // If it's whitespace, return directly
    if (/^\s+$/.test(token)) return token;

    // Check if token looks like a URL, email, or telephone
    if (
      token.includes('://') ||
      token.includes('@') ||
      token.startsWith('+') ||
      token.startsWith('₹') ||
      /^https?:/i.test(token)
    ) {
      return token;
    }

    return (
      <React.Fragment key={idx}>
        {bionicWord(token)}
      </React.Fragment>
    );
  });
}

/**
 * BionicText Component
 * Renders children with Bionic Reading fixation when enabled in AccessibilityContext
 */
export function BionicText({ children, className = '', as = 'span' }) {
  const { bionicReading } = useAccessibility();
  const Tag = as;

  if (!bionicReading) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (typeof children === 'string') {
    return <Tag className={className}>{renderBionicText(children)}</Tag>;
  }

  // If children is an array or React elements, handle safely
  if (Array.isArray(children)) {
    return (
      <Tag className={className}>
        {children.map((child, i) =>
          typeof child === 'string' ? (
            <React.Fragment key={i}>{renderBionicText(child)}</React.Fragment>
          ) : (
            child
          )
        )}
      </Tag>
    );
  }

  return <Tag className={className}>{children}</Tag>;
}
