import { Question } from './question.model';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  points: number;
  questions: Question[];
}
