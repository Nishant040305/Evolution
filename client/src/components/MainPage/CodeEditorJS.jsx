import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';  // Use default export
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditorJS = () => {
  const [code, setCode] = useState('// Write your JavaScript code here...');

  return (
    <div className='flex-1 p-8 overflow-auto bg-gray-100'>
        <div className='p-8 bg-white rounded-lg shadow-lg'>
    <CodeMirror
      value={code}
      height="80vh"
      width="100%"//this is not responding
      theme={oneDark}
      extensions={[javascript()]}
      onChange={(value) => setCode(value)}
    />
    </div>
    </div>
  );
};

export default CodeEditorJS;
