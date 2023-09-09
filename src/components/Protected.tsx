import { component$, Slot } from "@builder.io/qwik";
import Redirect from "~/components/Redirect/Redirect";
import { useUser } from "~/lib/user/user";
import useProtectedUrl from "~/hooks/useProtectedUrl";
import { pages } from "~/lib/url";

export default component$(() => {
  const userStore = useUser();
  const isProtectedUrl = useProtectedUrl();

  if (isProtectedUrl && !userStore.loading && !userStore.isLogged) {
    return <Redirect to={pages.LOGIN} />;
  }
  return <Slot />;
});
