"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { getScrollProgress } from "./scroll-progress-utils.mjs";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const root = document.documentElement;
      setProgress(getScrollProgress(root.scrollTop, root.scrollHeight, root.clientHeight));
    };

    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The gallery filters and late-loading assets can change page height.
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  function backToTop() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <button
      className="scroll-dial"
      type="button"
      onClick={backToTop}
      aria-label={`Page progress: ${progress}%. Back to top`}
      title="Back to top"
    >
      <span className="scroll-dial-label" aria-hidden="true">
        <small>Page progress</small>
        <span className="scroll-dial-value">{progress}%</span>
      </span>
      <span className="scroll-dial-ring" aria-hidden="true">
        <svg viewBox="0 0 42 42" focusable="false">
          <circle className="scroll-dial-track" cx="21" cy="21" r="18" />
          <circle className="scroll-dial-fill" cx="21" cy="21" r="18" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} />
        </svg>
        <ArrowUp className="scroll-dial-arrow" size={18} />
      </span>
    </button>
  );
}
