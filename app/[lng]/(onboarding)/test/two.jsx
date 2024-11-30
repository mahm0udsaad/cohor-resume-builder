import Image from "next/image";
import { Mail, Phone, MapPin, GraduationCap, Briefcase } from "lucide-react";
import { formatDate } from "@/helper/date";
import { translations } from "@/data/data";

function SkillLevel({ level }) {
  const levels = {
    basic: 1,
    intermediate: 2,
    advanced: 3,
    beginner: 1,
    native: 3,
  };
  const dots = Array(3)
    .fill(0)
    .map((_, i) => i < levels[level]);

  return (
    <div className="flex gap-1">
      {dots.map((filled, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            filled ? "bg-gray-800" : "border border-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

export default function ResumeTemplate({ resumeData, selectedTheme }) {
  const isArabic = resumeData.lng === "ar";
  const { lng } = resumeData;
  const direction = isArabic ? "rtl" : "ltr";
  const t = translations[lng] || translations["en"];

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg" style={{ direction }}>
      <div className="bg-slate-800 text-white relative">
        <div className="container mx-auto px-8 py-12 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={resumeData.personalInfo.imageUrl}
                alt="Profile Image"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {resumeData.personalInfo.name}
              </h1>
              <h2 className="text-2xl mb-4">
                {resumeData.personalInfo.jobTitle}
              </h2>
              <div className="flex gap-4">
                {resumeData.personalInfo.contact?.map((contact, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index === 0 && <Mail className="h-4 w-4" />}
                    {index === 1 && <Phone className="h-4 w-4" />}
                    {index === 2 && <MapPin className="h-4 w-4" />}
                    <span className="text-sm">{contact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "ellipse(50% 100% at 50% 100%)" }}
        />
      </div>

      <div className="container mx-auto px-8 py-12">
        <div className="flex gap-12">
          {/* Left Column */}
          <div className="flex-1">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">{t.aboutMe}</h3>
              <p className="text-gray-600">{resumeData.personalInfo.summary}</p>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6" />
                <h3 className="text-2xl font-semibold">{t.experience}</h3>
              </div>
              <div className="space-y-4">
                {resumeData.experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-4 border-l-2 border-gray-200"
                  >
                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-slate-800" />
                    <h4 className="font-semibold">{exp.jobTitle}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.isCurrentJob
                        ? t.present
                        : formatDate(exp.endDate, lng)}
                    </p>
                    <p className="mt-2 text-gray-600">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <h3 className="text-2xl font-semibold">{t.education}</h3>
              </div>
              <div className="space-y-4">
                {resumeData.educations.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-4 border-l-2 border-gray-200"
                  >
                    <div className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-slate-800" />
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(edu.graduationDate, lng)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t.gpa}: {edu.numericGpa}{" "}
                      {edu.gpaType && `(${edu.gpaType})`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="w-80">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">{t.skills}</h3>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{skill.name}</span>
                    <SkillLevel level={skill.level} />
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">{t.languages}</h3>
              <div className="space-y-2">
                {resumeData.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{lang.name}</span>
                    <SkillLevel level={lang.proficiency} />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold mb-4">{t.courses}</h3>
              <div className="space-y-3">
                {resumeData.courses.map((course, index) => (
                  <div key={index}>
                    <p className="text-sm font-medium">{course.name}</p>
                    <p className="text-xs text-gray-600">
                      {course.institution}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(course.completionDate, lng)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
