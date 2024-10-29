import { useReducer, useEffect, useRef, useCallback } from "react";

const initialState = {
  lng: "en",
  personalInfo: {
    name: "",
    jobTitle: "",
    summary: "",
    contact: ["", ""],
    imageUrl: "",
  },
  experiences: [
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  ],
  educations: [
    {
      degree: "",
      institution: "",
      graduationDate: "",
      gpaType: "none",
      numericGpa: "",
      descriptiveGpa: "",
    },
  ],
  skills: [],
  languages: [{ name: "", proficiency: "" }],
  courses: [{ name: "", institution: "", completionDate: "" }],
};

function getInitialData(dbData) {
  if (!dbData || dbData.success === false) {
    const storedData =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resumeData")
        : null;
    return storedData ? JSON.parse(storedData) : initialState;
  }

  return {
    lng: "en",
    personalInfo: {
      name: dbData.user.name || "",
      imageUrl: dbData.user.photoURL || "",
      ...dbData.personalInfo,
    },
    experiences:
      dbData.experiences?.length > 0
        ? sortExperiencesByDate(dbData.experiences)
        : initialState.experiences,
    educations:
      dbData.educations?.length > 0
        ? dbData.educations
        : initialState.educations,
    skills: dbData.skills || [],
    languages:
      dbData.languages?.length > 0 ? dbData.languages : initialState.languages,
    courses: dbData.courses?.length > 0 ? dbData.courses : initialState.courses,
  };
}

function resumeReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
    case "ADD":
    case "REMOVE": {
      const newState = updateNestedState(state, action);
      if (action.path[0] === "experiences") {
        newState.experiences = sortExperiencesByDate(newState.experiences);
      }
      return newState;
    }
    case "TOGGLE_LANGUAGE":
      return { ...state, lng: state.lng === "en" ? "ar" : "en" };
    case "UPDATE_IMAGE_URL":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, imageUrl: action.url },
      };
    default:
      return state;
  }
}

function sortExperiencesByDate(experiences) {
  return [...experiences].sort((a, b) => {
    const dateA = a.endDate === "Present" ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === "Present" ? new Date() : new Date(b.endDate);
    return dateB - dateA;
  });
}

function updateNestedState(state, action) {
  const newState = structuredClone(state);
  let current = newState;

  action.path.slice(0, -1).forEach((key) => {
    current[key] = current[key] || {};
    current = current[key];
  });

  const lastKey = action.path.at(-1);

  switch (action.type) {
    case "UPDATE":
      current[lastKey] = action.value;
      break;
    case "ADD":
      current[lastKey] = [...(current[lastKey] || []), action.value];
      break;
    case "REMOVE":
      if (Array.isArray(current[lastKey])) {
        current[lastKey].splice(action.index, 1);
      }
      break;
  }

  return newState;
}

export function useResumeData(initialData, debounceTime = 3000) {
  const [resumeData, dispatch] = useReducer(
    resumeReducer,
    getInitialData(initialData),
  );
  const timeoutRef = useRef(null);

  // Debounced save to sessionStorage
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
      sessionStorage.setItem(
        "resumeDataLastModified",
        new Date().toISOString(),
      );
    }, debounceTime);

    return () => clearTimeout(timeoutRef.current);
  }, [resumeData, debounceTime]);

  const updateResumeData = useCallback((action) => dispatch(action), []);
  const toggleLanguage = useCallback(
    () => dispatch({ type: "TOGGLE_LANGUAGE" }),
    [],
  );
  const updateImageUrl = useCallback(
    (url) => dispatch({ type: "UPDATE_IMAGE_URL", url }),
    [],
  );

  return {
    resumeData,
    updateResumeData,
    toggleLanguage,
    updateImageUrl,
  };
}
