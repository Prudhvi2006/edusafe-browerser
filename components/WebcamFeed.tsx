
import React, { RefObject, useEffect } from "react";
import { Camera, CameraOff } from "lucide-react";

interface WebcamFeedProps {
  videoRef: RefObject<HTMLVideoElement>;
  isActive: boolean;
  stream: MediaStream | null;
}

const WebcamFeed: React.FC<WebcamFeedProps> = ({ videoRef, isActive, stream }) => {
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, videoRef]);

  return (
    <div className="glass-card overflow-hidden rounded-xl border-zinc-800">
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-zinc-300">Live AI Monitoring</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
      </div>
      
      <div className="aspect-video bg-zinc-900 relative">
        {isActive ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover mirror"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600">
            <CameraOff className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-xs">Camera Feed Inactive</p>
          </div>
        )}
        
        {isActive && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-rose-500/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE ANALYSIS
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamFeed;
