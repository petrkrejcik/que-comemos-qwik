import { Resource, component$, useResource$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/Head/Head";
import getMeals from "~/lib/queries/getMeals";
import type { PlannedMeal, WeekPlan } from "~/lib/weekPlan/weekPlanTypes";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";
import getWeekPlan from "~/lib/queries/getWeekPlan";
import { day2DayId, getDayName } from "~/lib/date/date";
import DayMeal from "~/components/DayMeal/DayMeal";
import selectMeal from "~/lib/queries/selectMeal";

export default component$(() => {
  const { groupId } = useUser();
  const nav = useNavigate();
  const { weekId, day, meal: eatForParam, mealId } = useLocation().params;
  // const meal = useDaytime() // todo: use better this
  const resources = useResource$(async () => {
    const dayId = day2DayId(day);
    const eatFor =
      eatForParam === "lunch-side-dish" ? "side-dish" : eatForParam;
    const meals = await getMeals(groupId, eatFor);
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) {
      throw new Error("Meal not found");
    }
    const weekPlan = await getWeekPlan(weekId, groupId);
    const dayPlan = weekPlan[dayId];
    let plannedMeal = dayPlan?.[eatFor as keyof typeof dayPlan];
    if (!plannedMeal) {
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
      // delete newWeekPlan[dayId]?.[`${meal as "lunch"}-side-dish`]; // `meal` should be properly typed
      try {
        await selectMeal(groupId, weekId, newWeekPlan);
        nav(`/week/${weekId}/${eatFor}`);
      } catch (error) {
        console.error(error);
      }
    });
    return { meal, plannedMeal, onSave };
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
          onResolved={({ meal, plannedMeal, onSave }) => {
            return (
              <DayMeal meal={meal} plannedMeal={plannedMeal} onSave$={onSave} />
            );
          }}
        />
      </div>
    </Layout>
  );
});
