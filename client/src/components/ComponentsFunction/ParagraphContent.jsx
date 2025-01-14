const ParagraphContent = ({ handleContentChange, element }) => {
  return (
    <>
      {/* Input for changing paragraph text */}
      <label className="block mb-1 font-medium text-gray-600">
        Paragraph Text:
        <input
          type="text"
          value={element.content || ''}
          onChange={(e) => handleContentChange('content', e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter paragraph text"
        />
      </label>
    </>
  );
};

export default ParagraphContent;
