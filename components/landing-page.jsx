import Link from "next/link";
import { Button } from "@/components/ui/button";
import HowToMakeResume from "./how-to-make-resume";
import Image from "next/image";

export function LandingPageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="container-xl mx-auto py-8">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create a Professional Resume in Minutes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our resume builder helps you craft the perfect resume with
                    ease. Choose from professional templates, customize content,
                    and download in your preferred format.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/gallery"
                    className="inline-flex h-10 items-center justify-center rounded-md main-btn px-8 text-sm font-medium"
                    prefetch={false}
                  >
                    Start Building
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md main-border px-8 text-sm font-medium"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <Image
                src="/header.jpg"
                alt="Hero"
                priority
                width={450}
                height={500}
                className="mx-auto rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Our Resume Builder?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#3B51A3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Professional Templates
                </h3>
                <p className="text-gray-600">
                  Choose from a variety of ATS-optimized templates designed by
                  career experts.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#3B51A3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Easy Customization
                </h3>
                <p className="text-gray-600">
                  Personalize your resume with our user-friendly interface and
                  real-time preview.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#3B51A3]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
                <p className="text-gray-600">
                  Export your resume in multiple formats, ready to send to
                  potential employers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <HowToMakeResume />
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-8">
              Ready to Build Your Professional Resume?
            </h2>
            <Button
              size="lg"
              className="bg-[#3B51A3] hover:bg-[#2A3B7A] text-white"
            >
              Start Building Now
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
