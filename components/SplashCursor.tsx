"use client"

import { useEffect, useRef, useState } from 'react';

export default function SplashCursor() {
  const [splashPos, setSplashPos] = useState<{ x: number; y: number } | null>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSplashPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseLeave = () => {
      setSplashPos(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!splashPos) return null;

  return (
    <div
      ref={splashRef}
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        left: splashPos.x - 20,
        top: splashPos.y - 20,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-10 h-10 bg-white rounded-full opacity-80 animate-pulse" />
    </div>
  );
} 