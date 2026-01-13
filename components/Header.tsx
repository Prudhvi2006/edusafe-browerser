
import React, { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 rounded-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">ProctorAI</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">How It Works</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link to="/exam" className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                Launch Demo
              </Link>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
