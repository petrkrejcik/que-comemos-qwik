import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { login } from "~/lib/firebase/auth";

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
