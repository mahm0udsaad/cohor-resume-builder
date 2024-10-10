"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const FlatDatePicker = ({
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
    <div className="space-y-2 w-full">
      <Label className="text-[#20133E]">{label}</Label>
      <Input
        value={value ? formatDate(value, displayFormat) : ""}
        readOnly
        placeholder="Select a date"
        className="border-[#3B51A3] focus:ring-[#3B51A3] mb-2"
      />
      <div className="border rounded-lg p-3 bg-white">
        <Calendar
          mode="single"
          selected={value ? parseISO(value) : undefined}
          onSelect={handleSelect}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default FlatDatePicker;
