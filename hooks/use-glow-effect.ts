import { useEffect, useRef, useState } from 'react';

interface GlowEffectOptions {
  enabled?: boolean;
  color?: string;
  intensity?: number;
  size?: number;
  blur?: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export const useGlowEffect = (options: GlowEffectOptions = {}) => {
  const {
    enabled = true,
    color = 'rgba(255, 255, 255, 0.4)',
    intensity = 0.8,
    size = 200,
    blur = 40,
  } = options;

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      // setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  const glowStyle = enabled
    ? ({
        '--glow-x': `${mousePosition.x}px`,
        '--glow-y': `${mousePosition.y}px`,
        '--glow-color': color,
        '--glow-intensity': intensity,
        '--glow-size': `${size}px`,
        '--glow-blur': `${blur}px`,
      } as React.CSSProperties)
    : {};

  return {
    containerRef,
    glowStyle,
    mousePosition,
  };
};
