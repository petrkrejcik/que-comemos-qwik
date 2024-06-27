import { BsThreeDotsVertical } from "@qwikest/icons/bootstrap";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { MenuItem } from "~/components/Meals/mealsTypes";

export type Props = {
  items?: MenuItem[];
};

export default component$<Props>((props) => {
  if (!props.items?.length) {
    return null;
  }

  return (
    <div class="dropdown dropdown-end">
      <div tabIndex={0} role="button" class="btn btn-ghost m-1">
        <BsThreeDotsVertical />
      </div>
      <ul
        tabIndex={0}
        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {props.items.map((item, i) => (
          <li key={i}>
            {item.href && <Link href={item.href}>{item.title}</Link>}
            {item.onClick$ && (
              <span onClick$={item.onClick$}>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
