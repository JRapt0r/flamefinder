import React from "react";
import { Link } from "react-router-dom";

function Card({ children: body, CLASSCOUNT }) {
  let output;

  switch (CLASSCOUNT)
  {
    case null:
      output = (<div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col w-auto py-3.5 m-2 transition-all transform bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 ring-black">{body}</div>);
      break;
    case 1:
      output = (<div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col w-auto py-4 m-2 transition-all transform bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 ring-black">{body}</div>);
      break;
    case 2:
      output = (<div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col m-2 transition-shadow bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg group">
                  <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex py-4 flex-col transform -translate-y-0.5 group-hover:-translate-y-1.5 transition-transform bg-white border border-gray-300 rounded-lg">
                    {body}
                  </div>
                </div>);
      break;
    default:
      output = (<div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col m-2 transition-shadow bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg group">
                 <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex flex-col transform -translate-y-0.5 group-hover:-translate-y-1.5 transition-transform bg-white border border-gray-300 rounded-lg">
                   <div style={{ "minWidth": "25rem", "maxWidth": "25rem", "minHeight": "13rem" }} className="flex py-4 flex-col transform -translate-y-0.5 group-hover:-translate-y-1.5 transition-transform bg-white border border-gray-300 rounded-lg">
                    {body}
                   </div>
                 </div>
               </div>);
}

return output;
}

function CourseCard({ CODE, CRSTITLE, CLASSCOUNT }) {
  return (
    <Link to={`/course/${CODE}`}>
      <Card CLASSCOUNT={CLASSCOUNT}>
        <div className="px-4 font-semibold">
          <div className="text-blue-700 md:text-lg">{CODE}</div>
          <div className="text-lg tracking-wide md:text-xl">{CRSTITLE}</div>
        </div>

        <div className="flex flex-col flex-wrap justify-between min-w-full px-4">
          <div className="flex flex-col pt-4">
            <div className="text-sm font-medium tracking-wide text-gray-600 md:text-base">Num Classes</div>
            <div className="font-semibold tracking-wide text-blue-700 md:text-lg">{CLASSCOUNT ? CLASSCOUNT : 0}</div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default CourseCard;