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
    <div className="relative group transition duration-1000">
      <Image
        src={item.image}
        alt="img"
        width={500}
        height={500}
        className="h-48 object-top"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 p-3 opacity-0 transform group-hover:opacity-100 transition-all duration-400 ease-in-out">
        <div className="flex flex-col items-start justify-end h-full">
          <h4 className="text-xl font-semibold text-white">{item.title}</h4>
          <span className="text-white text-2xl">{item.icon}</span>
        </div>
      </div>
    </div>
  );
};

const Social = () => {
  return (
    <section className="py-20 border-dashed">
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
