"use client";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import React, { useState, useEffect } from "react";

const AllProduct = ({ params: { slug } }: { params: { slug: string[] } }) => {
  // Sample data
  const allData = [
    { id: 1, title: "Product 1", slug: "product-1" },
    { id: 2, title: "Product 2", slug: "product-2" },
    { id: 3, title: "Product 3", slug: "product-3" },
    { id: 4, title: "Product 4", slug: "product-4" },
    { id: 5, title: "Product 5", slug: "product-5" },
    { id: 6, title: "Product 6", slug: "product-6" },
    { id: 7, title: "Product 7", slug: "product-7" },
    { id: 8, title: "Product 8", slug: "product-8" },
    { id: 9, title: "Product 9", slug: "product-9" },
  ];

  // State to manage current page and products on the page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageData, setPageData] = useState(allData.slice(0, 2)); // Initially display the first two products

  const itemsPerPage = 2;
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Update page data whenever currentPage changes
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const newPageData = allData.slice(startIndex, startIndex + itemsPerPage);
    setPageData(newPageData);
  }, [currentPage, allData]);

  return (
    <section>
      <SectionHeading title={slug[0]} className="mb-5" />
      <div className="grid grid-cols-4 gap-5">
        {pageData.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Pagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default AllProduct;
