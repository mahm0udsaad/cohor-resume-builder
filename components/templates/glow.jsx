import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResumeTemplate({ data }) {
  return (
    <div
      className="min-h-screen bg-gray-100 py-8"
      style={{ backgroundColor: data.theme.backgroundColor }}
    >
      <div className="container mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="p-8"
          style={{ backgroundColor: data.theme.primaryColor }}
        >
          <div className="flex items-center">
            <Image
              src="/placeholder.svg"
              alt={data.personalInfo.name}
              width={150}
              height={150}
              className="rounded-full border-4 border-white"
            />
            <div className="ml-8">
              <h1 className="text-4xl font-bold text-white">
                {data.personalInfo.name}
              </h1>
              <h2 className="text-2xl text-white mt-2">
                {data.personalInfo.jobTitle}
              </h2>
            </div>
          </div>
        </div>
        <div className="p-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{data.personalInfo.summary}</p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {data.personalInfo.contact.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              {data.experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                  <h4 className="text-md">{exp.company}</h4>
                  <p className="text-sm text-gray-600">{`${exp.startDate} - ${exp.endDate}`}</p>
                  <p className="mt-2">{exp.responsibilities}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              {data.educations.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <h4 className="text-md">{edu.institution}</h4>
                  <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill.name} - {skill.level}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {data.languages.map((lang, index) => (
                  <li key={index}>{`${lang.name} - ${lang.proficiency}`}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent>
              {data.courses.map((course, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <h4 className="text-md">{course.institution}</h4>
                  <p className="text-sm text-gray-600">
                    {course.completionDate}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
