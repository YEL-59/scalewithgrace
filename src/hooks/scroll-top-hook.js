import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export default useScrollToTop;

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
