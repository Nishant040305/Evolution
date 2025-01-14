const HeadingContent = ({ handleContentChange, element }) => {
  return (
    <>
      {/* Input for changing heading text */}
      <label className="block mb-1 font-medium text-gray-600">
        Heading Text:
        <input
          type="text"
          value={element.content || ''}
          onChange={(e) => handleContentChange('content', e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter heading text"
        />
      </label>
    </>
  );
};

export default HeadingContent;
