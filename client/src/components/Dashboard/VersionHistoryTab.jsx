import React from "react";
  // Render Version History Tab
  const VersionHistoryTab = ({versionHistory,handleRevertVersion}) => {
    return(
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Version History
      </h2>
      <div className="overflow-y-auto max-h-72">
        {" "}
        {/* Added scrollable container */}
        <ul className="space-y-2">
          {versionHistory.slice(0).reverse().map((versionItem, index) => (
            <li
              key={index}
              className="flex justify-between p-2 bg-red-100 rounded-md"
            >
              <div>
                <strong>{versionItem.version}</strong> - {new Date(versionItem.timestamp).toLocaleString()}
                <span> - {versionItem.commitMessage}</span>
              </div>
              <button
                onClick={() => handleRevertVersion(versionItem.version)}
                className="text-red-600 hover:text-red-800"
              >
                Revert
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default VersionHistoryTab;
