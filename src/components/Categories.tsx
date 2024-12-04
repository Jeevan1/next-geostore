import { fetchData } from "@/utils/api-service";
import React from "react";
import OptionButton from "./OptionButton";
import { Category } from "@/utils/types";

const Categories = ({
  loading,
  categories,
}: {
  loading: boolean;
  categories: Category[];
}) => {
  return (
    <div className="me-3 p-0 sm:p-3">
      <OptionButton data={categories} title={"Categories"} loading={loading} />
    </div>
  );
};

export default Categories;
