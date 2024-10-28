import React from "react";
import { Undo, Redo, Monitor, Tablet, Smartphone } from "lucide-react";

const TopBar = () => (
  <div className="flex items-center justify-between px-4 bg-white border-b h-14">
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-semibold text-rose-800">Evolution</h1>
      <div className="flex space-x-2">
        <button className="p-2 rounded-lg hover:bg-rose-50">
          <Undo className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-rose-50">
          <Redo className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex p-1 border rounded-lg bg-rose-50">
        <button className="p-1 rounded hover:bg-white">
          <Monitor className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-white">
          <Tablet className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-white">
          <Smartphone className="w-4 h-4" />
        </button>
      </div>
      <button className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800">
        Preview
      </button>
      <button className="px-3 py-1.5 bg-rose-800 text-white rounded-lg hover:bg-rose-900">
        Publish
      </button>
    </div>
  </div>
);

export default TopBar;
