"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({
  value,
  onChange,
  label,
  displayFormat = "MMM yyyy",
  inputFormat = "yyyy-MM-dd",
}) => {
  const formatDate = (date, dateFormat) => {
    if (!date) return "";
    try {
      const parsedDate = typeof date === "string" ? parseISO(date) : date;
      return format(parsedDate, dateFormat);
    } catch (error) {
      console.error("Invalid date:", date);
      return "";
    }
  };

  const handleSelect = (date) => {
    onChange(date ? format(date, inputFormat) : "");
  };

  return (
    <div>
      <Label className="text-[#20133E]">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-[#3B51A3] focus:ring-[#3B51A3]",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              formatDate(value, displayFormat)
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ? parseISO(value) : undefined}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
