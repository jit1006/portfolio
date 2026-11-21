import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jitendra Kumar Rana | Developer Portfolio",
  description:
    "Backend & ML Engineer — building scalable apps and intelligent systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrains.variable} antialiased`}>
      <body className="min-h-screen bg-bg font-mono text-text">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#24283b",
              color: "#e0e6f8",
              border: "1px solid #3b4261",
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "0.85rem",
            },
          }}
        />
      </body>
    </html>
  );
}
