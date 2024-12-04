import React from "react";
// import "./Footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/assets/img/logo/logo2.png";

const FooterLink = ({ value, link }) => {
  return (
    <li className="pb-1 text-white">
      <Link href={link || ""} className=" text-sm">
        {value}
      </Link>
    </li>
  );
};

function Footer() {
  return (
    <footer className="mt-5 bg-secondary py-5">
      <div className="container">
        <div className="Footer__top ">
          <div className="border-bottom flex flex-wrap  justify-between pb-4">
            <div className="mt-5 w-100 sm:mt-0 md:w-1/2 lg:w-1/4">
              <div className="logo">
                <Image src={logo} alt="logo" className="w-48" />
              </div>
              <ul>
                <FooterLink value={"Kathmandu, Budhanilkantha-13, Nepal"} />
                <FooterLink value={"geoshop@gmail.com"} />
                <FooterLink value={"+977-98267-2727"} />
              </ul>
            </div>
            <div className="mt-5 w-100 sm:mt-0 md:w-1/2 lg:w-1/4">
              <h6 className=" mb-2 text-lg text-white">
                Shopping &amp; Categories
              </h6>
              <ul>
                <FooterLink
                  link={"/products/category/men"}
                  value={"Men’s Shopping"}
                />
                <FooterLink
                  link={"/products/category/women"}
                  value={"Women’s Shopping"}
                />
                <FooterLink value={"Kid’s Shopping"} />
              </ul>
            </div>
            <div className="mt-5 w-100 sm:mt-0 md:w-1/2 lg:w-1/4">
              <h6 className=" mb-2 text-lg text-white">Useful Links</h6>
              <ul>
                <FooterLink link={"./"} value={"Home"} />
                <FooterLink link={"./about"} value={"About Us"} />
                <FooterLink link={"./contact-us"} value={"Contact"} />
                <FooterLink value={"Help"} />
              </ul>
            </div>
            <div className="mt-5 w-100 sm:mt-0 md:w-1/2 lg:w-1/4">
              <h6 className=" mb-2 text-lg text-white">
                Help &amp; Information
              </h6>
              <ul>
                <FooterLink value={"Help"} />
                <FooterLink value={"FAQ's"} />
                <FooterLink value={"Shipping"} />
                <FooterLink value={"Tracking ID"} />
              </ul>
            </div>
          </div>
        </div>
        <div className=" pt-4 text-center ">
          <p className="text-white">
            Copyright © 2023 GeoShop Co., Ltd. All Rights Reserved.
          </p>
          <p className="text-white">
            Design:{" "}
            <Link href="/about" className=" text-accent">
              Jdev
            </Link>
          </p>
          <ul className=" flex justify-center gap-3 pt-2">
            <FooterLink value={<FaFacebookF className="icon" />} />
            <FooterLink value={<FaTwitter className="icon" />} />
            <FooterLink value={<FaLinkedinIn className="icon" />} />
            <FooterLink value={<FaInstagram className="icon" />} />
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
