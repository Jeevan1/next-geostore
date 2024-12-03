import React from "react";
import { HashLoader } from "react-spinners";

const LoadingPage = (className?: string, size?: number) => {
  return (
    <div className={`flex h-screen items-center justify-center ${className}`}>
      <HashLoader color="#4a5568" />
    </div>
  );
};

export default LoadingPage;
