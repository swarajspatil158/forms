// src/types/form.ts
import { z } from 'zod';

export interface Question {
  id: string;
  type: 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';
  question?: string;
  helpText?: string;
  options?: string[];
}

export interface Form {
  id: string;
  title: string;
  questions: Question[];
  isDraft: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const questionSchema = z.object({
  id: z.string(),
  type: z.enum(['input', 'textarea', 'radio', 'number', 'url', 'date']),
  question: z.string().optional(),
  helpText: z.string().optional(),
  options: z.array(z.string()).optional(),
});

export const formSchema = z.object({
  title: z.string(),
  questions: z.array(questionSchema),
});