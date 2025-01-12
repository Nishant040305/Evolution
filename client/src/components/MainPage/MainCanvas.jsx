import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import ComponentRenderer from "./ComponentRenderer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDragDrop } from "../../hooks/DragDrop";
import { useSaveComponents } from "../../hooks/useSaveComponents";
import useTips from "../../hooks/useTips";

const MainCanvas = ({ ScreenSize, reloadEvents, rightSidebarOpen, toast, file }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const webElementsRef = useRef(webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  // Tips
  useTips(toast);

  // Event listener for Ctrl+S
  useSaveComponents(toast, webElementsRef, file);

  // Drag and drop
  const { handleDragOver, handleDrop } = useDragDrop(webElementsRef, reloadEvents);

  // Get canvas dimensions
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
