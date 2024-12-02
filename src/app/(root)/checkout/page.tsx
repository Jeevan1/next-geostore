"use client";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import FormInput from "@/components/form/FormInput";
import SectionHeading from "@/components/SectionHeading";
import { useAuthContext } from "@/context/AuthContext";
import { checkoutFormData } from "@/data";
import addOrders from "@/firebase/firestore/addOrders";
import { subscribeToCartItems } from "@/firebase/firestore/getDocument";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { IoIosArrowForward, IoIosCheckmarkCircle } from "react-icons/io";

export default function page() {
  const [cartItems, setCartItems] = React.useState([]);
  const { user } = useAuthContext();
  const userId = user?.uid;
  const router = useRouter();

  if (!user) {
    router.push("/signin");
  } else {
    let tax = 12.5;
    const subTotal = cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

    const grandTotal = (
      Number(subTotal) +
      (Number(subTotal) * tax) / 100
    ).toFixed(2);

    useEffect(() => {
      const unsubscribe = subscribeToCartItems(`${user?.uid}`, (items) => {
        setCartItems(items);
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe && unsubscribe();
    }, [userId]);

    const handleSubmitOrder = async () => {
      try {
        if (cartItems.length === 0) {
          alert("Your cart is empty");
          return;
        }
        const { result, error } = await addOrders(`${user?.uid}`, {
          cartItems,
          subTotal,
          tax,
          grandTotal,
          status: "pending",
        });

        if (result) {
          router.push("/orders");
        }

        if (error) {
          alert(error);
        }
      } catch (error) {
        console.error("Error adding order:", error);
      }
    };

    return (
      <section className="min-h-screen border-dashed bg-gray-100 py-10">
        <div className="container">
          <SectionHeading title="Checkout" className="mb-4" />
          {cartItems.length > 0 ? (
            <form
              action=""
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
            >
              <div className="col-span-1 bg-white p-4">
                <h5 className="border-b pb-1 text-md font-semibold uppercase text-secondary">
                  1. Review your order
                </h5>
                <ul className="mt-4">
                  {cartItems ? (
                    cartItems.map((item) => (
                      <li className="mb-2 flex gap-4 border-b" key={item?.id}>
                        <Image
                          src={item?.image}
                          alt={item?.title}
                          width={50}
                          height={50}
                          className="h-14 w-14 border"
                        />
                        <div className="flex flex-1 flex-col">
                          <h6 className="text-xs font-semibold">
                            {item?.name}
                          </h6>
                          <p className="text-xs font-semibold text-secondary">
                            Color:{" "}
                            <span className="text-dark">{item?.color}</span>
                          </p>
                          <p>
                            Size:{" "}
                            <span className="text-xs text-dark">
                              {item?.size}
                            </span>
                          </p>
                          <div className="flex w-full justify-between gap-4">
                            <p className="text-xs font-semibold text-secondary">
                              Quantity:{" "}
                              <span className="text-dark">
                                {item?.quantity}
                              </span>
                            </p>
                            <p className="text-end text-xs font-semibold">
                              ${item?.price * item?.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>Cart is empty</li>
                  )}
                </ul>
                <p className="flex justify-between">
                  <span className="font-semibold">Subtotal: </span>
                  <span className="text-end font-semibold text-secondary">
                    ${subTotal}
                  </span>
                </p>
                <div className="mt-4">
                  <p className="mb-2 text-md font-semibold">Select delivery:</p>
                  <p className="mb-4 text-sm font-semibold leading-5 text-gray-600">
                    Lorem ipsum dolor sit, adipisicing elit. Blanditiis quasi
                    libero quae mollitia, repudiandae illo error.
                  </p>
                  <div className="flex gap-7 rounded-md bg-secondary bg-opacity-10 p-3">
                    <span className="pt-1 text-sm font-semibold uppercase">
                      Free
                    </span>
                    <div className="flex w-full items-center justify-between">
                      <div className="w-full">
                        <p className="text-sm font-semibold">Regular</p>
                        <span className="text-sm font-semibold text-gray-600">
                          [2-3 business days]
                        </span>
                      </div>
                      <span className="text-primary">
                        <IoIosCheckmarkCircle className="text-xl text-orange-400" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-md font-semibold">
                    For Quick Payenment:
                  </p>
                  <div className="flex gap-4">
                    <Link href="/" className="">
                      <Image
                        src="/assets/img/payement/esewa.png"
                        alt="esewa"
                        width={200}
                        height={100}
                        className="h-12 w-28 rounded-md border-2 border-secondary object-contain p-2"
                      />
                    </Link>
                    <Link href="/" className="">
                      <Image
                        src="/assets/img/payement/khalti.png"
                        alt="khalti"
                        width={200}
                        height={100}
                        className="h-12 w-28 rounded-md border-2 border-secondary object-contain p-2"
                      />
                    </Link>
                  </div>
                  <p className="mt-4 text-xs font-semibold leading-5 text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore soluta minima omnis? Assumenda, cumque quis.
                  </p>
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-md font-semibold">
                    Or, you can pay cash on delivery
                  </p>
                  <SecondaryButton className="w-full">
                    CONTINUE TO DELIVERY ADDRESS
                  </SecondaryButton>
                </div>
              </div>
              <div className="col-span-1 h-fit bg-white p-4">
                <h5 className="mb-4 border-b pb-1 text-md font-semibold uppercase text-secondary">
                  2. Delivery address
                </h5>
                <div>
                  {checkoutFormData.map((item) =>
                    item.type !== "checkbox" ? (
                      <div key={item.id} className="mb-4">
                        <p className="mb-2 text-sm font-semibold">
                          {item.title}
                        </p>
                        <FormInput
                          name={item.name}
                          type={item.type}
                          label={item.label}
                          placeholder={item.placeholder}
                          className="w-full max-w-full"
                        />
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className="mb-4 flex items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          name={item.name}
                          id={item.name}
                          placeholder=""
                          aria-label={item.label}
                          className="h-4 w-4"
                        />
                        <p className="text-sm font-semibold">
                          Same as billing address
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="col-span-1 h-fit">
                <div className="mb-5 bg-white p-4">
                  <h5 className="border-b pb-1 text-md font-semibold uppercase text-secondary">
                    3. Select payment method
                  </h5>
                  <div className="my-3 rounded-md border-2 bg-white bg-opacity-10">
                    <Link
                      href="/"
                      className="flex items-center justify-between border-b-2 p-3 hover:bg-gray-100"
                    >
                      <p className="text-sm font-semibold">Debit Card</p>
                      <IoIosArrowForward className="text-xl text-gray-600" />
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center justify-between p-3 hover:bg-gray-100"
                    >
                      <p className="text-sm font-semibold">Credit Card</p>
                      <IoIosArrowForward className="text-xl text-gray-600" />
                    </Link>
                  </div>
                </div>
                <div className="mb-5 bg-white">
                  <div className="p-4">
                    <h5 className="border-b pb-1 text-md font-semibold uppercase text-secondary">
                      Order Summary
                    </h5>
                    <ul className="mt-4">
                      {cartItems?.map((item) => (
                        <li className="mb-2 flex justify-between border-b py-2 text-sm font-medium text-secondary last:border-b-2">
                          <span>
                            {item.quantity} x {item.name}
                          </span>
                          <span>${item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between py-2 text-sm font-semibold text-secondary ">
                      <span>Subtotal:</span>
                      <span>${subTotal}</span>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="leading-3">
                        <p className="text-sm font-semibold">Shipping Cost</p>
                        <span className="text-xs font-semibold text-gray-500">
                          [3-5 business days]
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-secondary">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between py-2 text-sm font-semibold">
                      <span className="text-sm font-semibold">Sales Tax:</span>
                      <span className="text-sm font-semibold text-secondary">
                        ${tax / 100}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between bg-secondary bg-opacity-60 p-4 text-md font-semibold text-white">
                    <span>Total:</span>
                    <span>${grandTotal}</span>
                  </div>
                </div>
                <div>
                  <SecondaryButton
                    className="w-full"
                    onClick={handleSubmitOrder}
                  >
                    CONTINUE TO PAYMENT
                  </SecondaryButton>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <p className="text-center text-md font-semibold">
                No items in cart
              </p>
              <Link href="/" className="block text-center">
                <PrimaryButton className="mt-4">
                  CONTINUE SHOPPING
                </PrimaryButton>
              </Link>
            </div>
          )}
        </div>
      </section>
    );
  }
}
