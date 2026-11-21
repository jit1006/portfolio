import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jitendra Kumar Rana | Developer Portfolio",
  description:
    "Backend & ML Engineer — building scalable full-stack apps and deep learning systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} antialiased`}>
      <body className="min-h-screen bg-bg font-mono text-text selection:bg-cyan/25 selection:text-cyan">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#24283b",
              color: "#e0e6f8",
              border: "1px solid #3b4261",
              boxShadow: "4px 4px 0px #7dcfff",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.82rem",
              borderRadius: "10px",
            },
          }}
        />
      </body>
    </html>
  );
}
