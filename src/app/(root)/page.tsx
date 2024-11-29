import Banner from "@/components/Banner";
import Products from "@/components/container/Products";
import Explore from "@/components/Explore";
import NewsLetter from "@/components/NewsLetter";
import Social from "@/components/Social";
import { fetchData } from "@/utils/api-service";
import React from "react";

const page = async () => {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = await fetchData("?limit=0", {});
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = await fetchData("/categories");

  // console.log("categories", categories);

  // Handle loading states
  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  // Handle errors
  if (productsError || categoriesError) {
    return <div>Error: {productsError || categoriesError}</div>; // Show an error message if there's an issue
  }

  return (
    <div>
      <Banner />
      {categories &&
        categories.map((item) => {
          const productByCategory = products?.products.filter(
            (product) => product.category === item.slug,
          );
          return (
            <Products
              key={item.id}
              title={item.name}
              products={productByCategory}
              description={`Our Latest ${item.name}'s Products`}
            />
          );
        })}
      <Explore />
      <Social />
      <NewsLetter />
    </div>
  );
};

export default page;
