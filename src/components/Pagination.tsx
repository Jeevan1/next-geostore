"use client";
import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Pagination = ({
  totalPages = 2,
  onPageChange = () => {},
  currentPage = 1,
}: {
  totalPages?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Calculate the range of visible pages
  const visiblePageCount = 4; // Number of visible pages at a time
  let startPage = Math.max(1, currentPage - Math.floor(visiblePageCount / 2));
  let endPage = Math.min(totalPages, startPage + visiblePageCount - 1);

  // Adjust range if at the beginning or end of the page list
  if (endPage - startPage + 1 < visiblePageCount) {
    startPage = Math.max(1, endPage - visiblePageCount + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <ul className="mb-0 mt-4 flex items-center justify-center gap-5">
      <li
        className={`flex h-10 w-10 items-center justify-center rounded-full border p-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer border-primary text-primary hover:bg-light"
        }`}
        onClick={handlePrevious}
      >
        <FaArrowLeft />
      </li>
      {pages.map((page) => (
        <li
          key={page}
          className={`h-10 w-10 rounded-full border ${
            currentPage === page
              ? "cursor-pointer border-primary p-2 font-bold text-primary hover:bg-light"
              : "cursor-pointer p-2 hover:bg-light"
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </li>
      ))}
      <li
        className={`flex h-10 w-10 items-center justify-center rounded-full border p-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer border-primary text-primary hover:bg-light"
        }`}
        onClick={handleNext}
      >
        <FaArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
