import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';  // Use default export
import { css as cssextension } from '@codemirror/lang-css'; // Import CSS language support
import { oneDark } from '@codemirror/theme-one-dark';
import { Save } from 'lucide-react';
import { useSelector } from "react-redux";
import ApiDashboard from "../../scripts/API.Dashboard";

const CodeEditorCSS = ( { css, setCss }) => {
  const apiDashboard = new ApiDashboard();
  const project = useSelector(state => state.project);

  const handleSave = async () => {
    try {
      const response = await apiDashboard.updateProject(project._id, { cssContent: css });
      console.log(response);
    } catch (error) {
      console.error("Failed to save CSS:", error);
    }
  };

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
    <CodeMirror
      value={css}
      height="65vh"
      width="100%"
      theme={oneDark} // Dark theme for the editor
      extensions={[cssextension()]} // CSS language extension
      onChange={(value) => setCss(value)}
    />
    </div>
    <button onClick={handleSave} className="flex items-center p-2 space-x-1 text-sm text-white rounded-lg bg-rose-500 hover:bg-rose-600">
        <Save className="w-4 h-4" />
        <span>Save CSS</span>
      </button>
    </div>
  );
};

export default CodeEditorCSS;
