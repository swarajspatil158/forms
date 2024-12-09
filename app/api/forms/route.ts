
import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';


interface Question {
  id: string;
  type: 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';
  question?: string;
  helpText?: string;
  options?: string[];
}

interface Form {
  id: string;
  title: string;
  questions: Question[];
  isDraft: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}


const questionSchema = z.object({
  id: z.string(),
  type: z.enum(['input', 'textarea', 'radio', 'number', 'url', 'date']),
  question: z.string().optional(),
  helpText: z.string().optional(),
  options: z.array(z.string()).optional(),
});

const formSchema = z.object({
  title: z.string(),
  questions: z.array(questionSchema),
});


const DB_PATH = path.join(process.cwd(), 'app', 'data.json');

async function readDB(): Promise<Form[]> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeDB([]);
      return [];
    }
    throw error;
  }
}

async function writeDB(forms: Form[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(forms, null, 2));
}


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = formSchema.parse(body);

    const forms = await readDB();
    const newForm: Form = {
      id: Math.random().toString(36).substring(7),
      ...validatedData,
      isDraft: true,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    forms.push(newForm);
    await writeDB(forms);

    return NextResponse.json(
      { message: 'Form saved as draft', form: newForm },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating form:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const forms = await readDB();
    return NextResponse.json({ forms });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}