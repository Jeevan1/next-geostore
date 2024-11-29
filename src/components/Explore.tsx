import React from "react";
import SectionHeading from "./SectionHeading";
import { FaQuoteLeft } from "react-icons/fa";
import { SecondaryButton } from "./Button";
import Image from "next/image";

const Explore = () => {
  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="mb-10 flex flex-col items-start justify-between ">
            <div>
              <SectionHeading title="Explore Our Products" className="mb-5" />
              <p className="text-md font-semibold text-dark">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                quod, iure ipsam sed expedita, nostrum ea amet quo voluptatum
                commodi explicabo voluptas magni accusantium natus?
              </p>
              <div className="me-1 mt-5 flex items-center gap-3 sm:me-5">
                <FaQuoteLeft className="icon" size={35} />
                <i className=" text-sm font-bold text-primary">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente, esse ipsam dolo remque.
                </i>
              </div>
              <p className="mt-5 text-md font-semibold text-dark">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
                assumenda nihil iste vel debitis culpa dolorum quos ut
                perspiciatis in.
              </p>
              <br />
              <p className="text-md font-semibold text-dark">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta
                consequuntur tenetur vel exercitationem dolorem amet maxime.
                Veritatis perferendis vel, numquam expedita officiis officia
                consequatur commodi?
              </p>
            </div>
            <SecondaryButton className="mt-5">Shop Now</SecondaryButton>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-2 gap-7">
              <div className="flex flex-col items-center justify-center gap-2 bg-accent bg-opacity-20 p-3 text-center sm:text-left">
                <h1 className="text-lg font-semibold md:text-2xl">
                  Leather Bag
                </h1>
                <p className="text-sm font-semibold text-dark md:text-md">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <div>
                <Image
                  src="/assets/img/bg/right-banner-image-01.jpg"
                  alt="img"
                  width={500}
                  height={500}
                  className="h-48 object-top sm:h-60"
                />
              </div>
              <div>
                <Image
                  src="/assets/img/bg/right-banner-image-01.jpg"
                  alt="img"
                  width={500}
                  height={500}
                  className="h-48 object-top sm:h-60 "
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-2 bg-accent bg-opacity-20 p-3 text-center sm:text-left">
                <h1 className="text-lg font-semibold md:text-2xl ">
                  Different Types
                </h1>
                <p className="text-sm font-semibold text-dark md:text-md">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
