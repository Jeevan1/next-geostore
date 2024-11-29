import React from "react";
import SectionHeading from "./SectionHeading";
import FormInput from "./form/FormInput";
import { SecondaryButton } from "./Button";

const NewsLetter = () => {
  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <div className="flex flex-col justify-center gap-5 md:flex-row md:gap-10">
          <div className="w-full md:w-1/2">
            <SectionHeading
              title="By Subscribing To Our Newsletter You Can Get 20% Off"
              description="lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quod, iure ipsam sed expedita, nostrum ea amet quo voluptatum commodi explicabo voluptas magni accusantium natus?"
              className="gap-5"
            />
            <form action="" className="flex gap-4">
              <FormInput
                name={""}
                label="Email"
                placeholder={"Email Address"}
                type={""}
                value={""}
                className="w-[30%]"
              />
              <FormInput
                name={""}
                label="Phone"
                placeholder={"Phone Number"}
                type={""}
                value={""}
                className="w-[30%]"
              />
              <SecondaryButton className="">Subscribe</SecondaryButton>
            </form>
          </div>
          <div className="w-full border-2 p-3 md:w-1/2 md:border-0 md:p-0">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h6 className="mb-1 text-md font-bold md:mb-2 md:text-lg">
                  Store Location
                </h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  Kathmandu, Nepal
                </p>
              </div>
              <div>
                <h6 className="mb-1 text-md font-bold md:mb-2 md:text-lg">
                  Work Hours
                </h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  9:00 AM - 7:00 PM Daily
                </p>
              </div>
              <div>
                <h6 className="mb-1 text-md font-bold md:mb-2 md:text-lg">
                  Phone Number
                </h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  +977-98267-2727
                </p>
              </div>
              <div>
                <h6 className="mb-1 text-md font-bold md:mb-2 md:text-lg">
                  Email Address
                </h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  geoshop@gmail
                </p>
              </div>
              <div>
                <h6 className="mb-1 text-md font-bold md:mb-2 md:text-lg">
                  Social Media
                </h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  Facebook, Twitter, Instagram and More
                </p>
              </div>
              <div>
                <h6 className="mb-2 text-lg font-bold">Office Location</h6>
                <p className="text-sm font-semibold text-accent md:text-md">
                  Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
