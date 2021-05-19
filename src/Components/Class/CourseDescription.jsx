import React from "react";
import LoadingPlaceholder from "../Placeholders/LoadingPlaceholder";
import { Link } from "react-router-dom";

function process_desc(desc) {
  if (desc)
  {
    let matches = desc.match(/[A-Z]{2,4}[\u202F\u00A0]\d{2,3}/g);
    const split_desc = desc.split(/[A-Z]{2,4}[\u202F\u00A0]\d{2,3}/g);
    matches = matches?.map(m => m.replace(/\s/g, " "));

    let output = [];

    if (matches) {
      for (let i = 0; i < split_desc.length; ++i)
        output.push(split_desc[i], <Link key={i.toString()} to={`/course/${matches[i]}`}>{matches[i]}</Link>);

      return <div>{output}</div>;
    }
    else {
      return <div>{desc}</div>
    }
  }
  else {
    return <div>No description</div>
  }
}

function CourseDescription({ course_desc }) {
  return (
    <div className="flex flex-row flex-wrap justify-between order-4 leading-7 md:mt-4 break-words">
      <div className="flex flex-col">
        <div className="text-xl font-semibold md:text-2xl">Course Description</div>
        <div className="mt-2 md:text-lg course-desc">
          {course_desc ? process_desc(course_desc) : <LoadingPlaceholder length={175} />}
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;