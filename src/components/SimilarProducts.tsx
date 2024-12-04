import React, { Suspense } from "react";
import SectionHeading from "./SectionHeading";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/types";
import CircleLoader from "./container/CircleLoader";

const SimilarProducts = ({
  similarProducts,
  loading,
}: {
  similarProducts: Product[];
  loading: boolean;
}) => {
  return (
    <Suspense fallback={loading && <CircleLoader />}>
      <div className="border-dashed py-10 sm:py-20">
        <div className="container">
          <SectionHeading title="Similar Products" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SimilarProducts;
