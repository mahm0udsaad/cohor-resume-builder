import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Layout, Send } from "lucide-react";
import Link from "next/link";

export default function HowToMakeResume() {
  const steps = [
    {
      icon: <Layout className="w-12 h-12 text-white" />,
      title: "Choose your template",
      description:
        "Browse 30+ professionally designed resume templates to find the one that speaks to your style, industry and experience.",
    },
    {
      icon: <FileText className="w-12 h-12 text-white" />,
      title: "Follow the prompts",
      description:
        "Automation walks you through each step and suggests prewritten, customizable text targeted to the job.",
    },
    {
      icon: <Send className="w-12 h-12 text-white" />,
      title: "Finalize the details, save and send",
      description:
        "Save your resume as a PDF or Word Doc to your computer, and it's ready to send off and apply to your desired job.",
    },
  ];

  return (
    <section className="py-20 bg-[#3B51A3] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          How to Make a Resume
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-white text-opacity-90">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/gallery">
            <Button
              size="lg"
              variant="outline"
              className="bg-white border-white hover:text-white text-[#3B51A3] hover:bg-transparent"
            >
              Make my resume now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
