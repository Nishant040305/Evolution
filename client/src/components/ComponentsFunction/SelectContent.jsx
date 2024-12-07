const SelectContent = ({ handleContentChange, element }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-600">
      Options:
    </label>
    {(element.content || []).map((option, index) => (
      <div key={index} className="flex items-center mb-2 space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">Label:</label>
          <input
            type="text"
            value={option.label}
            onChange={(e) => {
              const updatedOptions = [...element.content];
              updatedOptions[index] = {
                ...updatedOptions[index],
                label: e.target.value,
              };
              handleContentChange("content", updatedOptions);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-600">Value:</label>
          <input
            type="text"
            value={option.value}
            onChange={(e) => {
              const updatedOptions = [...element.content];
              updatedOptions[index] = {
                ...updatedOptions[index],
                value: e.target.value,
              };
              handleContentChange("content", updatedOptions);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={() => {
            const updatedOptions = element.content.filter((_, i) => i !== index);
            handleContentChange("content", updatedOptions);
          }}
          className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() =>
        handleContentChange("content", [
          ...(element.content || []),
          { label: "", value: "" },
        ])
      }
      className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Add Option
    </button>
  </div>
);

export default SelectContent;
