import React from "react";
import { PrimaryButton } from "./Button";
import image1 from "../../public/assets/img/bg/left-banner-image.jpg";
import image2 from "../../public/assets/img/bg/right-banner-image-01.jpg";
import image3 from "../../public/assets/img/bg/right-banner-image-02.jpg";
import image4 from "../../public/assets/img/bg/right-banner-image-03.jpg";
import image5 from "../../public/assets/img/bg/right-banner-image-04.jpg";

const BannerStyle = {
  backgroundImage: `url(${image1.src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export const BannerItem = () => {
  return (
    <div
      className="shadow relative group transition-all duration-1000 w-full h-60 cursor-pointer "
      style={BannerStyle}
    >
      <div className="h-full flex flex-col justify-center text-center bg-black bg-opacity-50 p-5">
        <h1 className="text-xl font-semibold text-white">We Are GeoShop</h1>
        <p className="text-sm font-medium text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div className="hidden group-hover:flex items-center justify-center flex-col absolute inset-x-4 inset-y-4 text-center bg-black bg-opacity-50 transition-all duration-1000">
        <h1 className="text-xl font-semibold text-white mb-2">Shop Now</h1>
        <PrimaryButton className="text-sm ">Shop Now</PrimaryButton>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section className="border-dashed">
      <div className="container py-10">
        <div className="flex justify-between gap-5 md:flex-row flex-col">
          <div className=" relative basis-1/2 shadow   " style={BannerStyle}>
            <div className="w-full h-full py-5 px-7 bg-black bg-opacity-50 flex flex-col items-start justify-center">
              <h1 className="text-3xl font-semibold text-white">
                We Are GeoShop
              </h1>
              <p className="text-md font-medium my-5 text-white">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                fuga esse aspernatur, aliquid dignissimos magni.
              </p>
              <PrimaryButton className="">Shop Now</PrimaryButton>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="grid grid-cols-2 gap-5">
              <BannerItem />
              <BannerItem />
              <BannerItem />
              <BannerItem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
