import React from "react";
import { Search } from "../Components/Icons";

function SearchBox({ category, filter }) {
  return (
    <div className="sticky top-0 z-50 flex items-center w-full p-3 bg-white border-t border-b border-gray-300 shadow-sm">
      <button aria-label={`Search ${category}`} className="focus-within:outline-none">
        <div className="text-gray-500 hover:text-blue-700"><Search size={20} /></div>
      </button>

      <input className="w-full py-1 pl-4 font-medium outline-none focus:placeholder-blue-700 focus:outline-none"
        onKeyUp={filter} type="search" placeholder={`Search ${category}`} />
    </div>
  );
}

export default SearchBox;