import { component$, Slot } from "@builder.io/qwik";
import Protected from "~/components/Protected";
import dayjs from "dayjs";
import "dayjs/locale/es.js";
import UserProvider from "~/lib/user/UserProvider";

dayjs.locale("es");

export default component$(() => {
  return (
    <UserProvider>
      <Protected>
        <Slot />
      </Protected>
    </UserProvider>
  );
});
