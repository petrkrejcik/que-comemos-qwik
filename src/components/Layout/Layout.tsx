import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <Slot name="header" />
      <main
        class="max-w-xl mx-auto px-4"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Slot name="main" />
      </main>
    </>
  );
});
