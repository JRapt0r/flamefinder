import React from "react";
import { Link } from "react-router-dom";

function Card({ children: body }) {
  return (
    <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col m-2 transition-shadow bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg group">
      <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col transform -translate-y-0.5 group-hover:-translate-y-1.5 transition-transform bg-white border border-gray-300 rounded-lg">
        <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex py-4 flex-col transform -translate-y-0.5 group-hover:-translate-y-1.5 transition-transform bg-white border border-gray-300 rounded-lg">
          {body}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ CODE, CRSTITLE, CLASSCOUNT }) {
  return (
    <Link to={`/course/${CODE}`}>
      <Card>
        <div className="px-4 font-semibold">
          <div className="text-lg text-blue-700">{CODE}</div>
          <div className="text-xl tracking-wide">{CRSTITLE}</div>
        </div>

        <div className="flex flex-col flex-wrap justify-between min-w-full px-4">
          <div className="flex flex-col pt-4">
            <div className="font-medium tracking-wide text-gray-600">Num Classes</div>
            <div className="text-lg font-semibold tracking-wide text-blue-700">{CLASSCOUNT ? CLASSCOUNT : 0}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default CourseCard;