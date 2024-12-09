import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ShortAnswerIcon from "@/components/Icons/ShortAnswerIcon";
import LongAnswerIcon from "@/components/Icons/LongAnswerIcon";
import RadioIcon from "@/components/Icons/RadioIcon";
import UrlIcon from "@/components/Icons/UrlIcon";
import HashtagIcon from "@/components/Icons/HashtagIcon";
import CalendarIcon from "@/components/Icons/CalendarIcon";
import ChevDownIcon from "@/components/Icons/ChevDownIcon";

type QuestionType = 'input' | 'textarea' | 'radio' | 'number' | 'url' | 'date';

interface QuestionTypeConfig {
  type: QuestionType;
  label: string;
  icon: React.FC<{ className?: string }>;
}

interface QuestionDropdownProps {
  selectedType?: QuestionType;
  onTypeChange?: (type: QuestionType) => void;
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

const QuestionDropdown: React.FC<QuestionDropdownProps> = ({ 
  selectedType = 'input',
  onTypeChange 
}) => {
  const selectedConfig = questionTypes.find(qt => qt.type === selectedType) || questionTypes[0];
  const SelectedIcon = selectedConfig.icon;

  const handleTypeSelect = (type: QuestionType) => {
    onTypeChange?.(type);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center gap-0 cursor-pointer"
        >
          <SelectedIcon className="h-5 w-5" />
          <ChevDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl">
        <DropdownMenuLabel className="uppercase text-xs font-semibold text-muted-foreground tracking-wide px-5 pt-3">
          Input Types
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {questionTypes.map(({ type, label, icon: Icon }) => (
          <DropdownMenuItem
            key={type}
            className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium"
            onClick={() => handleTypeSelect(type)}
          >
            <Icon className="mr-2" /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionDropdown;