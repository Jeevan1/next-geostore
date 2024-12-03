"use client";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import OptionButton from "@/components/OptionButton";
import SectionHeading from "@/components/SectionHeading";
import { useAuthContext } from "@/context/AuthContext";
import { getOrders } from "@/firebase/firestore/getDocument";
import updateOrderStatus, {
  subscribeToOrdersItems,
} from "@/firebase/firestore/updateOrders";
import { CartItem, Order } from "@/utils/types";
import { stat } from "fs";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import React, { useEffect } from "react";

const oprions = [
  { value: "pending", name: "Pending" },
  { value: "shipped", name: "Shipped" },
  { value: "delivered", name: "Delivered" },
];

export default function OrdersPage() {
  const { user }: any = useAuthContext();
  const [orderItems, setOrderItems] = React.useState<any>([]);
  const userId = user?.uid;
  const [status, setStatus] = React.useState("pending");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const orders = async () => {
      const orderItems = await getOrders(userId);
      setOrderItems(orderItems);
    };
    orders();
  }, [userId]);

  const total = orderItems
    ? orderItems
        .filter((item: Order) => item.status === status)
        .reduce((acc: number, item: Order) => acc + Number(item.grandTotal), 0)
        .toFixed(2)
    : 0;

  const updateOrderStatusHandler = async () => {
    try {
      const status = "delivered";
      await updateOrderStatus(userId, status);
      // alert("Order status updated successfully.");
    } catch (error) {
      console.error("Error updating order status:", error);
      enqueueSnackbar("Failed to update order status", { variant: "error" });
    }
  };

  useEffect(() => {
    const unsubscribe = async () =>
      await subscribeToOrdersItems(`${user?.uid}`, (items) => {
        setOrderItems(items);
      });

    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  return (
    <section className="border-dashed py-10 sm:py-20">
      <div className="container">
        <SectionHeading
          title="Orders"
          description="lorem ipsum dolor sit amet consectetur adipisicing elit."
        />
        <div className="mb-4 flex justify-end">
          <span className="mr-2 font-semibold">Filter by:</span>
          <select
            name="status"
            id="status"
            className="border-0 outline-none"
            onChange={handleChange}
            defaultValue={status}
          >
            {oprions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                selected={option.value === status}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {orderItems &&
        orderItems?.filter((item: Order) => item.status === status).length >
          0 ? (
          <div>
            <ul>
              {orderItems
                ?.filter((item: Order) => item.status === status)
                .map((item: Order, index: number) => (
                  <li key={item.id} className="mb-4 flex gap-10 border-b-2">
                    <span className="mb-2 w-24 font-semibold">
                      Order: {index + 1}
                    </span>
                    <ul className="w-full">
                      {item.cartItems.map((cartItem: CartItem) => (
                        <li
                          className="mb-2 flex gap-4 border-b last:border-0"
                          key={cartItem?.id}
                        >
                          <Image
                            src={cartItem?.image}
                            alt={cartItem?.name}
                            width={50}
                            height={50}
                            className="h-14 w-14 border"
                          />
                          <div className="flex flex-1 flex-col">
                            <h6 className="text-xs font-semibold">
                              {cartItem?.name}
                            </h6>
                            <p className="text-xs font-semibold text-secondary">
                              Color:{" "}
                              <span className="text-dark">
                                {cartItem?.color}
                              </span>
                            </p>
                            <p>
                              Size:{" "}
                              <span className="text-xs text-dark">
                                {cartItem?.size}
                              </span>
                            </p>
                            <div className="flex w-full justify-between gap-4">
                              <p className="text-xs font-semibold text-secondary">
                                Quantity:{" "}
                                <span className="text-dark">
                                  {cartItem?.quantity}
                                </span>
                              </p>
                              <p className="text-end text-xs font-semibold">
                                ${cartItem?.price * cartItem?.quantity}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
            <div className="mt-4 flex justify-between gap-4">
              <span className="font-semibold">Total: </span>
              <span className="font-semibold">${total}</span>
            </div>
            {status === "pending" && (
              <div className="mt-4">
                <SecondaryButton onClick={updateOrderStatusHandler}>
                  Complete Order
                </SecondaryButton>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 text-center">
            <span className="font-semibold">No orders found</span>
            <Link href="/products" className="mt-4 block">
              <PrimaryButton>Shop Now</PrimaryButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
