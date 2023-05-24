import Header from "~/components/Head/Head";
import { component$ } from "@builder.io/qwik";
import Layout from "~/components/Layout/Layout";
import MealForm from "~/components/MealForm/MealForm";
import addMeal from "~/lib/queries/addMeal";
import { HiArrowLeftOutline } from "@qwikest/icons/heroicons";
import { useUser } from "~/lib/user/user";

export interface userData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
}

export default component$(() => {
  const { groupId } = useUser();

  return (
    <Layout>
      <Header q:slot="header">
        <span
          onClick$={() => history.back()}
          class="btn btn-ghost btn-sm rounded-btn text-2xl"
          q:slot="start"
        >
          <HiArrowLeftOutline />
        </span>
      </Header>
      <MealForm
        q:slot="main"
        onSave$={async (newMeal) => {
          await addMeal(groupId, newMeal);
          history.back();
        }}
      />
    </Layout>
  );
});
