import { Card, CardContent } from "@/components/ui/card";
import { dummyData } from "@/data/data";
import { templates } from "@/helper/get-resume-engin";
import Link from "next/link";

const TemplateGallery = ({ main }) => {
  return (
    <div
      className={`grid ${
        main ? "container mx-auto my-12 md:grid-cols-2" : "overflow-y-auto"
      } grid-cols-1 gap-6 h-screen  notfs`}
    >
      {templates.map((template, index) => {
        const { name, Component } = template;

        return (
          <Card key={index}>
            <Link href={`/builder/${name}`}>
              <CardContent className="p-4 ">
                <h3 className="text-lg font-semibold mb-2">{name} Template</h3>
                <div className="overflow-hidden">
                  <div className="group border rounded hover:border-none hover:scale-105 hover:opacity-70 cursor-pointer transition-all duration-300 relative">
                    <Component resumeData={dummyData} />
                    <div className="bg-main z-10 rounded text-white p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold  opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      Select Template
                    </div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateGallery;
