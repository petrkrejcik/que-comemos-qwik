import { useLocation } from "@builder.io/qwik-city";

export default () => {
  const location = useLocation()
  const pathname = location.url.pathname.split('/').filter(Boolean)
 
  return pathname
}