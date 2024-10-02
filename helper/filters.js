// Filter function
export const filterResumeData = (resumeData, currentTab) => {
  switch (currentTab) {
    case "personal":
      return { personalInfo: resumeData.personalInfo };
    case "experience":
      return { experiences: resumeData.experiences };
    case "education":
      return { educations: resumeData.educations };
    case "skills":
      return {
        skills: resumeData.skills,
        languages: resumeData.languages,
        courses: resumeData.courses,
      };
    case "review":
      return {
        languages: resumeData.languages,
        courses: resumeData.courses,
      };
    default:
      return {};
  }
};
