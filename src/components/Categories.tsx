import { fetchData } from "@/utils/api-service";
import Link from "next/link";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import OptionButton from "./OptionButton";

type CategoriesProps = {
  title: string;
  subCategory?: {
    id: number;
    title: string;
    slug: string;
  }[];
  id: number;
  slug: string;
};

const data: CategoriesProps[] = [
  {
    id: 1,
    title: "Men's",
    slug: "category-1",
    subCategory: [
      {
        id: 1,
        title: "Category 1",
        slug: "category-1",
      },
      {
        id: 2,
        title: "Category 2",
        slug: "category-2",
      },
      {
        id: 3,
        title: "Category 3",
        slug: "category-3",
      },
      {
        id: 4,
        title: "Category 4",
        slug: "category-4",
      },
      {
        id: 5,
        title: "Category 5",
        slug: "category-5",
      },
    ],
  },
  {
    id: 2,
    title: "Women's",
    slug: "category-2",
  },
  {
    id: 3,
    title: "Kids's",
    slug: "category-3",
  },
  {
    id: 4,
    title: "Category 4",
    slug: "category-4",
  },
  {
    id: 5,
    title: "Category 5",
    slug: "category-5",
  },
];

const Categories = async () => {
  const { data: categories, loading, error } = await fetchData(`/categories`);
  return (
    <div className="me-3 p-0 sm:p-3">
      <OptionButton data={categories} title={"Categories"} />
    </div>
  );
};

export default Categories;
