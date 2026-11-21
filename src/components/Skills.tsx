"use client";

import { useState } from "react";
import { portfolioData, ACCENT_HEX, type SkillItem } from "@/data/portfolio";
import {
  Database,
  Server,
  Brain,
  BarChart3,
  LineChart,
  PenTool,
  Code2,
  Cpu,
  HardDrive,
  Network,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiPostman,
  SiNotion,
} from "react-icons/si";

const PIANO_NOTES = [
  261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99,
  880.0, 1046.5,
];

const CONFETTI_COLORS = [
  "#7dcfff",
  "#73daca",
  "#e0af68",
  "#bb9af7",
  "#f7768e",
  "#9ece6a",
  "#7aa2f7",
];

type ConfettiParticle = {
  id: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
  hollow: boolean;
};

let pianoAudioContext: AudioContext | null = null;

function getPianoAudioContext() {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  pianoAudioContext ??= new AudioContext();
  return pianoAudioContext;
}

function unlockPianoAudio() {
  try {
    const context = getPianoAudioContext();
    if (context?.state === "suspended") {
      void context.resume().catch(() => undefined);
    }
  } catch {
    // Audio is optional and may be blocked by browser policy.
  }
}

function playPianoNote(index: number) {
  try {
    const context = getPianoAudioContext();
    if (!context) return;

    if (context.state === "suspended") {
      void context.resume().then(() => playPianoNote(index)).catch(() => undefined);
      return;
    }
    if (context.state !== "running") return;

    const startTime = context.currentTime;
    const duration = 0.65;
    const frequency = PIANO_NOTES[index % PIANO_NOTES.length];
    const filter = context.createBiquadFilter();
    const masterGain = context.createGain();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, startTime);
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);
    masterGain.gain.setValueAtTime(0.0001, startTime);
    masterGain.gain.exponentialRampToValueAtTime(0.36, startTime + 0.008);
    masterGain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.07);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
    filter.connect(masterGain);
    masterGain.connect(context.destination);

    [
      { frequency, type: "triangle" as OscillatorType, gain: 0.22 },
      { frequency: frequency * 2, type: "sine" as OscillatorType, gain: 0.1 },
      { frequency: frequency * 3, type: "sine" as OscillatorType, gain: 0.04 },
    ].forEach(({ frequency: partialFrequency, type, gain }) => {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(partialFrequency, startTime);
      partialGain.gain.setValueAtTime(gain, startTime);
      oscillator.connect(partialGain);
      partialGain.connect(filter);
      oscillator.onended = () => {
        oscillator.disconnect();
        partialGain.disconnect();
      };
      oscillator.start(startTime);
      oscillator.stop(startTime + duration + 0.03);
    });

    window.setTimeout(() => {
      filter.disconnect();
      masterGain.disconnect();
    }, (duration + 0.1) * 1000);
  } catch {
    // Audio is optional and should never interrupt interaction.
  }
}

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
> = {
  Database,
  Server,
  Brain,
  BarChart3,
  LineChart,
  PenTool,
  Code2,
  Cpu,
  HardDrive,
  Network,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiPostman,
  SiNotion,
};

function SkillBadge({
  skill,
  index,
  muted,
}: {
  skill: SkillItem;
  index: number;
  muted: boolean;
}) {
  const Icon = ICON_MAP[skill.icon] ?? Code2;
  const accent = ACCENT_HEX[skill.accent];
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);
  const playNote = () => {
    if (!muted) playPianoNote(index);
  };
  const spawnConfetti = () => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const batch = Array.from({ length: 10 + Math.floor(Math.random() * 3) }, () => ({
      id: `${Date.now()}-${Math.random()}`,
      x: 10 + Math.random() * 80,
      y: Math.random() * 65,
      tx: -55 + Math.random() * 110,
      ty: -50 + Math.random() * 65,
      size: 4 + Math.random() * 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      hollow: Math.random() > 0.55,
    }));
    const particleIds = new Set(batch.map((particle) => particle.id));

    setParticles((current) => [...current, ...batch]);
    window.setTimeout(() => {
      setParticles((current) =>
        current.filter((particle) => !particleIds.has(particle.id)),
      );
    }, 800);
  };
  const handleInteraction = () => {
    playNote();
    spawnConfetti();
  };

  return (
    <button
      type="button"
      onPointerDown={unlockPianoAudio}
      onMouseEnter={handleInteraction}
      onClick={handleInteraction}
      className="group relative inline-flex cursor-pointer select-none items-center gap-2 overflow-visible rounded-lg border-2 bg-[#1d2030] px-3.5 py-2 text-xs font-medium text-text transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] sm:text-sm"
      style={{
        borderColor: accent,
        boxShadow: `4px 4px 0px ${accent}`,
      }}
    >
      <span className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="confetti-particle absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.hollow ? "transparent" : particle.color,
              border: particle.hollow ? `1.5px solid ${particle.color}` : undefined,
              "--tx": `${particle.tx}px`,
              "--ty": `${particle.ty}px`,
            } as React.CSSProperties}
          />
        ))}
      </span>
      <Icon size={16} style={{ color: accent }} />
      <span>{skill.name}</span>
    </button>
  );
}

export default function Skills() {
  const [muted, setMuted] = useState(false);

  return (
    <section id="skills" className="relative py-20 md:py-24 scroll-mt-20">
      {/* Subtle line-art watermark on the right */}
      <div
        className="pointer-events-none absolute top-10 -right-4 z-0 select-none text-text-secondary/[0.045]"
        aria-hidden="true"
      >
        <svg
          width="320"
          height="280"
          viewBox="0 0 240 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-52 w-64 sm:h-64 sm:w-80"
        >
          <path d="M 80,25 C 48,25 48,78 22,90 C 48,102 48,155 80,155" />
          <path d="M 160,25 C 192,25 192,78 218,90 C 192,102 192,155 160,155" />
          <circle cx="120" cy="90" r="22" />
          <line x1="120" y1="52" x2="120" y2="68" />
          <line x1="120" y1="112" x2="120" y2="128" />
        </svg>
      </div>

      {/* Syntax-colored section heading */}
      <div className="relative z-10 mb-12 flex items-center justify-center gap-3">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          <span className="text-mint">code</span>
          <span className="text-lavender">:</span>
          <span className="text-cyan">skills</span>
        </h2>
        <button
          type="button"
          onClick={() => setMuted((isMuted) => !isMuted)}
          className="rounded-md border border-border p-2 text-text-secondary transition-colors hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label={muted ? "Unmute skill piano notes" : "Mute skill piano notes"}
          aria-pressed={muted}
          title={muted ? "Unmute skill sounds" : "Mute skill sounds"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>

      {/* Centered flex-wrap 3D badge grid */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-wrap justify-center gap-3.5 sm:gap-4">
        {portfolioData.skills.map((skill, index) => (
          <SkillBadge key={skill.name} skill={skill} index={index} muted={muted} />
        ))}
      </div>
    </section>
  );
}
