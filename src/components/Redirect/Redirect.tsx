import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

type Props = {
  to: string;
};

export default component$((props: Props) => {
  const location = useLocation();
  const goto = useNavigate();

  /**
   * Redirecting only on client.
   * The redirect cannot be done on the server using `useTask$` because `goto` doesn't work on server.
   * Even if we use `server$` we can't redirect from that because it is a fetch request.
   * The only way would be to use `onGet` but that that handler would be run on every request.
   */
  useVisibleTask$(() => {
    if (!location.url.pathname.startsWith(props.to)) {
      goto(props.to);
    }
  });

  return null;
});
