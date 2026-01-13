
import React from "react";
import { Eye, Monitor, Shield, Zap, BarChart3, Lock } from "lucide-react";

const features = [
  { icon: Eye, title: "Gemini Vision", desc: "Real-time face tracking and device detection powered by Gemini 3 Flash." },
  { icon: Monitor, title: "Active Lockdown", desc: "Instant detection of tab switching, window resizing, and display sharing." },
  { icon: Shield, title: "Biometric Identity", desc: "Continuous verification of the test-taker's identity throughout the session." },
  { icon: BarChart3, title: "Risk Engine", desc: "Dynamic risk scoring based on behavioral patterns and environmental cues." },
  { icon: Lock, title: "Auto-Termination", desc: "Intelligent session ending when critical violations are confirmed by AI." },
  { icon: Zap, title: "Audit Ready", desc: "Instant generation of evidence-backed reports with visual violation proof." },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden" id="features">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for <span className="gradient-text">Absolute Integrity</span></h2>
          <p className="text-zinc-400">Our comprehensive suite of tools ensures that online evaluations are as secure as physical ones.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl hover:border-blue-500/40 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
