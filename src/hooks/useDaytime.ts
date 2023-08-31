import { useLocation } from "@builder.io/qwik-city";

export default function useDaytime() {
  const { meal } = useLocation().params;

  return meal || "lunch";
}
