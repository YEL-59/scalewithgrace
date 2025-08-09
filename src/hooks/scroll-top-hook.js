import { useEffect } from "react";

import { useLenis } from "lenis/react"; // ✅ Use Lenis hook
import { useLocation } from "react-router";

const useScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true }); // ✅ Scroll instantly
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, lenis]);
};

export default useScrollToTop;

// import { useEffect } from "react";
// import { useLocation } from "react-router";

// const useScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);

//   return null;
// };

// export default useScrollToTop;

// src/hooks/useScrollToTop.js
// import { useEffect } from "react";
// import { useLocation } from "react-router";

// const useScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);
// };

// export default useScrollToTop;
