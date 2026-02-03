"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [26, 26],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);

  return (
    <svg
      viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
      className={cn(
        "absolute inset-0 h-full w-full",
        "rotate-[-12deg] scale-110", // 🔥 diagonal look
        className,
      )}
      {...props}
    >
      {/* FADE MASK */}
      <defs>
        <radialGradient id="fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="white" />
          <stop offset="55%" stopColor="white" />
          <stop offset="75%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="90%" stopColor="transparent" />
        </radialGradient>

        <mask id="fade-mask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>

      <g mask="url(#fade-mask)">
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const x = (index % horizontal) * width;
          const y = Math.floor(index / horizontal) * height;

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={width}
              height={height}
              className={cn(
                "transition-all duration-700 ease-out",
                "stroke-white/20",
                hoveredSquare === index
                  ? "fill-white/20 stroke-white/40"
                  : "fill-transparent",
                squaresClassName,
              )}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          );
        })}
      </g>
    </svg>
  );
}
