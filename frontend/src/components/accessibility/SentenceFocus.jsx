import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';
import { BionicText } from './BionicText.jsx';

/**
 * SentenceFocusBlock
 * Splits text into individual sentences that can be isolated and highlighted
 * when Sentence Focus Mode is active.
 */
export function SentenceFocusBlock({ text, children, className = '' }) {
  const { sentenceFocus } = useAccessibility();
  const [activeIdx, setActiveIdx] = useState(null);

  // If children are provided, wrap in focus area
  if (!text && children) {
    return (
      <div className={`sentence-focus-area ${className}`}>
        {children}
      </div>
    );
  }

  if (typeof text !== 'string') return <div className={className}>{text}</div>;

  // Split into sentences (by period, exclamation, question mark followed by space or end)
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [text];

  if (!sentenceFocus) {
    return (
      <div className={`reading-content ${className}`}>
        <BionicText>{text}</BionicText>
      </div>
    );
  }

  return (
    <div className={`sentence-focus-area reading-content ${className}`}>
      {sentences.map((sentence, idx) => (
        <span
          key={idx}
          tabIndex={0}
          onMouseEnter={() => setActiveIdx(idx)}
          onMouseLeave={() => setActiveIdx(null)}
          onFocus={() => setActiveIdx(idx)}
          onBlur={() => setActiveIdx(null)}
          className={`sentence-item inline ${activeIdx === idx ? 'sentence-active' : ''}`}
          role="region"
          aria-label={`Sentence ${idx + 1}`}
        >
          <BionicText>{sentence}</BionicText>
          {idx < sentences.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  );
}
