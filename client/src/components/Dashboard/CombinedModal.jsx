import React, { useState } from "react";
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

  const handleRoleChange = (index, newRole) => {
    const updatedAssignments = [...roleAssignments];
    updatedAssignments[index].role = newRole;
    setRoleAssignments(updatedAssignments);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-opacity-50 bg-black-200">
      <div className="flex w-full max-w-4xl p-6 rounded-lg shadow-lg bg-red-50">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-300">
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full p-4 text-left ${
              activeTab === "settings" ? "bg-red-200 font-semibold" : ""
            }`}
          >
            Project Settings
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full p-4 text-left ${
              activeTab === "analytics" ? "bg-red-200 font-semibold" : ""
            }`}
          >
            Project Analytics
          </button>
          <button
            onClick={() => setActiveTab("manageCollaborators")}
            className={`w-full p-4 text-left ${
              activeTab === "manageCollaborators"
                ? "bg-red-200 font-semibold"
                : ""
            }`}
          >
            Manage Collaborators
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`w-full p-4 text-left ${
              activeTab === "roles" ? "bg-red-200 font-semibold" : ""
            }`}
          >
            Roles
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === "settings" && renderSettingsTab()}
          {activeTab === "analytics" && renderAnalyticsTab()}
          {activeTab === "manageCollaborators" &&
            renderManageCollaboratorsTab()}
          {activeTab === "roles" && renderRolesTab()}
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombinedProjectModal;
