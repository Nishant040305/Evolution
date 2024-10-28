import React from "react";
import { Timer, Layout, Save } from "lucide-react";

const BottomBar = () => (
  <div className="flex items-center justify-between h-12 px-4 bg-white border-t">
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">Canvas Size: 1920 x 1080</span>
      <span className="text-sm text-gray-600">Zoom: 100%</span>
    </div>
    <div className="flex items-center space-x-4">
      <button className="flex items-center space-x-1 text-sm text-gray-600">
        <Timer className="w-4 h-4" />
        <span>Auto-save enabled</span>
      </button>
      {/* <button className="flex items-center space-x-1 text-sm text-gray-600">
        <Layout className="w-4 h-4" />
        <span>Grid: On</span>
      </button> */}
      <button className="flex items-center p-2 space-x-1 text-sm text-white rounded-lg bg-rose-500 hover:bg-rose-600">
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

export default BottomBar;
