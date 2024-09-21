import { useReducer, useEffect, useRef } from "react";

const initialState = {
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
  skills: [{ name: "", level: "beginner" }],
  languages: [{ name: "", proficiency: "" }],
  courses: [{ name: "", institution: "", completionDate: "" }],
  customSections: [{ title: "", content: "" }],
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

  return { resumeData, updateResumeData };
}
