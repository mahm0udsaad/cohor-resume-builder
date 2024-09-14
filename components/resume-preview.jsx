"use client";
const getLevelLabel = (level) => {
  switch (level) {
    case 1:
      return "Beginner";
    case 2:
      return "Skillful";
    case 3:
      return "Experienced";
    case 4:
      return "Expert";
    default:
      return "Beginner";
  }
};

export function ResumePreview({ resumeData, selectedTheme }) {
  return (
    <div
      className={`bg-[${selectedTheme.backgroundColor}] p-6 rounded-lg shadow`}
    >
      <h3
        className={`text-2xl font-bold mb-2 text-[${selectedTheme.textColor}]`}
      >
        {resumeData.personalInfo.name || "Your Name"}
      </h3>
      <p className={`text-[${selectedTheme.secondaryColor}] mb-4`}>
        {resumeData.personalInfo.email} | {resumeData.personalInfo.phone}
      </p>
      <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
        <h4
          className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
        >
          Professional Summary
        </h4>
        <p>{resumeData.personalInfo.summary}</p>
      </div>
      <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
        <h4
          className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
        >
          Work Experience
        </h4>
        {resumeData.experiences.map((exp, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">
              {exp.jobTitle} at {exp.company}
            </p>
            <p className={`text-sm text-[${selectedTheme.secondaryColor}]`}>
              {exp.startDate} - {exp.endDate}
            </p>
            <p>{exp.responsibilities}</p>
          </div>
        ))}
      </div>
      <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
        <h4
          className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
        >
          Education
        </h4>
        {resumeData.educations.map((edu, index) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">
              {edu.degree} - {edu.institution}
            </p>
            <p className={`text-sm text-[${selectedTheme.secondaryColor}]`}>
              Graduated: {edu.graduationDate}
            </p>
          </div>
        ))}
      </div>
      <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
        <h4
          className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
        >
          Skills
        </h4>
        <div className="flex flex-wrap">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className={`mr-2 mb-2 px-2 py-1 bg-[${selectedTheme.primaryColor}] text-white rounded`}
            >
              {skill.name} - {getLevelLabel(skill.level)}
            </span>
          ))}
        </div>
      </div>
      {resumeData.languages.length > 0 && (
        <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
          <h4
            className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
          >
            Languages
          </h4>
          {resumeData.languages.map((lang, index) => (
            <p key={index}>
              {lang.name} - {lang.proficiency}
            </p>
          ))}
        </div>
      )}
      {resumeData.courses.length > 0 && (
        <div className={`mb-4 text-[${selectedTheme.textColor}]`}>
          <h4
            className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
          >
            Courses & Training
          </h4>
          {resumeData.courses.map((course, index) => (
            <div key={index} className="mb-1">
              <p className="font-semibold">{course.name}</p>
              <p className={`text-sm text-[${selectedTheme.secondaryColor}]`}>
                {course.institution} - Completed: {course.completionDate}
              </p>
            </div>
          ))}
        </div>
      )}
      {resumeData.customSections.map((section, index) => (
        <div key={index} className={`mb-4 text-[${selectedTheme.textColor}]`}>
          <h4
            className={`text-lg font-semibold mb-1 text-[${selectedTheme.primaryColor}]`}
          >
            {section.title}
          </h4>
          <p>{section.content}</p>
        </div>
      ))}
    </div>
  );
}
