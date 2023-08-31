import { useLocation } from "@builder.io/qwik-city";

export default function useDaytime(): "lunch" | "dinner" {
  const { meal } = useLocation().params;
  if (["lunch", "dinner"].includes(meal)) return meal as "lunch" | "dinner";

  return "lunch";
}
