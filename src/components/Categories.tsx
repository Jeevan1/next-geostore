import Link from "next/link";
import React from "react";

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

const Categories = () => {
  return (
    <div className=" p-3 me-3">
      <h2 className="text-2xl font-semibold">Categories</h2>
      <ul className="">
        {data.map((item) => (
          <li
            key={item.id}
            className="font-semibold text-secondary border-b-2 border-collapse border-accent-500 hover:text-primary hover:border-primary hover:bg-light cursor-pointer relative group"
          >
            <Link
              href={`/products/category/${item.slug}`}
              className="py-2 px-1 block"
            >
              {item.title}
            </Link>
            {item.subCategory && (
              <ul className="absolute top-full left-5 border-2 border-b-0 w-full bg-white z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                {item.subCategory.map((subItem) => (
                  <li
                    key={subItem.id}
                    className="font-semibold text-sm text-secondary border-b-2 border-collapse border-accent-500 hover:text-primary hover:border-primary hover:bg-light cursor-pointer"
                  >
                    <Link
                      href={`/products/category/${subItem.slug}`}
                      className="py-2 px-2 block"
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
