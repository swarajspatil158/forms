import * as React from "react"
import { ReactNode } from "react";
import DragDropVerticalIcon from "@/components/Icons/DragDropVertical";
import { Button } from "@/components/ui/button";
import { QuestionInput } from "@/components/ui/question-input";
import QuestionDropdown from "@/components/QuestionDropdown";

interface QuestionFieldProps {
  children: ReactNode;
}

const QuestionField = ({ children }: QuestionFieldProps) => {
  return (
    <div className="transition-colors ease-out duration-75 items-center justify-center gap-2 my-7 p-4 border rounded-2xl">
      <div className="flex gap-1 items-start justify-start">
        <div className="flex-grow">
          <QuestionInput
            placeholder="Write a question"
            className="text-muted-foreground font-semibold text-sm"
          />
          <QuestionInput
            placeholder="Write a help text or caption(leave empty if not needed)"
            className="text-muted-foreground font-normal text-xs md:text-xs"
          />
        </div>
        <div className="flex-shrink flex gap-3 text-muted-foreground">
          <QuestionDropdown />
          <Button size="icon" variant="ghost">
            <DragDropVerticalIcon strokeWidth={2} />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default QuestionField;