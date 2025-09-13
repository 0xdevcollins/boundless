"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

export function useFadeGradient(
  refs: RefObject<SVGStopElement | null>[],
  duration = 1.5,
  delay = 1
) {
  useEffect(() => {
    const stops = refs
      .map((r) => r.current)
      .filter((el): el is SVGStopElement => el !== null);

    if (stops.length < 2) return;

    const tween = gsap.fromTo(
      stops,
      { stopOpacity: 0 },
      {
        stopOpacity: 1,
        duration,
        delay,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
        ease: "power1.inOut",
      }
    );

    return () => {
      tween.kill();
    };
  }, [refs, duration, delay]);
}