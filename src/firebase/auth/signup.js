import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { enqueueSnackbar } from "notistack";

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

const firebaseErrorMessages = {
  "auth/email-already-in-use":
    "This email is already associated with an account.",
  "auth/invalid-email": "Invalid email address. Please enter a valid email.",
  "auth/operation-not-allowed":
    "Email/password accounts are not enabled. Contact support.",
  "auth/weak-password":
    "Password is too weak. Please use at least 6 characters.",
  "auth/missing-email": "Email address is required.",
  "auth/invalid-password":
    "Invalid password. Ensure it meets the security criteria.",
  "auth/internal-error": "An internal error occurred. Please try again later.",
  // Common sign-in errors (useful for both sign-up and sign-in)
  "auth/user-disabled": "This account has been disabled.",
  "auth/invalid-credential": "Invalid credential. Please try again.",
  // Add more error codes as needed
};

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
    const errorMessage =
      firebaseErrorMessages[e.code] || "An unexpected error occurred.";
    enqueueSnackbar(errorMessage, { variant: "error" });
  }

  return { result, error };
}
