import React from "react";

const RolesTab = ({ roleAssignments,handleRoleChange }) => {
  const roleOptions = "Editor"
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">Roles</h2>
      <p className="mb-4 text-gray-700">
        Manage the roles and permissions for each collaborator.
      </p>
      <div className="space-y-4">
        {roleAssignments.map((assignment, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-red-100 rounded-md"
          >
            <span className="text-red-800">{assignment.user}</span>
            <div
              value={"editor"}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              className="p-1 text-red-800 bg-white border border-red-300 rounded-md"
            >
              
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-full py-2 mt-4 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
      >
        + Add Collaborator Role
      </button>
    </div>
  );
};

export default RolesTab;
