"use client";
import React, { useEffect } from "react";
import logo from "../../public/assets/img/logo/logo1.png";
import Image from "next/image";
import { navData } from "@/data";
import Link from "next/link";
import { fetchData } from "@/utils/api-service";

const NavBar = () => {
  const [open, setOpen] = React.useState({
    pages: false,
    categories: false,
  });
  const handleOpen = (type) => {
    setOpen({
      ...open,
      [type]: !open[type],
    });
  };

  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    const { data: categories } = await fetchData("/categories");
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  // console.log("categories", categories);

  return (
    <header className="py-5">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <Image src={logo} alt="logo" className="w-48" />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <ul className="z-30 flex justify-between gap-5">
              <li className="relative text-md font-semibold">
                <Link href="/">Home</Link>
              </li>
              <li
                className="relative text-md font-semibold"
                onClick={() => handleOpen("categories")}
              >
                <span className="relative cursor-pointer text-md font-semibold">
                  Categories
                </span>
                {categories && open.categories && (
                  <ul className="absolute left-0 top-full bg-white px-3 py-2 shadow">
                    {categories?.map((category, index) => (
                      <li key={index} className="w-max text-md leading-7">
                        <Link
                          href={`/products/category/${category.slug}`}
                          className=" hover:text-orange-500"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {navData.map((item, index) => (
                <li
                  className="relative text-md font-semibold"
                  key={index}
                  onClick={() => handleOpen("pages")}
                >
                  <span className="cursor-pointer">{item.label}</span>
                  {open.pages && item.submenu && (
                    <ul className="absolute left-0 top-full bg-white px-3 py-2 shadow">
                      {item.submenu.map((submenu, index) => (
                        <li key={index} className="w-max text-md">
                          <Link href={submenu.path}>{submenu.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div>
              <button className="btn btn-primary bg-secondary px-3 py-1 text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
