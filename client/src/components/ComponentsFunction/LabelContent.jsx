const LabelContent = ({ handleContentChange, element }) => {
  return (
    <>
      {/* Input for changing label text */}
      <label className="block mb-1 font-medium text-gray-600">
        Label Text:
        <input
          type="text"
          value={element.content || ''}
          onChange={(e) => handleContentChange('content', e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter label text"
        />
      </label>
    </>
  );
};

export default LabelContent;
