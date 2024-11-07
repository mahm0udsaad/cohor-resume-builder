import React from "react";

const defaultTheme = {
  id: "original",
  name: "Original",
  primaryColor: "#3B51A3",
  backgroundColor: "#EBF8FF",
};

const Resume = ({ resumeData, selectedTheme }) => {
  let theme = selectedTheme || defaultTheme;
  const renderSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) {
      return null;
    }
    return (
      <section className="mt-8">
        <h3 style={{ color: theme.primaryColor }} className="font-bold">
          {title}
        </h3>
        {content}
      </section>
    );
  };

  const renderExperiences = () =>
    resumeData.experiences?.map((exp, index) => (
      <div key={index} className="mt-4">
        <h4 className="font-semibold text-gray-800">{exp.jobTitle}</h4>
        <p className="text-sm text-gray-600">{exp.company}</p>
        <p className="text-sm text-gray-600">
          {exp.startDate} - {exp.endDate}
        </p>
        <p className="text-gray-700 mt-2">{exp.responsibilities}</p>
      </div>
    ));

  const renderEducation = () =>
    resumeData.educations?.map((edu, index) => (
      <div key={index} className="mt-4">
        <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
        <p className="text-sm text-gray-600">{edu.institution}</p>
        <p className="text-sm text-gray-600">{edu.graduationDate}</p>
      </div>
    ));

  const renderSkills = () => (
    <ul className="text-gray-700 mt-2">
      {resumeData.skills[0]?.name &&
        resumeData.skills.map((skill, index) => (
          <li key={index}>
            {t.availableSkills[`${skill.name}`]} - {skill.level}
          </li>
        ))}
    </ul>
  );

  const renderLanguages = () => (
    <ul className="text-gray-700 mt-2">
      {resumeData.languages?.map((lang, index) => (
        <li key={index}>
          {lang.name} - {t[lang.proficiency.toLowerCase()]}
        </li>
      ))}
    </ul>
  );

  const renderCourses = () =>
    resumeData.courses?.map((course, index) => (
      <div key={index} className="mt-2">
        <h4 className="font-semibold text-gray-800">{course.name}</h4>
        <p className="text-sm text-gray-600">{course.institution}</p>
        <p className="text-sm text-gray-600">{course.completionDate}</p>
      </div>
    ));
  return (
    <div className="bg-white h-[93%] w-full max-w-4xl p-6 overflow-auto">
      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div className="w-2/3 pr-6">
          <h1
            style={{ color: theme.primaryColor }}
            className="text-4xl font-bold"
          >
            {resumeData.personalInfo?.name || "Your Name"}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            {resumeData.personalInfo?.jobTitle || "Your Job Title"}
          </h2>

          {renderSection(
            "Objective",
            <p className="text-gray-700 mt-2">{resumeData.objective}</p>,
          )}

          {renderSection("Experience", renderExperiences())}

          {renderSection("Education", renderEducation())}

          {renderSection("Courses", renderCourses())}
        </div>

        {/* Right Column */}
        <div
          style={{ backgroundColor: theme.backgroundColor }}
          className="w-1/3 p-4 rounded-md text-[12px]"
        >
          <section className="mb-8">
            <h3 className="font-bold text-gray-800">Contact</h3>
            {resumeData.personalInfo?.contact.map((contact, index) => (
              <p key={index} className="text-gray-700 mt-1">
                {contact}
              </p>
            ))}
          </section>

          <section className="mb-8">
            <h3 className="font-bold text-gray-800">About Me</h3>
            <p className="text-gray-700 mt-2">
              {resumeData.personalInfo.summary ||
                "Write about yourself here..."}
            </p>
          </section>

          {renderSection("Skills", renderSkills())}

          {renderSection("Languages", renderLanguages())}
        </div>
      </div>
    </div>
  );
};

const ModifiedResumeTemplate = ({ resumeData, selectedTheme }) => {
  return (
    <div className="flex w-full max-w-4xl mx-auto bg-white shadow-lg">
      <div
        style={{ backgroundColor: selectedTheme?.primaryColor }}
        className="w-[8%] bg-orange-600 flex justify-center items-center text-white text-lg font-bold rounded-r-md"
      >
        {/* You can optionally add content here or keep it blank */}
      </div>
      {/* Main content area (85% width) */}
      <div className="w-11/12 p-8">
        <header className="mb-6">
          <h1 className="text-5xl font-bold text-gray-800">
            {resumeData.personalInfo.name}
          </h1>
          <div className="flex flex-wrap">
            {resumeData.personalInfo.contact?.map((contact, index) => (
              <p
                key={index}
                className="text-[11px] font-semibold pr-[3px] text-gray-600"
              >
                {contact.startsWith("https") ? (
                  <a
                    href={contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {contact}
                  </a>
                ) : (
                  `${contact} `
                )}

                {index < resumeData.personalInfo.contact.length - 1 ? "|" : ""}
              </p>
            ))}
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            Experience
          </h2>
          {resumeData.experiences?.map((job, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
              <p className="text-sm text-gray-600">
                {job.company} | {job.startDate} - {job.endDate}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {job.responsibilities}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            Education
          </h2>
          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution} | {edu.graduationDate}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2 mb-4">
            Skills
          </h2>
          <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-2 gap-2">
            {resumeData.skills?.map((skill, index) => (
              <li key={index}>{t.availableSkills[`${skill.name}`]}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sidebar (15% width) */}
    </div>
  );
};

export { Resume, ModifiedResumeTemplate };
