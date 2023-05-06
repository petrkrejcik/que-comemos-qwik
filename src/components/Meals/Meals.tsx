import type { PropFunction } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import type { Meal } from "~/lib/weekPlan/weekPlanTypes";

export type Props = {
  meals: Meal[];
  isSaving: boolean;
  onSelect$: PropFunction<(mealId: string) => void>;
};

export default component$<Props>((props) => {
  const selected = useSignal("");

  return (
    <div class="flex flex-col justify-between h-full">
      <ul class="divide-y divide-current">
        {props.meals.map((meal) => (
          <li
            onClick$={() => {
              selected.value = meal.id;
            }}
            class={`max-w-sm mx-auto flex items-center py-2 ${selected.value === meal.id ? "bg-current" : ""}`}
            key={meal.id}
            role="option"
            aria-selected={selected.value === meal.id}
          >
            <div class={`w-full flex items-center h-12 ${selected.value === meal.id ? "text-primary-content" : ""}`}>
              {meal.name}
            </div>
          </li>
        ))}
      </ul>
      <button
        class={`btn btn-primary ${props.isSaving ? "loading" : ""}`}
        disabled={!selected.value}
        onClick$={() => {
          console.log("🛎 ", "click");
          return props.onSelect$(selected.value);
        }}
      >
        Guardar
      </button>
    </div>
  );
});