import React from "react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tight">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-indigo-200">
        ∞
      </div>
      <span>CanvasFlow</span>
    </div>
  );
};
