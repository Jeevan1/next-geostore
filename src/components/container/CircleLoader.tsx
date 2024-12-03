"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function CircleLoader({ className }: { className?: string }) {
  return (
    <div className={`flex h-[400px] items-center justify-center ${className}`}>
      <ClipLoader color="#4a5568" />
    </div>
  );
}
