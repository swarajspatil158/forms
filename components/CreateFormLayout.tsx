'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArrowUpRightIcon from './Icons/ArrowUpRightIcon';
import { useFormBuilder } from '@/hooks/useFormBuilder';
import FormActions from './FormActions';

interface CreateFormLayoutProps {
  children: React.ReactNode;
}

const CreateFormLayout: React.FC<CreateFormLayoutProps> = ({ children }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const { form, isLoading, updateTitle, saveDraft, publishForm } = useFormBuilder();

  const handleTitleBlur = () => setIsEditingTitle(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleTitleClick = () => setIsEditingTitle(true);

  return (
    <div className="flex flex-col relative min-h-screen max-w-[640px] mx-auto bg-background border-x">
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <Input
              value={form.title}
              onChange={(e) => updateTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              className="h-8 px-2 py-1 max-w-[200px]"
              autoFocus
            />
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 text-muted-foreground"
              onClick={handleTitleClick}
            >
              <span className="text-base font-semibold">{form.title}</span>
            </button>
          )}
        </div>
        <Button variant="outline" size="sm">
          Preview
          <ArrowUpRightIcon />
        </Button>
      </header>

      <main className="flex-1 mb-20 rounded-lg">
        {children}
      </main>

      <FormActions
        formId={form.id}
        isLoading={isLoading}
        onSaveDraft={saveDraft}
        onPublish={publishForm}
      />
    </div>
  );
};

export default CreateFormLayout;