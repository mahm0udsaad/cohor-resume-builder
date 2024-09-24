import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Resume from "@/components/templates/classic"; // Direct import for Classic template
import ModifiedResumeTemplate from "@/components/templates/modern"; // Direct import for Modern template

const dummyData = {
  personalInfo: {
    name: "John Doe",
    summary:
      "Experienced software engineer with skills in JavaScript, React, Node.js, HTML, and CSS. Proficient in developing web applications with React and Node.js.",
    contact: ["john@example.com", "123-456-7890", "New York, NY"],
  },
  experiences: [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      startDate: "2020-01",
      endDate: "Present",
      responsibilities: "Developed web applications using React and Node.js",
    },
  ],
  educations: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      graduationDate: "2019-05",
    },
  ],
  skills: [
    { name: "JavaScript", level: "advanced" },
    { name: "React", level: "intermediate" },
    { name: "Node.js", level: "intermediate" },
    { name: "HTML", level: "basic" },
    { name: "CSS", level: "basic" },
  ],
};

const TemplateGallery = ({ onSelect, main }) => {
  const templates = [
    { name: "Classic", Component: Resume },
    { name: "Modern", Component: ModifiedResumeTemplate },
  ];

  return (
    <div
      className={`grid ${
        main ? "md:grid-cols-2" : ""
      } grid-cols-1 gap-6 h-screen overflow-y-auto notfs`}
    >
      {templates.map((template, index) => {
        const { name, Component } = template;

        return (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{name} Template</h3>
              <div
                className="group border rounded hover:border-none hover:shadow-xl hover:scale-103 hover:opacity-60 cursor-pointer transition-all duration-150 relative"
                onClick={() => onSelect(name)}
              >
                <Component resumeData={dummyData} />
                <div className="bg-main z-10 rounded text-white p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold  opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  Select Template
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateGallery;
