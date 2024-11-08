import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';  // Use default export
import { css } from '@codemirror/lang-css'; // Import CSS language support
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditorCSS = () => {
  const [code, setCode] = useState('/* Write your CSS code here... */');

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
    <CodeMirror
      value={code}
      height="80vh"
      width="100%"
      theme={oneDark} // Dark theme for the editor
      extensions={[css()]} // CSS language extension
      onChange={(value) => setCode(value)}
    />
    </div>
    </div>
  );
};

export default CodeEditorCSS;
