"use client";
import CircleLoader from "@/components/container/CircleLoader";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { Product } from "@/utils/types";
import React, { useState } from "react";

const AllProducts = ({
  products = [],
  loading,
  error,
  title,
  isPaginated = false,
}: {
  products: Product[];
  loading: boolean;
  error?: string;
  title?: string;
  isPaginated?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  // Paginated data
  const pageData = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div>
        <CircleLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <section className="">
        <SectionHeading title={title || "Products"} className="mb-5" />
        {products && products.length === 0 ? (
          <div className="flex h-[400px] items-center justify-center text-center">
            <h1 className="text-xl font-semibold text-secondary">
              No products found
            </h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {pageData.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            {isPaginated && (
              <div className="mt-10 text-center">
                <Pagination
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default AllProducts;
