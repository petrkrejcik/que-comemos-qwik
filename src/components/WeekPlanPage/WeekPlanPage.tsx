import { component$ } from "@builder.io/qwik";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/Header/Header";
import WeekPlan from "~/components/WeekPlan/WeekPlan";
import WeekSelect from "~/components/WeekSelect/WeekSelect";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  return (
    <Layout>
      <Header q:slot="header">
        <WeekSelect weekId={props.weekId} q:slot="center" />
      </Header>
      <WeekPlan weekId={props.weekId} q:slot="main" />
    </Layout>
  );
});
