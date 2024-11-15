import React, { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css as cssextension } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { Save } from 'lucide-react';
import { useSelector } from "react-redux";
import ApiDashboard from "../../scripts/API.Dashboard";

const CodeEditorCSS = ({ css, setCss }) => {
  const apiDashboard = new ApiDashboard();
  const project = useSelector(state => state.project);
  const [changesSaved, setChangesSaved] = useState(false);

  const handleSave = useCallback(async () => {
    try {
      const response = await apiDashboard.updateProject(project._id, { cssContent: css });
      console.log('CSS Saved:', response);
      setChangesSaved(true);
      setTimeout(() => setChangesSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save CSS:", error);
    }
  }, [apiDashboard, css, project._id]);

  // Event listener for Ctrl+S
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Ctrl+S pressed');
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Cleanup on unmount
    };
  }, [handleSave]);

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
      <div className='p-8 bg-white rounded-lg shadow-lg'>
        <CodeMirror
          value={css}
          height="65vh"
          theme={oneDark}
          extensions={[cssextension()]}
          onChange={(value) => setCss(value)} // Update state when editor content changes
        />
      </div>
      <button onClick={handleSave} className="flex items-center p-2 space-x-1 text-sm text-white rounded-lg bg-rose-500 hover:bg-rose-600">
        <Save className="w-4 h-4" />
        <span>{changesSaved ? "Saved" : "Save CSS"}</span>
      </button>
    </div>
  );
};

export default CodeEditorCSS;
