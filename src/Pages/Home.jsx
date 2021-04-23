import React from "react";
import { Link } from "react-router-dom";

import { Flame, School, Group, StackedBarChart, Info } from "../Components/Icons";
import NeoOmniBox from "../Components/NeoOmniBox";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center mx-10 my-8 md:my-16">

      <div className="flex flex-col mb-4">
        <div className="flex flex-row items-center text-blue-700">
          <div className="hidden md:flex"><Flame size={64} /></div>
          <div className="flex md:hidden"><Flame size={48} /></div>
          <div className="text-5xl md:text-7xl font-brand">FlameFinder</div>
        </div>
        <div className="mt-2 text-xl font-semibold text-center max-w-prose">Schedule with ease</div>
      </div>

      <div className="w-full px-2 md:px-10 lg:px-36">
        <NeoOmniBox />

        <div className="flex flex-col justify-between my-8 space-y-4 font-semibold text-blue-700 md:space-y-0 md:flex-row">
          <Link to="/departments" className="flex flex-row justify-center px-8 py-3 space-x-2 transition-shadow bg-white border border-gray-300 rounded shadow md:py-4 hover:shadow-md"><School /> <div>Departments</div></Link>
          <Link to="/instructors" className="flex flex-row justify-center px-8 py-3 space-x-2 transition-shadow bg-white border border-gray-300 rounded shadow md:py-4 hover:shadow-md"><Group /> <div>Instructors</div></Link>
          <Link to="/compare" className="flex flex-row justify-center px-8 py-3 space-x-2 transition-shadow bg-white border border-gray-300 rounded shadow md:py-4 hover:shadow-md"><StackedBarChart /> <div>Compare</div></Link>
          <Link to="/about" className="flex flex-row justify-center px-8 py-3 space-x-2 transition-shadow bg-white border border-gray-300 rounded shadow md:py-4 hover:shadow-md"><Info /><div>About</div></Link>
        </div>
      </div>

    </div>
  );
}

export default Home;