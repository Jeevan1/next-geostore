import { doc, getFirestore, setDoc, Timestamp } from "firebase/firestore";
import firebase_app from "../config";
import { time } from "console";
import { removeCart } from "./removeCart";
import { enqueueSnackbar } from "notistack";

const db = getFirestore(firebase_app);
const id = Date.now().toString();

export default async function addOrders(userId: string, data: any) {
  let result = null,
    error = null;

  try {
    if (!data) {
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
  } catch (e) {
    error = e;
    enqueueSnackbar("Failed to place order", { variant: "error" });
  }

  return { result, error };
}
