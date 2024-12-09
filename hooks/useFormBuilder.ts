'use client'
import { useState } from 'react';

interface Question {
  id: string;
  type: 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';
  question?: string;
  helpText?: string;
  options?: string[];
}

interface Form {
  id?: string;
  title: string;
  questions: Question[];
  isDraft?: boolean;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export const useFormBuilder = (initialForm?: Form) => {
  const [form, setForm] = useState<Form>(initialForm || {
    title: 'Untitled form',
    questions: [],
    isDraft: true,
    isPublished: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTitle = (title: string) => {
    setForm(prev => ({ ...prev, title }));
  };

  const updateQuestions = (questions: Question[]) => {
    setForm(prev => ({ ...prev, questions }));
  };

  const saveDraft = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/forms', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          questions: form.questions
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save draft');
      }

      const data = await response.json();
      setForm(data.form);
      return data.form;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save draft';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishForm = async () => {
    if (!form.id) {
      throw new Error('Form must be saved as draft first');
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/forms/${form.id}`, {  // Changed endpoint
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to publish form');
      }

      const publishedForm = await response.json();
      setForm(publishedForm);
      return publishedForm;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to publish form';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = async () => {
    if (!form.id) {
      return saveDraft();
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/forms/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          questions: form.questions
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update form');
      }

      const updatedForm = await response.json();
      setForm(updatedForm);
      return updatedForm;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update form';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    error,
    updateTitle,
    updateQuestions,
    saveDraft,
    publishForm,
    updateForm,
  };
};