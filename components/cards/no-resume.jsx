"use client";

import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Plus, Briefcase, GraduationCap, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export default function EmptyResumeCard({ lng }) {
  const { t } = useTranslation(lng, "common");
  const controls = useAnimation();
  const iconControls = useAnimation();
  const router = useRouter();

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const onCreateResume = () => {
    router.push("/gallery");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl mx-auto overflow-hidden">
        <motion.div animate={controls}>
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6 text-white text-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-10"
                animate={iconControls}
              >
                <FileText className="w-64 h-64" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2 relative z-10">
                {t("emptyResumeCard.title")}
              </h2>
              <p className="text-blue-100 relative z-10">
                {t("emptyResumeCard.description")}
              </p>
            </div>
            <div className="p-6 bg-white">
              <div className="flex justify-around mb-6">
                {[Briefcase, GraduationCap, Award].map((Icon, index) => (
                  <motion.div
                    key={index}
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-[#3b51a3]" />
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-600 mb-6 text-center">
                {t("emptyResumeCard.highlights")}
              </p>
              <Button
                onClick={onCreateResume}
                className="w-full bg-[#3b51a3] hover:bg-[#4b61b3] text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("emptyResumeCard.button")}
              </Button>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
