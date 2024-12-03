"use client";
import { PrimaryButton } from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import FormInput from "@/components/form/FormInput";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { fetchData } from "@/utils/api-service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { setDoc, doc, getFirestore, Timestamp } from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { addToCart } from "@/firebase/firestore/addCart";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/types";
import CircleLoader from "@/components/container/CircleLoader";
import { enqueueSnackbar } from "notistack";
import Head from "next/head";

const DetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("black");
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user }: any = useAuthContext();
  const db = getFirestore(firebase_app);
  const router = useRouter();

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await fetchData(`/${id}`);
        setProduct(data);
      } catch {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  // Fetch similar products
  useEffect(() => {
    setSimilarLoading(true);
    if (!product?.category) return;

    const fetchSimilarProducts = async () => {
      try {
        const { data } = await fetchData(`/category/${product.category}`);
        setSimilarProducts(data.products);
        setSimilarLoading(false);
      } catch {
        setError("Failed to fetch similar products. Please try again later.");
      }
    };
    fetchSimilarProducts();
  }, [product?.category]);

  // Ensure a cart document exists
  const createRoomIfNotExist = async () => {
    if (!user) return;

    const roomId = user?.uid;
    await setDoc(doc(db, "cart", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  // Handle adding items to cart
  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add to cart");
      router.push("/signin");
      return;
    }

    await createRoomIfNotExist();

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

  if (loading) {
    return <CircleLoader className="border-dashed" />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found for ID: {id}</div>;
  }

  return (
    <>
      <section className="border-dashed">
        <div className="container">
          <div className="flex flex-col gap-7 py-10 sm:py-20 md:flex-row">
            {/* Product Images */}
            <div className="basis-1/2">
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="h-72 bg-slate-300 object-contain md:h-96"
              />
              <div className="mt-5 grid grid-cols-3 gap-5">
                {product.images.map((item: string, index: number) => (
                  <Image
                    key={index}
                    src={item}
                    alt={`Thumbnail ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-24 cursor-pointer bg-slate-300 object-contain object-top md:h-28"
                  />
                ))}
              </div>
            </div>
            {/* Product Details */}
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
        {/* Similar Products */}
        <div className="border-dashed py-10 sm:py-20">
          <div className="container">
            <SectionHeading title="Similar Products" />
            <div className=" grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
              {similarProducts?.map((item: Product) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailsPage;
