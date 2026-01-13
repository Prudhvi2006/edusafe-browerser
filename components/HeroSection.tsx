
import React from "react";
import { Shield, Play, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <div className="container relative z-10 px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card border-blue-500/20 animate-fade-in">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-widest">Enterprise Grade Security</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
            Next-Gen Exams with <br/>
            <span className="gradient-text">Gemini Vision AI</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Protect academic integrity with real-time biometric monitoring, behavioral analysis, and automated risk scoring powered by Google's most capable AI models.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/exam">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all flex items-center gap-2">
                Start Demo Exam
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 glass-card-elevated border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-24 pt-12 border-t border-white/5">
            <div>
              <div className="text-3xl md:text-4xl font-black gradient-text">99.9%</div>
              <div className="text-xs text-zinc-500 uppercase font-bold mt-2 tracking-widest">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black gradient-text">150ms</div>
              <div className="text-xs text-zinc-500 uppercase font-bold mt-2 tracking-widest">Latency</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black gradient-text">0</div>
              <div className="text-xs text-zinc-500 uppercase font-bold mt-2 tracking-widest">Hardware Req</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
