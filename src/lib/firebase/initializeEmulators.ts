import { connectAuthEmulator, type Auth } from "firebase/auth";

let emulatorsInitialized = false;

export default (auth: Auth) => {
  if (!emulatorsInitialized) {
    console.info("Initializing Firebase Auth emulator");

    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    // connectAuthEmulator(auth, "http://192.168.1.130:9099");
    emulatorsInitialized = true;
  }
};

export const isEmulatorsInitialized = () => emulatorsInitialized;
