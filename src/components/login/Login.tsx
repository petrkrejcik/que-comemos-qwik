import { component$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { login } from "~/lib/firebase/auth";

export default component$(() => {
  const goto = useNavigate();
  return (
    <button
      class="btn btn-primary"
      onClick$={async () => {
        await login();
        goto("/"); // TODO goto doesn't work
      }}
    >
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
