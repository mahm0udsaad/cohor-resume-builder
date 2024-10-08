import React from "react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/helper/date";

const MinimalTemplate = ({ resumeData, className }) => {
  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-white p-2", className)}>
      <header className="flex justify-between items-start mb-8 sm:text-[12px]">
        <div>
          <h1 className="text-4xl font-light mb-1 sm:text-3xl">
            {resumeData.personalInfo.name}
          </h1>
          <p className="text-[12px] tracking-widest uppercase text-gray-600 sm:text-base">
            {resumeData.personalInfo.jobTitle}
          </p>
        </div>
        {resumeData.personalInfo.image ? (
          <img
            src={resumeData.personalInfo.image}
            alt={resumeData.personalInfo.name}
            className="rounded-full w-24 h-24 sm:w-20 sm:h-20"
          />
        ) : (
          <div className="rounded-full w-24 h-24 sm:w-20 sm:h-20 bg-gray-300"></div>
        )}
      </header>

      <div className="grid grid-cols-3 gap-8 sm:text-[12px]">
        <div className="col-span-1">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 sm:text-base">CONTACT</h2>
            {resumeData.personalInfo.contact?.map((item, index) => (
              <p
                key={index}
                className="text-[12px] mb-2 flex items-center sm:text-[12px]"
              >
                <span className="mr-2">•</span> {item}
              </p>
            ))}
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 sm:text-base">SKILLS</h2>
            <div>
              <h3 className="text-[12px] font-semibold mb-2 uppercase sm:text-base">
                Professional
              </h3>
              <ul className="list-none">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index} className="text-[12px] mb-1 sm:text-base">
                    • {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 sm:text-base">
              EDUCATION
            </h2>
            {resumeData.educations?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-[12px] font-semibold sm:text-base">
                  {edu.institution}
                </h3>
                <p className="text-[12px] sm:text-base">{edu.degree}</p>
                <p className="text-[12px] text-gray-600 sm:text-base">
                  {formatDate(edu.startDate)} - {formatDate(edu.graduationDate)}
                </p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-2">
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4 sm:text-base">SUMMARY</h2>
            <p className="text-[12px] sm:text-base ">
              {resumeData.personalInfo.summary}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 sm:text-base">
              WORKING EXPERIENCE
            </h2>
            {resumeData.experiences?.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[12px] font-semibold uppercase sm:text-base">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-[12px] text-gray-600 sm:text-base">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                </div>
                <p className="text-[12px] font-medium mb-2 sm:text-base">
                  {exp.company}
                </p>
                <ul className="list-none">
                  {exp.responsibilities
                    ?.split(".")
                    .filter(Boolean)
                    .map((resp, idx) => (
                      <li key={idx} className="text-[12px] mb-1 sm:text-base">
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
