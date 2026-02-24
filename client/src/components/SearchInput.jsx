import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({ handleChange }) => {
  return (
    <div className="w-full max-w-lg ">
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            size={18}
            className="text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          />
        </div>

        {/* Input Field */}
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search boards"
          className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl 
                     text-slate-700 placeholder:text-slate-400 font-medium
                     shadow-sm hover:shadow-md focus:shadow-lg focus:shadow-indigo-500/5
                     focus:outline-none focus:border-indigo-500/50 
                     transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchInput;
