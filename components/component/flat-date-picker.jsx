"use client";

import * as React from "react";
import { format, parseISO, setYear } from "date-fns";
import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FlatDatePicker = ({
  value,
  onChange,
  label,
  displayFormat = "MMM yyyy",
  inputFormat = "yyyy-MM-dd",
}) => {
  const [calendarDate, setCalendarDate] = React.useState(new Date());
  const [isYearSelectOpen, setIsYearSelectOpen] = React.useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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
    if (date) {
      setCalendarDate(date);
    }
  };

  const handleYearChange = (year) => {
    const newDate = setYear(calendarDate, parseInt(year));
    setCalendarDate(newDate);
    setIsYearSelectOpen(false);
  };

  React.useEffect(() => {
    if (value) {
      setCalendarDate(parseISO(value));
    }
  }, [value]);

  return (
    <div className="space-y-2 w-full">
      <Label className="text-main">{label}</Label>
      <Input
        value={value ? formatDate(value, displayFormat) : ""}
        readOnly
        placeholder="Select a date"
        className="border-[#3B51A3] focus:ring-[#3B51A3] mb-2"
      />
      <div className="border rounded-lg p-3 bg-white">
        <div className="flex items-center justify-between px-4 pb-2">
          <Select
            open={isYearSelectOpen}
            onOpenChange={setIsYearSelectOpen}
            value={calendarDate.getFullYear().toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{calendarDate.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent position="popper">
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
          selected={value ? parseISO(value) : undefined}
          onSelect={handleSelect}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default FlatDatePicker;
