import { useEffect } from "react";

export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const meta =
        document.querySelector('meta[name="description"]') ||
        (() => {
          const m = document.createElement("meta");
          m.name = "description";
          document.head.appendChild(m);
          return m;
        })();
      meta.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}
