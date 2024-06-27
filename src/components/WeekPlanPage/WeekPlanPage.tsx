import { component$ } from "@builder.io/qwik";
import Layout from "~/components/Layout/Layout";
import Header from "~/components/Head/Head";
import WeekPlan from "~/components/WeekPlan/WeekPlan";
import WeekSelect from "~/components/WeekSelect/WeekSelect";
import DaytimeSelect from "~/components/DaytimeSelect/DaytimeSelect";
import Menu from "~/components/Menu/Menu";

type Props = {
  weekId: string;
};

export default component$((props: Props) => {
  return (
    <Layout>
      <Header q:slot="header">
        <WeekSelect weekId={props.weekId} q:slot="center" />
        <Menu
          q:slot="end"
          items={[
            {
              title: "Lista de comidas",
              href: "/meals",
            },
          ]}
        />
      </Header>
      <DaytimeSelect q:slot="main" />
      <WeekPlan weekId={props.weekId} q:slot="main" />
    </Layout>
  );
});
