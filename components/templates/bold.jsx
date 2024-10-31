"use client";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data"; // Import your translations

const BoldTemplate = ({ resumeData, selectedTheme, className }) => {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[lng] || translations["en"]; // Default to English if the language is not found

  return (
    <div
      id="resume-template"
      style={{ direction }}
      className={cn(
        "w-full mx-auto bg-white font-sans text-gray-700",
        className,
      )}
    >
      <header
        style={{ backgroundColor: selectedTheme?.primaryColor }}
        className="bg-gray-800 text-white p-6 flex justify-between"
      >
        <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
        <p className="text-lg mt-2">{resumeData.personalInfo.jobTitle}</p>
      </header>
      {/* Contact Information */}
      <div className="flex gap-2 p-6 text-center border-b border-gray-300">
        {resumeData.personalInfo.contact?.map((contact, index) => (
          <p key={index} className="text-sm">
            {contact}
            {index < resumeData.personalInfo.contact.length - 1 ? " | " : ""}
          </p>
        ))}
      </div>

      <div className="p-6">
        {/* Profile Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.profile} {/* Use translation */}
          </h2>
          <p className="text-sm leading-relaxed">
            {resumeData.personalInfo.summary}
          </p>
        </section>

        {/* Experience Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.workExperience} {/* Use translation */}
          </h2>
          {resumeData.experiences?.map((job, index) => (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
              <p className="text-sm font-semibold">
                {job.company} // {formatDate(job.startDate)} -{" "}
                {formatDate(job.endDate, resumeData.lng)}
              </p>
              <p className="text-sm mt-2">{job.responsibilities}</p>
              {job.achievements?.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-semibold underline">
                    {t.achievements} {/* Use translation */}
                  </h4>
                  <ul className="list-disc list-inside text-sm">
                    {job.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Education Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.education} {/* Use translation */}
          </h2>
          {resumeData.educations?.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-sm">
                {edu.institution} // {formatDate(edu.graduationDate)}
              </p>
              {edu.gpaType === "numeric" && (
                <p className="text-sm text-gray-600">GPA: {edu.numericGpa}</p>
              )}
              {edu.gpaType === "descriptive" && (
                <p className="text-sm text-gray-600">
                  GPA: {edu.descriptiveGpa}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.skills} {/* Use translation */}
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resumeData.skills?.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))}
          </ul>
        </section>

        {/* Languages Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.languages} {/* Use translation */}
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resumeData.languages?.map((lang, index) => (
              <li key={index}>
                {lang.name} - {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>

        {/* Courses Section */}
        <section className="mb-6">
          <h2 className="uppercase text-lg font-semibold  border-b border-gray-400 pb-2 mb-4">
            {t.courses} {/* Use translation */}
          </h2>
          {resumeData.courses?.map((course, index) => (
            <div key={index} className="mt-2">
              <h4 className="font-semibold text-gray-800">{course.name}</h4>
              <p className="text-sm text-gray-600">{course.institution}</p>
              <p className="text-sm text-gray-600">
                {formatDate(course.completionDate)}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default BoldTemplate;
