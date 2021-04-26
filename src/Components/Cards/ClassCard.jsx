import React from "react";
import { Link } from "react-router-dom";

function ClassCard({ CRSNBR, CRSTITLE, CRSSUBJCD, SEASON, YEAR, avg_gpa, PrimaryInstructor }) {
  return (
    <Link to={`/class/${CRSSUBJCD}+${CRSNBR}+${PrimaryInstructor}+${SEASON}+${YEAR}`}>
      <div style={{ minWidth: "25rem", minHeight: "13rem" }} className="flex flex-col w-auto py-6 my-2 transition-all transform bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer md:m-2 hover:shadow-xl hover:-translate-y-1 ring-black">
        <div className="px-4 font-semibold">
          <div className="text-blue-700 md:text-lg">{CRSSUBJCD} {CRSNBR}</div>
          <div className="text-lg tracking-wide md:text-xl">{CRSTITLE}</div>
        </div>

        <div className="flex flex-col flex-wrap justify-between min-w-full px-4">
          <div className="flex flex-col">
            <div className="font-medium md:text-lg">{PrimaryInstructor.split(", ").reverse().join(" ")}</div>
          </div>

          <div className="flex flex-col pt-3">
            <div className="text-sm font-medium tracking-wide text-gray-600 md:text-base">Average GPA</div>
            <div className="font-semibold tracking-wide text-blue-700 md:text-lg">{avg_gpa ? avg_gpa?.toFixed(2) : "N/A"}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ClassCard;