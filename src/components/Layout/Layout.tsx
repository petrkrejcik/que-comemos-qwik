import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <Slot name="header" />
      <main>
        <Slot name="main" />
      </main>
    </>
  );
});
