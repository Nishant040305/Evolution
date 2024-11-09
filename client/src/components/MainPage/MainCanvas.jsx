import { useEffect, useState, useRef } from "react";
import ComponentRenderer from "./ComponentRenderer";
import { useSelector, useDispatch } from "react-redux";
import { setPosition, removeChild } from "../../Store/webElementSlice";

const MainCanvas = ({ScreenSize, reloadEvents}) => {
  const dispatch = useDispatch();
  const webElements = useSelector(state => state.webElement.present);
  const webElementsRef = useRef(webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow elements to be dropped by preventing default behavior
  };

  const handleDrop = (event) => {
    event.preventDefault();

    try {
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      const { id: draggedElementId, offsetX, offsetY } = data;
      const element = webElementsRef.current[draggedElementId];

      console.log("Dropped on canvas ", draggedElementId);

      if (element) {
        // Calculate drop position relative to the canvas
        const canvasRect = event.currentTarget.getBoundingClientRect();
        const dx = event.clientX - canvasRect.left - offsetX;
        const dy = event.clientY - canvasRect.top - offsetY;

        // Remove child from its parent
        if (element.parent) {
          dispatch(removeChild({ id: element.parent, child: draggedElementId }));
        }
        // Set new position if element has no parent (placed on canvas)
        dispatch(setPosition({ id: draggedElementId, dx, dy }));
      }
    } catch (error) {
      console.log("Error dropping element:", error);
      console.log("Reloading events...");
      reloadEvents();
    }
  };

  const handleDragEnter = (event) => {
    console.log("Drag entered canvas");
  };

  const handleDragLeave = (event) => {
    console.log("Drag left canvas");
  };
  const getHeight = () => {
    if (ScreenSize === 'desktop') return 'calc(85vh - 64px)';
    if (ScreenSize === 'mobile') return 'calc(85vh - 48px)';
    return 'calc(85vh - 64px)'; // Default for tablet or other sizes
  };
  
  const getWidth = () => {
    if (ScreenSize === 'desktop') return 'calc(20vw - 64px)';
    if (ScreenSize === 'mobile') return 'calc(10vw - 48px)';
    return 'calc(50vw - 64px)'; // Default for tablet or other sizes
  };
  
  console.log(getWidth(),getHeight())
  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100" style={{ height: getHeight(), width: getWidth() }}>
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div
          id="canvas"
          className="flex items-center justify-center rounded-lg h-96 relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {Object.keys(webElements).length === 0 ? (
            <p className="text-gray-500">Drag and drop elements here</p>
          ) : null}
          {Object.values(webElements).map((component) => (
            <ComponentRenderer
              key={component.id}
              instance={component}
              webElements={webElements}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
