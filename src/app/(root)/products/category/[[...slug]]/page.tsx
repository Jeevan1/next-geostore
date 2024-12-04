import AllProducts from "@/components/container/AllProduct";
import CircleLoader from "@/components/container/CircleLoader";
import { fetchData } from "@/utils/api-service";
import { Suspense } from "react";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  return {
    title: `Category - ${slug[0].toUpperCase()}`,
  };
}

const AllProduct = async ({
  params: { slug },
}: {
  params: { slug: string[] };
}) => {
  const { data, loading, error } = await fetchData(`/category/${slug[0]}`);

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
      <Suspense fallback={<CircleLoader />}>
        <AllProducts
          products={data.products}
          loading={loading}
          isPaginated={true}
          title="All Products"
        />
      </Suspense>
    </>
  );
};

export default AllProduct;
