import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import firebase_app from "../config";
import { time } from "console";
import { removeCart } from "./removeCart";

const db = getFirestore(firebase_app);
const id = Date.now().toString();

export default async function addOrders(userId, data) {
  let result = null,
    error = null;

  try {
    if (data) {
      console.error("Invalid data or userId:", { data, userId });
    }
    await setDoc(doc(db, "orders", userId, "items", id), {
      timestamp: Timestamp.fromDate(new Date()),
      orderId: id,
      userId,
      ...data,
    });
    await removeCart(userId);
    result = true;
    alert("Order placed successfully");
  } catch (e) {
    error = e;
  }

  return { result, error };
}
