import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-background/95 backdrop-blur shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-[16rem] h-[2.5rem] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search Form and Alert Skeleton */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="w-2/3 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-1/3 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Loading Cards */}
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg bg-gray-200 shadow animate-pulse"
              >
                <div className="aspect-[3/4] bg-gray-300"></div>
                <div className="bg-gray-400 px-4 pb-2 flex justify-between items-center h-12">
                  <div className="w-1/2 h-5 bg-gray-500 rounded"></div>
                  <div className="w-12 h-5 bg-gray-500 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Loading;
