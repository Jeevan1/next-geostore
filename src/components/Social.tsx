import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { TbBrandMedium } from "react-icons/tb";

type SocialDataProps = {
  id: number;
  title: string;
  image: string;
  icon: JSX.Element;
};
const data: SocialDataProps[] = [
  {
    id: 1,
    title: "Fashion",
    image: "/assets/img/bg/right-banner-image-03.jpg",
    icon: <TbBrandMedium />,
  },
  {
    id: 2,
    title: "New",
    image: "/assets/img/bg/right-banner-image-01.jpg",
    icon: <TbBrandMedium />,
  },
  {
    id: 3,
    title: "Fashion",
    image: "/assets/img/bg/right-banner-image-02.jpg",
    icon: <TbBrandMedium />,
  },
  {
    id: 4,
    title: "Fashion",
    image: "/assets/img/bg/right-banner-image-04.jpg",
    icon: <TbBrandMedium />,
  },
  {
    id: 5,
    title: "Fashion",
    image: "/assets/img/bg/right-banner-image-03.jpg",
    icon: <TbBrandMedium />,
  },
  {
    id: 6,
    title: "Fashion",
    image: "/assets/img/bg/right-banner-image-01.jpg",
    icon: <TbBrandMedium />,
  },
];

const SocialImage = ({ item }: { item: SocialDataProps }) => {
  return (
    <div className="group relative transition duration-1000">
      <Image
        src={item.image}
        alt="img"
        width={500}
        height={500}
        className="h-32 w-full bg-transparent object-top sm:h-48"
      />

      <div className="duration-400 absolute inset-0 transform bg-black bg-opacity-60 p-1 opacity-0 transition-all ease-in-out group-hover:opacity-100 sm:p-2 md:p-3">
        <div className="flex h-full flex-col items-start justify-center md:justify-end">
          <h4 className="text-xs font-semibold text-white">{item.title}</h4>
          <span className="text-2xl text-white">{item.icon}</span>
        </div>
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Social Media"
          description="lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <div className="grid grid-cols-6">
          {data.map((item) => (
            <div key={item.id}>
              <div>
                <SocialImage item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;
