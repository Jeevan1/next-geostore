import {
  collection,
  getDocs,
  getFirestore,
  doc,
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import firebase_app from "../config";
import { enqueueSnackbar } from "notistack";

const db = getFirestore(firebase_app);

const updateOrderStatus = async (userId: string, status: string) => {
  try {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }

    // Reference the items subcollection
    const itemsRef = collection(db, "orders", userId, "items");
    const itemsSnapshot = await getDocs(itemsRef);

    if (itemsSnapshot.empty) {
      console.log("No items found for this user.");
      return;
    }

    // Create a batch instance
    const batch = writeBatch(db);

    // Iterate through each document and set the status to "delivered"
    itemsSnapshot.docs.forEach((itemDoc) => {
      const itemRef = doc(db, "orders", userId, "items", itemDoc.id);
      batch.update(itemRef, { status: status });
    });

    // Commit the batch
    await batch.commit();
    enqueueSnackbar("Order status updated successfully", {
      variant: "success",
    });
    console.log("Order status updated to 'delivered' for all items.");
  } catch (error) {
    console.error("Error updating order status:", error);
  }
};

export default updateOrderStatus;

export const subscribeToOrdersItems = async (
  userId: string,
  callback: (items: any[]) => void,
) => {
  try {
    if (!userId) {
      console.error("Invalid userId");
      return;
    }

    // Reference the items subcollection
    const itemsRef = collection(db, "orders", userId, "items");
    const unsubscribe = onSnapshot(
      itemsRef,
      (snapshot) => {
        const orderItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(orderItems);
      },
      (error) => {
        console.error("Error listening to cart updates:", error);
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error listening to cart updates:", error);
  }
};
