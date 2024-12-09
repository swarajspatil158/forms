import React, { ReactNode } from "react";
import DragDropVerticalIcon from "@/components/Icons/DragDropVertical";
import { Button } from "@/components/ui/button";
import { QuestionInput } from "@/components/ui/question-input";
import QuestionDropdown from "@/components/QuestionDropdown";

type QuestionType = 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';

interface QuestionFieldProps {
  children: ReactNode;
  selectedType: QuestionType;
  onTypeChange?: (type: QuestionType) => void;
  onQuestionChange?: (question: string) => void;
  onHelpTextChange?: (helpText: string) => void;
  question?: string;
  helpText?: string;
  className?: string;
}

const QuestionField: React.FC<QuestionFieldProps> = ({ 
  children, 
  selectedType,
  onTypeChange,
  onQuestionChange,
  onHelpTextChange,
  question = '',
  helpText = '',
  className = ''
}) => {
  const handleQuestionChange = (value: string) => {
    onQuestionChange?.(value);
  };

  const handleHelpTextChange = (value: string) => {
    onHelpTextChange?.(value);
  };

  return (
    <div className={`transition-colors ease-out duration-75 items-center justify-center gap-2 my-7 p-4 border rounded-2xl ${className}`}>
      <div className="flex gap-1 items-start justify-start">
        <div className="flex-grow">
          <QuestionInput
            value={question}
            onChange={(e) => handleQuestionChange(e.target.value)}
            placeholder="Write a question"
            className="font-semibold text-sm"
          />
          <QuestionInput
            value={helpText}
            onChange={(e) => handleHelpTextChange(e.target.value)}
            placeholder="Write a help text or caption(leave empty if not needed)"
            className="font-normal text-xs md:text-xs"
          />
        </div>
        <div className="flex-shrink flex gap-3 text-muted-foreground">
          <QuestionDropdown 
            selectedType={selectedType}
            onTypeChange={onTypeChange}
          />
          <Button 
            size="icon" 
            variant="ghost"
            className="cursor-move"
          >
            <DragDropVerticalIcon strokeWidth={2} />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default QuestionField;