import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ArrowUpRightIcon from './Icons/ArrowUpRightIcon';
import DraftIcon from './Icons/DraftIcon';
import CheckIcon from './Icons/CheckIcon';

const CreateFormLayout = ({children}) => {
  const [formTitle, setFormTitle] = useState('Untitled form');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  return (
    <div className="w-full max-w-[640px] mx-auto min-h-screen flex flex-col bg-background relative border-x">
      <div className="flex justify-between items-center p-4 sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center gap-2">
          {isEditingTitle ? (
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              className="max-w-[200px] h-8 px-2 py-1"
              autoFocus
            />
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer text-muted-foreground"
              onClick={() => setIsEditingTitle(true)}
            >
              <span className="text-base font-semibold">{formTitle}</span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm">
          Preview <ArrowUpRightIcon/>
        </Button>
      </div>

      <div className="flex-1 rounded-lg mb-20">
        {children}
      </div>

      <div className="flex justify-between items-center p-4 sticky bottom-0 z-10 bg-background border-t">
        <Button variant="outline" size="sm">
          <DraftIcon/>Save as Draft
        </Button>
        <Button variant="default" size="sm">
          <CheckIcon/> Publish form
        </Button>
      </div>
    </div>
  );
};

export default CreateFormLayout;