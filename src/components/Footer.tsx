"use client";

import { portfolioData } from "@/data/portfolio";
import { Mail } from "lucide-react";
import {
  FaXTwitter,
  FaDiscord,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

export default function Footer() {
  const { links } = portfolioData;

  const footerSocials = [
    {
      icon: FaXTwitter,
      href: links.x,
      label: "X",
      className: "border-amber text-amber hover:bg-amber/15",
    },
    {
      icon: FaDiscord,
      href: links.discord,
      label: "Discord",
      className: "border-indigo text-indigo hover:bg-indigo/15",
    },
    {
      icon: FaInstagram,
      href: links.instagram,
      label: "Instagram",
      className: "border-coral text-coral hover:bg-coral/15",
    },
    {
      icon: Mail,
      href: links.email,
      label: "Email",
      className: "border-amber text-amber hover:bg-amber/15",
    },
    {
      icon: FaGithub,
      href: links.github,
      label: "GitHub",
      className: "border-text-secondary text-text-secondary hover:bg-text-secondary/15",
    },
    {
      icon: FaLinkedin,
      href: links.linkedin,
      label: "LinkedIn",
      className: "border-mint text-mint hover:bg-mint/15",
    },
  ].filter((item): item is { icon: typeof Mail; href: string; label: string; className: string } =>
    Boolean(item.href && item.href.trim().length > 0)
  );

  return (
    <footer className="mt-16 border-t border-amber/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8">
        {/* Circular outlined accent social buttons */}
        <div className="flex items-center gap-3">
          {footerSocials.map(({ icon: Icon, href, label, className }) => {
            const isExternal = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={label}
                title={label}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 ${className}`}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>

        {/* Right sign-off */}
        <p className="text-sm text-lavender">
          Made with <span className="font-bold text-amber">❤️.</span> Thank You
        </p>
      </div>
    </footer>
  );
}
