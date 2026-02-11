import React from "react";
import { Logo } from "./Logo";
import UserProfile from "./UserProfile";
import { LayoutGrid } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-72 flex flex-col h-screen bg-indigo-50">
      <div className="mt-8 mx-8">
        <Logo />
      </div>

      <div className="mt-8 mx-8">
        <UserProfile />
      </div>

      <div className="mt-8 mx-8 flex gap-4 items-center">
        <LayoutGrid size={30} className="text-indigo-500" />
        <span>Team Board</span>
      </div>
    </div>
  );
};
