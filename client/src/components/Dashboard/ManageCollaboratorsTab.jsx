import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard"; // Assuming the API methods are in this file
import { FaUser, FaUserShield, FaUserEdit } from "react-icons/fa";
import {FaHourglassHalf} from "react-icons/fa";
import { SocketRefreshOrganizationChanges, SocketSendNotificationToUser } from "../../event/SocketEvent";
const ManageCollaboratorsTab = ({ project, toast}) => {
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState("");
  const [newCollaboratorRole, setNewCollaboratorRole] = useState("editor");
  const [message, setMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // To show/hide confirmation popup
  const [userDetails, setUserDetails] = useState(null);  // Holds the matched user details for confirmation
  const [collaborators, setCollaborators] = useState([]);
  const API = new ApiDashboard();
  const roleIcons = {
    "editor": <FaUserShield />,
    "viewer": <FaUser />,
    "owner": <FaUserEdit />
  };

  // Fetch suggestions based on email input
  const fetchUserDetails = async (email) => {
    if (!email.trim()) {
      setUserDetails(null);  // Clear user details if input is empty
      return;
    }
    try {
      const userData = await API.FindUserByEmail(email);
      setUserDetails(userData || null);  // Set user data or null if not found
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetails(null);
    }
  };

  // Handle adding a collaborator
  const handleAddCollaborator = async () => {
    try {
      if (!newCollaboratorEmail.trim()){
        toast.warning("Please provide an email.");
      };

      // Fetch user by email for confirmation
      const userData = await API.FindUserByEmail(newCollaboratorEmail);
      if (!userData) return setMessage("User not found.");

      // Set the user details to show the confirmation modal
      setUserDetails(userData);
      setShowConfirmationModal(true);  // Show confirmation modal
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user details.");
    }
  };

  // Confirm collaborator addition
  const handleConfirmAddCollaborator = async () => {
    try {
      if (!userDetails) return;

      // Invite collaborator to the project
      const projectID = project;  // Assuming project has an _id
      const response =await API.inviteCollaborator(projectID, newCollaboratorRole, userDetails._id);
      SocketSendNotificationToUser(response.Notification);
      SocketRefreshOrganizationChanges(projectID);
      // Add collaborator to the collaborators list
      setCollaborators(prevCollaborators => [
        ...prevCollaborators,
        { user: userDetails._id,status:"pending", role: newCollaboratorRole, userData:userDetails }
      ]);
      setNewCollaboratorEmail("");
      setUserDetails(null);  // Reset user details
      setShowConfirmationModal(false);  // Hide the confirmation modal
      toast.success(`${userDetails.displayname} added as a collaborator successfully.`);
    } catch (error) {
      console.error(error);
      toast.error("Error adding collaborator.");
    }
  };

  // Handle canceling collaborator addition
  const handleCancelAddCollaborator = () => {
    setShowConfirmationModal(false);  // Hide the confirmation modal without adding the user
    setUserDetails(null);  // Reset user details
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewCollaboratorEmail(email);
    fetchUserDetails(email);  // Fetch user suggestions when email changes
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      const collaborate = await API.getProjectById(project);
      setCollaborators(collaborate.members);
      if(collaborate.members.length === 0){
        return;
      }
      try {
        const collaboratorsWithDetails = await Promise.all(
          collaborate.members.map(async (collaborator) => {
            const userData = await API.FindUserByID(collaborator.user); // Fetch user data by ID
            return {
              ...collaborator,
              userData,
            };
          })
        );
        setCollaborators(collaboratorsWithDetails); // Update state with detailed collaborators
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators(); // Call the function to fetch collaborators
  }, [project]);
  const handleRemoveCollaborator = async (id) => {
    try{
      await API.DeleteCollaborator(project,id);
      setCollaborators(collaborators.filter(c => c.user !== id));
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Manage Collaborators
      </h2>

      {/* Display message */}
      {message && <div className="mb-4 text-gray-500">{message}</div>}

      {/* Add Collaborator Section */}
      <div className="relative flex items-center mb-4 space-x-2">
        <input
          type="email"
          value={newCollaboratorEmail}
          onChange={handleEmailChange}
          placeholder="Collaborator Email"
          className="p-2 border border-gray-300 rounded-md"
        />

        {/* Show the user details if found */}
        {userDetails && (
          <div className="absolute top-full left-0 mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-md w-full max-w-xs z-10">
            <div className="flex items-center space-x-3">
              <img
                src={userDetails.avatar || "/path/to/default-avatar.png"} // Use default avatar if none available
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{userDetails.displayname}</p>
                <p className="text-gray-500 text-sm">{userDetails.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddCollaborator}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Confirm to Add
            </button>
          </div>
        )}

        <select
          value={newCollaboratorRole}
          onChange={(e) => setNewCollaboratorRole(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>
        <button
          type="button"
          onClick={handleAddCollaborator}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          Add Collaborator
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && userDetails && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Collaborator</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={userDetails.avatar || "/path/to/default-avatar.png"}  // Use default avatar if none available
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{userDetails.displayname}</p>
                <p className="text-gray-500 text-sm">{userDetails.email}</p>
              </div>
            </div>

            <p className="mb-4 text-sm text-gray-600">Are you sure you want to add {userDetails.displayname} as a collaborator?</p>

            {/* Confirm and Cancel Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleConfirmAddCollaborator}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelAddCollaborator}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaborators List */}
      {collaborators.length === 0 ? (
        <div className="mb-4 text-gray-500">
          No collaborators added yet. Click "Add Collaborator" to invite someone.
        </div>
      ) : (
        <div>
          <h3 className="mb-3 text-xl font-semibold text-red-600">Current Collaborators</h3>
          {collaborators.map((collaborator) => (
            <div
              key={collaborator.user}
              className="flex items-center justify-between mb-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Collaborator details */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={collaborator.userData?.avatar || "default-avatar-url"} // Replace with actual avatar URL
                    alt={collaborator.userData?.displayname || "User Avatar"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-base font-medium text-gray-900">
                    {collaborator.userData?.displayname || "Unknown User"}
                  </div>
                  <div className="text-xs text-gray-600">{collaborator.userData?.email}</div>
                </div>
              </div>

              {/* Collaborator Role */}
              <div className="text-lg text-yellow-500 font-semibold">
                {roleIcons[collaborator.role]}
              </div>
              
              
              <div>
                {collaborator.status=="pending"?
                (
                  <div className="flex items-center space-x-1 text-yellow-500">
                      <FaHourglassHalf className="h-5 w-5" /> {/* Pending Icon */}
                      <span>Pending</span>
                  </div>
                ):
                (<button
                  type="button"
                  onClick={() => handleRemoveCollaborator(collaborator.user)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                >
                  Remove
                </button>)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCollaboratorsTab;
