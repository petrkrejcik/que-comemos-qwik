import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import useDaytime from "~/hooks/useDaytime";
import { getMonday, toWeekId } from "~/lib/date/date";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { useUser } from "~/lib/user/user";

type Props = {
  weekId: string;
};

const dayNamesES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

const Loading = component$(() => {
  return (
    <div
      class="w-44 h-6 bg-base-200 rounded animate-pulse"
      role="progressbar"
    />
  );
});

export default component$((props: Props) => {
  const { groupId, loading } = useUser();
  const daytime = useDaytime();
  const sideDishKey = `${daytime}-side-dish` as const;
  const weekPlanResource = useResource$(async ({ track }) => {
    track(() => props.weekId);
    track(() => loading);
    if (loading) {
      return null; // Still checking if user is logged in
    }
    const weekId = toWeekId(getMonday(props.weekId));
    const result = await getWeekPlan(weekId, groupId);
    return result;
  });

  // Generate an array of numbers between 0 and 6
  const days = Array.from<number, 0 | 1 | 2 | 3 | 4 | 5 | 6>(
    { length: 7 },
    (_, i) => i as 0 | 1 | 2 | 3 | 4 | 5 | 6
  );

  const isToday = (day: number) => {
    return getMonday(props.weekId).add(day, "day").isSame(dayjs(), "day");
  };

  return (
    <ul class="divide-y divide-base-300">
      {days.map((day) => {
        return (
          <li class="flex items-center py-2" key={`${props.weekId}-${day}`}>
            <div class="avatar placeholder mr-10">
              <div
                class={`bg-base-200 rounded-full w-12 h-12 ${
                  isToday(day) ? "border-2 border-primary" : ""
                } `}
              >
                <span
                  class={`capitalize text-neutral ${
                    isToday(day) ? "text-neutral" : ""
                  }`}
                >
                  {dayNamesES[day]}
                </span>
              </div>
            </div>
            <div class="w-full flex items-center h-12">
              <Resource
                value={weekPlanResource}
                onPending={() => <Loading />}
                onRejected={() => <p>Rejected</p>}
                onResolved={(weekPlan) => {
                  if (weekPlan === null) {
                    return <Loading />;
                  }
                  const meals = weekPlan[`d${day}`];
                  const meal = meals?.[daytime];
                  const sideDish = meals?.[sideDishKey];
                  if (!meal) {
                    return (
                      <Link
                        href={`/week/${props.weekId}/${daytime}/${day}`}
                        class="btn btn-ghost"
                      >
                        Elegir
                      </Link>
                    );
                  }
                  return (
                    <Link href={`/week/${props.weekId}/${daytime}/${day}`}>
                      {meal.name}
                      {sideDish ? ` con ${sideDish.name}` : ""}
                    </Link>
                  );
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
});
