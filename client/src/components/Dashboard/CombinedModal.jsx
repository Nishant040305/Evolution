import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
import { X } from "lucide-react";
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
  const API = new ApiDashboard();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
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

  async function fetchVersionHistory() {
    try {
      const response = await API.getProjectVersionHistory(project._id);
      setVersionHistory(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch version history:", error);
    }
  }

  useEffect(() => {
    fetchVersionHistory();
  }, [project._id]);

  const handleRevertVersion = async (version) => {
    try {
      await API.revertProjectVersion(project._id, version);
      await fetchVersionHistory();
      toast.success(`Reverted to version: ${version}`);
    } catch (error) {
      console.error("Failed to revert version:", error);
    }
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      keywords: value.split(",").map((keyword) => keyword.trim()), // Split the string into an array of keywords
    }));
  };
    
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-50 bg-black-200">
  {/* Cancel Button at Top Right */}

  
  {/* Modal Content */}
  <div className="flex w-full max-w-4xl p-6 rounded-lg shadow-lg bg-red-50 relative">
  <div className="bg-white rounded-lg">
    <button
      onClick={handleCancel}
      className="absolute text-gray-500 right-4 top-4 z-10 hover:text-gray-950"
                style={{ padding: "0.5rem", background: "transparent" }} 
    >
      <X className="w-5 h-5" />
    </button>
  </div>
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
      {activeTab === "settings" && (
        <SettingsTab
          updatedProject={updatedProject}
          handleKeywordChange={handleKeywordChange}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
        ></SettingsTab>
      )}
      {activeTab === "analytics" && <AnalyticsTab project={project}></AnalyticsTab>}
      {activeTab === "collaborators" && <ManageCollaboratorsTab project={project._id} toast={toast}></ManageCollaboratorsTab>}
      {activeTab === "roles" && <RolesTab project={project._id} toast={toast}></RolesTab>}
      {activeTab === "versionHistory" && (
        <VersionHistoryTab versionHistory={versionHistory} handleRevertVersion={handleRevertVersion}></VersionHistoryTab>
      )}
    </div>
  </div>
</div>

  );
};

export default CombinedProjectModal;
