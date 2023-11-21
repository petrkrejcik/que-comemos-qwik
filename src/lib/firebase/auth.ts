import { getAuth as getAuthFirebase, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebase from "./getFirebase";

const getAuth = () => {
  const auth = getAuthFirebase(firebase);
  return auth;
}

export const login = async () => {
  try {
    const userCredential = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    if (!userCredential) {
      throw new Error("Login failed");
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getAuth
