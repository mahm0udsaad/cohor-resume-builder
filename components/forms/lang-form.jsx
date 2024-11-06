import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useTranslation } from "@/app/i18n/client";
import { Card, CardContent } from "../ui/card";

export default function LanguagesForm({ languages, updateData, lng }) {
  const [showLanguages, setShowLanguages] = useState(!!languages?.length);
  const { t } = useTranslation(lng, "forms");

  const languageProficiencyOptions = ["Beginner", "Intermediate", "Advanced"];

  const handleLanguageChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["languages", index, field],
      value: value,
    });
  };

  const addLanguage = () => {
    updateData({
      type: "ADD",
      path: ["languages"],
      value: { name: "", proficiency: "" },
    });
  };

  const deleteLanguage = (index) => {
    updateData({
      type: "REMOVE",
      path: ["languages"],
      index: index,
    });
  };

  return (
    <Card className="bg-white">
      {/* Toggle Button for Languages Section */}
      {/* <Button
    onClick={() => setShowLanguages(!showLanguages)}
    className="mr-2 bg-gray-50 text-black hover:bg-white"
  >
    {showLanguages
      ? t("reviewResume.hideLanguages")
      : t("reviewResume.addLanguages")}
  </Button> */}

      {showLanguages && (
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-main">
            {t("reviewResume.languagesTitle")}
          </h3>

          {/* Language List */}
          {languages.map((lang, index) => (
            <div key={index} className="mb-6 p-4 ">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  {/* Language Name Input */}
                  <Label
                    htmlFor={`languageName-${index}`}
                    className="text-main"
                  >
                    {t("reviewResume.language")}
                  </Label>
                  <Input
                    id={`languageName-${index}`}
                    value={lang.name}
                    onChange={(e) =>
                      handleLanguageChange(index, "name", e.target.value)
                    }
                    placeholder={t("reviewResume.languagePlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3]"
                  />
                </div>

                {/* Language Proficiency Selector */}
                <div className="flex-1">
                  <Label
                    htmlFor={`languageProficiency-${index}`}
                    className="text-main"
                  >
                    {t("reviewResume.proficiency")}
                  </Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) =>
                      handleLanguageChange(index, "proficiency", value)
                    }
                  >
                    <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                      <SelectValue
                        placeholder={t("reviewResume.selectProficiency")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {languageProficiencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delete Language Button */}
                <Button
                  onClick={() => deleteLanguage(index)}
                  size="icon"
                  variant="ghost"
                  className="text-gray-500 hover:text-red-500 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {/* Button to Add New Language */}
          <Button
            onClick={addLanguage}
            className="mt-4 bg-gray-50 text-black hover:bg-white"
          >
            <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addLanguage")}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
