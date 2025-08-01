import { useEffect } from "react";
import { useLocation } from "react-router";

export function usePageMeta({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    // ✅ Update title
    if (title) document.title = title;

    // ✅ Update or create meta description
    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [location.pathname, title, description]);
}
