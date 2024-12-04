import { fetchData } from "@/utils/api-service";
import ProductDetails from "@/components/container/ProductDetails";
import { Metadata } from "next";
import { Suspense } from "react";
import CircleLoader from "@/components/container/CircleLoader";
import SimilarProducts from "@/components/SimilarProducts";

// Dynamic Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  try {
    const { data: product } = await fetchData(`/${id}`);
    return {
      title: `${product.title}`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [{ url: product.thumbnail }],
      },
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }
}

const DetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Fetch product data
    const { data: product, error, loading } = await fetchData(`/${id}`);

    // Fetch similar products
    const {
      data: similarData,
      loading: similarLoading,
      error: similarError,
    } = await fetchData(`/category/${product.category}`);
    const similarProducts = similarData.products;

    return (
      <div>
        <ProductDetails product={product} id={id} loading={loading} />
        <SimilarProducts
          similarProducts={similarProducts}
          loading={similarLoading}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load product details. Please try again later.
      </div>
    );
  }
};

export default DetailsPage;
