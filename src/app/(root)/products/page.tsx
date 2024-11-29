import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { fetchData } from "@/utils/api-service";
import React from "react";

const AllProduct = async () => {
  const { data, loading, error } = await fetchData("/");
  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <SectionHeading title={"All Products"} className="mb-5" />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {data?.products?.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Pagination />
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
