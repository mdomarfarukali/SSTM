import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-10 flex items-center justify-center z-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-brand-primary border-t-brand-highlight rounded-full animate-spin"></div>
          {/* Optional Loading Text */}
          <p className="mt-4 text-lg text-brand font-medium">Loading...</p>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
