import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import Login from "~/components/login/Login";
import { useUser } from "~/lib/user/user";

export interface userData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
}

export default component$(() => {
  const user = useUser();
  const nav = useNavigate();

  useVisibleTask$(({ track }) => {
    track(() => user.loading);
    track(() => user.user);
    if (user.loading) {
      return;
    }
    if (user.user) {
      nav("/");
    }
  });

  return (
    <div class={"flex justify-center items-center h-screen"}>
      <Login />
    </div>
  );
});
