import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
// import server from "../../server.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SettingsTab from "./SettingsTab";
import AnalyticsTab from "./AnalyticsTab";
import RolesTab from "./RolesTab";
import VersionHistoryTab from "./VersionHistoryTab";
import ManageCollaboratorsTab from "./ManageCollaboratorsTab";
// Registering the chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CombinedProjectModal = ({ project, onClose, onUpdate,toast }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [emailInput, setEmailInput] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [updatedProject, setUpdatedProject] = useState({
    name: project.name,
    description: project.description,
    keywords: project.keywords,
    domain: project.domain,
  });
  const [versionHistory, setVersionHistory] = useState([{version:"1.0.0",date:"2023-01-01"},{version:"2.0.0",date:"2023-02-01"},{version:"3.0.0",date:"2023-03-01"}]);  
  const [collaborators, setCollaborators] = useState(
    [...project.members]
  );
  const [roleAssignments, setRoleAssignments] = useState([
   [...project.members]
  ]);
  const handleRoleChange = (index, value) => {
    const newRoleAssignments = [...roleAssignments];
    newRoleAssignments[index].role = value;
    setRoleAssignments(newRoleAssignments);
  };
  const API = new ApiDashboard();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCollaboratorChange = (index, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index].email = value;
    setCollaborators(newCollaborators);
  };

  const removeCollaborator = (index) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(newCollaborators);
  };

  const handleSave = async() => {
    await API.updateProject(project._id, updatedProject);
    onUpdate(project._id, updatedProject);
    for(let i=0;i<updatedProject.members.length;i++){
      if(updatedProject.members[i].role!=roleAssignments[i].role){
        await API.UpdateCollaboratorRole(project._id,updatedProject.members[i].user,roleAssignments[i].role)
      }
    onClose();
  };}

  const handleCancel = () => {
    onClose(); // Close the modal without saving
  };

  const handleRevertVersion = (version) => {
    // Logic to revert to a selected version
    // You can implement an API call to fetch that specific version's data
    console.log("Reverted to version: ", version);
    toast.success(`Reverted to version: ${version}`);
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      keywords: value.split(",").map((keyword) => keyword.trim()), // Split the string into an array of keywords
    }));
  };
 

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    fetchUserSuggestions(value);
  };
  
  const handleSelectUser = (user) => {
    // When a user clicks on a suggestion, autofill the email input
    setEmailInput(user.email);
    setUserSuggestions([]); // Clear suggestions after selection
  };
  
  const handleRemoveCollaborator = async (collaboratorIndex) => {
    const collaborator = collaborators[collaboratorIndex];
    try {
      await API.DeleteCollaborator(project._id, collaborator.user); // Call API to delete collaborator
      removeCollaborator(collaboratorIndex); // Remove collaborator from state
    } catch (error) {
      console.error("Error deleting collaborator:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 bg-black-200">
      <div className="flex w-full max-w-4xl p-6 rounded-lg shadow-lg bg-red-50">
        {/* Sidebar */}
        <div className="w-1/4 pr-4 border-r border-gray-300">
          <button
            className={`w-full text-left p-3 rounded-md mb-2 ${
              activeTab === "settings"
                ? "bg-red-200 text-red-800"
                : "hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Project Settings
          </button>
          <button
            className={`w-full text-left p-3 rounded-md mb-2 ${
              activeTab === "analytics"
                ? "bg-red-200 text-red-800"
                : "hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
          <button
            className={`w-full text-left p-3 rounded-md mb-2 ${
              activeTab === "collaborators"
                ? "bg-red-200 text-red-800"
                : "hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("collaborators")}
          >
            Manage Collaborators
          </button>
          <button
            className={`w-full text-left p-3 rounded-md mb-2 ${
              activeTab === "roles"
                ? "bg-red-200 text-red-800"
                : "hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("roles")}
          >
            Roles
          </button>
          <button
            className={`w-full text-left p-3 rounded-md mb-2 ${
              activeTab === "versionHistory"
                ? "bg-red-200 text-red-800"
                : "hover:bg-red-100"
            }`}
            onClick={() => setActiveTab("versionHistory")}
          >
            Version History
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 pl-4">
          {activeTab === "settings" && <SettingsTab updatedProject={updatedProject} handleKeywordChange={handleKeywordChange}handleInputChange={handleInputChange}></SettingsTab>}
          {activeTab === "analytics" && <AnalyticsTab project={project}></AnalyticsTab>}
          {activeTab === "collaborators" && <ManageCollaboratorsTab project={project} toast={toast} collaborators={collaborators}handleRemoveCollaborator={handleRemoveCollaborator}></ManageCollaboratorsTab>}
          {activeTab === "roles" && <RolesTab roleAssignments={roleAssignments}handleRoleChange={handleRoleChange}></RolesTab>}
          {activeTab === "versionHistory" && <VersionHistoryTab versionHistory={versionHistory}handleRevertVersion={handleRevertVersion}></VersionHistoryTab>}

          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedProjectModal;
