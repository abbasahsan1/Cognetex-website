"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  direction = 'left',
  speed = 40,
  pauseOnHover = true,
}) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={pauseOnHover ? { animationPlayState: 'paused' } : {}}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0 group"
          >
            <div className="w-24 h-24 glass-morphism rounded-2xl flex items-center justify-center border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 hover:scale-110 cursor-pointer relative overflow-hidden">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex flex-col items-center justify-center p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-contain mb-2 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/48/333/fff?text=' + item.name.charAt(0);
                  }}
                />
                <span className="text-xs text-muted-foreground text-center font-medium group-hover:text-primary transition-colors duration-300 line-clamp-1 w-full">
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
