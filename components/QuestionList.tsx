import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FormattedDateInput from "./ui/formatted-date-input";
import DynamicInputs from "./DynamicInputs";
import QuestionField from "@/components/QuestionField";
import PlusIcon from "@/components/Icons/PlusIcon";

type QuestionType = 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';

interface Question {
  id: string;
  type: QuestionType;
  question?: string;
  helpText?: string;
}

interface QuestionListProps {
  onQuestionAdd?: () => void;
}

const QuestionInputMap: Record<QuestionType, React.FC<{ className?: string }>> = {
  input: ({ className }) => (
    <Input
      type="text"
      placeholder="Type your response here."
      className={className}
    />
  ),
  textarea: ({ className }) => (
    <Textarea
      placeholder="Type your response here."
      className={`resize-none ${className}`}
    />
  ),
  radio: ({ className }) => (
    <DynamicInputs
      type="text"
      placeholder="option"
      className={className}
    />
  ),
  number: ({ className }) => (
    <Input
      type="number"
      placeholder="Enter a number"
      className={className}
    />
  ),
  url: ({ className }) => (
    <Input
      type="text"
      placeholder="https://www.example.com"
      className={className}
    />
  ),
  date: ({ className }) => (
    <FormattedDateInput
      type="text"
      placeholder="DD-MM-YY"
      className={className}
    />
  ),
};

const QuestionList: React.FC<QuestionListProps> = ({ onQuestionAdd }) => {
  const [questions, setQuestions] = React.useState<Question[]>([
   
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(7),
      type: 'input'
    };
    setQuestions([...questions, newQuestion]);
    
    setTimeout(() => {
      onQuestionAdd?.();
    }, 0);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleTypeChange = (id: string, newType: QuestionType) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, type: newType } : q
    ));
  };

  const handleQuestionChange = (id: string, question: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, question } : q
    ));
  };

  const handleHelpTextChange = (id: string, helpText: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, helpText } : q
    ));
  };

  const renderQuestionInput = (type: QuestionType) => {
    const InputComponent = QuestionInputMap[type];
    return <InputComponent className="mt-2.5" />;
  };

  return (
    <div className="space-y-4 flex flex-col align-start mb-[40vh]">
      {questions.map((question) => (
        <div key={question.id} className="relative group">
          <QuestionField 
            selectedType={question.type}
            onTypeChange={(newType) => handleTypeChange(question.id, newType)}
            onQuestionChange={(value) => handleQuestionChange(question.id, value)}
            onHelpTextChange={(value) => handleHelpTextChange(question.id, value)}
            question={question.question}
            helpText={question.helpText}
          >
            {renderQuestionInput(question.type)}
            <Button
              variant="ghost"
              size="sm"
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeQuestion(question.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </QuestionField>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={addQuestion}
        className="mx-auto flex gap-0 items-center justify-center"
      >
        <PlusIcon className="mr-2" /> Add Question
      </Button>
    </div>
  );
};

export default QuestionList;