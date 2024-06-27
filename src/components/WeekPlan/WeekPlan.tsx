import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import useDaytime from "~/hooks/useDaytime";
import { getDayName, getMonday, toWeekId } from "~/lib/date/date";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import selectMeal from "~/lib/queries/selectMeal";
import swapMeals from "~/lib/queries/swapMeals";
import { useUser } from "~/lib/user/user";
import type { DayNumber } from "~/lib/weekPlan/weekPlanTypes";

type Props = {
  weekId: string;
};

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
  const rerender = useSignal("");
  const daytime = useDaytime();
  const weekPlanResource = useResource$(async ({ track }) => {
    track(() => props.weekId);
    track(() => loading);
    track(() => rerender.value);
    if (loading) {
      return null; // Still checking if user is logged in
    }
    const weekId = toWeekId(getMonday(props.weekId));
    const result = await getWeekPlan(weekId, groupId);
    return result;
  });

  useVisibleTask$(() => {
    import("~/lib/dragAndDrop/dragAndDrop");
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
    <>
      <ul class="divide-y divide-base-300">
        {days.map((day) => {
          return (
            <li
              preventdefault:dragover
              class={`flex items-center py-2`}
              // ref={(r) => (elementRefs[day] = r)}
              key={`${props.weekId}-${day}`}
              draggable
              onDragStart$={(e) => {
                e.dataTransfer.setData("text/plain", `d${day}`);
                navigator.vibrate(200); // vibrate for 200ms
              }}
              onDragOver$={(e) => {
                const sourceDay = e.dataTransfer.getData(
                  "text/plain"
                ) as DayNumber;
                if (sourceDay === `d${day}`) return;
              }}
              onDrop$={(e) => {
                weekPlanResource.value.then(async (weekPlan) => {
                  if (!weekPlan) return;
                  const sourceDay = e.dataTransfer.getData(
                    "text/plain"
                  ) as DayNumber;
                  const newWeekPlan = swapMeals(
                    weekPlan,
                    sourceDay,
                    `d${day}`,
                    daytime
                  );
                  await selectMeal(groupId, props.weekId, newWeekPlan);
                  rerender.value = new Date().toISOString();
                });
              }}
            >
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
                    {getDayName(day).slice(0, 2)}
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
                    const sideDishes = meal?.sideDishes || [];
                    if (!meal) {
                      return (
                        <Link
                          href={`/week/${props.weekId}/${daytime}/${day}`}
                          class="btn btn-ghost"
                          aria-label={`Elegir ${getDayName(day)}`}
                        >
                          Elegir
                        </Link>
                      );
                    }
                    return (
                      <Link
                        href={`/week/${props.weekId}/${daytime}/${day}/${meal.id}`}
                      >
                        {meal.name}
                        {sideDishes.map((sideDish) => (
                          <span key={sideDish.id}> con {sideDish.name}</span>
                        ))}
                      </Link>
                    );
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {/* {dragging.day !== undefined && (
        <div
          class="absolute"
          style={{ left: `${dragging.x}px`, top: `${dragging.y}px` }}
        >
          jeduuu
        </div>
      )} */}
    </>
  );
});
