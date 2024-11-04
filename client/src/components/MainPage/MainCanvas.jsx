import { useEffect, useState } from "react";
import ComponentRenderer from "./ComponentRenderer";
import { useSelector } from "react-redux";

const MainCanvas = () => {
  const webElements = useSelector(state=>state.webElement.present);
  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div id="canvas" className="flex items-center justify-center  rounded-lg h-96 relative">
          {Object.keys(webElements).length === 0 ? (
            <p className="text-gray-500">Drag and drop elements here</p>
          ) : null}
          {Object.values(webElements).map((component) => (
            <ComponentRenderer key={component.id} instance={component} webElements={webElements} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
