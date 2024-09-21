import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2 } from "lucide-react";

export function PersonalInfoForm({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactEmail") {
      updateData({
        type: "UPDATE",
        path: ["personalInfo", "contact", 0],
        value: value,
      });
    } else if (name === "phone") {
      updateData({
        type: "UPDATE",
        path: ["personalInfo", "contact", 1],
        value: value,
      });
    } else {
      updateData({
        type: "UPDATE",
        path: ["personalInfo", name],
        value: value,
      });
    }
  };

  const generateWithAI = (field) => {
    console.log(`Generating content for ${field} with AI`);
    alert(`AI generation for ${field} would happen here.`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-[#20133E]">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-[#20133E]">
                Email
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={data.contact[0]}
                onChange={handleChange}
                placeholder="john@example.com"
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="jobTitle" className="text-[#20133E]">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              value={data.jobTitle}
              onChange={handleChange}
              placeholder="Job Title"
              className="border-[#3B51A3] focus:ring-[#3B51A3]"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-[#20133E]">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={data.contact[1]}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              className="border-[#3B51A3] focus:ring-[#3B51A3]"
            />
          </div>

          <div>
            <Label htmlFor="summary" className="text-[#20133E]">
              Professional Summary
            </Label>
            <div className="relative">
              <Textarea
                id="summary"
                name="summary"
                value={data.summary}
                onChange={handleChange}
                placeholder="Brief overview of your professional background and key strengths"
                rows={4}
                className="border-[#3B51A3] focus:ring-[#3B51A3] w-full pr-10"
              />
              <Button
                onClick={() => generateWithAI("summary")}
                size="icon"
                className="absolute right-2 bottom-2 bg-[#3B51A3] hover:bg-white hover:text-black"
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
