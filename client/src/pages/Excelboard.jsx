/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import axios from "axios";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { LiveList } from "@liveblocks/client";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "../config/liveblocks.config.js";

const getUserInfo = () =>
  JSON.parse(localStorage.getItem("UserEmail"));

function ExcalidrawBoard({ initialElements }) {
  const excalidrawRef = useRef(null);
  const isRemoteUpdate = useRef(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();

  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();
  const elements = useStorage((root) => root.elements); // null until loaded

  const updateElements = useMutation(({ storage }, els) => {
    const list = storage.get("elements");
    list.clear();
    els.forEach((el) => list.push(el));
  }, []);

  useEffect(() => {
    if (!excalidrawRef.current || !elements) return;
    isRemoteUpdate.current = true;
    excalidrawRef.current.updateScene({
      elements: elements,
    });
  }, [elements]);

  useEffect(() => {
    if (!excalidrawRef.current) return;
    const collaborators = new Map(
      others.map((user) => [
        user.connectionId.toString(),
        {
          username: user.presence.username || "Anonymous",
          pointer: user.presence.pointer || { x: 0, y: 0 },
          selectedElementIds: {},
        },
      ]),
    );
    excalidrawRef.current.updateScene({ collaborators });
  }, [others]);

  const handleChange = (els) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    // ✅ Only mutate if storage is loaded
    if (!elements) return;
    updateElements(els);
  };

  const handlePointerUpdate = (payload) => {
    if (!payload?.pointer) return;
    const { username } = getUserInfo();
    updateMyPresence({ pointer: payload.pointer, username });
  };

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      const payload = {
        content: JSON.stringify(
          (elements?.toArray() || []).filter((el) => !el.isDeleted),
        ),
      };
      await axios.post(`${backendUrl}/api/docs/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Saved");
    } catch (error) {
      toast.error("Error saving");
    }
  };

  // ✅ Wait for storage to load before rendering Excalidraw
  if (!elements) return <>Connecting ...</>;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Excalidraw
        onChange={handleChange}
        initialData={{ elements }}
        onPointerUpdate={handlePointerUpdate}
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
            <button
              onClick={() => alert("shared")}
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
}

export const Board = () => {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = Cookies.get("token");
  const [initialElements, setInitialElements] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = getUserInfo();

  console.log("username", username);

  const fetchDocDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/docs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let docs = response.data.doc.content;
      docs = docs.length > 0 ? JSON.parse(docs) : [];
      setInitialElements(docs);
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

  return (
    <RoomProvider
      id={`board-${id}`}
      initialPresence={{ pointer: null, username }}
      initialStorage={{ elements: new LiveList(initialElements || []) }}
    >
      <ExcalidrawBoard initialElements={initialElements} />
    </RoomProvider>
  );
};
