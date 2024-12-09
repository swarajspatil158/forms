import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PlusIcon from "@/components/Icons/PlusIcon";
import ShortAnswerIcon from "@/components/Icons/ShortAnswerIcon";
import LongAnswerIcon from "@/components/Icons/LongAnswerIcon";
import RadioIcon from "@/components/Icons/RadioIcon";
import UrlIcon from "@/components/Icons/UrlIcon";
import HashtagIcon from "@/components/Icons/HashtagIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";

export type QuestionType = 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';

interface QuestionTypeConfig {
  type: QuestionType;
  label: string;
  icon: React.FC<{ className?: string }>;
}

interface AddQuestionDropdownProps {
  onAddQuestion: (type: QuestionType) => void;
}

const questionTypes: QuestionTypeConfig[] = [
  {
    type: 'input',
    label: 'Short Answer',
    icon: ShortAnswerIcon,
  },
  {
    type: 'textarea',
    label: 'Long Answer',
    icon: LongAnswerIcon,
  },
  {
    type: 'radio',
    label: 'Single Select',
    icon: RadioIcon,
  },
  {
    type: 'url',
    label: 'URL',
    icon: UrlIcon,
  },
  {
    type: 'number',
    label: 'Number',
    icon: HashtagIcon,
  },
  {
    type: 'date',
    label: 'Date',
    icon: CalendarIcon,
  },
];

const AddQuestionDropdown: React.FC<AddQuestionDropdownProps> = ({ onAddQuestion }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mx-auto flex gap-0 items-center justify-center"
        >
          <PlusIcon className="mr-2" /> Add Question
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[200px]">
        {questionTypes.map(({ type, label, icon: Icon }) => (
          <DropdownMenuItem
            key={type}
            onClick={() => onAddQuestion(type)}
            className="flex items-center gap-2 px-3 py-2 cursor-pointer"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AddQuestionDropdown;