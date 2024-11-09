import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
import { Line } from "react-chartjs-2"; // For displaying the graph (using dummy data)
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

const CombinedProjectModal = ({ project, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("settings");
  const [updatedProject, setUpdatedProject] = useState({
    name: project.name,
    description: project.description,
    keywords: project.keywords,
    domain: project.domain,
  });
  const [collaborators, setCollaborators] = useState(
    project.collaborators || [{ email: "" }]
  );
  const [roleAssignments, setRoleAssignments] = useState([
    { email: "john.doe@example.com", role: "Admin" },
    { email: "jane.smith@example.com", role: "Editor" },
    { email: "samuel.green@example.com", role: "Viewer" },
  ]);
  const [analyticsData, setAnalyticsData] = useState({
    views: 1500, // Total views as an example
    viewHistory: [100, 200, 150, 300, 250, 350], // Dummy data for views over time
  });

  // Version control state
  const [versionHistory, setVersionHistory] = useState([
    {
      version: "v1.0",
      date: "2024-10-01",
      description: "Initial project setup",
    },
    { version: "v1.1", date: "2024-10-15", description: "Added new features" },
    {
      version: "v1.2",
      date: "2024-11-01",
      description: "Bug fixes and improvements",
    },
  ]); // Dummy version history

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

  const addCollaboratorField = () => {
    setCollaborators([...collaborators, { email: "" }]);
  };

  const removeCollaborator = (index) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index);
    setCollaborators(newCollaborators);
  };

  const handleSave = () => {
    API.updateProject(project._id, updatedProject);
    onUpdate(project._id, updatedProject);
    onClose();
  };

  const handleCancel = () => {
    onClose(); // Close the modal without saving
  };

  const handleRevertVersion = (version) => {
    // Logic to revert to a selected version
    // You can implement an API call to fetch that specific version's data
    console.log("Reverted to version: ", version);
    alert(`Reverted to version: ${version}`);
  };

  const handleKeywordChange = (e) => {
    const { value } = e.target;
    setUpdatedProject((prevProject) => ({
      ...prevProject,
      keywords: value.split(",").map((keyword) => keyword.trim()), // Split the string into an array of keywords
    }));
  };
  const renderSettingsTab = () => (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Project Settings
      </h2>
      <input
        type="text"
        name="name"
        value={updatedProject.name}
        onChange={handleInputChange}
        placeholder="Project Name"
        className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
      />
      <textarea
        name="description"
        value={updatedProject.description}
        onChange={handleInputChange}
        placeholder="Project Description"
        className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
      />

      <div className="mb-4">
        <label
          htmlFor="keywords"
          className="block mb-2 text-sm font-semibold text-red-800"
        >
          Keywords (for Website)
        </label>
        <input
          type="text"
          name="keywords"
          value={updatedProject.keywords.join(", ")}
          string
          onChange={handleKeywordChange}
          placeholder="Enter keywords, separated by commas"
          className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
        />
        <p className="text-sm text-red-500">
          Enter keywords related to your project for better SEO optimization.
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="domain"
          className="block mb-2 text-sm font-semibold text-red-800"
        >
          Domain
        </label>
        <input
          type="text"
          name="domain"
          value={updatedProject.domain}
          onChange={handleInputChange}
          placeholder="Enter project domain"
          className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
        />
      </div>
    </div>
  );

  const renderAnalyticsTab = () => {
    const chartData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months for example
      datasets: [
        {
          label: "Views Over Time",
          data: analyticsData.viewHistory,
          borderColor: "#f44336",
          backgroundColor: "rgba(244, 67, 54, 0.2)",
          fill: true,
        },
      ],
    };

    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-red-800">
          Project Analytics
        </h2>
        <p>Total Views: {analyticsData.views}</p>
        <div>
          <Line data={chartData} />
        </div>
      </div>
    );
  };

  const renderManageCollaboratorsTab = () => (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Manage Collaborators
      </h2>
      {collaborators.map((collaborator, index) => (
        <div key={index} className="flex items-center mb-2 space-x-4">
          <input
            type="email"
            placeholder="Collaborator Email"
            value={collaborator.email}
            onChange={(e) => handleCollaboratorChange(index, e.target.value)}
            className="w-full p-2 text-red-800 border border-red-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => removeCollaborator(index)}
            className="px-3 py-1 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addCollaboratorField}
        className="w-full py-2 mb-4 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
      >
        + Add Collaborator
      </button>
    </div>
  );

  const renderRolesTab = () => {
    const roleOptions = ["Admin", "Editor", "Viewer"];

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
              <span className="text-red-800">{assignment.email}</span>
              <select
                value={assignment.role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
                className="p-1 text-red-800 bg-white border border-red-300 rounded-md"
              >
                {roleOptions.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setRoleAssignments([
              ...roleAssignments,
              { email: "", role: "Viewer" },
            ])
          }
          className="w-full py-2 mt-4 text-red-700 bg-red-100 rounded-md hover:bg-red-200"
        >
          + Add Collaborator Role
        </button>
      </div>
    );
  };

  // Render Version History Tab
  const renderVersionHistoryTab = () => (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Version History
      </h2>
      <div className="overflow-y-auto max-h-72">
        {" "}
        {/* Added scrollable container */}
        <ul className="space-y-2">
          {versionHistory.map((versionItem, index) => (
            <li
              key={index}
              className="flex justify-between p-2 bg-red-100 rounded-md"
            >
              <div>
                <strong>{versionItem.version}</strong> - {versionItem.date}
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
          {activeTab === "settings" && renderSettingsTab()}
          {activeTab === "analytics" && renderAnalyticsTab()}
          {activeTab === "collaborators" && renderManageCollaboratorsTab()}
          {activeTab === "roles" && renderRolesTab()}
          {activeTab === "versionHistory" && renderVersionHistoryTab()}

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
