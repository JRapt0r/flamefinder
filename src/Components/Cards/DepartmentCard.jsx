import React from "react";
import { Link } from "react-router-dom";

function DepartmentCard({ DEPTNAME, CRSSUBJCD, num_courses }) {
  return (
    <Link className="flex flex-col min-w-full py-4 my-2 transition-all transform bg-white border border-gray-300 rounded-lg shadow-md md:m-2 hover:shadow-xl hover:-translate-y-1 ring-black" to={`department/${CRSSUBJCD}`}>
      <div className="px-5 text-lg font-semibold tracking-wide text-blue-700 uppercase">{CRSSUBJCD}</div>
      <div className="px-5 text-3xl font-semibold">{DEPTNAME}</div>
      <div className="px-5 mt-1 font-medium tracking-wide text-md">{num_courses} {num_courses === 1 ? "course" : "courses"}</div>
    </Link>
  );
}

export default DepartmentCard;