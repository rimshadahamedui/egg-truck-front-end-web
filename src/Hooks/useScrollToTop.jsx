import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* This hook ensures that the page scrolls to the top when navigating
 to a new route using React Router's navigate or NavLink. */
export default function useScrollToTop() {
  const pathName = useLocation();

  // This effect runs whenever the path name changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathName]);
}
