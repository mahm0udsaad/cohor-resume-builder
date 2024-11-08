import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getAvailableTemplates } from "@/utils/templates";

const TemplateGallery = ({ plan }) => {
  const availableTemplates = getAvailableTemplates(plan);
  return (
    <div className={`grid overflow-y-auto grid-cols-1 gap-6 h-screen notfs`}>
      {availableTemplates.map((template, index) => {
        const { name, image } = template;

        return (
          <Card key={index}>
            <Link href={`/builder/${name}`}>
              <CardContent className="p-4 ">
                <h3 className="text-lg font-semibold mb-2">{name} Template</h3>
                <div className="overflow-hidden">
                  <div className="group border rounded hover:border-none hover:scale-105 hover:opacity-70 cursor-pointer transition-all duration-300 relative">
                    <img
                      src={image}
                      alt={`${name} Template`}
                      className="w-full h-full object-cover"
                    />
                    <div className="bg-main z-10 rounded text-white p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-150">
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
