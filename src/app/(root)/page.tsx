import Banner from "@/components/Banner";
import CircleLoader from "@/components/container/CircleLoader";
import LoadingSpinner from "@/components/container/LoadingSpinner";
import Products from "@/components/container/Products";
import Explore from "@/components/Explore";
import NewsLetter from "@/components/NewsLetter";
import Social from "@/components/Social";
import { fetchData } from "@/utils/api-service";
import { Category, Product } from "@/utils/types";

const page = async () => {
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
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // Handle errors
  if (productsError || categoriesError) {
    return (
      <div>
        <CircleLoader />
      </div>
    );
  }

  return (
    <div>
      <Banner />
      {categories &&
        categories.slice(0, 4).map((item: Category, index: number) => {
          const productByCategory = products?.products.filter(
            (product: Product, index: number) => product.category === item.slug,
          );
          return (
            <Products
              key={index}
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
