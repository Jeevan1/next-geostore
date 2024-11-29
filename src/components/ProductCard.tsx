import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductData {
  id: number;
  title: string;
  slug: string;
  price: number;
  thumbnail: string;
}

interface ProductCardProps {
  product?: ProductData;
}

const ProductCard = ({ product }: ProductCardProps) => {
  if (!product) return null;
  return (
    <div className="my-2 rounded-md shadow-md sm:my-5">
      <Link href={`/products/${product?.id}`} className="">
        <Image
          src={product?.thumbnail}
          alt="img"
          className="h-32 w-full bg-transparent object-contain object-top sm:h-48"
          width={150}
          height={150}
          quality={50}
        />
        <div className="px-3 py-3">
          <h1 className="mb-2 line-clamp-2 text-lg font-semibold text-primary sm:text-lg md:text-xl">
            {product?.title}
          </h1>
          <h3 className="text-md font-semibold text-secondary md:text-xl">
            ${product?.price}
          </h3>
          <p>{product?.slug}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
