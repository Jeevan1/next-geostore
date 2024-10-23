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

  return (
    <ul className="flex justify-center items-center gap-5 mt-4 mb-0">
      <li
        className={`h-10 w-10 flex justify-center items-center border rounded-full p-2 ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer text-primary border-primary hover:bg-light"
        }`}
        onClick={handlePrevious}
      >
        <FaArrowLeft />
      </li>
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index + 1}
          className={`rounded-full border h-10 w-10 ${
            currentPage === index + 1
              ? "text-primary border-primary font-bold p-2 cursor-pointer hover:bg-light"
              : "p-2 cursor-pointer hover:bg-light"
          }`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </li>
      ))}
      <li
        className={`h-10 w-10 flex justify-center items-center border rounded-full p-2 ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-400"
            : "cursor-pointer text-primary border-primary hover:bg-light"
        }`}
        onClick={handleNext}
      >
        <FaArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
