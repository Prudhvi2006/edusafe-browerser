
import { ExamQuestion } from './types';

export const VIOLATION_WEIGHTS = {
  TAB_SWITCH: 20,
  FULLSCREEN_EXIT: 25,
  MULTIPLE_FACES: 50,
  NO_FACE: 10,
  PHONE_DETECTED: 60,
  SUSPICIOUS_MOVEMENT: 15,
};

export const MAX_RISK_SCORE = 100;

export const MOCK_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    text: "Which of the following is an example of an AI vision model suitable for real-time monitoring?",
    options: ["Gemini 3 Flash", "Classic RNN", "Simple Linear Regression", "SQLite"],
    correctIndex: 0
  },
  {
    id: 2,
    text: "What is the primary purpose of a proctoring system?",
    options: ["To slow down the internet", "To ensure exam integrity", "To record audio for podcasts", "To help students find answers"],
    correctIndex: 1
  },
  {
    id: 3,
    text: "Which browser API is typically used to detect when a user switches tabs during an exam?",
    options: ["Web Bluetooth API", "Page Visibility API", "Vibration API", "USB API"],
    correctIndex: 1
  }
];
