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
    <div>
      {/* <Button
        onClick={() => setShowLanguages(!showLanguages)}
        className="mr-2 bg-gray-50 text-black hover:bg-white "
      >
        {showLanguages
          ? t("reviewResume.hideLanguages")
          : t("reviewResume.addLanguages")}
      </Button> */}
      {showLanguages && (
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-black">
            {t("reviewResume.languagesTitle")}
          </h3>
          {languages.map((lang, index) => (
            <div key={index} className="mb-4 rounded relative">
              <div className="flex gap-4 mb-2 mt-8">
                <div className="flex w-full">
                  <div className="flex-1 px-4 ">
                    <Label
                      htmlFor={`languageName-${index}`}
                      className="text-black"
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
                  <div>
                    <Label
                      htmlFor={`languageProficiency-${index}`}
                      className="text-black"
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
                </div>
                <div className="flex flex-col h-full justify-center items-center mt-[1.3rem]">
                  <Button
                    onClick={() => deleteLanguage(index)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={addLanguage}
            className="mt-2 bg-gray-50 text-black hover:bg-white "
          >
            <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addLanguage")}
          </Button>
        </div>
      )}
    </div>
  );
}
