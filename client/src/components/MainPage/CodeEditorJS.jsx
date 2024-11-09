import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';  // Use default export
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Save } from 'lucide-react';
import { useSelector } from "react-redux";
import ApiDashboard from "../../scripts/API.Dashboard";

const CodeEditorJS = ( { js, setJs }) => {
  const apiDashboard = new ApiDashboard();
  const project = useSelector(state => state.project);

  const handleSave = async () => {
    try {
      const response = await apiDashboard.updateProject(project._id, { javascriptContent: js });
      console.log(response);
    } catch (error) {
      console.error("Failed to save JS:", error);
    }
  };

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
    <CodeMirror
      value={js}
      height="65vh"
      width="100%"//this is not responding
      theme={oneDark}
      extensions={[javascript()]}
      onChange={(value) => setJs(value)}
    />
    </div>
    <button onClick={handleSave} className="flex items-center p-2 space-x-1 text-sm text-white rounded-lg bg-rose-500 hover:bg-rose-600">
        <Save className="w-4 h-4" />
        <span>Save JavaScript</span>
      </button>

    </div>
  );
};

export default CodeEditorJS;
