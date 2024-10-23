"use client";
import React from "react";
import logo from "../../public/assets/img/logo/logo1.png";
import Image from "next/image";
import { navData } from "@/data";
import Link from "next/link";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <header className="py-5">
      <div className="container">
        <div className="flex justify-between items-center flex-wrap">
          <div className="">
            <Image src={logo} alt="logo" className="w-48" />
          </div>
          <div className="flex items-center flex-wrap gap-5">
            <ul className="flex justify-between gap-5">
              {navData.map((item, index) => (
                <li className="text-md font-semibold relative" key={index}>
                  <Link href={item.path} onClick={item.submenu && handleOpen}>
                    {item.label}
                  </Link>
                  {open && item.submenu && (
                    <ul className="absolute top-full shadow py-2 px-3 bg-white left-0">
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
              <button className="btn btn-primary text-white bg-secondary px-3 py-1">
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
