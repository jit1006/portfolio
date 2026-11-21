"use client";

import { useState } from "react";
import { portfolioData, type ProjectItem } from "@/data/portfolio";
import { FaGithub } from "react-icons/fa6";
import { ExternalLink, Terminal } from "lucide-react";
import Image from "next/image";

function ProjectCard({
  project,
  handle,
  avatar,
}: {
  project: ProjectItem;
  handle: string;
  avatar: string;
}) {
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <article
      className="group flex flex-col justify-between rounded-xl border-2 border-cyan bg-card p-5 transition-all duration-200 hover:-translate-y-1"
      style={{ boxShadow: "5px 5px 0px #7dcfff" }}
    >
      <div>
        {/* Top bar: Avatar + handle left, GitHub + Live Demo right */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-cyan/50 bg-surface text-[10px] font-bold text-cyan">
              {!avatarError ? (
                <Image
                  src={avatar}
                  alt={handle}
                  fill
                  onError={() => setAvatarError(true)}
                  className="object-cover"
                />
              ) : (
                <span>{handle.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <span className="text-xs font-medium text-text-secondary">
              {handle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Live Demo"
                aria-label={`Open ${project.title} live demo`}
                className="text-mint transition-colors hover:text-cyan"
              >
                <ExternalLink size={17} />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Source Code"
              aria-label={`View ${project.title} on GitHub`}
              className="text-amber transition-colors hover:text-cyan"
            >
              <FaGithub size={19} />
            </a>
          </div>
        </div>

        {/* Rounded preview screenshot with graceful fallback */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/70 bg-surface">
          {!imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImgError(true)}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1b26] to-[#24283b] p-4 text-center">
              <Terminal size={26} className="text-cyan/70" />
              <span className="text-sm font-semibold text-amber">
                {project.title}
              </span>
              <span className="text-[11px] text-text-secondary">
                {project.subtitle} • {project.date}
              </span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-lg font-bold text-amber sm:text-xl">
              {project.title}
            </h3>
            <span className="text-xs text-text-secondary/80">
              {project.date}
            </span>
          </div>
          <p className="mt-2 text-xs leading-6 text-text-secondary sm:text-sm">
            {project.description}
          </p>
        </div>
      </div>

      {/* Mint dot tech stack footer */}
      <div className="mt-5 flex items-start gap-2 pt-3 text-xs text-text-secondary">
        <span className="mt-0.5 text-mint" aria-hidden="true">
          ●
        </span>
        <span className="leading-5 text-mint">
          {project.techStack.join(", ")}
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  const { projects, handle, avatar } = portfolioData;

  return (
    <section id="projects" className="relative py-20 md:py-24 scroll-mt-20">
      {/* Faint >_ terminal watermark top-left */}
      <div
        className="pointer-events-none absolute top-4 -left-4 z-0 select-none text-text-secondary/[0.045]"
        aria-hidden="true"
      >
        <svg
          width="320"
          height="200"
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-36 w-56 sm:h-48 sm:w-72"
        >
          <polyline points="20 20 65 60 20 100" />
          <line x1="85" y1="100" x2="145" y2="100" />
        </svg>
      </div>

      {/* Syntax-colored heading */}
      <h2 className="relative z-10 mb-12 text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        <span className="text-mint">code</span>
        <span className="text-lavender">:</span>
        <span className="text-cyan">projects</span>
      </h2>

      {/* 2-column desktop grid */}
      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            handle={handle}
            avatar={avatar}
          />
        ))}
      </div>
    </section>
  );
}
