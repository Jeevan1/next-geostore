import Categories from "@/components/Categories";
import { fetchData } from "@/utils/api-service";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories, loading, error } = await fetchData(`/categories`);

  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <div className="block grid-cols-3 gap-5 sm:grid md:grid-cols-5">
          <div className="sticky top-0 col-span-1 self-start">
            <Categories loading={loading} categories={categories} />
          </div>
          <div className="col-span-2 text-md font-semibold text-dark md:col-span-4 ">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
