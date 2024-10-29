import React from "react";

const MainCanvas = () => (
  <div className="flex-1 p-8 overflow-auto bg-gray-100">
    <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-center border-2 border-gray-300 border-dashed rounded-lg h-96">
        <p className="text-gray-500">Drag and drop elements here</p>
      </div>
    </div>
  </div>
);

export default MainCanvas;
