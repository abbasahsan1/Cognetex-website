'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Note: This component uses GSAP's SplitText and ScrambleTextPlugin which are premium plugins
// For production, you'll need GSAP membership or use an alternative approach

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}: ScrambledTextProps) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || typeof window === 'undefined') return;

    const textContent = rootRef.current.querySelector('p');
    if (!textContent) return;

    // Fallback implementation without premium GSAP plugins
    const handleMove = (e: PointerEvent) => {
      if (!textContent) return;
      
      const { left, top, width, height } = textContent.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        const intensity = 1 - dist / radius;
        textContent.style.filter = `blur(${intensity * 2}px)`;
        textContent.style.transform = `scale(${1 + intensity * 0.02})`;
      } else {
        textContent.style.filter = 'blur(0px)';
        textContent.style.transform = 'scale(1)';
      }
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove as EventListener);

    return () => {
      el.removeEventListener('pointermove', handleMove as EventListener);
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div
      ref={rootRef}
      className={`max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white ${className}`}
      style={style}
    >
      <p className="transition-all duration-200 will-change-[filter,transform]">{children}</p>
    </div>
  );
};

export default ScrambledText;

