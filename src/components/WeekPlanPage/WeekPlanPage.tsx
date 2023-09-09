import { component$ } from "@builder.io/qwik";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/Head/Head";
import WeekPlan from "~/components/WeekPlan/WeekPlan";
import WeekSelect from "~/components/WeekSelect/WeekSelect";
import DaytimeSelect from "~/components/DaytimeSelect/DaytimeSelect";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  return (
    <Layout>
      <Header q:slot="header">
        <WeekSelect weekId={props.weekId} q:slot="center" />
      </Header>
      <DaytimeSelect q:slot="main" />
      <WeekPlan weekId={props.weekId} q:slot="main" />
    </Layout>
  );
});
