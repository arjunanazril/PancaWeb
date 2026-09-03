"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Member = {
  id: string;
  name: string;
  number: string;
  className: string;
  phase: number;
  anchor: { x: number; y: number };
  label: { x: number; y: number; align: "left" | "right" };
  path: string;
};

const members: Member[] = [
  {
    id: "arjuna",
    name: "Arjuna Nazril Ramadhan",
    number: "NO. 08",
    className: "XII TKJ 1",
    phase: 0,
    anchor: { x: 26, y: 35 },
    label: { x: 4, y: 18, align: "left" },
    path: "M 26 35 L 18 35 L 18 24 L 4 24",
  },
  {
    id: "seltin",
    name: "Seltin Siska Sari",
    number: "NO. 34",
    className: "XII TKJ 1",
    phase: 600,
    anchor: { x: 40, y: 66 },
    label: { x: 7, y: 74, align: "left" },
    path: "M 40 66 L 31 66 L 31 80 L 7 80",
  },
  {
    id: "gilang",
    name: "Gilang Aji Sasongko",
    number: "NO. 20",
    className: "XII TKJ 1",
    phase: 1100,
    anchor: { x: 52, y: 34 },
    label: { x: 72, y: 20, align: "right" },
    path: "M 52 34 L 61 34 L 61 26 L 72 26",
  },
  {
    id: "rea",
    name: "Noriswara Realis Isaroh",
    number: "NO. 31",
    className: "XII TKJ 1",
    phase: 1600,
    anchor: { x: 63, y: 68 },
    label: { x: 73, y: 73, align: "right" },
    path: "M 63 68 L 70 68 L 70 79 L 73 79",
  },
  {
    id: "zafreen",
    name: "Zafreen Naulfalendra Fairus",
    number: "NO. 36",
    className: "XII TKJ 1",
    phase: 2100,
    anchor: { x: 75, y: 38 },
    label: { x: 80, y: 44, align: "right" },
    path: "M 75 38 L 80 38 L 80 50 L 93 50",
  },
];

const durations = [3000, 2100, 2300];
const values = ["name", "number", "className"] as const;
let lastSoundAt = 0;

function playGlitchSound(audio: HTMLAudioElement | null) {
  if (!audio) return;
  const now = Date.now();
  if (now - lastSoundAt < 520) return;
  lastSoundAt = now;
  audio.currentTime = 0;
  audio.volume = 0.1;
  void audio.play().catch(() => undefined);
}

function IdentityLabel({ member, active }: { member: Member; active: boolean }) {
  const [valueIndex, setValueIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const enableAudio = () => {
      audioRef.current = new Audio("/audio/glitch-click.mp3");
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };

    window.addEventListener("pointerdown", enableAudio, { once: true });
    window.addEventListener("keydown", enableAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    let timeoutId = 0;
    let cancelled = false;

    const schedule = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        setGlitching(true);
        playGlitchSound(audioRef.current);
        window.setTimeout(() => {
          if (cancelled) return;
          setValueIndex((current) => (current + 1) % values.length);
          setGlitching(false);
          schedule(durations[(valueIndex + 1) % durations.length]);
        }, 360);
      }, delay);
    };

    schedule(durations[valueIndex] + member.phase);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [active, member.phase, valueIndex]);

  const key = values[valueIndex];
  const text = member[key];

  return (
    <div
      className={`team-id-label ${active ? "team-id-label-active" : ""}`}
      data-align={member.label.align}
      style={{ left: `${member.label.x}%`, top: `${member.label.y}%`, transitionDelay: `${member.phase + 650}ms` }}
    >
      <span className="team-id-status" />
      <span className={`team-id-text ${glitching ? "team-id-text-glitch" : ""}`} data-text={text}>{text}</span>
      <span className="team-id-meta">IDENTITY // PANCA-RUANG</span>
    </div>
  );
}

export function TeamIdentificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.32 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="team-identification museum-card my-12 overflow-hidden rounded-[2.75rem] p-5 md:p-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="museum-kicker">Tentang Kami</p>
        <h2 className="museum-heading mt-4 text-4xl md:text-6xl">Tim XII TKJ 1 di balik PancaRuang.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-navy/68 md:text-base">
          Sistem identifikasi holografik ini memetakan lima anggota tim pada foto kelompok. Label akan berganti antara nama, nomor, dan kelas secara pelan.
        </p>
      </div>

      <div className={`team-stage ${active ? "team-stage-active" : ""}`}>
        <div className="team-floor" aria-hidden />
        <div className="team-image-wrap">
          <Image
            src="/images/about/IMG_8572.jpeg"
            alt="Foto kelompok tim PancaRuang XII TKJ 1"
            fill
            sizes="(min-width: 1120px) 900px, 100vw"
            className="object-contain"
            priority={false}
          />
        </div>

        <svg className="team-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {members.map((member) => (
            <path key={member.id} d={member.path} className="team-connector" style={{ transitionDelay: `${member.phase + 420}ms`, animationDelay: `${member.phase + 420}ms` }} />
          ))}
        </svg>

        {members.map((member) => (
          <span
            key={`${member.id}-node`}
            className="team-node"
            style={{ left: `${member.anchor.x}%`, top: `${member.anchor.y}%`, transitionDelay: `${member.phase + 280}ms` }}
          />
        ))}

        {members.map((member) => <IdentityLabel key={member.id} member={member} active={active} />)}
      </div>
    </section>
  );
}
