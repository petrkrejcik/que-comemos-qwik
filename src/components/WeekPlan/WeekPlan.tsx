import { component$ } from "@builder.io/qwik";

type WeekPlanProps= {
	weekId: number;
}

export default component$((props: WeekPlanProps) => {
  const week = 1;
	console.log('🛎 ', 'props', props);

  return (
    <div class="w-full">
      <div class="tabs max-w-sm mb-4 mx-auto">
        <a
          class="text-inherit	text-base tab tab-bordered flex-grow uppercase h-10 {time === 'lunch' &&
					'tab-active'}"
          href={`/week/${week}/lunch`}
        >
          Comida
        </a>
        <a
          class="text-inherit text-base tab tab-bordered flex-grow uppercase h-10 {time ===
					'dinner' && 'tab-active'}"
          href={`/week/${week}/dinner`}
        >
          Cena
        </a>
      </div>
      <ul class="divide-y divide-zinc-800"></ul>
    </div>
  );
});

{
  /* <style>
	.hamburgerIcon {
		mask-image: url(/icons/hamburgerMenu.svg);
		mask-repeat: no-repeat;
		mask-position: center;
	}
</style> */
}
