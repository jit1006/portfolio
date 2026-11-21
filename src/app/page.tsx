import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
