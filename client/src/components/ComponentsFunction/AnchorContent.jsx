import React, { useState } from 'react';

const AnchorContent = ({
  handleContentChange,
  handleStyleChange,
  handleAttributes,
  element,
}) => {
  const [href, setHref] = useState(element.attributes?.href || '');
  const [content, setContent] = useState(element.content || '');
  const [textDecoration, setTextDecoration] = useState(
    element.styles?.textDecoration || 'none'
  );

  // Handle changes to the anchor text
  const handleContentChangeInput = (e) => {
    setContent(e.target.value); // Update local content state
    handleContentChange('content', e.target.value); // Update the content in the store
  };

  // Handle changes to the href URL
  const handleHrefChange = (e) => {
    setHref(e.target.value); // Update local href state
    handleAttributes('href', e.target.value); // Update the href in the store
  };

  // Handle text decoration change
  const handleTextDecorationChange = (e) => {
    setTextDecoration(e.target.value); // Update local text decoration state
    handleStyleChange('textDecoration', e.target.value); // Update text-decoration in the store
  };

  return (
    <>
      {/* Input for changing anchor text */}
      <label className="block mb-1 font-medium text-gray-600">
        Anchor Text:
        <input
          type="text"
          value={content}
          onChange={handleContentChangeInput}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter anchor text"
        />
      </label>

      {/* Input for changing href URL */}
      <label className="block mb-1 font-medium text-gray-600">
        Href URL:
        <input
          type="text"
          value={href}
          onChange={handleHrefChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter href URL"
        />
      </label>

      {/* Dropdown for changing text decoration */}
      <label className="block mb-1 font-medium text-gray-600">
        Text Decoration:
        <select
          value={textDecoration}
          onChange={handleTextDecorationChange}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="none" style={{ textDecoration: 'none' }}>
            None
          </option>
          <option value="underline" style={{ textDecoration: 'underline' }}>
            Underline
          </option>
          <option value="overline" style={{ textDecoration: 'overline' }}>
            Overline
          </option>
          <option
            value="line-through"
            style={{ textDecoration: 'line-through' }}
          >
            Line-through
          </option>
        </select>
      </label>
    </>
  );
};

export default AnchorContent;
