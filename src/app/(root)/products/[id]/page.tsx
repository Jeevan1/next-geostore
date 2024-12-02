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
// import { addToCart, setLocalStorageItem } from "../../../../../helper";
import { useAuthContext } from "@/context/AuthContext";
import addData from "@/firebase/firestore/addData";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import { addToCart } from "@/firebase/firestore/addCart";
import { useRouter } from "next/navigation";

const DetailsPage = ({ params: { id } }: { params: { id: string } }) => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("black");

  const { user } = useAuthContext();

  // Fetch products based on slug
  useEffect(() => {
    const fetchProducts = async () => {
      // setLoading(true);
      // setError(null);

      // try {
      const { data, loading, error } = await fetchData(`/${id}`);
      setProducts(data);
      setLoading(loading);
      setError(error);
      // } catch (err) {
      //   setError("Failed to fetch products. Please try again later.");
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      // setLoading(true);
      // setError(null);
      const { data, loading, error } = await fetchData(
        `/category/${products?.category}`,
      );

      setSimilarProducts(data.products);
      setLoading(loading);
      setError(error);
      // } catch (err) {
      //   setError("Failed to fetch products. Please try again later.");
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchSimilarProducts();
  }, [products?.category]);

  const db = getFirestore(firebase_app);
  const router = useRouter();

  const createRoomIfNotExist = async () => {
    //roomId
    let roomId = user?.uid;
    await setDoc(doc(db, "cart", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleAddToCart = async (data) => {
    if (!user) {
      alert("Please login to add to cart");
      router.push("/signin");
      return;
    }

    createRoomIfNotExist();
    const result = await addToCart(data, user?.uid);
  };

  // const addToCart = () => {
  //   const data = {
  //     category: products?.category,
  //   };

  //   setLocalStorageItem("cart", JSON.stringify(data));
  // };

  // console.log("products", products);

  if (loading) {
    return <div className="text-center">Loading...</div>; // Add skeleton loader for better UX
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!products) {
    return <div className="text-center">No products available for {id}.</div>;
  }

  return (
    <section className="border-dashed">
      <div className="container">
        <div className="flex flex-col gap-7 py-10 sm:py-20 md:flex-row">
          <div className="basis-1/2">
            <Image
              src={products?.thumbnail}
              alt="img"
              width={400}
              height={400}
              className="h-72 bg-slate-300 object-contain md:h-96"
            />
            <div className="mt-5 grid grid-cols-3 gap-5">
              {products?.images?.map((item: string, index: number) => (
                <Image
                  src={item}
                  alt="img"
                  width={150}
                  height={150}
                  key={index}
                  className="h-24 cursor-pointer bg-slate-300 object-contain object-top md:h-28"
                />
              ))}
            </div>
          </div>
          <div className="basis-1/2">
            <div className="flex gap-5  border-b-2 border-slate-300 pb-5">
              <div className="flex-1 basis-2/3">
                <h1 className="text-xl font-semibold text-primary sm:text-2xl lg:text-3xl">
                  {products?.title}
                </h1>
                <p className="mt-2 text-xl font-semibold text-primary sm:mt-3 sm:text-2xl lg:text-3xl">
                  ${products?.price}
                </p>
              </div>
              <div className="flex-1 basis-1/4">
                <p className="my-5 text-sm font-medium text-dark sm:text-md md:text-md">
                  ⭐⭐⭐⭐💫
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold text-primary sm:mt-5 sm:text-md">
              Category: <span className="text-dark">{products?.category}</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-primary sm:mt-5 sm:text-md">
              Stocks: <span className="text-dark">{products?.stock}</span>
            </p>
            <p className="mt-2 border-b-2 border-slate-300 pb-5 pe-4 text-[14px] font-medium text-dark sm:mt-5 sm:text-[15px]">
              {products?.description}
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="min-w-fit text-md font-medium text-dark sm:text-lg">
                No. of Orders
              </p>
              <FormInput
                label="Quantity"
                type="number"
                name="qty"
                value={1}
                placeholder={"1"}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <div className="flex items-center gap-3">
                <Dropdown
                  onClick={(value) => {
                    setSize(value);
                  }}
                  data={["XS", "S", "M", "L", "XL"]}
                  label="Size"
                />
                <Dropdown
                  onClick={(value) => {
                    setColor(value);
                  }}
                  data={["Red", "Blue", "Black"]}
                  label="Color"
                />
              </div>
            </div>
            <PrimaryButton
              className="mt-5"
              onClick={() =>
                handleAddToCart({
                  quantity: quantity,
                  size: size,
                  color: color,
                  userId: user?.uid,
                  productId: products?.id,
                  name: products?.title,
                  price: products?.price,
                  image: products?.thumbnail,
                })
              }
            >
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="border-dashed py-10 sm:py-10 sm:py-20">
        <div className="container">
          <SectionHeading title="Similar Products" />
          <div className=" grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
            {similarProducts?.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Pagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
