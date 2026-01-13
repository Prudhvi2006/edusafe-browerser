
import { GoogleGenAI, Type } from "@google/genai";
import { ViolationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AnalysisResult {
  hasPerson: boolean;
  multiplePeople: boolean;
  phoneDetected: boolean;
  suspiciousBehavior: boolean;
  reason: string;
}

/**
 * Analyzes a frame from the webcam to detect proctoring violations.
 */
export const analyzeFrame = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: `Analyze this webcam frame for an online exam proctoring session. 
            Identify if:
            1. A person is present.
            2. Multiple people are present.
            3. A mobile phone or electronic device is visible.
            4. The person is looking away from the screen or acting suspiciously.
            
            Return ONLY a JSON object matching this schema:
            {
              "hasPerson": boolean,
              "multiplePeople": boolean,
              "phoneDetected": boolean,
              "suspiciousBehavior": boolean,
              "reason": string (short explanation)
            }`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("AI Analysis failed:", error);
    // Fallback safe result
    return {
      hasPerson: true,
      multiplePeople: false,
      phoneDetected: false,
      suspiciousBehavior: false,
      reason: "Analysis error fallback"
    };
  }
};
