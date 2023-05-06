import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <Slot name="header" />
      <main style={{height: 'calc(100vh - 64px)'}}>
        <Slot name="main" />
      </main>
    </>
  );
});
