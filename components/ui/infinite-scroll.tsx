"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, PanInfo } from 'framer-motion';

export interface ScrollingItem {
  id: string;
  name: string;
  image: string;
}

interface InfiniteScrollProps {
  items: ScrollingItem[];
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  direction = 'left',
  speed = 40,
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Duplicate items enough times to ensure smooth looping
  // We need enough copies to fill the screen width + buffer
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    if (containerRef.current) {
      // Calculate single set width (approximate based on children)
      // This is a simplification; for perfect looping we need exact measurement
      // Assuming uniform width for simplicity or measuring the first set
      const scrollWidth = containerRef.current.scrollWidth;
      setContentWidth(scrollWidth / 4); // Since we quadrupled the items
    }
  }, [items]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      
      if (!isDragging && contentWidth > 0) {
        const moveAmount = (speed * delta) / 1000;
        let currentX = x.get();

        if (direction === 'left') {
          currentX -= moveAmount;
          if (currentX <= -contentWidth) {
            currentX += contentWidth;
          }
        } else {
          currentX += moveAmount;
          if (currentX >= 0) {
            currentX -= contentWidth;
          }
        }

        x.set(currentX);
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging, contentWidth, direction, speed, x]);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
  };

  return (
    <div className={`relative overflow-hidden py-4 ${className}`}>
      <motion.div
        ref={containerRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -contentWidth * 2, right: 0 }} // Loose constraints
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        whileHover={pauseOnHover ? { scale: 1.0 } : {}}
        onHoverStart={() => pauseOnHover && setIsDragging(true)}
        onHoverEnd={() => pauseOnHover && setIsDragging(false)}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 group select-none"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 glass-morphism rounded-2xl flex items-center justify-center border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-110 relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col items-center justify-center p-2 sm:p-3 pointer-events-none">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-8 h-8 sm:w-12 sm:h-12 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48/333/fff?text=' + item.name.charAt(0);
                  }}
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground text-center font-medium group-hover:text-primary transition-colors duration-300 line-clamp-1 w-full">
                  {item.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
