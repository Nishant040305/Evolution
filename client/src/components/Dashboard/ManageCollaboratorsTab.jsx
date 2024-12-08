import React from "react";

const ManageCollaboratorsTab = ({ project, toast,collaborators,handleRemoveCollaborator }) => {
  console.log(collaborators)
  return(
  <div>
    <h2 className="mb-4 text-lg font-semibold text-red-800">
      Manage Collaborators
    </h2>
    {collaborators.length === 0 ? (
    <div className="mb-4 text-gray-500">
      No collaborators added yet. Click "Add Collaborator" to invite someone.
    </div>
    ) : (
    collaborators.map((collaborator, index) => (
      <div key={index} className="flex items-center mb-2 space-x-4">
        <div className="flex items-center space-x-2">
          {collaborator.user}
        </div>
        <button
          type="button"
          onClick={() => handleRemoveCollaborator(index)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    ))
    )
    }

  </div>
)};
export default ManageCollaboratorsTab;
