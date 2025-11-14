"use client";

import { useEffect, useRef, useState } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateBy?: "char" | "word";
}

export function SplitText({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  animateBy = "char",
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
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

  const elements = animateBy === "char" ? text.split("") : text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {elements.map((element, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${
              delay + index * duration
            }s`,
            willChange: "opacity, transform",
          }}
        >
          {element === " " ? "\u00A0" : element}
        </span>
      ))}
    </span>
  );
}
