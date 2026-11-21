"use client";

import { Copy, Check } from "lucide-react";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

interface NpxCommandPillProps {
  command: string;
}

export default function NpxCommandPill({ command }: NpxCommandPillProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);

      toast(
        () => (
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-cyan">Copied to Clipboard</span>
            <span className="text-xs text-text-secondary">
              Make sure to run this in your Terminal{" "}
              <span className="text-amber">&lt;3</span>
            </span>
          </div>
        ),
        { duration: 3000 }
      );

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <div className="group relative inline-flex items-stretch overflow-visible rounded-lg border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-colors hover:border-cyan/60">
        {/* Bright cyan left accent tab */}
        <span className="w-2 rounded-l-[7px] bg-cyan" aria-hidden="true" />

        {/* Command text */}
        <code className="px-4 py-2.5 text-sm font-medium tracking-wide text-cyan select-all">
          {command}
        </code>

        {/* Copy button + inline tooltip */}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-full items-center justify-center border-l border-border/80 px-3.5 text-text-secondary transition-colors hover:text-cyan focus:outline-none cursor-pointer"
            aria-label="Copy NPX command"
          >
            {copied ? (
              <Check size={16} className="text-cyan" />
            ) : (
              <Copy size={16} className="transition-transform group-hover:scale-105" />
            )}
          </button>

          {copied && (
            <div
              role="status"
              aria-live="polite"
              className="tooltip-pop absolute -top-10 left-1/2 z-20 whitespace-nowrap rounded-md bg-cyan px-2.5 py-1 text-xs font-semibold text-bg shadow-md"
            >
              Copied
              <span
                className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-cyan"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
