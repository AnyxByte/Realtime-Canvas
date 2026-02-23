/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const Board = () => {
  const [data, setData] = useState(null);
  const latestElementRef = useRef([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  const webSocketRef = useRef(null);

  useEffect(() => {
    const socket = io(backendUrl);
    webSocketRef.current = socket;

    return () => {
      socket.disconnect();
      webSocketRef.current = null;
    };
  }, []);

  const fetchDocDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/docs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let docs = response.data.doc.content;

      docs = docs.length > 0 ? JSON.parse(docs) : [];
      setData(docs);
      setLoading(false);
    } catch (error) {
      console.log("error at fetch Doc Details", error);
    }
  }, [backendUrl, id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDocDetails();
  }, [fetchDocDetails]);

  if (loading) {
    return <>Loading ...</>;
  }

  const handleChange = (elements) => {
    latestElementRef.current = elements;
  };

  const handleSave = async () => {
    try {
      setData((prev) => {
        return prev.filter((ele) => !ele.isDeleted);
      });
      const token = Cookies.get("token");
      latestElementRef.current = JSON.stringify(latestElementRef.current);
      const payload = {
        content: latestElementRef.current,
      };
      await axios.post(`${backendUrl}/api/docs/update/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Saved");
    } catch (error) {
      toast.error("Error");
      console.log("error :-", error);
    }
  };

  const handleShare = () => {
    alert("shared");
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw
        onChange={handleChange}
        initialData={{ elements: data }}
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

            <button
              onClick={handleShare}
              style={{
                padding: "8px 16px",
                background: "#2563EB",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Share
            </button>
          </>
        )}
      />
    </div>
  );
};
