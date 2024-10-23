import Banner from "@/components/Banner";
import Products from "@/components/container/Products";
import Explore from "@/components/Explore";
import NewsLetter from "@/components/NewsLetter";
import Social from "@/components/Social";
import React from "react";

const page = () => {
  return (
    <div>
      <Banner />
      <Products
        title="Men's Latest Products"
        description=" Our Latest Men's Products"
      />
      <Products
        title="Women's Latest Products"
        description=" Our Latest Men's Products"
      />
      <Products
        title="Kids's Latest Products"
        description=" Our Latest Men's Products"
      />
      <Explore />
      <Social />
      <NewsLetter />
    </div>
  );
};

export default page;
