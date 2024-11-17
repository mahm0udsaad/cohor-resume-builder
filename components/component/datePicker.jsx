"use client";

import * as React from "react";
import { format, parseISO, setYear, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

const DatePicker = ({
  value,
  onChange,
  disabled,
  label,
  isEditing = true,
  displayFormat = "MMM yyyy",
  inputFormat = "yyyy-MM-dd",
}) => {
  const [calendarDate, setCalendarDate] = React.useState(new Date());
  const [isYearSelectOpen, setIsYearSelectOpen] = React.useState(false);
  const pathname = usePathname();
  const pathList = pathname.split("/");
  const lng = pathList[1];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const formatDate = (date, dateFormat) => {
    if (!date) return "";
    if (date === "Present") return date;

    try {
      // Handle both Date objects and ISO strings
      const parsedDate = date instanceof Date ? date : parseISO(date);
      if (!isValid(parsedDate)) return "";
      return format(parsedDate, dateFormat);
    } catch (error) {
      console.error("Invalid date:", date);
      return "";
    }
  };

  const handleSelect = (date) => {
    if (!date) {
      onChange("");
      return;
    }

    try {
      const formattedDate = format(date, inputFormat);
      onChange(formattedDate);
      setCalendarDate(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      onChange("");
    }
  };

  const handleYearChange = (year) => {
    try {
      const newDate = setYear(calendarDate, parseInt(year));
      setCalendarDate(newDate);
      setIsYearSelectOpen(false);
    } catch (error) {
      console.error("Error changing year:", error);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  React.useEffect(() => {
    if (!value || value === "Present") {
      setCalendarDate(new Date());
      return;
    }

    try {
      // Handle both Date objects and ISO strings
      const parsedDate = value instanceof Date ? value : parseISO(value);
      if (isValid(parsedDate)) {
        setCalendarDate(parsedDate);
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }
  }, [value]);

  const displayValue = formatDate(value, displayFormat);

  return (
    <div className="relative" onClick={handleClick}>
      <Label className="text-main">{label}</Label>
      {isEditing ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full mt-2 justify-start text-left font-normal border-[#3B51A3] focus:ring-[#3B51A3]",
                !displayValue && "text-muted-foreground",
                disabled && "cursor-not-allowed opacity-50",
              )}
              disabled={disabled}
            >
              <CalendarIcon className="mx-2 h-4 w-4" />
              {displayValue || <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 z-[60]"
            align="start"
            onClick={handleClick}
          >
            <div className="flex items-center justify-between px-4 pt-2">
              <Select
                open={isYearSelectOpen}
                onOpenChange={setIsYearSelectOpen}
                value={calendarDate.getFullYear().toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue>{calendarDate.getFullYear()}</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" className="z-[60]">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Calendar
              mode="single"
              selected={
                value instanceof Date
                  ? value
                  : typeof value === "string" && value !== "Present"
                  ? parseISO(value)
                  : undefined
              }
              onSelect={handleSelect}
              month={calendarDate}
              onMonthChange={setCalendarDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <p>
          {displayValue === "Present"
            ? lng === "ar"
              ? "اعمل هناك حاليا"
              : "Present"
            : displayValue}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
