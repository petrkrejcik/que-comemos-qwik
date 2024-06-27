import type { PropFunction } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import type { Meal as MealType } from "~/types";
import type { MenuItem } from "~/components/Meals/mealsTypes";
import Meal from "~/components/Meals/Meal";

export type Props = {
  meals: MealType[];
  isSaving?: boolean;
  createHref$?: (meal: MealType) => string;
  onClick$?: PropFunction<(meal: MealType) => void>;
  menu?: MenuItem[];
};

export default component$<Props>((props) => {
  const { onClick$ } = props;
  const onClick = onClick$ && ((meal: MealType) => $(() => onClick$?.(meal)));

  return (
    <ul class="flex flex-col divide-base-content">
      {props.meals.map(async (meal, i) => {
        const href = await props.createHref$?.(meal);
        return (
          <li key={meal.id} data-testid={`meal-${i}`} class="flex items-center">
            <Meal
              meal={meal}
              onClick$={onClick?.(meal)}
              href={href}
              menu={props.menu}
            />
          </li>
        );
      })}
    </ul>
  );
});
