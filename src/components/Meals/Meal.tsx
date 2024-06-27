import { BsThreeDotsVertical } from "@qwikest/icons/bootstrap";
import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { MenuItem } from "~/components/Meals/mealsTypes";

export type Props = {
  meal: {
    id: string;
    name: string;
  };
  href?: string;
  onClick$?: PropFunction<() => void>;
  menu?: MenuItem[];
};

export default component$<Props>((props) => {
  const meal = props.meal;

  const LinkOrButton = props.onClick$ ? "button" : Link;

  return (
    <div tabIndex={0} class="flex items-center w-full">
      <div class="w-full hover:bg-base-300 py-1 rounded-box">
        <LinkOrButton
          class="w-full flex items-center p-2 cursor-pointer"
          {...(props.onClick$ && {
            onClick$: props.onClick$,
          })}
          {...(props.href && {
            href: props.href,
          })}
        >
          <div class="avatar placeholder mr-10">
            <div class={`bg-base-200 rounded-full w-12 h-12`}>
              <span class="capitalize text-primary-content"></span>
            </div>
          </div>
          {meal.name}
        </LinkOrButton>
      </div>
      {props.menu && (
        <div class="dropdown dropdown-end">
          <div tabIndex={0} role="button" class="btn btn-ghost m-1">
            <BsThreeDotsVertical />
          </div>
          <ul
            tabIndex={0}
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            {props.menu.map((item, i) => (
              <li key={i}>
                {item.href && <Link href={item.href}>{item.title}</Link>}
                {item.onClick$ && (
                  <span onClick$={item.onClick$}>{item.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* <div class="collapse-content flex justify-between">
        {meal.withSideDish && (
          <Link
            class={`btn btn-ghost btn-primary`}
            role="button"
            aria-label={`Acompañamiento para ${meal.name}`}
            href={`/week/${location.params.weekId}/lunch-side-dish/${location.params.day}`}
          >
            Acompañamiento
          </Link>
        )}
        <span
          class={`btn btn-outline btn-secondary ${
            props.isSaving ? "loading" : ""
          } invisible`}
        >
          Editar
        </span>
        <span
          class={`btn btn-primary ${props.isSaving ? "loading" : ""}`}
          onClick$={() => {
            return props.onClick$(meal.id);
          }}
          aria-label={`Elegir ${meal.name}`}
          role="button"
        >
          Elegir
        </span>
      </div> */}
    </div>
  );
});
