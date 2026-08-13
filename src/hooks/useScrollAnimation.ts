"use client";

import { useEffect, useRef, useState, startTransition } from "react";

interface UseRevealOptions {
  className?: string;
  threshold?: number;
  target?: string;
}

export function useReveal({
  className = "visible",
  threshold = 0.2,
  target,
}: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (target) {
      const elements = el.querySelectorAll(target);
      if (prefersReduced) {
        elements.forEach((element) => element.classList.add(className));
        startTransition(() => setIsVisible(true));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          let changed = false;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(className);
              changed = true;
            }
          });
          if (changed) {
            startTransition(() => setIsVisible(true));
          }
        },
        { threshold }
      );

      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }

    if (prefersReduced) {
      el.classList.add(className);
      startTransition(() => setIsVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            startTransition(() => setIsVisible(true));
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [className, threshold, target]);

  return { ref, isVisible };
}
