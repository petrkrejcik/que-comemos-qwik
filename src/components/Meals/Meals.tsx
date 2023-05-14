import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import type { PlannedMeal } from "~/lib/weekPlan/weekPlanTypes";

export type Props = {
  meals: PlannedMeal[];
  isSaving: boolean;
  onSelect$: PropFunction<(mealId: string) => void>;
};

export default component$<Props>((props) => {
  const selected = useSignal("");

  return (
    <ul class="">
      {props.meals.map((meal) => (
        <li
          onClick$={() => {
            selected.value = meal.id;
          }}
          class={`divide-y divide-current collapse${selected.value === meal.id ? "-open": ""} rounded-md ${
            selected.value === meal.id ? "bg-neutral-content" : ""
          }`}
          key={meal.id}
          role="option"
          aria-selected={selected.value === meal.id}
          tabIndex={0}
        >
          <div
            class={`collapse-title w-full flex items-center h-12 ${
              selected.value === meal.id ? "text-primary-content" : ""
            }`}
          >
            {meal.name}
          </div>
          <div class="collapse-content flex justify-between">
            <button class={`btn btn-outline btn-secondary ${props.isSaving ? "loading" : ""} invisible`} disabled>
              Editar
            </button>
            <button
              class={`btn btn-primary  ${props.isSaving ? "loading" : ""}`}
              onClick$={() => {
                return props.onSelect$(meal.id);
              }}
            >
              Elegir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
});
