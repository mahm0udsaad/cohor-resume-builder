// hooks/useSkillsSearch.js
import { useState, useMemo } from "react";
import { allSkills } from "@/data/data";
export function useSkillsSearch({ t }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Create a bidirectional mapping of skills
  const skillsMapping = useMemo(() => {
    const mapping = new Map();

    allSkills.forEach((englishSkill) => {
      const arabicSkill = t(`skills.availableSkills.${englishSkill}`);
      // Map English to Arabic
      mapping.set(englishSkill.toLowerCase(), {
        en: englishSkill,
        ar: arabicSkill,
      });
      // Map Arabic to English
      mapping.set(arabicSkill.toLowerCase(), {
        en: englishSkill,
        ar: arabicSkill,
      });
    });

    return mapping;
  }, [t, allSkills]);

  // Filter skills based on both English and Arabic translations
  const filteredSkills = useMemo(() => {
    if (!searchTerm) return allSkills;

    const searchTermLower = searchTerm.toLowerCase();
    const matchedSkills = new Set();

    // Search through the mapping
    skillsMapping.forEach((value, key) => {
      if (key.includes(searchTermLower)) {
        matchedSkills.add(value.en); // Always store English version as reference
      }
    });

    return Array.from(matchedSkills);
  }, [searchTerm, skillsMapping, allSkills]);

  // Helper function to display skill in current language
  const displaySkill = (skill) => {
    const mappedSkill = skillsMapping.get(skill.toLowerCase());
    if (mappedSkill) {
      // If it's a custom skill, return as is
      if (mappedSkill.isCustom) return skill;
      // Otherwise, try to get translation
      return mappedSkill.ar;
    }
    // Fallback to original skill name if not found in mapping
    return skill;
  };
  return {
    searchTerm,
    setSearchTerm,
    isDropdownOpen,
    setIsDropdownOpen,
    filteredSkills,
    displaySkill,
  };
}
