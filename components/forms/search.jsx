"use client";
import { useTranslation } from "@/app/i18n/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React from "react";

const SearchForm = ({ lng }) => {
  const { t } = useTranslation(lng, "builder");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleSearchTermChange = React.useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleCategoryChange = React.useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const categories = [
    "All",
    "Technology",
    "Design",
    "Marketing",
    "Sales",
    "Finance",
    "Management",
    "Healthcare",
    "Education",
    "Legal",
    "Hospitality",
    "Food & Beverage",
    "Retail",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={t("searchForm.placeholder")}
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="pl-10"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder={t("searchForm.selectCategory")} />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {t(`categories.${category.toLocaleLowerCase()}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default SearchForm;
