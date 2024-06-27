import { component$ } from "@builder.io/qwik";

export const Loading = component$(() => {
  return (
    <div
      class="w-44 h-6 bg-base-200 rounded animate-pulse"
      role="progressbar"
    />
  );
});
