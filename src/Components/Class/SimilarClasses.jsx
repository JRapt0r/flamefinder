import React from "react";
import { Collection } from "../Icons";
import ClassCard from "../Cards/ClassCard";

function SimilarClasses({ classes }) {
  if (classes?.length < 1) {
    return null;
  }

  return (
    <div className="flex flex-col order-5 mt-8">
      <div className="flex flex-row items-center mb-2 space-x-2 text-xl font-semibold md:text-2xl">
        <Collection />
        <div>Similar Classes</div>
      </div>

      <div className="flex flex-col flex-wrap justify-between lg:flex-row">
        {classes ? classes?.map((d, i) => <ClassCard key={i.toString()} {...d} />) : "Loading..."}
      </div>
    </div>
  );
}

export default SimilarClasses;