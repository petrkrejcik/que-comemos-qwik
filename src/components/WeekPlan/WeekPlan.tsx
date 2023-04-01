import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useWeekPlan } from "~/lib/weekPlan/useWeekPlan";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  // useVisibleTask$(({ track }) => {
  //   track(() => props.weekId);
  //   console.log('🛎 ', 'zmena');
  // });
  // const { loading, weekPlans } = useWeekPlan("mojeI6fi9GdeWywMEn9Yr", props.weekId);
  // const weekPlan = weekPlans[props.weekId] || {};

  // const days = Array.from({ length: 7 }, (_, i) => weekPlan[`d${i as 0 | 1 | 2 | 3 | 4 | 5 | 6}`]);
  const loading = false
  console.log('🛎 ', 'componenta');
  const days: Record<string, Record<string, string>>[] = []

  return (
    <>
      <ul class="divide-y divide-current">
        {days.map((day, i) => (
          <div class="max-w-sm mx-auto flex items-center py-2" key={i}>
            <div class="avatar placeholder mr-10">
              <div class={`bg-neutral rounded-full w-12 h-12 ${false && "border-2 border-lime-500"} `}>
                <span class="capitalize text-primary-content">{i}</span>
              </div>
            </div>
            <div class="w-full flex items-center h-12">
              {loading ? (
                <div class="w-44 h-6 bg-base-200 dark:bg-base-100 rounded animate-pulse" />
              ) : day?.lunch ? (
                <a class="link link-hover " href={`/`}>
                  {day.lunch.name}
                </a>
              ) : (
                "nemam"
              )}
            </div>
          </div>
        ))}
      </ul>
    </>
  );
});
