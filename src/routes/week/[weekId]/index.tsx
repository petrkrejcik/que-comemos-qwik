import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestEvent} from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import WeekPlanPage from "~/components/WeekPlanPage/WeekPlanPage";
import { getMonday, toWeekId } from "~/lib/date/date";

export const onRequest = ({ params, redirect }: RequestEvent) => {
  // Make sure the weekId is a Monday
  const weekIdParam = params.weekId
  const weekId = toWeekId(getMonday(weekIdParam));
  if (weekId !== weekIdParam) {
    throw redirect(302, `/week/${weekId}`);
  }
};

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
