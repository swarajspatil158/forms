import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FormattedDateInput from "./ui/formatted-date-input";
import DynamicInputs from "./DynamicInputs";
import QuestionField from "@/components/QuestionField";
import AddQuestionDropdown, { QuestionType } from "@/components/AddQuestionDropdown";

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
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(7),
      type
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
    <div className="space-y-1 flex flex-col align-start mb-[40vh] my-4 mx-auto max-w-[592px]">
      {questions.map((question) => (
        <div key={question.id} className="relative group ">
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
              size="icon"
              className="absolute -right-1 -top-0  opacity-0   group-hover:opacity-100 transition-all delay-75 w-6"
              onClick={() => removeQuestion(question.id)}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </QuestionField>
        </div>
      ))}

      <AddQuestionDropdown onAddQuestion={addQuestion} />
    </div>
  );
};

export default QuestionList;