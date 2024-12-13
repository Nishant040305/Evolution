import React from "react";
import "../../style/HoverInfoWrapper.css";

const HoverInfoWrapper = ({ children, info }) => {
  return (
    <div className="hover-info-wrapper">
      {children}
      <span className="hover-info-tooltip">{info}</span>
    </div>
  );
};

export default HoverInfoWrapper;
