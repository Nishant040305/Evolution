import React from "react";
import "../../style/HoverInfoWrapper.css";

const HoverInfoWrapper = ({ children, info, position }) => {
  return (
    <div className="hover-info-wrapper relative">
      {children}
      <span className={`hover-info-tooltip ${position}`}>{info}</span>
    </div>
  );
};

export default HoverInfoWrapper;
