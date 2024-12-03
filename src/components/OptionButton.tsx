"use client";
import { Category } from "@/utils/types";
import Link from "next/link";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CircleLoader from "./container/CircleLoader";

type Props = {
  title: string;
  data: Category[];
  className?: string;
  loading?: boolean;
};

export default function OptionButton({
  title,
  data: categories,
  className,
  loading,
}: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  //get category from url
  const url = window.location.href;
  const category = url.split("/").pop();

  React.useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  return (
    <div className={`relative ${className}`}>
      <h2
        className="mb-3 flex items-center text-lg font-semibold sm:mb-1 md:mb-0 md:text-2xl"
        onClick={handleToggle}
      >
        <span>{title}</span>
        <IoMdArrowDropdown size={22} />
      </h2>
      {isOpen &&
        (loading ? (
          <CircleLoader />
        ) : (
          <ul className="absolute left-0 top-full z-10 max-h-[400px] w-full overflow-y-auto border-2 bg-white px-2 py-1 sm:relative sm:top-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none">
            {categories.map((item, index) => (
              <li
                key={index}
                className="border-accent-500 group relative border-collapse cursor-pointer border-b-2 font-semibold text-secondary last:border-b-0 hover:border-primary hover:bg-light hover:text-primary"
                onClick={handleToggle}
              >
                <Link
                  href={`/products/category/${item.slug}`}
                  className={`block px-1 py-1 text-sm md:py-2 md:text-lg ${selectedCategory === item.slug ? "text-red-400" : "text-secondary"}`}
                >
                  {item.name}
                </Link>
                {item.subCategory && (
                  <ul className="invisible absolute left-5 top-full z-10 w-full border-2 border-b-0 bg-white opacity-0 group-hover:visible group-hover:opacity-100">
                    {item.subCategory.map((subItem, index) => (
                      <li
                        key={index}
                        className={`border-accent-500 border-collapse cursor-pointer border-b-2 text-sm font-semibold hover:border-primary hover:bg-light hover:text-primary`}
                      >
                        <Link
                          href={`/products/category/${subItem.slug}`}
                          className="block px-2 py-2"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ))}
    </div>
  );
}
