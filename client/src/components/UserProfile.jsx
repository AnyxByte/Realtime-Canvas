import React from "react";
import { ChevronsUpDown } from "lucide-react"; // Using this for the selector icon in your image

const UserProfile = ({ name = "Acme Corp" }) => {
  // Get the first letter and capitalize it
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="flex py-2 px-4 items-center justify-between hover:bg-slate-100 rounded-xl cursor-pointer transition-all w-full max-w-60">
      <div className="flex items-center gap-3">
        {/* The Decorated Icon */}
        <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-sm">
          <span className="text-white font-bold text-lg leading-none">
            {firstLetter}
          </span>
        </div>

        {/* The Username */}
        <span className="font-bold text-slate-700 truncate">{name}</span>
      </div>

    </div>
  );
};

export default UserProfile;
