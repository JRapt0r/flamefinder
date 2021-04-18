import React from "react";

function Summary({ children: body, title }) {
  return (
    <details className="space-y-2">
      <summary className="text-lg font-medium leading-8 cursor-pointer select-none focus-within:outline-none">
        {title}
      </summary>
      <div>{body}</div>
    </details>
  );
}

export default Summary;