import * as React from "react"
import { useState, useCallback } from "react"

const FormattedDateInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, onChange, ...props }, ref) => {
    const [value, setValue] = useState("")

    const isValidDate = (day: number, month: number, year: number): boolean => {
      
      if (year && (year < 1901 || year > 2100)) {
        return false
      }

      
      if (month && (month < 1 || month > 12)) {
        return false
      }

      
      if (day) {
        const daysInMonth = new Date(year || 2000, month || 1, 0).getDate()
        if (day < 1 || day > daysInMonth) {
          return false
        }
      }

      return true
    }

    const formatDate = useCallback((input: string) => {
      
      const numbers = input.replace(/\D/g, "")
      
      
      const day = numbers.slice(0, 2)
      const month = numbers.slice(2, 4)
      const year = numbers.slice(4, 8)

      
      const dayNum = parseInt(day)
      const monthNum = parseInt(month)
      const yearNum = parseInt(year)

      
      let formatted = ""
      
      
      if (day.length > 0) {
        if (day.length === 2 && dayNum > 31) {
          formatted += "31"
        } else {
          formatted += day
        }
      }

      
      if (month.length > 0) {
        formatted += "-"
        if (month.length === 2 && monthNum > 12) {
          formatted += "12"
        } else {
          formatted += month
        }
      }

      
      if (year.length > 0) {
        formatted += "-"
        if (year.length === 4) {
          if (yearNum < 1901) {
            formatted += "1901"
          } else if (yearNum > 2100) {
            formatted += "2100"
          } else {
            formatted += year
          }
        } else {
          formatted += year
        }
      }

      
      if (formatted.length === 10) {
        const [d, m, y] = formatted.split("-").map(num => parseInt(num))
        if (!isValidDate(d, m, y)) {
          
          const validDate = new Date(y, m - 1, d)
          const validDay = validDate.getDate().toString().padStart(2, "0")
          const validMonth = (validDate.getMonth() + 1).toString().padStart(2, "0")
          const validYear = validDate.getFullYear().toString()
          formatted = `${validDay}-${validMonth}-${validYear}`
        }
      }

      return formatted
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDate(event.target.value)
      setValue(formatted)
      
      
      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: formatted
        }
      }
      
      onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="DD-MM-YYYY"
        maxLength={10}
        className={`flex h-10 w-full transition-all ease-in duration-75 rounded-md border 
          border-input bg-background px-3 py-2 text-base text-foreground 
          ring-offset-background file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-0 
          disabled:cursor-not-allowed disabled:opacity-50 
          md:text-sm shadow-sm ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

FormattedDateInput.displayName = "FormattedDateInput"

export default FormattedDateInput