import React, { useEffect } from "react";
import "./Loader.css";

export default function () {
  window.scrollTo(0, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loader">
      <span>Mi Scusi Books...</span>
      <span>Mi Scusi Books...</span>
    </div>
  );
}
