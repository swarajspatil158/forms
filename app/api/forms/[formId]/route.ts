
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

interface RouteParams {
  params: {
    formId: string;
  };
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


export async function GET(request: Request, { params }: RouteParams) {
  try {
    const forms = await readDB();
    const form = forms.find(f => f.id === params.formId);

    if (!form) {
      return NextResponse.json(
        { message: 'Form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    const validatedData = formSchema.parse(body);
    
    const forms = await readDB();
    const formIndex = forms.findIndex(f => f.id === params.formId);

    if (formIndex === -1) {
      return NextResponse.json(
        { message: 'Form not found' },
        { status: 404 }
      );
    }

    
    const updatedForm = {
      ...forms[formIndex],
      ...validatedData,
      updatedAt: new Date(),
    };

    forms[formIndex] = updatedForm;
    await writeDB(forms);

    return NextResponse.json(updatedForm);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }
    console.error('Error updating form:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const forms = await readDB();
    const formIndex = forms.findIndex(f => f.id === params.formId);

    if (formIndex === -1) {
      return NextResponse.json(
        { message: 'Form not found' },
        { status: 404 }
      );
    }

    
    const updatedForm = {
      ...forms[formIndex],
      isDraft: false,
      isPublished: true,
      updatedAt: new Date(),
    };

    forms[formIndex] = updatedForm;
    await writeDB(forms);

    return NextResponse.json(updatedForm);
  } catch (error) {
    console.error('Error publishing form:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const forms = await readDB();
    const formIndex = forms.findIndex(f => f.id === params.formId);

    if (formIndex === -1) {
      return NextResponse.json(
        { message: 'Form not found' },
        { status: 404 }
      );
    }

    const updatedForms = forms.filter(f => f.id !== params.formId);
    await writeDB(updatedForms);

    return NextResponse.json(
      { message: 'Form deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}