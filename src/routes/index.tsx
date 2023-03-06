import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import WeekPlan from "~/components/WeekPlan/WeekPlan";
// import { loader$ } from '@builder.io/qwik-city';

// export const getProductData = loader$(() => {
//   return {
//     product: {
//       name: 'Qwik City',
//       price: 100,
//     },
//   };
// });

export default component$(() => {
  const weekId = 1;
  return (
    <>
      <div>Homepage</div>
      <a href="/week">Week</a>
      <WeekPlan weekId={weekId}/>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
