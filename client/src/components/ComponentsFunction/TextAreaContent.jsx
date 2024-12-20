const TextAreaContent = ({ handleContentChange, element }) => {
  

  return (
    <>  
      {/* Input for changing textarea text */}
      <label className="block mb-1 font-medium text-gray-600">
        Textarea Text:
        <textarea
          value={element.attributes.placeholder}
          onChange={(e) => handleContentChange("placeholder", e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter textarea text"
        />
      </label>
    </>
    
  );
};  

export default TextAreaContent;