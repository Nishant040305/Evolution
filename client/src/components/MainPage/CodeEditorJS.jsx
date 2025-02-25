import React, { useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
// import { Save } from 'lucide-react';
import Save from "lucide-react/dist/esm/icons/save"
import useSaveFile from '../../hooks/useSaveFile';

const CodeEditorJS = ({ js, setJs, file }) => {
  const { handleSave, changesSaved } = useSaveFile(js, file);

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
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={
            'flex items-center p-2 space-x-1 text-sm text-white rounded-lg' +
            (changesSaved
              ? ' bg-green-500 hover:bg-green-600'
              : ' bg-rose-500  hover:bg-rose-600')
          }
        >
          <Save className="w-4 h-4" />
          <span>{changesSaved ? 'Saved' : 'Save'}</span>
        </button>
      </div>
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <CodeMirror
          value={js}
          height="65vh"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={(value) => setJs(value)} // Update state when editor content changes
        />
      </div>
    </div>
  );
};

export default CodeEditorJS;
