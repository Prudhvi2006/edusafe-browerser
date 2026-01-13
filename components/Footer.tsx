
import React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-16 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-bold">ProctorAI</span>
          </Link>
          <nav className="flex gap-8 text-sm text-zinc-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Security Audit</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </nav>
          <p className="text-sm text-zinc-600">© 2024 ProctorAI Technologies. Built for integrity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
