import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION, SYLLABUS } from '../constants';
import { Question, VivaQuestion, ChatMessage } from '../types';

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: apiKey });

const modelName = 'gemini-2.5-flash';

export const generateMoreQuestions = async (count: number, topic?: string): Promise<Question[]> => {
  if (!apiKey) {
    console.warn("No API Key provided, returning empty list.");
    return [];
  }

  const syllabusText = JSON.stringify(SYLLABUS);
  const prompt = `Generate ${count} multiple choice questions about Linux Lab (CSEG1126) ${topic ? `specifically covering ${topic}` : 'covering the whole syllabus'}. 
  The syllabus is: ${syllabusText}.
  Return valid JSON matching this schema.`;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.INTEGER },
        question: { type: Type.STRING },
        options: { type: Type.ARRAY, items: { type: Type.STRING } },
        correctAnswer: { type: Type.INTEGER, description: "Zero-based index of the correct option" },
        explanation: { type: Type.STRING }
      },
      required: ["id", "question", "options", "correctAnswer", "explanation"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: AI_SYSTEM_INSTRUCTION
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Question[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Quiz Gen Error:", error);
    return [];
  }
};

export const generateVivaQuestions = async (count: number): Promise<VivaQuestion[]> => {
  if (!apiKey) return [];

  const syllabusText = JSON.stringify(SYLLABUS);
  const prompt = `Generate ${count} Viva Voce questions and answers for a Linux Lab End Semester Exam.
  Syllabus Context: ${syllabusText}.
  Focus on oral exam style questions (e.g., "Explain...", "How would you...", "Difference between...").`;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.INTEGER },
        question: { type: Type.STRING },
        answer: { type: Type.STRING },
        category: { type: Type.STRING, enum: ["Basic", "Intermediate", "Advanced"] }
      },
      required: ["id", "question", "answer", "category"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: AI_SYSTEM_INSTRUCTION
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as VivaQuestion[];
    }
    return [];
  } catch (error) {
    console.error("Gemini Viva Gen Error:", error);
    return [];
  }
};

export const chatWithTutor = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    if (!apiKey) return "API Key missing. Please set your Gemini API Key.";
    
    try {
        const chat = ai.chats.create({
            model: modelName,
            config: { systemInstruction: AI_SYSTEM_INSTRUCTION },
            history: history
        });

        const result = await chat.sendMessage({ message });
        return result.text || "I couldn't generate a response.";
    } catch (e) {
        console.error(e);
        return "Sorry, I encountered an error communicating with the AI Tutor.";
    }
}