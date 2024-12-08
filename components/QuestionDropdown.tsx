import * as React from "react"
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

const QuestionDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center gap-0 cursor-pointer"
        >
          <ShortAnswerIcon className="h-5 w-5" />
          <ChevDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-2xl">
        <DropdownMenuLabel className="uppercase text-xs font-semibold text-muted-foreground tracking-wide px-5 pt-3">
          Input Types
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <ShortAnswerIcon /> Short Answer
        </DropdownMenuItem>
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <LongAnswerIcon /> Long Answer
        </DropdownMenuItem>
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <RadioIcon /> Single Select
        </DropdownMenuItem>
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <UrlIcon /> URL
        </DropdownMenuItem>
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <HashtagIcon /> Number
        </DropdownMenuItem>
        <DropdownMenuItem className="w-[150px] md:w-[300px] text-start px-3 py-2 cursor-pointer text-sm font-medium">
          <CalendarIcon /> Date
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionDropdown;