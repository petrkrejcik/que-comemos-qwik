import { component$, Slot } from "@builder.io/qwik";
// import Protected from "~/components/Protected";
// import "~/lib/firebase/getFirebase";
// import dayjs from "dayjs";
// import 'dayjs/locale/es.js';

// dayjs.locale('es');

export default component$(() => {
  return (
    // <Protected>
      <Slot />
    // </Protected>
  );
});
