import { Skeleton } from "../ui/skeleton";

export const ResumeSkeleton = () => {
  return (
    <div className="flex">
      {/* Left side: Buttons */}
      <div className="w-1/3 p-6">
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-12 w-full" />
      </div>

      {/* Right side: Resume preview */}
      <div className="w-2/3 bg-gray-50 p-6 rounded-lg">
        {/* Header */}
        <div className="flex items-center mb-4">
          <Skeleton className="h-10 w-40 mr-4" /> {/* Name */}
          <Skeleton className="h-8 w-32" /> {/* Job title */}
        </div>
        <Skeleton className="h-6 w-60 mb-4" /> {/* Email and contact info */}
        {/* Profile */}
        <div className="mb-6">
          <Skeleton className="h-6 w-40 mb-2" /> {/* Profile title */}
          <Skeleton className="h-4 w-full mb-2" /> {/* Profile content */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
};
