"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 160) {
        setActive("about");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.1, 0.3, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <nav
        aria-label="Portfolio navigation"
        className="flex items-center gap-1 rounded-full border border-border/80 bg-surface/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        {NAV_ITEMS.map((item) => {
          const sectionId = item.href.slice(1);
          const isActive = active === sectionId;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(sectionId)}
              className={`rounded-full px-5 py-1.5 text-sm font-mono transition-all duration-200 ${
                isActive
                  ? "bg-white text-bg font-semibold shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
