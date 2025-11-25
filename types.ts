export interface SyllabusItem {
  experiment: number;
  title: string;
  theory: string;
  labTasks: string[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
  explanation: string;
}

export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  category: 'Basic' | 'Intermediate' | 'Advanced';
}

export type AppView = 'home' | 'notes' | 'quiz' | 'viva' | 'tutor';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}