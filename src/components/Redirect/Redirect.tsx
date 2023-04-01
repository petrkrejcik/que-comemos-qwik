import { component$, useTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

type Props = {
  to: string;
}

export default component$((props: Props) => {
  const location = useLocation()
  const goto = useNavigate()
  
  useTask$(() => {
    if (!location.url.pathname.startsWith(props.to)) {
      goto(props.to);
    }
  });

  return null
});
