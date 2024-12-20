"use client";
import React, { useEffect } from "react";
import logo from "../../public/assets/img/logo/logo1.png";
import Image from "next/image";
import { navData } from "@/data";
import Link from "next/link";
import { fetchData } from "@/utils/api-service";
import { logout, useAuthContext } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";
import { useRouter } from "next/navigation";
import { getUser } from "@/firebase/firestore/getUser";
import { enqueueSnackbar } from "notistack";

const NavBar = () => {
  const [open, setOpen] = React.useState({
    pages: false,
    categories: false,
    account: false,
  });
  const router = useRouter();

  const { user } = useAuthContext();
  // console.log("user", user?.uid);

  const handleOpen = (type) => {
    setOpen({
      ...open,
      [type]: !open[type],
    });
  };
  const [activeUser, setActiveUser] = React.useState({});
  const getActiveUser = async (uid) => {
    const user = await getUser(uid);
    setActiveUser(user);
    return user;
  };

  const [categories, setCategories] = React.useState([]);

  const getCategories = async () => {
    const { data: categories } = await fetchData("/categories");
    setCategories(categories);
  };

  const handleLogout = () => {
    const result = logout();
    if (result) {
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (user) {
      getActiveUser(user.uid);
    }
  }, [user]);

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

            {!user && (
              <Link href={"/signin"} className="relative text-md font-semibold">
                <span className="cursor-pointer">Log in</span>
              </Link>
            )}
            <div>
              <button className="btn btn-primary bg-secondary px-3 py-1 text-white">
                Get Started
              </button>
            </div>
            {user && (
              <div className="relative" onClick={() => handleOpen("account")}>
                <div className="relative flex items-center gap-2">
                  <Image
                    src={activeUser?.profileUrl}
                    alt="img"
                    width={50}
                    height={50}
                    className="h-10 w-10 cursor-pointer rounded-full bg-red-400 object-cover object-center"
                  />
                </div>
                {open.account && (
                  <ul className="absolute right-0 top-full z-20 mt-2 w-[100px] border bg-white p-1 shadow">
                    <li
                      className="block border-b p-1 hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      <Link
                        href="/profile"
                        className="block text-md font-semibold"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="border-b p-1 hover:bg-gray-200">
                      <Link
                        href="/orders"
                        className="block  text-md font-semibold"
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="p-1 hover:bg-gray-200">
                      <Link
                        href="/signin"
                        className="block text-md font-semibold"
                        onClick={handleLogout}
                      >
                        <span className="">Log out</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
