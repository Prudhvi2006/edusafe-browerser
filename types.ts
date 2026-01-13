
export type ViolationType = 
  | 'TAB_SWITCH' 
  | 'FULLSCREEN_EXIT' 
  | 'MULTIPLE_FACES' 
  | 'NO_FACE' 
  | 'PHONE_DETECTED' 
  | 'SUSPICIOUS_MOVEMENT';

export interface Violation {
  id: string;
  timestamp: number;
  type: ViolationType;
  screenshot?: string;
  description: string;
  weight: number;
}

export interface User {
  email: string;
  name: string;
  role: 'student' | 'admin';
}

export interface ExamSession {
  id: string;
  startTime: number;
  endTime?: number;
  riskScore: number;
  violations: Violation[];
  status: 'active' | 'completed' | 'terminated';
}

export interface ExamQuestion {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
}
