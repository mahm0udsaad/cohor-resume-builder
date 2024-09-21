import { useResumeData } from "@/hooks/use-resume-data";
import React from "react";

const Resume = ({ resumeData }) => {
  console.log(resumeData.skills);

  return (
    <div className="bg-white h-[93%] w-full max-w-4xl p-6 ">
      <div className="flex justify-between items-start">
        {/* Left Column */}
        <div className="w-2/3 pr-6">
          <h1 className="text-4xl font-bold text-blue-800">
            {resumeData.personalInfo?.name || "Your Name"}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600">
            {resumeData.personalInfo?.jobTitle || "Your Job Title"}
          </h2>
          <section className="mt-8">
            <h3 className="font-bold text-gray-800">Objective</h3>
            <p className="text-gray-700 mt-2">
              {resumeData.objective || "Add your objective here..."}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="font-bold text-gray-800">Experience</h3>
            {resumeData?.experiences?.length === 0 ? (
              <p className="text-gray-700">No experience added yet...</p>
            ) : (
              resumeData.experiences?.map((exp, index) => (
                <div key={index} className="mt-4">
                  <h4 className="font-semibold text-gray-800">
                    {exp.jobTitle || "Job Title"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {exp.company || "Company Name"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {exp.startDate || "Start Date"} -{" "}
                    {exp.endDate || "End Date"}
                  </p>
                  <p className="text-gray-700 mt-2">
                    {exp.responsibilities || "Job description here..."}
                  </p>
                </div>
              ))
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className="w-1/3 bg-blue-50 p-4 rounded-md text-[12px]">
          <section className="mb-8">
            <h3 className="font-bold text-gray-800">Contact</h3>
            <p className="text-gray-700 mt-2">
              {resumeData.personalInfo?.contact[0] || "Email Address"}
            </p>
            <p className="text-gray-700 mt-1">
              {resumeData.personalInfo?.contact[1] || "Phone Number"}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="font-bold text-gray-800">About Me</h3>
            <p className="text-gray-700 mt-2">
              {resumeData.personalInfo.summary ||
                "Write about yourself here..."}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="font-bold text-gray-800">Skills</h3>
            {resumeData?.skills?.length === 0 ? (
              <p className="text-gray-700">No skills added yet...</p>
            ) : (
              <ul className="text-gray-700 mt-2">
                {resumeData.skills?.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
