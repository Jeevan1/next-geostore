"use client";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { fetchData } from "@/utils/api-service";
import React, { useState, useEffect } from "react";

// Define the structure of product data
interface Product {
  id: number;
  title: string;
  slug: string;
}

interface AllProductProps {
  params: { slug: string[] };
}

const AllProduct = ({ params: { slug } }: AllProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Fetch products based on slug
  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      // setError(null);

      // try {
      const { data, loading, error } = await fetchData(`/category/${slug[0]}`);
      setProducts(data.products);
      setLoading(loading);
      setError(error);
      // } catch (err) {
      //   setError("Failed to fetch products. Please try again later.");
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchProducts();
  }, [slug]);

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
    return <div>Loading...</div>; // Add skeleton loader for better UX
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available for this category.</div>;
  }

  return (
    <section>
      <SectionHeading title={slug[0]} className="mb-5" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {pageData.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="mt-10 text-center">
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
