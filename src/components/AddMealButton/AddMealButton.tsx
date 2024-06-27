import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { HiPlusOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  return (
    <div class={"w-full flex collapse-title"} q:slot="main">
      <div class="avatar placeholder mr-4">
        <div class={`rounded-full w-12 h-12`}>
          <HiPlusOutline />
        </div>
      </div>
      <Link href="/add" class="btn btn-ghost">
        Añadir comida nueva
      </Link>
    </div>
  );
});
