import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { getMonday, toWeekId } from "~/lib/date/date";

export default component$(() => {
  const { weekId: weekIdParam } = useLocation().params;
  const goto = useNavigate();

  /**
   * Client-side validtion of weekId
   * Would be better to do this on the server but then it's performed on every client-side navigation as well
   * which is not ideal.
   */
  useVisibleTask$(({ track }) => {
    track(() => weekIdParam);
    if (!weekIdParam) {
      return;
    }
    const weekId = toWeekId(getMonday(weekIdParam));
    if (weekId !== weekIdParam) {
      goto(`/week/${weekId}`);
    }
  });

  return <Slot />;
});
