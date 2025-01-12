import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosition, removeChild } from "../../Store/webElementSlice";

import ComponentRenderer from "./ComponentRenderer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSaveComponents } from "../../hooks/useSaveComponents";
import useTips from "../../hooks/useTips";

const MainCanvas = ({ ScreenSize, reloadEvents, rightSidebarOpen, toast }) => {
  const dispatch = useDispatch();
  const webElements = useSelector((state) => state.webElement.present);
  const webElementsRef = useRef(webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  // Tips
  useTips(toast);

  // Event listener for Ctrl+S
  useSaveComponents(toast, webElementsRef);

  // Drag and drop
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
          dispatch(
            removeChild({ id: element.parent, child: draggedElementId })
          );
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

  const getHeight = () => {
    if (ScreenSize === "desktop") return "calc(90vh - 64px)";
    if (ScreenSize === "mobile") return "calc(90vh - 48px)";
    return "calc(90vh - 64px)"; // Default for tablet or other sizes
  };

  const getWidth = () => {
    if (ScreenSize === "desktop") return "calc(100vw - 64px)";
    if (ScreenSize === "mobile") return "calc(30vw - 48px)";
    if (rightSidebarOpen) return "calc(80vw - 320px)";
    return "calc(60vw - 64px)"; // Default for tablet or other sizes
  };

  return (
    <div className="flex-1 p-8 ml-auto mr-auto overflow-auto align-middle bg-gray-100">
      <div
        className="min-h-full bg-white rounded-lg shadow-lg"
        style={{ height: getHeight(), width: getWidth() }}
      >
        <ToastContainer />
        <div
          id="canvas"
          className="relative flex items-center justify-center rounded-lg"
          style={{ height: getHeight(), width: getWidth() }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
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
