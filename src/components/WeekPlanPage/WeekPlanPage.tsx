import { component$ } from "@builder.io/qwik";
import Header from "~/components/Header/Header";
import Layout from "~/components/Layout/Layout";
import WeekPlan from "~/components/WeekPlan/WeekPlan";
import WeekSelect from "~/components/WeekSelect/WeekSelect";

type WeekPlanPageProps = {
  weekId: string;
};

export default component$((props: WeekPlanPageProps) => {
  return (
    <Layout>
      <Header q:slot="header">
        <WeekSelect q:slot="center" />
      </Header>
      <WeekPlan weekId={props.weekId} q:slot="main" />
    </Layout>
  );
});
