import { dummyData } from "@/data/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GenerateImageButton from "@/components/generate-templates/GenerateImageButton";
import { templates } from "@/helper/get-resume-engin";
import GenerateAllButton from "../../../../components/generate-templates/generateImageAll";
export default function GenerateTemplatesPage({ params: { lng } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Template Image Generator
          </h1>
          <Link href="/gallery" className="text-blue-600">
            <div className="cursor-pointer rounded-md transition delay-300 hover:shadow-lg hover:bg-[#3b51a3] hover:text-white group px-4 py-2 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Gallery</span>
            </div>
          </Link>
        </div>
      </header>
      <GenerateAllButton />
      <main className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 grid grid-cols-1 items-center justify-center">
          {templates.map((template) => (
            <div
              key={template.name}
              className="bg-white max-w-2xl rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {template.name}
                  </h2>
                  <GenerateImageButton
                    templateName={template.name}
                    elementId={`template-${template.name}`}
                  />
                </div>
                {/* Full-width template preview */}
                <div
                  id={`template-${template.name}`}
                  className="w-full bg-white h-[35rem]"
                  style={{ height: "fit-content" }}
                >
                  <template.Component resumeData={dummyData} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
