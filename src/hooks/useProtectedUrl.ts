import usePathname from "~/hooks/usePathname";

const UNPROTECTED_PATHNAMES = ["login"];

export default function useProtectedUrl() {
  const [pathname] = usePathname();

  return !UNPROTECTED_PATHNAMES.includes(pathname);
}
