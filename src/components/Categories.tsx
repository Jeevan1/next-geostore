import { fetchData } from "@/utils/api-service";
import React from "react";
import OptionButton from "./OptionButton";

const Categories = async () => {
  const { data: categories, loading, error } = await fetchData(`/categories`);
  return (
    <div className="me-3 p-0 sm:p-3">
      <OptionButton data={categories} title={"Categories"} loading={loading} />
    </div>
  );
};

export default Categories;
