import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex items-center gap-2">
		<button class="btn btn-circle btn-ghost text-xl">❮</button>
		<div class="text-lg grow">
			Esta semana
		</div>
		<button class="btn  btn-circle btn-ghost text-xl">❯</button>
	</div>
  );
});
