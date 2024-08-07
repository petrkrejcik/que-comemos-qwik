import { Resource, component$, useResource$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/Head/Head";
import type { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { day2DayId, getDayName } from "~/lib/date/date";
import DayMeal from "~/components/DayMeal/DayMeal";
import selectMeal from "~/lib/queries/selectMeal";
import useDaytime from "~/hooks/useDaytime";
import getMeal from "~/lib/queries/getMeal";

export default component$(() => {
  const { groupId } = useUser();
  const nav = useNavigate();
  const { weekId, day, mealId } = useLocation().params;
  const eatFor = useDaytime();
  const resources = useResource$(async () => {
    const dayId = day2DayId(day);
    const weekPlan = await getWeekPlan(weekId, groupId);
    const dayPlan = weekPlan[dayId];
    let plannedMeal = dayPlan?.[eatFor];
    if (!plannedMeal || plannedMeal.id !== mealId) {
      const meal = await getMeal(groupId, mealId);
      if (!meal) {
        throw new Error("Meal not found");
      }
      plannedMeal = {
        id: meal.id,
        name: meal.name,
      };
    }

    const onSave = $(async (plannedMeal: PlannedMeal | undefined) => {
      const newWeekPlan: WeekPlan = {
        ...weekPlan,
        [dayId]: {
          ...(weekPlan[dayId] || {}),
          [eatFor]: plannedMeal,
        },
      };
      try {
        await selectMeal(groupId, weekId, newWeekPlan);
        nav(`/week/${weekId}/${eatFor}`);
      } catch (error) {
        console.error(error);
      }
    });
    return { plannedMeal, onSave };
  });

  return (
    <Layout>
      <Header q:slot="header">
        <span
          onClick$={() => history.back()}
          class="btn btn-ghost btn-sm rounded-btn text-2xl"
          q:slot="start"
          aria-role="button"
          aria-label="Back"
        >
          <HiArrowLeftOutline />
        </span>
        <span class="text-lg" q:slot="center">
          {getDayName(parseInt(day, 10))}
        </span>
      </Header>
      <div q:slot="main" class="py-2">
        <Resource
          value={resources}
          onPending={() => <>loading</>}
          onRejected={(e) => {
            console.error(e);
            return <p>Rejected</p>;
          }}
          onResolved={({ plannedMeal, onSave }) => {
            return <DayMeal plannedMeal={plannedMeal} onSave$={onSave} />;
          }}
        />
      </div>
    </Layout>
  );
});
