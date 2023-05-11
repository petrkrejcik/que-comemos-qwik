import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Protected from "~/components/Protected";
import validateUser from "~/lib/auth/validateUser";
import { getMonday, toWeekId } from "~/lib/date/date";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import dayjs from "dayjs";
import 'dayjs/locale/es.js';

dayjs.locale('es');

export const useGroupId = routeLoader$(async (request) => {
  const { groupId } = await validateUser(request);
  return groupId;
});

export const useServerWeekPlan = routeLoader$(async (request) => {
  try {
    const groupId = await request.resolveValue(useGroupId);
    const weekId = toWeekId(getMonday(request.params.weekId));
    const result = await getWeekPlan(weekId, groupId);
    return result;
  } catch (e) {
    return {};
  }
});

export default component$(() => {
  return (
    <Protected>
      <Slot />
    </Protected>
  );
});
