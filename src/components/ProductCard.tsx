import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductData {
  id: number;
  title: string;
  slug: string;
}

interface ProductCardProps {
  data?: ProductData;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const image = "/assets/img/bg/right-banner-image-01.jpg";
  return (
    <Link href={`/products/3`} className="shadow border my-1">
      <Image
        src={image}
        alt="img"
        className=" h-48 object-top"
        width={500}
        height={500}
      />
      <div className="px-1 py-3">
        <h1 className="text-xl mb-2 font-semibold text-primary">
          {data?.title}
        </h1>
        <h3 className="text-xl font-semibold text-secondary">$23.50</h3>
        <p>{data?.slug}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
