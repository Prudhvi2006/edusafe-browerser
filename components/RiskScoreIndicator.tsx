
import React from 'react';
import { AlertTriangle, CheckCircle, AlertOctagon } from "lucide-react";

interface RiskScoreIndicatorProps {
  score: number;
  maxScore: number;
}

const RiskScoreIndicator: React.FC<RiskScoreIndicatorProps> = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  
  let level: 'low' | 'medium' | 'high' = 'low';
  if (score > 30) level = 'medium';
  if (score > 70) level = 'high';

  const levelConfig = {
    low: {
      icon: CheckCircle,
      label: "Low Risk",
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/20",
      barColor: "bg-emerald-400",
    },
    medium: {
      icon: AlertTriangle,
      label: "Medium Risk",
      color: "text-amber-400",
      bgColor: "bg-amber-400/20",
      barColor: "bg-amber-400",
    },
    high: {
      icon: AlertOctagon,
      label: "High Risk",
      color: "text-rose-400",
      bgColor: "bg-rose-400/20",
      barColor: "bg-rose-400",
    },
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <span className={`text-sm font-medium ${config.color}`}>
            {config.label}
          </span>
        </div>
        <span className="text-lg font-bold text-white">
          {Math.min(score, maxScore)}/{maxScore}
        </span>
      </div>
      
      <div className={`h-2 rounded-full overflow-hidden ${config.bgColor}`}>
        <div 
          className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-wider font-semibold">
        {level === "high" 
          ? "CRITICAL: Exam auto-termination imminent" 
          : "Keep face visible and stay on this tab"}
      </p>
    </div>
  );
};

export default RiskScoreIndicator;
