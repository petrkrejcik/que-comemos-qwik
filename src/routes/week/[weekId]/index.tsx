import { component$ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import WeekPlan from "~/components/WeekPlanPage/WeekPlanPage";

export default component$(() => {
  const location = useLocation();
  const weekId = parseInt(location.params.weekId)
  if (isNaN(weekId)) {
    throw new Error('Incorrent week')
  }
  return <>
  <WeekPlan weekId={weekId}/>
  </>
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
