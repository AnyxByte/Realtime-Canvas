import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { LayoutGrid, MoreHorizontal, Plus } from "lucide-react";
import { CreateDoc } from "./CreateDoc";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const MainDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 flex flex-col gap-4 px-6 md:px-10 pb-20">
      {/* Top Search Bar */}
      <SearchInput />

      {/* Header Section */}
      <div className="mt-6 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Team boards
        </h1>
      </div>

      {/* Grid: Responsive Columns & Matching Heights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
        {/* 1. NEW BOARD BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="group flex flex-col items-center justify-center gap-4 bg-blue-600 rounded-[2.5rem] p-8 transition-all hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98] min-h-85 w-full cursor-pointer border-none outline-none focus:ring-4 focus:ring-blue-100"
        >
          <div className="w-14 h-14 flex items-center justify-center text-white border-2 border-white/30 rounded-full group-hover:scale-110 transition-transform">
            <Plus size={36} strokeWidth={2} />
          </div>
          <span className="text-white font-bold text-xl">New board</span>
        </button>

        {/* 2. DYNAMIC BOARD CARD */}
        <div
          className="group flex flex-col bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer min-h-85 w-full relative"
          onClick={() => console.log("Navigating to board...")}
        >
          {/* Card Preview Area */}
          <div className="relative flex-1 bg-slate-50 border-b border-slate-100 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

            {/* 3-DOT DROPDOWN MENU */}
            <div className="absolute top-5 right-5 z-30">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    className="
                      p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-xl shadow-sm border border-slate-200/50
                      transition-all duration-50 outline-none
                      /* Only visible on hover OR when menu is open */
                      opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 
                      hover:scale-105 active:scale-95
                    "
                    onClick={(e) => e.stopPropagation()} // Stop parent card click
                  >
                    <MoreHorizontal size={20} className="text-slate-600" />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    className="z-9999 min-w-40 bg-white rounded-2xl shadow-2xl border border-slate-100 p-1.5 animate-in fade-in zoom-in-95 duration-100"
                    onClick={(e) => e.stopPropagation()} // Prevents board from opening when clicking menu
                  >
                    <DropdownMenu.Item
                      onSelect={() => console.log("Edit Board")}
                      className="flex items-center px-3 py-2.5 text-sm font-semibold text-slate-700 rounded-xl cursor-pointer outline-none hover:bg-slate-50 focus:bg-slate-50 transition-colors"
                    >
                      Edit board
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />

                    <DropdownMenu.Item
                      onSelect={() => console.log("Delete Board")}
                      className="flex items-center px-3 py-2.5 text-sm font-semibold text-red-600 rounded-xl cursor-pointer outline-none hover:bg-red-50 focus:bg-red-50 transition-colors"
                    >
                      Delete board
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Card Footer (Text Info) */}
          <div className="p-6 bg-white">
            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 text-lg transition-colors truncate">
              Q1 Brainstorming
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                Updated 2h ago
              </p>
            </div>
          </div>
        </div>

        {/* 3. SECOND BOARD (Project Phoenix) */}
        <div className="group flex flex-col bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer min-h-85 w-full">
          <div className="relative flex-1 bg-indigo-50/30 border-b border-slate-100 flex items-center justify-center">
            <LayoutGrid
              size={60}
              className="text-indigo-200 opacity-50 group-hover:scale-110 transition-transform"
            />
          </div>

          <div className="p-6 bg-white">
            <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 text-lg transition-colors truncate">
              Project Phoenix
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                Updated yesterday
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE DOC MODAL */}
      <CreateDoc open={open} setOpen={setOpen} />
    </div>
  );
};
