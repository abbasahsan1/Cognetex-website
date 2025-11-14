"use client";

import { useEffect, useRef, useState } from "react";

interface GradualSpacingProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  delayMultiple?: number;
}

export function GradualSpacing({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  delayMultiple = 0.04,
}: GradualSpacingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0)",
            letterSpacing: isVisible ? "0.1em" : "0.5em",
            transition: `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${
              delay + index * delayMultiple
            }s`,
            willChange: "opacity, transform, letter-spacing",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
