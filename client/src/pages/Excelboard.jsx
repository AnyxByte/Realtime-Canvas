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
  const excalidrawRef = useRef(null);
  const isOtherUserUpdate = useRef(false);
  const collaboratorsRef = useRef(new Map());
  const lastSentSceneUpdate = useRef(0);

  const username = JSON.parse(localStorage.getItem("UserEmail")).username;
  const userId = JSON.parse(localStorage.getItem("UserEmail")).id;

  useEffect(() => {
    const socket = io(backendUrl, {
      auth: { roomId: id, username },
    });
    webSocketRef.current = socket;

    socket.on("scene-update", (data) => {
      if (!Array.isArray(data)) return;
      if (!excalidrawRef.current) return;
      isOtherUserUpdate.current = true;
      excalidrawRef.current.updateScene({ elements: data });
    });

    socket.on("cursor-position", (data) => {
      if (!data || !excalidrawRef.current) return;
      const { username, pointer, userId } = data;
      collaboratorsRef.current.set(userId, {
        pointer,
        username,
        selectedElementIds: {},
      });
      excalidrawRef.current.updateScene({
        collaborators: new Map(collaboratorsRef.current),
      });
    });

    return () => {
      socket.disconnect();
      webSocketRef.current = null;
    };
  }, []);

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

    if (isOtherUserUpdate.current) {
      isOtherUserUpdate.current = false;
      return;
    }

    const now = Date.now();
    if (now - lastSentSceneUpdate.current > 30) {
      lastSentSceneUpdate.current = now;
      webSocketRef.current?.emit("scene-update", elements);
    }
  };

  const handlePointerUpdate = (payload) => {
    if (!payload?.pointer || payload.pointer.x === undefined) return;
    if (!webSocketRef.current?.connected) return;

    webSocketRef.current.emit("cursor-position", {
      pointer: payload.pointer,
      roomId: id,
      username,
      userId,
    });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const payload = {
        content: JSON.stringify(latestElementRef.current.filter(el => !el.isDeleted)),
      };
      await axios.post(`${backendUrl}/api/docs/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Saved");
    } catch (error) {
      toast.error("Error");
      console.log("error :-", error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw
        onChange={handleChange}
        initialData={{ elements: data }}
        onPointerUpdate={handlePointerUpdate}
        excalidrawAPI={(api) => { excalidrawRef.current = api; }}
        renderTopRightUI={() => (
          <>
            <button
              onClick={handleSave}
              style={{ padding: "8px 16px", background: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
            >
              Save
            </button>
            <button
              onClick={() => alert("shared")}
              style={{ padding: "8px 16px", background: "#2563EB", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
            >
              Share
            </button>
          </>
        )}
      />
    </div>
  );
};