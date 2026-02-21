import React, { useState } from "react";
import SearchInput from "./SearchInput";
import {
  LayoutGrid,
  MoreHorizontal,
  Plus,
  FileText,
  Clock,
  User2,
} from "lucide-react";
import { CreateDoc } from "./CreateDoc";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDoc } from "../context/DocContext";
import axios from "axios";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);

  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr ago`;
  if (diffDay < 7) return `${diffDay} day ago`;

  return past.toLocaleDateString();
}

function giveCollaborators(collaborators) {
  const userLists = collaborators?.map((u) => u.username) || [];

  const usernameList = userLists.length > 0 ? userLists.join(", ") : "You";
  return usernameList;
}

export const MainDashboard = () => {
  const [open, setOpen] = useState(false);
  const { docs, setDocs } = useDoc();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleDeleteDocs = async (id) => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      await axios.delete(`${backendUrl}/api/docs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDocs((prevDoc) => prevDoc.filter((doc) => doc._id !== id));

      toast.success("Deleted successfull");
    } catch (error) {
      toast.error("Error");
      console.log("handleDeleteDocs error", error);
    }
  };

  return (
    <div className="mt-8 mx-auto flex flex-col gap-4 px-6 md:px-10 pb-20 max-w-7xl w-screen">
      <SearchInput />

      <div className="mt-8 mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Team boards
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          <span>New board</span>
        </button>
      </div>

      {/* List Header - Labels for the columns */}
      <div className="grid grid-cols-[1fr_200px_150px_50px] px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
        <span>Name</span>
        <span>Last Updated</span>
        <span className="hidden md:block">Collaborators</span>
        <span className="text-right"></span>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {docs.length > 0 &&
          docs.map((doc) => (
            <div
              key={doc._id}
              onClick={() => console.log("Open board")}
              className="group grid grid-cols-[1fr_200px_150px_50px] items-center px-6 py-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
                  {doc.name}
                </span>
              </div>

              {/* Column 2: Date */}
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <Clock size={14} className="text-slate-400" />
                <span>{timeAgo(doc.updatedAt)}</span>
              </div>

              {/* Column 3: Owner (Hidden on small screens) */}
              <div className="hidden md:flex items-center gap-2 text-slate-500 text-sm font-medium">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                  <User2 size={12} />
                </div>
                <span>{giveCollaborators(doc.collaborators)}</span>
              </div>

              {/* Column 4: Menu */}
              <div className="text-right">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-slate-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                    >
                      <MoreHorizontal size={18} className="text-slate-400" />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      side="bottom"
                      align="end"
                      sideOffset={4}
                      className="z-9999 min-w-35 bg-white rounded-xl shadow-xl border border-slate-100 p-1 animate-in fade-in zoom-in-95 duration-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm font-semibold text-slate-700 rounded-lg cursor-pointer outline-none hover:bg-slate-50 transition-colors">
                        Edit name
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        role="button"
                        onClick={() => handleDeleteDocs(doc._id)}
                        className="flex items-center px-3 py-2 text-sm font-semibold text-red-600 rounded-lg cursor-pointer outline-none hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>
          ))}

        {docs.length === 0 && (
          <div className="text-center text-gray-500">
            No docs avialable , create one
          </div>
        )}
      </div>

      <CreateDoc open={open} setOpen={setOpen} />
    </div>
  );
};
