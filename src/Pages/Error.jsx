import React from "react";
import { useParams } from "react-router";

const codes = {
  400: "Bad Request",
  404: "Not Found",
  500: "Internal Server Error",
};

function Error() {
  const { code } = useParams();

  return (
    <div className="flex flex-col justify-center py-10 space-y-2 place-items-center">
      <div className="text-4xl font-bold">{code || 404} error</div>
      <div className="text-2xl font-semibold">{codes[code] || codes[404]}</div>
    </div>
  );
}

export default Error;