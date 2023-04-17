import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { login } from "~/lib/firebase/auth";

export default component$(() => {
  return (
    <button class="btn btn-primary" onClick$={() => login()}>
      Login using Google
    </button>
  );
});

export const head: DocumentHead = {
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to start using the app",
    },
  ],
};
