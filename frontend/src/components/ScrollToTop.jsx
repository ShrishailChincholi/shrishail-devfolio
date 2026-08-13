import { useEffect } from "react";
import '../styles/ScrollToTop.css';

function ScrollToTop() {
  useEffect(() => {
    window.history.scrollRestoration =
      "manual";

    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;