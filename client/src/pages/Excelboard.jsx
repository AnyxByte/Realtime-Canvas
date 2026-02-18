import React, { useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

export const Board = () => {
  const initialSavedData = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    initialSavedData.current = localStorage.getItem("board");
    initialSavedData.current = JSON.parse(initialSavedData.current);

    if (initialSavedData.current.length > 0) {
      const elements = initialSavedData.current.filter((ele) => !ele.isDeleted);
      if (elements) {
        localStorage.setItem("board", JSON.stringify(elements));
      }

      setData(elements);
    }
  }, []);

  const handleChange = (elements) => {
    console.log("elements: ", elements);

    localStorage.setItem("board", JSON.stringify(elements));
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw onChange={handleChange} initialData={{ elements: data }} />
    </div>
  );
};
