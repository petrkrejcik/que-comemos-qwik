import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header class="navbar bg-base-200 sticky top-0">
      <div class="navbar-start">
        <Slot name="start" />
      </div>
      <div class="navbar-center">
        <Slot name="center" />
      </div>
      <div class="navbar-end" />
    </header>
  );
});
