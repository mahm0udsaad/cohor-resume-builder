const DefaultTemplate = ({ data }) => (
  <div className="space-y-4 bg-white p-6 rounded-lg shadow">
    <div>
      <h3 className="text-xl font-bold text-[#20133E]">
        {data.personalInfo.name || "Your Name"}
      </h3>
      <p className="text-[#20133E]">
        {data.personalInfo.email || "your.email@example.com"} |{" "}
        {data.personalInfo.phone || "(123) 456-7890"}
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">
        Professional Summary
      </h4>
      <p className="text-[#20133E]">
        {data.personalInfo.summary ||
          "Your professional summary will appear here."}
      </p>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">Work Experience</h4>
      {data.experiences.map((exp, index) => (
        <div key={index} className="mb-2">
          <p className="text-[#20133E]">
            <strong>{exp.jobTitle}</strong> at {exp.company}
          </p>
          <p className="text-[#20133E]">
            {exp.startDate} - {exp.endDate}
          </p>
          <p className="text-[#20133E]">{exp.responsibilities}</p>
        </div>
      ))}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">Education</h4>
      {data.educations.map((edu, index) => (
        <div key={index} className="mb-2">
          <p className="text-[#20133E]">
            <strong>{edu.degree}</strong> - {edu.institution}
          </p>
          <p className="text-[#20133E]">Graduated: {edu.graduationDate}</p>
        </div>
      ))}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">Skills</h4>
      {data.skills.map((skill, index) => (
        <p key={index} className="text-[#20133E]">
          {skill.name} - {getLevelLabel(skill.level)}
        </p>
      ))}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">Languages</h4>
      {data.languages.map((lang, index) => (
        <p key={index} className="text-[#20133E]">
          {lang.name} - {lang.proficiency}
        </p>
      ))}
    </div>
    <div>
      <h4 className="text-lg font-semibold text-[#20133E]">
        Courses & Training
      </h4>
      {data.courses.map((course, index) => (
        <div key={index} className="mb-2">
          <p className="text-[#20133E]">
            <strong>{course.name}</strong> - {course.institution}
          </p>
          <p className="text-[#20133E]">Completed: {course.completionDate}</p>
        </div>
      ))}
    </div>
    {data.customSections.map((section, index) => (
      <div key={index}>
        <h4 className="text-lg font-semibold text-[#20133E]">
          {section.title}
        </h4>
        <p className="text-[#20133E]">{section.content}</p>
      </div>
    ))}
  </div>
);

const ModernTemplate = ({ data }) => (
  <div className="space-y-6 bg-white p-6 rounded-lg shadow">
    <div className="text-center">
      <h3 className="text-3xl font-bold text-[#20133E]">
        {data.personalInfo.name || "Your Name"}
      </h3>
      <p className="text-[#542B72]">
        {data.personalInfo.email || "your.email@example.com"} |{" "}
        {data.personalInfo.phone || "(123) 456-7890"}
      </p>
    </div>
    <div className="border-t border-b border-[#542B72] py-4">
      <h4 className="text-xl font-semibold text-[#20133E] mb-2">
        Professional Summary
      </h4>
      <p className="text-[#20133E]">
        {data.personalInfo.summary ||
          "Your professional summary will appear here."}
      </p>
    </div>
    <div>
      <h4 className="text-xl font-semibold text-[#20133E] mb-2">
        Work Experience
      </h4>
      {data.experiences.map((exp, index) => (
        <div key={index} className="mb-4">
          <p className="font-bold text-[#20133E]">
            {exp.jobTitle}{" "}
            <span className="font-normal text-[#542B72]">at {exp.company}</span>
          </p>
          <p className="text-sm text-[#542B72]">
            {exp.startDate} - {exp.endDate}
          </p>
          <p className="mt-1 text-[#20133E]">{exp.responsibilities}</p>
        </div>
      ))}
    </div>
    <div>
      <h4 className="text-xl font-semibold text-[#20133E] mb-2">Education</h4>
      {data.educations.map((edu, index) => (
        <div key={index} className="mb-2">
          <p className="font-bold text-[#20133E]">
            {edu.degree}{" "}
            <span className="font-normal text-[#542B72]">
              - {edu.institution}
            </span>
          </p>
          <p className="text-sm text-[#542B72]">
            Graduated: {edu.graduationDate}
          </p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h4 className="text-xl font-semibold text-[#20133E] mb-2">Skills</h4>
        {data.skills.map((skill, index) => (
          <p key={index} className="text-[#20133E]">
            {skill.name} - {getLevelLabel(skill.level)}
          </p>
        ))}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-[#20133E] mb-2">Languages</h4>
        {data.languages.map((lang, index) => (
          <p key={index} className="text-[#20133E]">
            {lang.name} - {lang.proficiency}
          </p>
        ))}
      </div>
    </div>
    <div>
      <h4 className="text-xl font-semibold text-[#20133E] mb-2">
        Courses & Training
      </h4>
      {data.courses.map((course, index) => (
        <div key={index} className="mb-2">
          <p className="font-bold text-[#20133E]">
            {course.name}{" "}
            <span className="font-normal text-[#542B72]">
              - {course.institution}
            </span>
          </p>
          <p className="text-sm text-[#542B72]">
            Completed: {course.completionDate}
          </p>
        </div>
      ))}
    </div>
    {data.customSections.map((section, index) => (
      <div key={index}>
        <h4 className="text-xl font-semibold text-[#20133E] mb-2">
          {section.title}
        </h4>
        <p className="text-[#20133E]">{section.content}</p>
      </div>
    ))}
  </div>
);

export { DefaultTemplate, ModernTemplate };
