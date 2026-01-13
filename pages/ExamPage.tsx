
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Maximize,
  AlertCircle
} from 'lucide-react';
import WebcamFeed from '../components/WebcamFeed';
import RiskScoreIndicator from '../components/RiskScoreIndicator';
import ViolationAlert from '../components/ViolationAlert';
import { analyzeFrame } from '../services/geminiService';
import { MOCK_QUESTIONS, VIOLATION_WEIGHTS, MAX_RISK_SCORE } from '../constants';
import { Violation, ViolationType } from '../types';

const ExamPage: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [riskScore, setRiskScore] = useState(0);
  const [violations, setViolations] = useState<Violation[]>([]);
  const [latestViolation, setLatestViolation] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Setup Camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        setStream(s);
      } catch (err) {
        console.error("Camera access denied:", err);
        addViolation('NO_FACE', "Camera access is required for proctoring.");
      }
    };
    initCamera();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  // Proctoring Logic: Visibility Change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        addViolation('TAB_SWITCH', "User switched tabs or minimized the browser.");
      }
    };
    const handleFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        addViolation('FULLSCREEN_EXIT', "User exited fullscreen mode.");
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreen);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreen);
    };
  }, []);

  // Periodic AI Analysis
  useEffect(() => {
    if (isTerminated) return;

    const interval = setInterval(async () => {
      if (videoRef.current && stream && !isAnalyzing) {
        setIsAnalyzing(true);
        try {
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            const base64 = canvas.toDataURL('image/jpeg', 0.5).split(',')[1];
            const result = await analyzeFrame(base64);

            if (!result.hasPerson) {
              addViolation('NO_FACE', "No person detected in the camera feed.");
            } else if (result.multiplePeople) {
              addViolation('MULTIPLE_FACES', "Multiple people detected in the frame.");
            } else if (result.phoneDetected) {
              addViolation('PHONE_DETECTED', "Suspected mobile phone or electronic device detected.");
            } else if (result.suspiciousBehavior) {
              addViolation('SUSPICIOUS_MOVEMENT', "Suspicious behavioral patterns detected.");
            }
          }
        } catch (e) {
          console.error("AI Analysis interval error:", e);
        } finally {
          setIsAnalyzing(false);
        }
      }
    }, 8000); // Analyze every 8 seconds

    return () => clearInterval(interval);
  }, [stream, isTerminated, isAnalyzing]);

  const addViolation = (type: ViolationType, description: string) => {
    const weight = VIOLATION_WEIGHTS[type];
    const newViolation: Violation = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      type,
      description,
      weight
    };

    setViolations(prev => [newViolation, ...prev]);
    setRiskScore(prev => {
      const next = prev + weight;
      if (next >= MAX_RISK_SCORE) {
        setIsTerminated(true);
      }
      return next;
    });
    setLatestViolation(description);
  };

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen().catch(() => {
      alert("Please allow fullscreen to proceed with the exam.");
    });
  };

  const handleFinish = () => {
    alert("Exam submitted successfully! Integrity score: " + (100 - riskScore));
    navigate('/');
  };

  if (isTerminated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="glass-card-elevated max-w-lg w-full p-10 text-center rounded-3xl border-rose-500/30">
          <XCircle className="w-20 h-20 text-rose-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Exam Terminated</h1>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Your session has been automatically terminated due to multiple security violations. 
            A full report has been sent to your administrator.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 font-bold rounded-2xl transition-all"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const question = MOCK_QUESTIONS[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold">Certification Exam: AI Foundations</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Session ID: AI-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!isFullscreen && (
            <button 
              onClick={enterFullscreen}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 text-xs font-bold rounded-xl border border-amber-500/20 animate-pulse"
            >
              <AlertCircle className="w-4 h-4" />
              ENABLE FULLSCREEN
            </button>
          )}
          <button 
            onClick={handleFinish}
            className="px-6 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-200 transition-all"
          >
            Finish Exam
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Exam Content */}
        <div className="flex-1 overflow-y-auto p-12 bg-[#0d0d0f]">
          <div className="max-w-3xl mx-auto">
            <div className="mb-12 flex items-center justify-between">
              <span className="px-4 py-1 bg-white/5 rounded-full text-xs font-bold text-zinc-400 border border-white/5">
                Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}
              </span>
              <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all" 
                  style={{ width: `${((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 leading-tight">
              {question.text}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setAnswers({ ...answers, [question.id]: idx })}
                  className={`w-full p-6 text-left rounded-2xl border transition-all flex items-center justify-between group ${
                    answers[question.id] === idx 
                      ? 'bg-blue-600/10 border-blue-500 text-blue-100' 
                      : 'bg-white/5 border-white/5 hover:border-white/10 text-zinc-400'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    answers[question.id] === idx ? 'border-blue-400 bg-blue-400' : 'border-zinc-700'
                  }`}>
                    {answers[question.id] === idx && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
              <button 
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => prev - 1)}
                className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-zinc-400 hover:text-white disabled:opacity-20 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Question
              </button>
              
              {currentQuestion < MOCK_QUESTIONS.length - 1 ? (
                <button 
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10 transition-all"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 rounded-2xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                  Submit Final Answers
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Proctoring Sidebar */}
        <aside className="w-80 border-l border-white/5 p-6 space-y-6 overflow-y-auto bg-black/40 backdrop-blur-xl">
          <WebcamFeed 
            videoRef={videoRef} 
            isActive={!!stream} 
            stream={stream} 
          />
          
          <RiskScoreIndicator score={riskScore} maxScore={MAX_RISK_SCORE} />

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Session Logs</h3>
            <div className="space-y-3">
              {violations.length === 0 ? (
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-center">
                  <p className="text-[10px] text-zinc-500 italic">No violations recorded.</p>
                </div>
              ) : (
                violations.slice(0, 5).map((v) => (
                  <div key={v.id} className="p-3 rounded-xl border border-rose-500/10 bg-rose-500/5 animate-fade-in">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wider">{v.type.replace('_', ' ')}</span>
                      <span className="text-[9px] text-zinc-600">{new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">{v.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">ProctorAI Secure</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-relaxed">
              Continuous monitoring is active. Your session is encrypted and secure.
            </p>
          </div>
        </aside>
      </main>

      {latestViolation && (
        <ViolationAlert 
          message={latestViolation} 
          onDismiss={() => setLatestViolation(null)} 
        />
      )}
    </div>
  );
};

export default ExamPage;
