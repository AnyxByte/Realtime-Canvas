/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const Board = () => {
  const [data, setData] = useState(null);
  const latestElementRef = useRef([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const excalidrawRef = useRef(null);

  const fetchDocDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/docs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let docs = response.data.doc.content;
      docs = docs.length > 0 ? JSON.parse(docs) : [];
      setData(docs);
      setLoading(false);
    } catch (error) {
      console.log("error at fetch Doc Details", error);
      setLoading(false);
    }
  }, [backendUrl, id]);

  useEffect(() => {
    fetchDocDetails();
  }, [fetchDocDetails]);

  if (loading) return <>Loading ...</>;

  const handleChange = (elements) => {
    latestElementRef.current = elements;
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const payload = {
        content: JSON.stringify(
          latestElementRef.current.filter((el) => !el.isDeleted),
        ),
      };
      await axios.post(`${backendUrl}/api/docs/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Saved");
    } catch (error) {
      toast.error("Error");
      console.log("error", error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw
        onChange={handleChange}
        initialData={{ elements: data }}
        excalidrawAPI={(api) => {
          excalidrawRef.current = api;
        }}
        renderTopRightUI={() => (
          <>
            <button
              onClick={handleSave}
              style={{
                padding: "8px 16px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </>
        )}
      />
    </div>
  );
};
