"use client";
import { PrimaryButton } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import FormInput from "@/components/form/FormInput";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import React from "react";

const DetailsPage = () => {
  return (
    <section className="border-dashed">
      <div className="container">
        <div className="flex gap-7 py-20">
          <div className="basis-1/2">
            <Image
              src="/assets/img/bg/right-banner-image-01.jpg"
              alt="img"
              width={500}
              height={500}
              className="h-96 object-contain bg-slate-300"
            />
            <div className="grid grid-cols-3 gap-5 mt-5">
              <Image
                src="/assets/img/bg/right-banner-image-01.jpg"
                alt="img"
                width={500}
                height={500}
                className="h-28 object-cover object-top cursor-pointer  bg-slate-300"
              />
              <Image
                src="/assets/img/bg/right-banner-image-01.jpg"
                alt="img"
                width={500}
                height={500}
                className="h-28 object-cover object-top cursor-pointer bg-slate-300"
              />
              <Image
                src="/assets/img/bg/right-banner-image-01.jpg"
                alt="img"
                width={500}
                height={500}
                className="h-28 object-cover object-top cursor-pointer bg-slate-300"
              />
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex gap-5  border-b-2 pb-5 border-slate-300">
              <div className="basis-2/3 flex-1">
                <h1 className="text-3xl font-semibold text-primary">
                  Product Name
                </h1>
                <p className="text-3xl mt-3 font-semibold text-primary">
                  $23.50
                </p>
              </div>
              <div className="basis-1/4 flex-1">
                <p className="text-md font-medium my-5 text-dark">⭐⭐⭐⭐💫</p>
              </div>
            </div>
            <p className="mt-5 font-medium text-dark text-[15px] pe-4 border-b-2 pb-5 border-slate-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. <br /> Natus
              consequuntur illum provident ducimus corporis similique quam modi,
              tempore molestiae fugiat. Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Modi, omnis.
            </p>
            <div className="flex mt-5 items-center gap-3 justify-between">
              <p className="text-lg font-medium text-dark ">No. of Orders</p>
              <FormInput
                label="Quantity"
                type="number"
                name="qty"
                value={1}
                placeholder={"1"}
                onChange={() => {}}
              />
              <Dropdown
                onClick={() => {}}
                data={["XS", "S", "M", "L", "XL"]}
                label="Size"
              />
              <Dropdown
                onClick={() => {}}
                data={["Red", "Blue", "Black"]}
                label="Color"
              />
              <PrimaryButton className="">Add to Cart</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 border-dashed">
        <div className="container">
          <SectionHeading title="Similar Products" />
          <div className=" grid grid-cols-4 gap-5">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
          <div className="text-center mt-10">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
