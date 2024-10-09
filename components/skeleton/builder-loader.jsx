import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-8">
        <div className="mb-6 flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Skeleton className="h-8 w-64 mb-6" />

          <div className="grid grid-cols-2 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>

          <Skeleton className="h-10 w-full mb-6" />

          <div>
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="flex-1 bg-gray-200 p-8">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-6" />

        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />

        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-4" />

        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-1" />
      </div>
    </div>
  );
}
