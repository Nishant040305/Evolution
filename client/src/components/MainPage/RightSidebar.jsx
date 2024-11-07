import React from "react";
import { X, ChartColumn } from "lucide-react";
import ComponentEditor from "./componentEditor";
import ComponentEditorTransform from "./ComponentEditorTransform";
import Info from "./Info";
import ComponentEditorAppearance from "./ComponentEditorAppearance";
import ComponentEditorAdvanced from "./ComponentEditorAdvanced";
import ComponentEditorContent from "./ComponentEditorContent";

const RightSidebar = ({ closeSidebar, webElements, setWebElements, id }) => (
  <div className="flex flex-col h-screen overflow-y-auto transition-all duration-300 bg-white border-l w-80">
    <div className="flex flex-row justify-between px-2 py-3 pt-2 text-white bg-red-500 border-b properties-section border-slate-200">
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
      {id != 0 ? (
        <div>
          <div className="mb-4">
            {/* Updated Info Button Styling */}
            <Info
              id={id}
              webElements={webElements}
              setWebElements={setWebElements}
              className="w-full px-6 py-4 text-xl font-bold text-center text-red-500 bg-red-100 rounded-lg shadow-md"
            />
          </div>

          <ComponentEditorTransform
            id={id}
            webElements={webElements}
            setWebElements={setWebElements}
          />
          <ComponentEditorAppearance
            id={id}
            webElements={webElements}
            setWebElements={setWebElements}
          />
          <ComponentEditorAdvanced
            id={id}
            webElements={webElements}
            setWebElements={setWebElements}
          />
          <ComponentEditorContent
            id={id}
            webElements={webElements}
            setWebElements={setWebElements}
          />
        </div>
      ) : null}
    </div>
  </div>
);

export default RightSidebar;
