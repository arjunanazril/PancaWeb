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
  scrubDistance = 2600,
  className,
  style,
}: ScrollLockedVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
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
    let hasStartedScrolling = false;
    let locked = false;
    let lockedScrollY = 0;
    let touchStartY = 0;
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

    function engageLock() {
      if (locked) return;
      locked = true;
      lockedScrollY = window.scrollY;
      const bodyStyle = document.body.style;
      bodyStyle.position = "fixed";
      bodyStyle.top = `-${lockedScrollY}px`;
      bodyStyle.left = "0";
      bodyStyle.right = "0";
      bodyStyle.width = "100%";
    }

    function releaseLock(scrollToY = lockedScrollY) {
      if (!locked) return;
      locked = false;
      const bodyStyle = document.body.style;
      bodyStyle.position = "";
      bodyStyle.top = "";
      bodyStyle.left = "";
      bodyStyle.right = "";
      bodyStyle.width = "";
      window.scrollTo(0, scrollToY);
    }

    function sectionIsAtTop() {
      const rect = activeSection.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom > window.innerHeight * 0.4;
    }

    function addDelta(deltaY: number) {
      if (!locked && sectionIsAtTop()) engageLock();
      if (!locked) return;

      if (targetProgress >= 0.995 && deltaY > 0) {
        targetProgress = 1;
        releaseLock(lockedScrollY + activeSection.offsetHeight - window.innerHeight + 1);
        return;
      }

      if (targetProgress <= 0.005 && deltaY < 0) {
        targetProgress = 0;
        releaseLock(Math.max(0, lockedScrollY - 1));
        return;
      }

      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1);
      if (targetProgress > 0.001) hasStartedScrolling = true;
    }

    const onWheel = (event: WheelEvent) => {
      if (locked || sectionIsAtTop()) {
        addDelta(event.deltaY);
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchStartY;
      const deltaY = touchStartY - y;
      touchStartY = y;
      if (locked || sectionIsAtTop()) {
        addDelta(deltaY);
        event.preventDefault();
      }
    };

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

      if (hintRef.current) hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1";

      if (taglineRef.current) {
        const opacity = clamp((currentProgress - 0.72) / 0.24, 0, 1);
        taglineRef.current.style.opacity = String(opacity);
        taglineRef.current.style.transform = `translateY(${(1 - opacity) * 18}px) scale(${0.97 + opacity * 0.03})`;
        taglineRef.current.style.filter = `blur(${(1 - opacity) * 7}px)`;
      }

      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${currentProgress})`;

      rafId = requestAnimationFrame(frame);
    }

    activeVideo.addEventListener("loadeddata", onLoadedData);
    activeVideo.addEventListener("seeked", onSeeked);

    if (!reduceMotion) {
      engageLock();
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      activeVideo.removeEventListener("loadeddata", onLoadedData);
      activeVideo.removeEventListener("seeked", onSeeked);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafId);
      releaseLock();
    };
  }, [scrubDistance]);

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: "#112A4F",
        ...style,
      }}
      aria-label="Pembuka lima sila Pancasila"
    >
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,215,0,0.22),transparent_34%)]" />

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

      <div ref={hintRef} className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-white/75 transition-opacity">
        <span>{scrollHint}</span>
        <span className="h-8 w-px animate-pulse bg-gold" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/15">
        <div ref={progressBarRef} className="h-full w-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
