// import React from "react";

// const LoadingSpinner = () => {
//   return (
//     <>
//       <div className="fixed top-0 right-0 bottom-0 left-10 flex items-center justify-center z-50">
//         <div className="flex flex-col items-center">
//           {/* Spinner */}
//           <div className="w-16 h-16 border-4 border-brand-primary border-t-brand-highlight rounded-full animate-spin"></div>
//           {/* Optional Loading Text */}
//           <p className="mt-4 text-lg text-brand font-medium">Loading...</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoadingSpinner;

import { LifeLine, Riple, ThreeDot } from "react-loading-indicators";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24">
      <div className="relative w-16 h-16">
        <br></br><br></br><br></br><br></br>
        <br></br><br></br><br></br><br></br>
        {/* <LifeLine color="#ffa7a7ff" size="large" text="" textColor="" /> */}
        {/* <Riple color="#ffa7a7ff" size="extra-large" text="" textColor="" /> */}
        <ThreeDot variant="bounce" color="#ffa7a7ff" size="large" text="" textColor="" className="absolute inset-0 m-auto item-center" />
      </div>
      {/* <p className="mt-6 text-lg font-semibold text-brand animate-pulse tracking-wide">
        Loading<span className="dots">...</span>
      </p> */}
    </div>
  );
};
export default LoadingSpinner;
