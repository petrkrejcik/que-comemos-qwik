import { component$, Slot } from "@builder.io/qwik";

type Props = {
  mainClass?: string;
};

export default component$((props: Props) => {
  return (
    <>
      <Slot name="header" />
      <main
        class={`max-w-xl mx-auto px-4 pt-2 ${props.mainClass || ""}`}
        style={{ height: "calc(100vh - 64px)" }}
      >
        <Slot name="main" />
      </main>
    </>
  );
});
