import React from "react";
import { Logo } from "./Logo";
import UserProfile from "./UserProfile";
import { LayoutGrid } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="w-72 flex flex-col h-screen bg-slate-50 border-r border-slate-200 shadow-sm">
      {/* Logo Area */}
      <div className="mt-8 px-8">
        <Logo />
      </div>

      {/* User Profile Area */}
      <div className="mt-8 px-4">
        <UserProfile />
      </div>

      {/* Navigation Area */}
      <div className="mt-10 px-4 space-y-1">
        {/* Nav Item: Team Board */}
        <div className="flex gap-3 items-center px-4 py-3 bg-white rounded-xl shadow-sm border border-slate-200/50 cursor-pointer group transition-all">
          <LayoutGrid
            size={20}
            className="text-slate-500 group-hover:text-indigo-600 transition-colors"
          />
          <span className="text-slate-700 font-bold text-sm tracking-tight">
            Team boards
          </span>
        </div>

        {/* Example of an inactive item for contrast */}
        <div className="flex gap-3 items-center px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl cursor-pointer transition-all group">
          <div className="w-5 h-5 rounded bg-slate-200 group-hover:bg-indigo-100 transition-colors" />
          <span className="font-semibold text-sm">Drafts</span>
        </div>
      </div>

    </div>
  );
};
