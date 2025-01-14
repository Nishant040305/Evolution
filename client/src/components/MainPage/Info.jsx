import React from 'react';
import { useSelector } from 'react-redux';

const Info = ({ id }) => {
  const webElements = useSelector((state) => state.webElement.present);
  return (
    <div className="Info-prop-element border-b border-b-slate-200 py-2 px-3 ">
      {`#ID:  canvas-element ${webElements[id].id}`}
    </div>
  );
};

export default Info;
