import { useLocation } from "@builder.io/qwik-city";

export default function usePathname() {
  const location = useLocation();
  const pathname = location.url.pathname.split("/").filter(Boolean);

  return pathname;
}
