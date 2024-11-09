import React from "react";
import { X, ChartColumn } from "lucide-react";
import ComponentEditor from "./componentEditor";
import ComponentEditorTransform from "./ComponentEditorTransform";
import Info from "./Info";
import ComponentEditorAppearance from "./ComponentEditorAppearance";
import ComponentEditorAdvanced from "./ComponentEditorAdvanced";
import ComponentEditorContent from "./ComponentEditorContent";
import { useSelector } from "react-redux";

const RightSidebar = ({ closeSidebar, id }) => {
  const webElements = useSelector((state) => state.webElement.present);
  let idx = id;
  if (webElements[id] == null) {
    idx = 0;
  }

  document.addEventListener("mousedown", function (e) {
    // Check if the target is a resizable element
    const target = e.target.closest(
      ".resizable-right, .resizable-left, .resizable-left-right"
    );
    if (!target) return;

    // Determine the direction of resizing
    const isResizingRight =
      target.classList.contains("resizable-right") ||
      target.classList.contains("resizable-left-right");
    const isResizingLeft =
      target.classList.contains("resizable-left") ||
      target.classList.contains("resizable-left-right");

    // Initial mouse and element dimensions
    const startX = e.clientX;
    const startWidth = target.offsetWidth;
    const startLeft = target.offsetLeft;

    function resize(e) {
      if (isResizingRight) {
        target.style.width = startWidth + (e.clientX - startX) + "px";
      }
      if (isResizingLeft) {
        target.style.width = startWidth - (e.clientX - startX) + "px";
        target.style.left = startLeft + (e.clientX - startX) + "px";
      }
    }

    function stopResize() {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResize);
    }

    // Attach mousemove and mouseup listeners
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  return (
    <div className="flex flex-col h-[50vh] overflow-y-auto transition-all duration-300 bg-white border-l w-80 z-50">
      <div className="flex flex-row justify-between w-auto px-2 py-3 pt-2 text-white bg-red-500 border-b properties-section border-slate-200">
        <div className="flex flex-row items-center text-lg font-semibold">
          <ChartColumn size={25} color="#fff" className="mr-2" />
          Properties
        </div>
        <X
          onClick={() => {
            closeSidebar(false);
          }}
          className="text-white cursor-pointer"
          size={24}
        />
      </div>
      <div className="p-4">
        {idx !== 0 && (
          <div>
            <div className="mb-4">
              {/* Updated Info Button Styling */}
              <Info
                id={idx}
                className="w-full px-6 py-4 text-xl font-bold text-center text-red-500 bg-red-100 rounded-lg shadow-md"
              />
            </div>
            <ComponentEditorTransform id={idx} />
            <ComponentEditorAppearance id={idx} />
            <ComponentEditorAdvanced id={idx} />
            <ComponentEditorContent id={idx} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
