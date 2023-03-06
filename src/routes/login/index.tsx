import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import getFirebase from "~/lib/firebase/getFirebase";


export const login = async () => {
  await getFirebase()
  try {
    const userCredential = await signInWithPopup(getAuth(), new GoogleAuthProvider());
    console.log('🛎 ', 'userCredential', userCredential);
    if (!userCredential) {
      throw new Error('Login failed');
    }
  } catch (e) {
    console.error(e);
  }
};

export default component$(() => {
  return (
    <button onClick$={() => login()}>Login using Google</button>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
