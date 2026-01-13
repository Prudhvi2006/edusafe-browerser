
import React, { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ViolationAlertProps {
  message: string;
  onDismiss: () => void;
}

const ViolationAlert: React.FC<ViolationAlertProps> = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-6 right-6 z-[100] glass-card-elevated border-rose-500/50 p-4 max-w-sm transition-all duration-300 rounded-xl ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-rose-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-rose-500 text-sm">VIOLATION DETECTED</h4>
          <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{message}</p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ViolationAlert;
