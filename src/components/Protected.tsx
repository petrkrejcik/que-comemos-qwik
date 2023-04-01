import { component$, Slot } from "@builder.io/qwik";
import Redirect from "~/components/Redirect/Redirect";
import { useUser } from "~/lib/user/user";
import useProtectedUrl from "~/hooks/useProtectedUrl";
import { pages } from "~/lib/url";

export default component$(() => {
  const userStore = useUser();
  const isProtectedUrl = useProtectedUrl();

  return (
    <>
      {isProtectedUrl ? userStore.loading ? "" : userStore.user ? <Slot /> : <Redirect to={pages.LOGIN} /> : <Slot />}
    </>
  );
});
