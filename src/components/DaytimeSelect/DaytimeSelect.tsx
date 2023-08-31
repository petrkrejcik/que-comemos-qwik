import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import useDaytime from "~/hooks/useDaytime";
import useWeekId from "~/hooks/useWeekId";
import { getMonday, toWeekId } from "~/lib/date/date";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { useUser } from "~/lib/user/user";

type Props = {
  weekId: string;
};

const daytimes = [
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
] as const;

export default component$(() => {
  const weekId = useWeekId();
  const daytime = useDaytime();

  return (
    <ul class="tabs w-full justify-between">
      {daytimes.map(({ id, name }) => (
        <li
          class={`tab tab-bordered w-1/2 ${daytime === id && "tab-active"}`}
          aria-selected={daytime === id}
          aria-label={name}
          key={id}
        >
          <Link href={`/week/${weekId}/${id}`} class="w-full">
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
});
