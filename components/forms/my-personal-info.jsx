"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Edit } from "lucide-react";
import { updatePersonalInfo } from "@/actions/userInfo/action";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";

export default function MyPersonalInfoForm({ user, lng }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: user.name,
    jobTitle: user.personalInfo?.jobTitle || "",
    contact: user.personalInfo?.contact || [],
    summary: user.personalInfo?.summary || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSummaryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      summary: value, // Directly update the summary without destructuring the event
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // Optimistically update the UI
        setOpen(false);

        // Call the server action
        await updatePersonalInfo(user.id, formData);
      } catch (error) {
        // Handle error (you might want to show a toast notification)
        console.error("Failed to update:", error);
      }
    });
  };

  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[#3b51a3] capitalize flex items-center gap-2">
          <User className="h-6 w-6" />
          Personal Information
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Personal Information</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              aria-labelledby="update-user-information"
              aria-describedby="update-user-personal-information"
            >
              <div className="grid gap-4">
                <div className="grid grid-cols-2 items-center gap-4">
                  <div>
                    <Label htmlFor="name" className="text-right text-[#20133E]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="jobTitle"
                      className="text-right text-[#20133E]"
                    >
                      Job Title
                    </Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                </div>

                <AiSuggestionTextarea
                  lng={lng}
                  data={user.summary}
                  jobTitle={user.personalInfo?.jobTitle}
                  onChange={handleSummaryChange}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#3b51a3] text-white"
                  disabled={isPending}
                >
                  {isPending ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Job Title:</strong>{" "}
            {user.personalInfo?.jobTitle || "No job title"}
          </p>
          <p>
            <strong>Summary:</strong>{" "}
            {user.personalInfo?.summary || "No summary"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
