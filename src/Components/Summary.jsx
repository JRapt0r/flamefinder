import React from "react";

function Summary({ children: body, title }) {
  return (
    <details className="space-y-2">
      <summary className="font-medium leading-8 cursor-pointer select-none md:text-lg focus-within:outline-none">
        {title}
      </summary>
      <div className="">{body}</div>
    </details>
  );
}

export default Summary;