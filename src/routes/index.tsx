import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";
import { getMonday, toWeekId } from "~/lib/date/date";

export default component$(() => {
  const weekId = toWeekId(getMonday());
  return <WeekPlanPage weekId={weekId} />;
});

export const head: DocumentHead = {
  title: "Que comemos?",
  meta: [
    {
      name: "description",
      content: "Algo rico?",
    },
  ],
};
