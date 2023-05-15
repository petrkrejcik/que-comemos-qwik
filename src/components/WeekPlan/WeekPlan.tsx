import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import { getMonday } from "~/lib/date/date";
import { useServerWeekPlan } from "~/routes/layout";

type Props = {
  weekId: string;
};

const dayNamesES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

export default component$((props: Props) => {
  const weekPlan = useServerWeekPlan().value;
  const location = useLocation();
  const loading = location.isNavigating;

  const days = Array.from({ length: 7 }, (_, i) => weekPlan[`d${i as 0 | 1 | 2 | 3 | 4 | 5 | 6}`]);

  const isToday = (day: number) => {
    const monday = getMonday(props.weekId);
    const dayOfWeek = dayjs().add(day, "day");
    return monday.isSame(dayOfWeek, "day");
  };

  return (
    <ul class="divide-y divide-current">
      {days.map((day, i) => {
        return (
          <div class="flex items-center py-2" key={`${props.weekId}-${i}`}>
            <div class="avatar placeholder mr-10">
              <div class={`bg-neutral rounded-full w-12 h-12 ${isToday(i) ? "border-2 border-lime-500" : ""} `}>
                <span class="capitalize text-primary-content">{dayNamesES[i]}</span>
              </div>
            </div>
            <div class="w-full flex items-center h-12">
              {loading ? (
                <div class="w-44 h-6 bg-base-200 rounded animate-pulse" />
              ) : day?.lunch ? (
                <Link href={`/week/${props.weekId}/lunch/${i}`}>{day.lunch.name}</Link>
              ) : (
                <Link href={`/week/${props.weekId}/lunch/${i}`} class="btn btn-ghost">
                  Elegir
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </ul>
  );
});
