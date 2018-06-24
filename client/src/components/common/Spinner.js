import React from "react";
import spinner from "../../img/spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="LOADING....."
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
