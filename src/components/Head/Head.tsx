import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header class="navbar bg-accent sticky top-0 z-10">
      <div class="navbar-start">
        <Slot name="start" />
      </div>
      <div class="navbar-center">
        <Slot name="center" />
      </div>
      <div class="navbar-end">
        <Slot name="end" />
      </div>
    </header>
  );
});
