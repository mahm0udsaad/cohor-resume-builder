// ReviewForm.js
import React from "react";
import { Button, Input, Textarea } from "@/components/ui/";
import { Plus, Trash2, Download } from "lucide-react";

export const ReviewForm = ({
  showLanguages,
  setShowLanguages,
  showCourses,
  setShowCourses,
  showCustomSections,
  setShowCustomSections,
  languages,
  handleLanguageChange,
  deleteLanguage,
  addLanguage,
  courses,
  handleCourseChange,
  deleteCourse,
  addCourse,
  customSections,
  handleCustomSectionChange,
  deleteCustomSection,
  addCustomSection,
}) => (
  <>
    {/* Toggle buttons for Languages, Courses, and Custom Sections */}
    {showLanguages && (
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-[#20133E]">Languages</h3>
        {/* Language inputs */}
        <Button onClick={addLanguage} className="mt-2 bg-[#3B51A3]">
          <Plus className="h-4 w-4 mr-2" /> Add Language
        </Button>
      </div>
    )}
    {/* Similar structure for Courses and Custom Sections */}
    <div className="mt-6">
      <Button className="w-full bg-[#3B51A3]">
        <Download className="h-4 w-4 mr-2" /> Download PDF
      </Button>
    </div>
  </>
);
