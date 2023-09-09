import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { Meal } from "~/types";

export type Props = {
  meals: Meal[];
  isSaving?: boolean;
  onSelect$: PropFunction<(mealId: string) => void>;
};

export default component$<Props>((props) => {
  const location = useLocation();
  return (
    <ul class="flex flex-col divide-base-content">
      {props.meals.map((meal, i) => (
        <li
          class="collapse hover:bg-base-300 py-2"
          key={meal.id}
          tabIndex={0}
          data-testid={`meal-${i}`}
        >
          <input type="radio" name="meals" class="appearance-none opacity-0" />
          <div class="collapse-title w-full flex items-center h-12">
            <div class="avatar placeholder mr-10">
              <div class={`bg-base-200 rounded-full w-12 h-12`}>
                <span class="capitalize text-primary-content"></span>
              </div>
            </div>
            {meal.name}
          </div>
          <div class="collapse-content flex justify-between">
            {meal.withSideDish && (
              <Link
                class={`btn btn-ghost btn-primary`}
                role="button"
                aria-label={`Acampañamiento para ${meal.name}`}
                href={`/week/${location.params.weekId}/lunch-side-dish/${location.params.day}`}
              >
                Acampañamiento
              </Link>
            )}
            <span
              class={`btn btn-outline btn-secondary ${
                props.isSaving ? "loading" : ""
              } invisible`}
            >
              Editar
            </span>
            <span
              class={`btn btn-primary ${props.isSaving ? "loading" : ""}`}
              onClick$={() => {
                return props.onSelect$(meal.id);
              }}
              aria-label={`Elegir ${meal.name}`}
              role="button"
            >
              Elegir
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
});
