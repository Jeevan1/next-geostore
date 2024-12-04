"use client";

import { PrimaryButton } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import FormInput from "@/components/form/FormInput";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { setDoc, doc, getFirestore, Timestamp } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { addToCart } from "@/firebase/firestore/addCart";
import { enqueueSnackbar } from "notistack";
import { Product } from "@/utils/types";
import CircleLoader from "./CircleLoader";

const ProductDetails = ({
  id,
  product,
  loading,
}: {
  id: string;
  product: Product;
  loading: boolean;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("black");

  const { user }: any = useAuthContext();
  const db = getFirestore(firebase_app);

  const createCartIfNotExist = async () => {
    if (!user) return;

    const roomId = user?.uid;
    await setDoc(doc(db, "cart", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const validateQuantity = () => {
    if (quantity < 1) {
      enqueueSnackbar("Quantity must be at least 1.", { variant: "error" });
      return false;
    }
    if (quantity > product.stock) {
      enqueueSnackbar("Exceeds available stock.", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (!user) {
      enqueueSnackbar("Please sign in to add to cart", { variant: "error" });
      return;
    }

    if (!validateQuantity()) return;

    await createCartIfNotExist();

    const cartItem = {
      quantity,
      size,
      color,
      userId: user?.uid,
      productId: product?.id,
      name: product?.title,
      price: product?.price,
      image: product?.thumbnail,
    };

    try {
      await addToCart(cartItem, user.uid);
    } catch {
      enqueueSnackbar("Failed to add product to cart", { variant: "error" });
    }
  };

  return (
    <Suspense fallback={loading && <CircleLoader />}>
      <section className="border-dashed">
        <div className="container">
          {/* Product Images and Details */}
          <div className="flex flex-col gap-7 py-10 sm:py-20 md:flex-row">
            <div className="basis-1/2">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="h-72 bg-slate-300 object-contain md:h-96"
              />
              <div className="mt-5 grid grid-cols-3 gap-5">
                {product.images.map((item, index) => (
                  <Image
                    key={index}
                    src={item}
                    alt={`Thumbnail ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-24 cursor-pointer bg-slate-300 object-contain md:h-28"
                  />
                ))}
              </div>
            </div>
            <div className="basis-1/2">
              <h1 className="text-xl font-semibold text-primary sm:text-2xl lg:text-3xl">
                {product.title}
              </h1>
              <p className="text-xl font-semibold text-primary sm:text-2xl lg:text-3xl">
                ${product.price}
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">
                Category: <span className="text-dark">{product.category}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">
                Stock: <span className="text-dark">{product.stock}</span>
              </p>
              <p className="mt-5 text-[14px] font-medium text-dark">
                {product.description}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <FormInput
                  label="Quantity"
                  type="number"
                  name="qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  placeholder="Quantity"
                />
                <Dropdown
                  label="Size"
                  data={["XS", "S", "M", "L", "XL"]}
                  onClick={(value) => setSize(value)}
                />
                <Dropdown
                  label="Color"
                  data={["Red", "Blue", "Black"]}
                  onClick={(value) => setColor(value)}
                />
              </div>
              <PrimaryButton className="mt-5" onClick={handleAddToCart}>
                Add to Cart
              </PrimaryButton>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ProductDetails;
