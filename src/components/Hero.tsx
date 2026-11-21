"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { Typewriter } from "react-simple-typewriter";
import { FileCode2, Mail } from "lucide-react";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import NpxCommandPill from "./NpxCommandPill";
import { portfolioData, ACCENT_HEX } from "@/data/portfolio";
import Image from "next/image";

export default function Hero() {
  const { name, tagline, bio, npxCommand, avatar, links } = portfolioData;
  const [imgError, setImgError] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({
    transform:
      "perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
  });

  const handlePortraitMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;
    const maxTilt = 15;
    const rotateX = (0.5 - y) * maxTilt * 2;
    const rotateY = (x - 0.5) * maxTilt * 2;

    setTiltStyle({
      transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
      transition: "transform 80ms ease-out",
    });
  };

  const handlePortraitMouseLeave = () => {
    setTiltStyle({
      transform:
        "perspective(500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    });
  };

  const heroLinks = [
    { icon: FileCode2, href: links.resume, label: "Resume" },
    { icon: FaXTwitter, href: links.x, label: "X" },
    { icon: Mail, href: links.email, label: "Email" },
    { icon: FaGithub, href: links.github, label: "GitHub" },
    { icon: FaLinkedin, href: links.linkedin, label: "LinkedIn" },
  ].filter(
    (item): item is { icon: typeof FileCode2; href: string; label: string } =>
      Boolean(item.href && item.href.trim().length > 0),
  );

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center pt-28 pb-16 md:pt-32 md:pb-24"
    >
      {/* Faint </> watermark behind top-left */}
      <div
        className="pointer-events-none absolute top-16 -left-6 z-0 select-none text-text-secondary/[0.05] md:top-20 md:-left-12"
        aria-hidden="true"
      >
        <svg
          width="380"
          height="280"
          viewBox="0 0 240 180"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-48 w-64 sm:h-64 sm:w-88 md:h-72 md:w-96"
        >
          <polyline points="72 45 22 90 72 135" />
          <line x1="138" y1="35" x2="102" y2="145" />
          <polyline points="168 45 218 90 168 135" />
        </svg>
      </div>

      {/* Two-column layout matching pratikkashyap.vercel.app */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Left Column */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className="min-h-[1.3em] text-3xl font-bold tracking-tight text-cyan sm:text-4xl md:text-5xl">
            <Typewriter
              words={[name]}
              loop={0}
              cursor
              cursorStyle="|"
              cursorColor="#7dcfff"
              typeSpeed={85}
              deleteSpeed={55}
              delaySpeed={2600}
            />
          </h1>

          {/* 3-line tagline */}
          <div className="space-y-1 text-lg font-medium leading-relaxed text-text sm:text-xl md:text-2xl">
            <p>{tagline.line1}</p>
            <p className="text-text-secondary">{tagline.line2}</p>
            <p className="text-text-secondary">
              {tagline.line3Parts.map((part, i) => (
                <span
                  key={i}
                  style={
                    part.accent ? { color: ACCENT_HEX[part.accent] } : undefined
                  }
                  className={part.accent ? "font-semibold" : undefined}
                >
                  {part.text}
                </span>
              ))}
            </p>
          </div>

          {/* Clean amber icon-only row */}
          <div className="flex items-center gap-5 pt-1">
            {heroLinks.map(({ icon: Icon, href, label }) => {
              const isExternal =
                href.startsWith("http") || href.endsWith(".pdf");
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  title={label}
                  aria-label={label}
                  className="text-amber transition-all duration-200 hover:-translate-y-0.5 hover:text-cyan"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>

          {/* NPX command pill */}
          <div className="pt-2">
            <NpxCommandPill command={npxCommand} />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center gap-7 lg:items-start">
          {/* Portrait with soft radial glow */}
          {/* Portrait with soft radial glow */}
          <div
            className="relative self-center will-change-transform"
            style={tiltStyle}
            onMouseMove={handlePortraitMouseMove}
            onMouseLeave={handlePortraitMouseLeave}
          >
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan/20 via-lavender/15 to-mint/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-border bg-surface shadow-[6px_6px_0px_#24283b] sm:h-64 sm:w-64">
              {!imgError ? (
                <Image
                  src={avatar}
                  alt={name}
                  fill
                  priority
                  onError={() => setImgError(true)}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-surface to-card text-center">
                  <span className="text-4xl font-bold tracking-widest text-cyan">
                    {initials}
                  </span>
                  <span className="mt-2 text-xs text-text-secondary">
                    public/images/avatar.jpg
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Clean borderless monospace bio with amber highlights */}
          <p className="max-w-lg text-center text-sm leading-7 text-text-secondary lg:text-left">
            {bio.map((segment, i) => (
              <span
                key={i}
                className={
                  segment.highlight ? "font-semibold text-amber" : undefined
                }
              >
                {segment.text}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
