import React from "react";
import { dummyData } from "@/data/data";
const Resume = () => {
  const { imageUrl, name, jobTitle, summary, contact } = dummyData.personalInfo;
  const { experiences, educations, skills, languages } = dummyData;

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row p-4 md:p-8 shadow-lg rounded-lg">
      {/* Left Column */}
      <div className="md:w-3/4 p-4">
        <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
        <h2 className="text-xl font-medium text-gray-600 mb-4">{jobTitle}</h2>
        <p className="text-gray-700 mb-6">{summary}</p>

        {/* Experience Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Experience</h3>
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-md font-semibold text-gray-700">
                {experience.jobTitle}
              </h4>
              <p className="text-sm text-gray-600 italic">
                {experience.company} | {experience.startDate} -{" "}
                {experience.endDate}
              </p>
              <p className="text-gray-600">{experience.responsibilities}</p>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
          Education
        </h3>
        <div className="space-y-4">
          {educations.map((education, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-md font-semibold text-gray-700">
                {education.degree}
              </h4>
              <p className="text-sm text-gray-600 italic">
                {education.institution}
              </p>
              <p className="text-gray-600">
                {education.graduationDate} | GPA: {education.numericGpa}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="mt-9 relative md:w-1/4 bg-blue-900 text-white p-4 flex flex-col items-center rounded-lg">
        {/* Profile Image */}
        <div className="absolute -top-16 w-32 h-32 rounded-full border-4 border-blue-900 overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-20">
          {/* Contact Info */}
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            {contact.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="material-icons">contact_mail</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Skills */}
          <h3 className="text-lg font-semibold mt-6 mb-2">Skills</h3>
          <ul className="text-sm space-y-2">
            {skills.map((skill, index) => (
              <li key={index}>{skill.name}</li>
            ))}
          </ul>

          {/* Languages */}
          <h3 className="text-lg font-semibold mt-6 mb-2">Languages</h3>
          <ul className="text-sm space-y-2">
            {languages.map((language, index) => (
              <li key={index}>
                {language.name} - {language.proficiency}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resume;
