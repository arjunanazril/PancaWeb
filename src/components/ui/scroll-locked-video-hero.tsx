"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface ScrollLockedVideoHeroProps {
  videoSrc?: string;
  title?: string;
  scrollHint?: string;
  tagline?: string;
  scrubDistance?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_VIDEO = "https://raw.githubusercontent.com/gughigug/metro-hero-assets/main/Subway_doors_open_to_city_202608242331.mp4";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ScrollLockedVideoHero({
  videoSrc = DEFAULT_VIDEO,
  title = "LIMA SILA",
  scrollHint = "GULIR",
  tagline = "Sebagai arah hidup bersama.",
  scrubDistance = 2200,
  className,
  style,
}: ScrollLockedVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const activeVideo = video;
    const activeSection = section;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let duration = 0;
    let rafId = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let isSeeking = false;
    let pendingTime: number | null = null;

    const onLoadedData = () => {
      duration = activeVideo.duration || 0;
      setReady(true);
      if (reduceMotion && duration > 0) activeVideo.currentTime = duration * 0.88;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const time = pendingTime;
        pendingTime = null;
        isSeeking = true;
        activeVideo.currentTime = time;
      }
    };

    function seekTo(time: number) {
      if (isSeeking) {
        pendingTime = time;
        return;
      }
      isSeeking = true;
      activeVideo.currentTime = time;
    }

    function updateProgress() {
      const rect = activeSection.getBoundingClientRect();
      const scrollable = Math.max(1, activeSection.offsetHeight - window.innerHeight);
      targetProgress = clamp(-rect.top / scrollable, 0, 1);
    }

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.16;

      if (duration > 0) seekTo(currentProgress * duration);

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1 + currentProgress * 0.05})`;
      }

      if (titleRef.current) {
        const opacity = 1 - clamp(currentProgress / 0.35, 0, 1);
        titleRef.current.style.opacity = String(opacity);
        titleRef.current.style.transform = `translateY(${(1 - opacity) * -24}px) scale(${0.96 + opacity * 0.04})`;
        titleRef.current.style.filter = `blur(${(1 - opacity) * 8}px)`;
      }

      if (hintRef.current) hintRef.current.style.opacity = currentProgress > 0.08 ? "0" : "1";

      if (taglineRef.current) {
        const opacity = clamp((currentProgress - 0.72) / 0.24, 0, 1);
        taglineRef.current.style.opacity = String(opacity);
        taglineRef.current.style.transform = `translateY(${(1 - opacity) * 18}px) scale(${0.97 + opacity * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - opacity) * 7}px)`;
      }

      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${currentProgress})`;

      if (archiveRef.current) {
        const opacity = clamp((currentProgress - 0.18) / 0.42, 0, 1);
        archiveRef.current.style.opacity = String(opacity);
        archiveRef.current.style.transform = `translateY(${(1 - opacity) * 32}px)`;
      }

      rafId = requestAnimationFrame(frame);
    }

    activeVideo.addEventListener("loadeddata", onLoadedData);
    activeVideo.addEventListener("seeked", onSeeked);

    if (!reduceMotion) {
      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress, { passive: true });
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      activeVideo.removeEventListener("loadeddata", onLoadedData);
      activeVideo.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(rafId);
    };
  }, [scrubDistance]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: `calc(100svh + ${scrubDistance}px)`,
        width: "100%",
        background: "#07111f",
        ...style,
      }}
      aria-label="Pembuka lima sila Pancasila"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 0.82 : 0,
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,42,79,0.68),rgba(17,42,79,0.24)_38%,rgba(200,16,46,0.36)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,215,0,0.22),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:auto,72px_72px,72px_72px]" />

      <div ref={titleRef} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold md:text-sm">PancaRuang</p>
          <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-white drop-shadow-2xl md:text-8xl">{title}</h1>
        </div>
      </div>

      {tagline ? (
        <div ref={taglineRef} className="pointer-events-none absolute inset-0 flex items-center justify-center px-8 text-center opacity-0">
          <p className="max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] text-white drop-shadow-2xl md:text-6xl">{tagline}</p>
        </div>
      ) : null}

      <div ref={archiveRef} className="pointer-events-none absolute inset-x-4 bottom-24 mx-auto max-w-4xl opacity-0 md:bottom-20">
        <div className="grid gap-3 rounded-[2rem] border border-white/15 bg-white/10 p-4 text-white shadow-2xl backdrop-blur-xl md:grid-cols-3 md:p-5">
          {["Nilai", "Ruang", "Aksi"].map((item, index) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-navy/35 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">0{index + 1}</p>
              <p className="mt-2 text-lg font-black">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={hintRef} className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/75 transition-opacity">
        <span>{scrollHint}</span>
        <span className="h-8 w-px animate-pulse bg-gold" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
        <div ref={progressBarRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
      </div>
      </div>
    </section>
  );
}
