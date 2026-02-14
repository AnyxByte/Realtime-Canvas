import React from "react";
import SearchInput from "./SearchInput";
import { LayoutGrid, MoreHorizontal, Plus } from "lucide-react";

export const MainDashboard = () => {
  return (
    <div className="mt-8 flex flex-col gap-4 px-4">
      <div>
        <SearchInput />
      </div>

      <div className="mt-4">
        <span className="text-5xl font-semibold">Team boards</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
        {/* 1. NEW BOARD BUTTON */}
        <button className="flex flex-col items-center justify-center gap-4 bg-blue-600 rounded-4xl p-8 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98] min-h-85 w-full">
          <div className="w-14 h-14 flex items-center justify-center text-white border-2 border-white/30 rounded-full group-hover:border-white">
            <Plus size={36} strokeWidth={1.5} />
          </div>
          <span className="text-white font-bold text-xl">New board</span>
        </button>

        {/* 2. BRAINSTORMING BOARD */}
        <div className="group flex flex-col bg-white border border-slate-200 rounded-4xl overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer min-h-85 w-full">
          {/* Preview Area - Takes up remaining space */}
          <div className="relative flex-1 bg-slate-50 border-b border-slate-100 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

            {/* Overlay Actions */}
            <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl shadow-sm transition-all">
                <MoreHorizontal size={20} className="text-slate-600" />
              </button>
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Text Info */}
          <div className="p-6 bg-white">
            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 text-lg transition-colors truncate">
              Q1 Brainstorming
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Updated 2h ago
              </p>
            </div>
          </div>
        </div>

        {/* 3. PROJECT PHOENIX */}
        <div className="group flex flex-col bg-white border border-slate-200 rounded-4xl overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer min-h-85 w-full">
          <div className="relative flex-1 bg-indigo-50/30 border-b border-slate-100">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <LayoutGrid size={80} />
            </div>
          </div>
          <div className="p-6 bg-white">
            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 text-lg transition-colors truncate">
              Project Phoenix
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                Updated yesterday
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
