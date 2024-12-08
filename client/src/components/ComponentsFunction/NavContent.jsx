const NavContent = ({updateGridStyles,handleStyleChange ,handleContentChange , element }) => (
    <div>

          {/* Content */}
          <label className="block mb-1 font-medium text-gray-600">Content:</label>
          <textarea
            value={element.content || ""}
            onChange={(e) => handleContentChange("content", e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded"
            placeholder="Enter content"
          />
        
          {/* Display Type */}
          <label className="block mb-1 font-medium text-gray-600">
            Display Type:
            <select
              value={element.styles.display || ""}
              onChange={(e) =>handleStyleChange("display",e.target.value)} 
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
            </select>
          </label>

          {/* Flex Layout Controls */}
          {element.styles.display === "flex" && (
            <>
              <label className="block mb-1 font-medium text-gray-600">
                Flex Direction:
                <select
                  value={element.styles.flexDirection || ""}
                  onChange={(e) =>handleStyleChange("flexDirection",e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="row">Row</option>
                  <option value="column">Column</option>
                </select>
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Justify Content:
                <select
                  value={element.styles.justifyContent || ""}
                  onChange={(e) =>handleStyleChange("justifyContent",e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Align Items:
                <select
                  value={element.styles.alignItems || ""}
                  onChange={(e) =>handleStyleChange("alignItems",e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="stretch">Stretch</option>
                  <option value="center">Center</option>
                  <option value="flex-start">Flex Start</option>
                  <option value="flex-end">Flex End</option>
                </select>
              </label>
            </>
          )}

          {/* Grid Layout Controls */}
          {element.styles.display === "grid" && (
            <>
              <label className="block mb-1 font-medium text-gray-600">
                Grid Template Columns:
                <input
                  type="text"
                  value={element.styles.gridTemplateColumns || ""}
                  onChange={(e) =>updateGridStyles("gridTemplateColumns", e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., 1fr 1fr"
                />
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Grid Template Rows:
                <input
                  type="text"
                  value={element.styles.gridTemplateRows || ""}
                  onChange={(e) =>updateGridStyles("gridTemplateRows", e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., auto"
                />
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Gap:
                <input
                  type="text"
                  value={element.styles.gap || ""}
                  onChange={(e) => updateGridStyles("gap", e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., 10px"
                />
              </label>
            </>
          )}
        </div>
);

export default NavContent;