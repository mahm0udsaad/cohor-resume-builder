"use client";

import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col justify-center items-center space-y-8 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#3b51a3]"></div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please wait while we prepare your content.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
