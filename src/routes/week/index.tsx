import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <>
  <div>week</div>
  <a href="/week/1">Week 1</a>
  </>
});

export const head: DocumentHead = {
  title: "Week",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
