import { $, useSignal } from "@builder.io/qwik";
import type { Meal } from "~/types";

export default function useMealsFilter(initialValues: Meal["eatFor"] = []) {
  const filter = useSignal(initialValues);

  const toggle = $((value: Meal["eatFor"][number]) => {
    filter.value.includes(value)
      ? (filter.value = filter.value.filter((e) => e !== value))
      : (filter.value = [...filter.value, value]);
  });

  return { toggle, values: filter.value };
}
