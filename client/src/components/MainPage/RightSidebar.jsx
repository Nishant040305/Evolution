import React from "react";
import { X } from "lucide-react";

const RightSidebar = ({ element, closeSidebar }) => (
  <div
    className={`w-64 transition-all duration-300 border-l bg-white overflow-hidden`}
  >
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Edit {element.sub}</h3>
        <button onClick={closeSidebar} className="p-1 rounded hover:bg-rose-50">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Font Family</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Arial</option>
            <option>Helvetica</option>
            <option>Times New Roman</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm">Colors</label>
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded-full bg-rose-500"></button>
            <button className="w-8 h-8 bg-blue-500 rounded-full"></button>
            <button className="w-8 h-8 bg-green-500 rounded-full"></button>
            <button className="w-8 h-8 bg-yellow-500"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RightSidebar;
