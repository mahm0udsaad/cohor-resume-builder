import React from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";

const MinimalTemplate = ({ resumeData, className }) => {
  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-white p-8", className)}>
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-light mb-1">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-sm tracking-widest uppercase text-gray-600">
            {resumeData.personalInfo.jobTitle}
          </p>
        </div>
        {resumeData.personalInfo.image ? (
          <img
            src={resumeData.personalInfo.image}
            alt={resumeData.personalInfo.name}
            className="rounded-full w-24 h-24"
          />
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-300"></div>
        )}
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">CONTACT</h2>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <p key={index} className="text-sm mb-2 flex items-center">
                <span className="mr-2">•</span> {item}
              </p>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">SKILLS</h2>
            <div>
              <h3 className="text-sm font-semibold mb-2 uppercase">
                Professional
              </h3>
              <ul className="list-none">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index} className="text-sm mb-1">
                    • {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">EDUCATION</h2>
            {resumeData.educations?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-semibold">{edu.institution}</h3>
                <p className="text-sm">{edu.degree}</p>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">SUMMARY</h2>
            <p className="text-sm ">{resumeData.personalInfo.summary}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">WORKING EXPERIENCE</h2>
            {resumeData.experiences?.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold uppercase">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-sm font-medium mb-2">{exp.company}</p>
                <ul className="list-none">
                  {exp.responsibilities
                    ?.split(".")
                    .filter(Boolean)
                    .map((resp, idx) => (
                      <li key={idx} className="text-sm mb-1">
                        • {resp.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
