import { Question } from './question.model';

export interface Exercise {
  title: string;
  description: string;
  point: number;
  question: Question[];
}
