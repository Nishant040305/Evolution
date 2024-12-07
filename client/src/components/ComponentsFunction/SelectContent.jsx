const SelectContent = ({ handleAttributeChange, element }) =>(
    <div>
    <label className="block mb-1 font-medium text-gray-600">
      Options:
    </label>
    {(element.attributes.content || []).map((option, index) => (
      <div key={index} className="flex items-center mb-2 space-x-2">
        <input
          type="text"
          value={option.label}
          onChange={(e) => {
            const updatedOptions = [...element.attributes.content];
            updatedOptions[index] = {
              ...updatedOptions[index],
              label: e.target.value,
            };
            handleAttributeChange("content", updatedOptions);
          }}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => {
            const updatedOptions = element.attributes.content.filter(
              (_, i) => i !== index
            );
            handleAttributeChange("content", updatedOptions);
          }}
          className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() =>
        handleAttributeChange("content", [
          ...(element.attributes.content || []),
          { label: "", value: "" },
        ])
      }
      className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Add Option
    </button>
  </div>

)

export default SelectContent;