import { CATEGORY_TYPE, QUESTION_TYPE } from '../utils/constants.ts';

export type Question = {
  title: string;
  answer: string;
  category: keyof CATEGORY_TYPE;
  type: keyof QUESTION_TYPE;
  answerList: string[];
  id: string;
};

export type NavigationButton = 'prev' | 'next';
