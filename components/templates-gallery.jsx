import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Lock } from "lucide-react";
import { templates } from "@/data/data";
import {
  getUserPlanTemplates,
  getTemplateStatus,
} from "@/actions/resumes/plans";

const TemplateGallery = async ({ plan }) => {
  const [userPlanTemplates, setUserPlanTemplates] = useState([]);
  // Fetch available templates for user's plan
  useEffect(() => {
    const fetchUserPlanTemplates = async () => {
      const templates = await getUserPlanTemplates(plan);
      setUserPlanTemplates(templates);
    };
    fetchUserPlanTemplates();
  }, [plan]);

  return (
    <div className="grid overflow-y-auto grid-cols-1 gap-6 h-screen notfs">
      {templates.map(async (template) => {
        const { name, image } = template;
        const { isLocked, requiredPlan } = await getTemplateStatus(
          name,
          userPlanTemplates,
        );

        return (
          <Card key={name}>
            {isLocked ? (
              <div className="cursor-not-allowed">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-500">
                      {name} Template
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-gray-200 text-gray-500"
                    >
                      Locked
                    </Badge>
                  </div>
                  <div className="overflow-hidden">
                    <div className="border rounded relative">
                      <div className="absolute inset-0 bg-gray-900/50 flex flex-col items-center justify-center z-10">
                        <Lock className="w-8 h-8 text-white mb-2" />
                        <span className="text-white font-medium text-center px-4">
                          Upgrade to {requiredPlan} to unlock this template
                        </span>
                      </div>
                      <img
                        src={image}
                        alt={`${name} Template`}
                        className="w-full h-full object-cover filter grayscale opacity-75"
                      />
                    </div>
                  </div>
                </CardContent>
              </div>
            ) : (
              <Link href={`/builder/${name}`}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {name} Template
                  </h3>
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
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default TemplateGallery;
