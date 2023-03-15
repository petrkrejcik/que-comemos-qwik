import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <header class="navbar bg-base-200">
      <div class="navbar-start" />
      <div class="navbar-center">
        <Slot name="center" />
      </div>
      <div class="navbar-end" />
    </header>
  );
});
