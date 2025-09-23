'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

interface MissionTextProps {
  className?: string;
}

export default function MissionText({ className = '' }: MissionTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const animationConfig = useMemo(
    () => ({
      from: {
        opacity: 1,
        y: 0,
        color: '#9CA3AF',
        textDecorationColor: 'transparent',
      },
      to: {
        opacity: 1,
        y: 0,
        color: '#ffffff',
        textDecorationColor: '#ffffff',
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.05,
        delay: 2,
        repeat: -1,
        repeatDelay: 2,
      },
    }),
    []
  );

  const setupAnimation = useCallback(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    if (chars.length === 0) return;

    const animation = gsap.fromTo(chars, animationConfig.from, {
      ...animationConfig.to,
      willChange: 'color, text-decoration-color',
      force3D: true,
      immediateRender: false,
      lazy: true,
    });

    return () => {
      animation.kill();
    };
  }, [animationConfig]);

  useEffect(() => {
    const cleanup = setupAnimation();
    return cleanup;
  }, [setupAnimation]);

  const missionContent = useMemo(() => {
    const firstPhrase = 'Our mission is';
    const rest =
      'to empower anyone, anywhere, to transform bold ideas into impactful projects with transparency, community, and accountability at the core.';

    return { firstPhrase, rest, words: rest.split(' ') };
  }, []);

  return (
    <div
      className={`flex max-w-[34rem] flex-col items-center justify-center px-6 text-center sm:h-full sm:w-full sm:text-lg md:h-full md:w-[80%] ${className}`}
    >
      <h2
        ref={containerRef}
        id='mission-heading'
        className='text-xl leading-relaxed sm:text-3xl md:text-2xl'
        aria-label={`${missionContent.firstPhrase} ${missionContent.rest}`}
      >
        <span className='mr-1 text-white underline decoration-white underline-offset-4'>
          {missionContent.firstPhrase}
        </span>
        {missionContent.words.map((word, wordIndex) => (
          <span key={wordIndex} className='inline-block whitespace-nowrap'>
            {Array.from(word).map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className='char inline-block whitespace-pre text-gray-400 underline decoration-transparent underline-offset-4'
                aria-hidden='true'
              >
                {char}
              </span>
            ))}
            {wordIndex < missionContent.words.length - 1 && (
              <span
                className='char inline-block whitespace-pre text-gray-400 underline decoration-transparent underline-offset-4'
                aria-hidden='true'
              >
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </h2>
    </div>
  );
}
