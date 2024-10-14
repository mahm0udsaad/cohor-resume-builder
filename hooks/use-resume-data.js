import { useReducer, useEffect, useRef } from "react";

const initialState = {
  lng: "en",
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

function resumeReducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return {
        ...action.data,
        experiences: sortExperiencesByDate(action.data.experiences),
      };
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
      return {
        ...state,
        lng: state.lng === "en" ? "ar" : "en",
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
    }, debounceTime);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resumeData, debounceTime]);

  const updateResumeData = (action) => dispatch(action);
  const toggleLanguage = () => dispatch({ type: "TOGGLE_LANGUAGE" });

  return { resumeData, updateResumeData, toggleLanguage };
}
