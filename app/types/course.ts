export interface Lesson {
  id: number;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
  content?: string;
  videoUrl?: string;
  questions?: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  progress: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  color: string;
  modules: Module[];
} 