import { useReducer, useEffect, useRef } from "react";

const initialState = {
  lng: "en", // Initial language state
  personalInfo: {
    name: "",
    jobTitle: "",
    summary: "",
    contact: ["", ""],
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
  educations: [{ degree: "", institution: "", graduationDate: "" }],
  skills: [],
  languages: [{ name: "", proficiency: "" }],
  courses: [{ name: "", institution: "", completionDate: "" }],
};

function resumeReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.data;
    case "ADD_SKILL":
      return {
        ...state,
        sections: {
          ...state.sections,
          skills: [...state.sections.skills, action.payload],
        },
      };
    case "UPDATE":
    case "ADD":
    case "REMOVE":
      return updateNestedState(state, action);
    case "TOGGLE_LANGUAGE": // New action type for toggling language
      return {
        ...state,
        lng: state.lng === "en" ? "ar" : "en", // Toggle between "en" and "ar"
      };
    default:
      return state;
  }
}

function updateNestedState(state, action) {
  const newState = structuredClone(state); // Cloning the state
  let current = newState;

  // Traverse to the nested property
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
      if (Array.isArray(current[lastKey]))
        current[lastKey].splice(action.index, 1);
      break;
  }

  return newState;
}

export function useResumeData(debounceTime = 3000) {
  const [resumeData, dispatch] = useReducer(resumeReducer, initialState);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("resumeData");
    if (storedData) {
      dispatch({ type: "LOAD", data: JSON.parse(storedData) });
    }
  }, []);

  useEffect(() => {
    // Clear previous timeout if any
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set a new timeout to delay saving to sessionStorage
    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
    }, debounceTime);

    // Cleanup function to clear timeout if component unmounts or before next effect
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resumeData, debounceTime]);

  const updateResumeData = (action) => dispatch(action);

  // Function to toggle language
  const toggleLanguage = () => dispatch({ type: "TOGGLE_LANGUAGE" });

  return { resumeData, updateResumeData, toggleLanguage }; // Expose toggleLanguage
}
