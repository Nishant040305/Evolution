import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
import { FaUserCircle, FaCrown, FaPen, FaEye } from "react-icons/fa";
import { SocketRefreshOrganizationChanges } from "../../event/SocketEvent";

const RolesTab = ({ toast, project }) => {
  const roleOptions = [
    { label: "Admin", value: "admin", icon: <FaCrown className="text-yellow-500" /> },
    { label: "Editor", value: "editor", icon: <FaPen className="text-blue-500" /> },
    { label: "Viewer", value: "viewer", icon: <FaEye className="text-green-500" /> },
  ];

  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const API = new ApiDashboard();

  // Handle role change confirmation
  const confirmRoleChange = async () => {
    if (!selectedCollaborator || !selectedRole) return;

    try {
      const projectID = project;
      await API.UpdateCollaboratorRole(projectID, selectedCollaborator.user, selectedRole);
      SocketRefreshOrganizationChanges(projectID)
      setCollaborators((prevCollaborators) =>
        prevCollaborators.map((collab) =>
          collab.user === selectedCollaborator.user ? { ...collab, role: selectedRole } : collab
        )
      );

      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role. Please try again.");
    } finally {
      setShowConfirmationModal(false);
      setSelectedCollaborator(null);
      setSelectedRole("");
    }
  };

  // Open confirmation modal
  const handleRoleChange = (collaborator, newRole) => {
    setSelectedCollaborator(collaborator);
    setSelectedRole(newRole);
    setShowConfirmationModal(true);
  };

  // Fetch collaborators
  useEffect(() => {
    const fetchCollaborators = async () => {
      const collaborate = await API.getProjectById(project);
      setCollaborators(collaborate.members);

      if (collaborate.members.length === 0) return;

      try {
        const collaboratorsWithDetails = await Promise.all(
          collaborate.members.map(async (collaborator) => {
            const userData = await API.FindUserByID(collaborator.user);
            return {
              ...collaborator,
              userData,
            };
          })
        );
        setCollaborators(collaboratorsWithDetails);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [project]);

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">Roles</h2>
      <p className="mb-4 text-gray-700">Manage the roles and permissions for each collaborator.</p>

      <div className="space-y-4">
        {collaborators.map((collaborator, index) => {
          const currentRole = roleOptions.find((role) => role.value === collaborator.role);

          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-red-100 rounded-md shadow-sm"
            >
              {/* Collaborator details */}
              <div className="flex items-center space-x-3">
                <img
                  src={collaborator.userData?.avatar || "/default-avatar.png"}
                  alt={collaborator.userData?.displayname || "User Avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-red-800">
                    {collaborator.userData?.displayname || collaborator.user}
                  </p>
                  <p className="text-sm text-gray-600">{collaborator.userData?.email || ""}</p>
                </div>
              </div>

              {/* Role Display */}
              <div className="flex items-center space-x-2">
                {currentRole?.icon}
                <span className="text-sm font-medium capitalize text-gray-700">
                  {currentRole?.label}
                </span>
              </div>

              {/* Role Selector */}
              <select
                value={collaborator.role}
                onChange={(e) => handleRoleChange(collaborator, e.target.value)}
                className="p-2 text-red-800 bg-white border border-red-300 rounded-md"
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && selectedCollaborator && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-xl font-semibold mb-4 text-red-800">Confirm Role Change</h3>
            <p className="mb-4 text-gray-700">
              Are you sure you want to change{" "}
              <span className="font-semibold">{selectedCollaborator.userData?.displayname}</span>'s
              role to <span className="font-semibold capitalize">{selectedRole}</span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmRoleChange}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesTab;
