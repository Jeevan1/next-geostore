import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import React from "react";

const AllProduct = () => {
  return (
    <section className="">
      <SectionHeading title={"All Products"} className="mb-5" />
      <div className="grid grid-cols-4 gap-5">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="text-center mt-10">
        <Pagination />
      </div>
    </section>
  );
};

export default AllProduct;
