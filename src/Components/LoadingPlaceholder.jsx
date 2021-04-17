import React from "react";

function LoadingPlaceholder({ length = 10, placeholder = "A " }) {
  return (
    <span className="text-gray-100 transition-all bg-gray-100 animate-pulse">{placeholder.repeat(length)}</span>
  );
}

export default LoadingPlaceholder;