// "use client";
import Banner from "@/components/Banner";
import Products from "@/components/container/Products";
import Explore from "@/components/Explore";
import NewsLetter from "@/components/NewsLetter";
import Social from "@/components/Social";
import { useAuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/store/slice";
import { fetchData } from "@/utils/api-service";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const page = async () => {
  // const [products, setProducts] = React.useState([]);
  // const [productsLoading, setProductLoading] = React.useState(false);
  // const [productsError, setProductError] = React.useState(null);

  // const [categories, setCategories] = React.useState([]);
  // const [categoriesLoading, setCategoriesLoading] = React.useState(false);
  // const [categoriesError, setCategoriesError] = React.useState(null);

  // const { user } = useAuthContext();
  // const router = useRouter();

  const {
    data: products,
    loading: productsLoading,
    error: productsError,
  } = await fetchData("/", {});
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = await fetchData("/categories");

  // Handle loading states
  if (productsLoading || categoriesLoading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  // Handle errors
  if (productsError || categoriesError) {
    return <div>Error: {productsError || categoriesError}</div>; // Show an error message if there's an issue
  }

  // useEffect(() => {
  //   if (user === null) {
  //     router.push("/signin");
  //   }
  // }, [user]);

  return (
    <div>
      <Banner />
      {categories &&
        categories.slice(0, 4).map((item) => {
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
