import React from "react";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  Award,
} from "lucide-react";
import { dummyData } from "@/data/data";

const PrintableCreativeResume = () => {
  const data = dummyData;
  const formatDate = (date) => {
    if (date === "Present") return date;
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const getSkillLevel = (level) => {
    switch (level) {
      case "basic":
        return 33;
      case "intermediate":
        return 66;
      case "advanced":
        return 100;
      default:
        return 50;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg print:shadow-none">
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {data.personalInfo.name}
            </h1>
            <p className="text-xl text-gray-600">
              {data.personalInfo.jobTitle}
            </p>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end text-gray-600 mb-1">
              <Mail className="h-4 w-4 mr-2" />
              {data.personalInfo.contact[0]}
            </p>
            <p className="flex items-center justify-end text-gray-600 mb-1">
              <Phone className="h-4 w-4 mr-2" />
              {data.personalInfo.contact[1]}
            </p>
            <p className="flex items-center justify-end text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {data.personalInfo.contact[2]}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.personalInfo.summary}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Briefcase className="h-6 w-6 mr-2" />
              Work Experience
            </h2>
            {data.experiences.map((exp, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">
                  {exp.jobTitle}
                </h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                <p className="mt-2 text-gray-700">{exp.responsibilities}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Education
            </h2>
            {data.educations.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">
                  {edu.degree}
                </h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">
                  Graduated: {formatDate(edu.graduationDate)}
                </p>
                <p className="text-sm text-gray-700">
                  GPA: {edu.numericGpa} ({edu.gpaType})
                </p>
              </div>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Award className="h-6 w-6 mr-2" />
              Skills
            </h2>
            {data.skills.map((skill, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-gray-500 capitalize">
                    {skill.level}
                  </span>
                </div>
                <Progress value={getSkillLevel(skill.level)} className="h-2" />
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Languages className="h-6 w-6 mr-2" />
              Languages
            </h2>
            {data.languages.map((lang, index) => (
              <p key={index} className="text-gray-700 mb-1">
                {lang.name} -{" "}
                <span className="text-gray-500 capitalize">
                  {lang.proficiency}
                </span>
              </p>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Certifications & Courses
            </h2>
            {data.courses.map((course, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <p className="text-gray-700 font-medium">{course.name}</p>
                <p className="text-sm text-gray-600">{course.institution}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(course.completionDate)}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrintableCreativeResume;
