import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";

export default component$(() => {
  const { weekId } = useLocation().params;

  return <WeekPlanPage weekId={weekId} />;
});

export const head: DocumentHead = {
  title: "Week",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
