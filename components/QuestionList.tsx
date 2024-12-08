'use client'

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QuestionField from "@/components/QuestionField";
import { Button } from "@/components/ui/button";
import PlusIcon from "@/components/Icons/PlusIcon";
import { X } from "lucide-react";

interface Question {
  id: string;
  type: 'input' | 'textarea';
}

interface QuestionListProps {
  onQuestionAdd?: () => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ onQuestionAdd }) => {
  const [questions, setQuestions] = React.useState<Question[]>([
    { id: '1', type: 'input' },
    { id: '2', type: 'textarea' }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(7),
      type: 'input'
    };
    setQuestions([...questions, newQuestion]);
    
    // Call the scroll callback after adding the question
    setTimeout(() => {
      onQuestionAdd?.();
    }, 0);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="space-y-4 flex flex-col align-start mb-[40vh]">
      {questions.map((question) => (
        <div key={question.id} className="relative group">
          <QuestionField>
            {question.type === 'input' ? (
              <Input
                type="text"
                placeholder="Type your response here."
                className="mt-2.5"
              />
            ) : (
              <Textarea
                placeholder="Type your response here."
                className="resize-none mt-2.5"
              />
            )}
          </QuestionField>
          
          <Button
            variant="ghost"
            size="sm"
            className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeQuestion(question.id)}
          >
            <X className="h-4 w-4" />
          </Button>
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