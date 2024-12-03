"use client";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex h-screen items-center justify-center ${className}`}>
      <HashLoader color="#4a5568" />
    </div>
  );
}
