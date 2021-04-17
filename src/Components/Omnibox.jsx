import React from "react";
import { Search } from "../Components/Icons";
import { Link } from "react-router-dom";

function InstructorResult({ PrimaryInstructor, selectInstructor }) {
  return (
    <div onClick={() => selectInstructor(PrimaryInstructor)}
      className="px-4 py-2 font-medium cursor-pointer hover:bg-indigo-50 hover:text-blue-700">
      {PrimaryInstructor.split(", ").reverse().join(" ")}
    </div>
  );
}

function CourseResult({ CRSNBR, CRSSUBJCD, CRSTITLE, CLASSTITLE }) {
  const code = `${CRSSUBJCD} ${CRSNBR}`.replace(/(<b>)|(<\/b>)/g, "");
  const class_title = CLASSTITLE ? (CLASSTITLE !== CRSTITLE ? `(${CLASSTITLE})` : "") : "";

  return (
    <Link
      to={`/course/${code}`}
      className="px-4 py-2 font-medium cursor-pointer hover:bg-indigo-50 hover:text-blue-700"
      dangerouslySetInnerHTML={{ __html: `${CRSSUBJCD} ${CRSNBR}: ${CRSTITLE} ${class_title}` }}>
    </Link>
  );
}

function Omnibox({ category, filter, options, children, padding = 1 }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-t shadow md:py-3">
        <button className="focus-within:outline-none">
          <div className="text-gray-500 hover:text-blue-700"><Search size={20} /></div>
        </button>

        <input onKeyUp={filter} className={`w-full py-${padding} pl-4 font-medium outline-none focus:placeholder-blue-700 focus:outline-none`} type="search" autoFocus placeholder={`Search ${category}`} />

        {/* Category options */}
        {options &&
          <div>
            <select className="pr-1 text-sm bg-transparent outline-none focus:outline-none">
              {options.map((o, i) => <option key={i} value={o.toLowerCase()}>{o}</option>)}
            </select>
          </div>}
      </div>

      {/* Search results */}
      {(children?.length > 0) &&
        <div className="relative flex flex-col min-w-full">
          <div className="flex flex-col bg-white border border-gray-300 rounded-b shadow">
            {children}
          </div>
        </div>}
    </div>
  );
}

export { Omnibox, CourseResult, InstructorResult };