import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';  // Use default export
import { css } from '@codemirror/lang-css'; // Import CSS language support
import { oneDark } from '@codemirror/theme-one-dark';
import { Save } from 'lucide-react';
const CodeEditorCSS = () => {
  const [code, setCode] = useState('/* Write your CSS code here... */');

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
    <CodeMirror
      value={code}
      height="65vh"
      width="100%"
      theme={oneDark} // Dark theme for the editor
      extensions={[css()]} // CSS language extension
      onChange={(value) => setCode(value)}
    />
    </div>
    <button className=''>Save</button>
    <button className="flex items-center p-2 space-x-1 text-sm text-white rounded-lg bg-rose-500 hover:bg-rose-600">
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  );
};

export default CodeEditorCSS;
