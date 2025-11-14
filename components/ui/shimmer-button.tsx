"use client";

import { useEffect, useRef } from "react";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  children: React.ReactNode;
}

export function ShimmerButton({
  shimmerColor = "#E08A20",
  shimmerSize = "0.1em",
  borderRadius = "16px",
  shimmerDuration = "2s",
  background = "linear-gradient(135deg, rgba(224, 138, 32, 0.8), rgba(240, 160, 64, 0.9))",
  children,
  className = "",
  ...props
}: ShimmerButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty("--x", `${x}px`);
      button.style.setProperty("--y", `${y}px`);
    };

    button.addEventListener("mousemove", handleMouseMove);
    return () => button.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`group relative overflow-hidden px-6 py-3 font-semibold text-white transition-all duration-300 ${className}`}
      style={
        {
          background,
          borderRadius,
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--shimmer-duration": shimmerDuration,
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer effect */}
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${shimmerColor} 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />
      
      {/* Animated shine */}
      <span
        className="absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
          pointerEvents: "none",
        }}
      />
    </button>
  );
}
