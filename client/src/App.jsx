import React, { useState } from "react";
import {
  Pencil,
  MousePointer2,
  Type,
  Share2,
  Layers,
  Zap,
  Menu,
  X,
  Box,
  Wand2,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Logo } from "./components/Logo";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: <Box className="text-indigo-600" />,
      title: "Infinite Canvas",
      desc: "Never run out of room. Zoom out for the big picture, zoom in for the pixel-perfect details.",
    },
    {
      icon: <Wand2 className="text-indigo-600" />,
      title: "Smart Polishing",
      desc: "Draw a messy circle and watch our AI snap it into a perfect vector shape instantly.",
    },
    {
      icon: <Download className="text-indigo-600" />,
      title: "Instant Export",
      desc: "Turn your brainstorm into a high-res PNG, SVG, or PDF with a single click.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 overflow-x-hidden font-sans">
      {/* Subtle Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <Logo />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a
            href="#features"
            className="hover:text-indigo-600 transition-colors"
          >
            How it works
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Showcase
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Community
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleSignup}
            className="hidden cursor-pointer sm:block bg-slate-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all shadow-md active:scale-95"
          >
            Sign Up
          </button>
          <button
            className="md:hidden p-2 text-slate-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-20 left-6 right-6 bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl md:hidden flex flex-col gap-6 z-50 animate-in fade-in zoom-in duration-200">
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold border-b border-slate-50 pb-2"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-lg font-semibold border-b border-slate-50 pb-2"
            >
              Showcase
            </a>
            <a
              href="#"
              className="text-lg font-semibold border-b border-slate-50 pb-2"
            >
              Community
            </a>
            <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">
              Launch App
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-8 animate-bounce-subtle">
          <Zap size={14} fill="currentColor" /> v2.0 Live: Better Pen Support
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-linear-to-b from-slate-950 via-slate-800 to-slate-500 leading-[0.9]">
          Ideas flow <br className="hidden md:block" /> in real-time.
        </h1>

        <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          The blank page is no longer scary. Sketch ideas, connect notes, and
          build layouts on a shared spatial canvas that never ends.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
          <button className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-300 transition-all active:scale-95">
            Start Sketching Free
          </button>
          <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
            See Examples
          </button>
        </div>

        {/* Main Canvas Preview */}
        <div className="relative group max-w-6xl mx-auto">
          <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-blue-600 rounded-[2.5rem] blur opacity-15 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative bg-white rounded-4xl shadow-2xl border border-slate-200 p-4 h-87.5 md:h-137.5 flex items-center justify-center overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            {/* Animated Cursors - Desktop Only for clarity, or smaller for mobile */}
            <div className="absolute top-1/4 left-1/4 animate-float hidden sm:block">
              <div className="flex flex-col items-start gap-1">
                <MousePointer2 className="text-indigo-600 fill-indigo-600 w-6 h-6" />
                <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg">
                  Designer
                </span>
              </div>
            </div>

            <div className="absolute bottom-1/4 right-1/3 animate-float-delayed">
              <div className="flex flex-col items-start gap-1">
                <MousePointer2 className="text-emerald-500 fill-emerald-500 w-5 h-5 md:w-6 md:h-6" />
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-lg">
                  You
                </span>
              </div>
            </div>

            {/* Central Mock Graphics */}
            <div className="space-y-6 text-center">
              <div className="flex gap-4 justify-center items-center">
                <div className="w-16 h-16 md:w-32 md:h-32 bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center shadow-inner">
                  <Pencil className="text-slate-300" size={24} />
                </div>
                <div className="w-24 h-24 md:w-48 md:h-48 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-200 -rotate-6">
                  <Box className="text-white" size={48} />
                </div>
                <div className="w-16 h-16 md:w-32 md:h-32 bg-white border-2 border-indigo-100 rounded-2xl flex items-center justify-center rotate-12">
                  <Type className="text-indigo-600" size={24} />
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-md text-[10px] font-mono tracking-tighter">
                  RENDER_ENGINE: 60FPS
                </span>
                <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-md text-[10px] font-mono tracking-tighter">
                  VECTORS: ACTIVE
                </span>
              </div>
            </div>

            {/* The Floating Toolbar */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 md:gap-3 p-2 bg-white/95 backdrop-blur-3xl border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[90%] sm:w-auto justify-center">
              {[Pencil, Box, Type, Download].map((Icon, idx) => (
                <div
                  key={idx}
                  className={`p-3 md:p-4 rounded-xl cursor-pointer transition-all ${idx === 1 ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:bg-slate-50 hover:text-indigo-600"}`}
                >
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-slate-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-8 bg-white border border-slate-200/60 rounded-[2.5rem] hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">
                {f.title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 blur-[120px] opacity-20"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to bring your <br /> ideas to life?
          </h2>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-50 transition-all active:scale-95">
            Launch Free Canvas
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <Logo />
          <p className="text-slate-400 text-md">
            © 2026 CanvasFlow. Built for creators, by creators.
          </p>
          <div className="flex gap-6 text-lg text-slate-500 font-semibold ">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -15px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .animate-float-delayed { animation: float 7s ease-in-out infinite reverse; }
        .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
      `,
        }}
      />
    </div>
  );
}

export default App;
