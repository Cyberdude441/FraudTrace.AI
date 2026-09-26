import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext.jsx';

/**
 * Reading Ruler Mask
 * Follows cursor Y coordinate with a horizontal spotlight guide and translucent shaded masks
 * Fully non-blocking with pointer-events: none
 */
export function ReadingRuler() {
  const { readingRuler } = useAccessibility();
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    if (!readingRuler) return;

    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingRuler]);

  if (!readingRuler) return null;

  const guideHeight = 44; // Approx line height
  const topMaskHeight = Math.max(0, mouseY - guideHeight / 2);
  const bottomMaskTop = mouseY + guideHeight / 2;

  return (
    <div className="reading-ruler-overlay" aria-hidden="true">
      {/* Top Dimmed Mask */}
      <div 
        className="reading-ruler-top-mask" 
        style={{ height: `${topMaskHeight}px` }} 
      />

      {/* Clear/Highlighted Reading Guide Following Cursor */}
      <div
        className="reading-ruler-guide"
        style={{
          top: `${mouseY - guideHeight / 2}px`,
          height: `${guideHeight}px`
        }}
      />

      {/* Bottom Dimmed Mask */}
      <div 
        className="reading-ruler-bottom-mask" 
        style={{ top: `${bottomMaskTop}px` }} 
      />
    </div>
  );
}
