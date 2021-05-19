import React from "react";
import { Grid } from "react-css-spinners";

function GridPlaceholder({ children, offset = "129.6px" }) {
  return (
    <div className="flex flex-col">
      {children}
      <div className="flex justify-center place-items-center" style={{ minHeight: `calc(100vh - ${offset})` }}>
        <Grid color="#4338CA" />
      </div>
    </div>
  );
}

export default GridPlaceholder;