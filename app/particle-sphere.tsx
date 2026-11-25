"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { SECTION_COLORS, createSpherePoints, createSphereEdges, scrollFraction, activeSectionIndex } from "./particle-sphere-utils.mjs";

const POINTS = createSpherePoints(130);
const EDGES = createSphereEdges(POINTS);
const SECTION_IDS = ["about", "projects", "skills", "experience", "contact"];
const SIZE = 60;

export default function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const refreshRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let lastTime = 0;
    let lastPaint = 0;
    let angle = 0;
    let targetScroll = 0;
    let scroll = 0;
    let speed = 0;
    let section = 0;
    let color = [...SECTION_COLORS[0]];
    let sections: number[] = [];

    function resizeCanvas() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas!.width !== Math.round(SIZE*dpr) || canvas!.height !== Math.round(SIZE*dpr)) {
        canvas!.width = Math.round(SIZE*dpr);
        canvas!.height = Math.round(SIZE*dpr);
      }
      ctx!.setTransform(canvas!.width/SIZE, 0, 0, canvas!.height/SIZE, 0, 0);
    }

    function measureSections() {
      sections = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
    }

    function updateScroll() {
      const root = document.documentElement;
      const next = scrollFraction(window.scrollY, root.scrollHeight, root.clientHeight);
      speed = Math.min(1, speed + Math.abs(next - targetScroll)*22);
      targetScroll = next;
      section = activeSectionIndex(sections, window.scrollY + Math.min(180, window.innerHeight*0.25), next >= 0.999 && root.scrollHeight > root.clientHeight);
      requestDraw();
    }

    function draw(time: number) {
      frame = null;
      if (document.hidden) return;
      const animate = !motion.matches && !pausedRef.current;
      if (animate && lastPaint && time - lastPaint < 30) {
        requestDraw();
        return;
      }
      const dt = lastTime ? Math.min(0.05, Math.max(0, (time-lastTime)/1000)) : 0;
      lastTime = time;
      lastPaint = time;
      if (animate) {
        const ease = 1-Math.exp(-dt*9);
        scroll += (targetScroll-scroll)*ease;
        angle += dt*(0.38 + speed*1.9);
        speed *= Math.exp(-dt*4);
        color = color.map((v,i)=>v+(SECTION_COLORS[section][i]-v)*ease);
      } else {
        scroll = targetScroll;
        color = [...SECTION_COLORS[section]];
        speed = 0;
      }

      ctx!.clearRect(0,0,SIZE,SIZE);
      const yaw = angle + (animate ? scroll*5 : 0);
      const pitch = 0.42 + (animate ? scroll*0.35 : 0);
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const cx = Math.cos(pitch), sx = Math.sin(pitch);
      const stretch = animate ? 1 + scroll*0.08 + speed*0.035 : 1;
      const squash = animate ? 1 - scroll*0.09 : 1;
      const radius = 22;
      const rgb = color.map(Math.round).join(",");
      const projected = POINTS.map((point, index) => {
        const x = point.x*cy - point.z*sy;
        const z1 = point.x*sy + point.z*cy;
        const y = point.y*cx - z1*sx;
        const z = point.y*sx + z1*cx;
        const scale = 3.6/(3.6-z);
        return { x: 30+x*radius*stretch*scale, y: 30+y*radius*squash*scale, z, scale, index };
      });

      ctx!.lineWidth = 0.55;
      for (const [i,j] of EDGES) {
        const a = projected[i], b = projected[j];
        if (a.z < -0.1 || b.z < -0.1) continue;
        ctx!.strokeStyle = "rgba("+rgb+",0.15)";
        ctx!.beginPath();
        ctx!.moveTo(a.x,a.y);
        ctx!.lineTo(b.x,b.y);
        ctx!.stroke();
      }
      for (const point of [...projected].sort((a,b)=>a.z-b.z)) {
        const depth = (point.z+1)/2;
        ctx!.fillStyle = "rgba("+rgb+","+(0.18+depth*0.78)+")";
        ctx!.beginPath();
        ctx!.arc(point.x,point.y,0.78+depth*0.86,0,Math.PI*2);
        ctx!.fill();
      }
      if (animate) requestDraw();
    }

    function requestDraw() {
      if (frame === null && !document.hidden) frame = window.requestAnimationFrame(draw);
    }

    function refresh() {
      resizeCanvas();
      measureSections();
      updateScroll();
    }

    function onMotionChange() {
      setReduced(motion.matches);
      lastTime = 0;
      requestDraw();
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
      } else {
        lastTime = 0;
        refresh();
      }
    }

    refreshRef.current = () => { lastTime = 0; requestDraw(); };
    setReduced(motion.matches);
    refresh();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(refresh);
    observer?.observe(document.body);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", refresh);
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      refreshRef.current = null;
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", refresh);
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  function toggleAnimation() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    refreshRef.current?.();
  }

  function backToTop() {
    window.scrollTo({ top: 0, behavior: reduced || paused ? "instant" : "smooth" });
  }

  return (
    <div className="particle-sphere-control">
      <button className="particle-sphere-button" type="button" onClick={backToTop} aria-label="Back to top" title="Back to top">
        <canvas className="particle-sphere-canvas" ref={canvasRef} width={60} height={60} aria-hidden="true" />
      </button>
      {!reduced && (
        <button className="particle-sphere-toggle" type="button" onClick={toggleAnimation}
          aria-label={paused ? "Resume particle animation" : "Pause particle animation"}
          title={paused ? "Resume animation" : "Pause animation"}>
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}
