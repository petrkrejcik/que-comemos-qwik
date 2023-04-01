import usePathname from "~/hooks/usePathname";

const UNPROTECTED_PATHNAMES = ['login']

export default () => {
  const [pathname] = usePathname()
 
  return !UNPROTECTED_PATHNAMES.includes(pathname)
}