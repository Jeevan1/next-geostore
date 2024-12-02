import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export default async function signUp(email, password, userName, profileUrl) {
  let result = null,
    error = null;
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (!result) return;
    await setDoc(doc(db, "users", result?.user?.uid), {
      userName,
      profileUrl,
      userId: result?.user?.uid,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
