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
  // Handle case where no data is provided or data fetch failed
  if (!dbData || dbData.success === false) {
    // Only try to access sessionStorage on client side
    if (typeof window !== "undefined") {
      try {
        const storedData = sessionStorage.getItem("resumeData");
        return storedData ? JSON.parse(storedData) : initialState;
      } catch (error) {
        console.error("Error reading from sessionStorage:", error);
        return initialState;
      }
    }
    return initialState;
  }

  // If we have valid dbData, construct the initial state
  return {
    lng: dbData.lng || "en",
    personalInfo: {
      name: dbData.user?.name || "",
      jobTitle: dbData.personalInfo?.jobTitle || "",
      summary: dbData.personalInfo?.summary || "",
      contact: dbData.personalInfo?.contact || ["", ""],
      imageUrl: dbData.user?.photoURL || dbData.personalInfo?.imageUrl || "",
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

  // Navigate to the correct nested level
  action.path.slice(0, -1).forEach((key) => {
    if (!current[key]) {
      current[key] = Array.isArray(current[key]) ? [] : {};
    }
    current = current[key];
  });

  const lastKey = action.path[action.path.length - 1];

  switch (action.type) {
    case "UPDATE":
      current[lastKey] = action.value;
      break;
    case "ADD":
      if (!Array.isArray(current[lastKey])) {
        current[lastKey] = [];
      }
      current[lastKey].push(action.value);
      break;
    case "REMOVE":
      if (Array.isArray(current[lastKey]) && action.index >= 0) {
        current[lastKey].splice(action.index, 1);
      }
      break;
  }

  return newState;
}

function resumeReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
    case "ADD":
    case "REMOVE": {
      const newState = updateNestedState(state, action);
      // Sort experiences if they were modified
      if (action.path[0] === "experiences") {
        newState.experiences = sortExperiencesByDate(newState.experiences);
      }
      return newState;
    }
    case "TOGGLE_LANGUAGE":
      return {
        ...state,
        lng: state.lng === "en" ? "ar" : "en",
      };
    case "UPDATE_IMAGE_URL":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          imageUrl: action.url,
        },
      };
    case "RESET":
      return getInitialData(action.data);
    default:
      console.warn(`Unknown action type: ${action.type}`);
      return state;
  }
}

export function useResumeData(initialData, debounceTime = 3000) {
  // Initialize the reducer with a function to handle initial state setup
  const [resumeData, dispatch] = useReducer(
    resumeReducer,
    initialData,
    getInitialData,
  );

  // Ref for managing debounce timeout
  const timeoutRef = useRef(null);

  // Save to sessionStorage with debouncing
  useEffect(() => {
    // Skip if we're not in a browser environment
    if (typeof window === "undefined") return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to save data
    timeoutRef.current = setTimeout(() => {
      try {
        sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
        sessionStorage.setItem(
          "resumeDataLastModified",
          new Date().toISOString(),
        );
      } catch (error) {
        console.error("Error saving to sessionStorage:", error);
      }
    }, debounceTime);

    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resumeData, debounceTime]);

  // Memoized action creators
  const updateResumeData = useCallback((action) => {
    if (!action.type || !action.path) {
      console.error("Invalid action format", action);
      return;
    }
    dispatch(action);
  }, []);

  const toggleLanguage = useCallback(() => {
    dispatch({ type: "TOGGLE_LANGUAGE" });
  }, []);

  const updateImageUrl = useCallback((url) => {
    dispatch({ type: "UPDATE_IMAGE_URL", url });
  }, []);

  const resetResumeData = useCallback((data) => {
    dispatch({ type: "RESET", data });
  }, []);

  return {
    resumeData,
    updateResumeData,
    toggleLanguage,
    updateImageUrl,
    resetResumeData,
  };
}
