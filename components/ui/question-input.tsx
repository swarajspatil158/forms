import * as React from "react"
import { cn } from "@/lib/utils"

const QuestionInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-5 w-full text-base  placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
QuestionInput.displayName = "QuestionInput"

export { QuestionInput }