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
  const [timeScale, setTimeScale] = useState("month"); // Default view by month
  const convertTimeToDate = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date(); // Get today's date
    now.setHours(hours, minutes, 0, 0); // Set the time to the given hours and minutes
    return now;
  };
  
  const [collaborators, setCollaborators] = useState(
    project.collaborators || [{ email: "" }]
  );

  const [roleAssignments, setRoleAssignments] = useState([
    { email: "john.doe@example.com", role: "Admin" },
    { email: "jane.smith@example.com", role: "Editor" },
    { email: "samuel.green@example.com", role: "Viewer" },
  ]);

  const [analyticsData, setAnalyticsData] = useState({
    views: project.analytics.views.length, // Total views as an example
    viewHistory: project.analytics.views, // Dummy data for views over time
  });

// Group views by time scale (day, month, year, hour, or minute)
// Function to group views by time scale (day, month, year, hour, or minute)
const groupViewsByTime = (views, scale) => {
  const groupedData = {};

  views.forEach(view => {
    // Check if the input is an ISO timestamp or time string and convert accordingly
    let timestamp;
    if (typeof view === "string" && view.includes("T")) {
      // If the view is an ISO string (like 2024-11-09T13:29:23.228Z)
      timestamp = new Date(view);
    } else {
      // If it's a time string in HH:mm format (e.g., "14:30")
      timestamp = convertTimeToDate(view);
    }

    // Check if the timestamp is valid
    if (isNaN(timestamp)) {
      console.error(`Invalid time value: ${view}`);
      return; // Skip invalid time value
    }

    let key;

    // Group views by selected time scale
    switch (scale) {
      case "day":
        key = timestamp.toISOString().split("T")[0]; // YYYY-MM-DD
        break;
      case "month":
        key = `${timestamp.getFullYear()}-${timestamp.getMonth() + 1}`; // YYYY-MM
        break;
      case "year":
        key = `${timestamp.getFullYear()}`; // YYYY
        break;
      case "hour":
        key = `${timestamp.toISOString().split("T")[0]} ${timestamp.getHours()}`; // YYYY-MM-DD HH
        break;
      case "minute":
        key = `${timestamp.toISOString().split("T")[0]} ${timestamp.getHours()}:${timestamp.getMinutes()}`; // YYYY-MM-DD HH:mm
        break;
      default:
        key = timestamp.toISOString().split("T")[0]; // Default to day grouping
    }

    // Group views by the selected time key
    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key]++;
  });

  // Convert grouped data to arrays for chart rendering
  const labels = Object.keys(groupedData);
  const data = Object.values(groupedData);

  return { labels, data };
};
    const { labels, data } = groupViewsByTime(analyticsData.viewHistory, timeScale);
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
      labels, // Dynamically set based on the selected time scale
      datasets: [
        {
          label: "Views Over Time",
          data,
          borderColor: "#f44336",
          backgroundColor: "rgba(244, 67, 54, 0.2)",
          fill: true,
        },
      ],
    };
    
    // Chart options to handle small datasets and responsive behavior
    const chartOptions = {
      responsive: true, // Makes the chart responsive to window resizing
      maintainAspectRatio: false, // Allows the chart to adjust to available space
      scales: {
        x: {
          // Automatically adjust the ticks on the x-axis based on the data
          ticks: {
            autoSkip: true, // Skip ticks for smaller datasets
            maxRotation: 45, // Rotate labels for better readability
            minRotation: 0,
          },
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          // Dynamically adjusts the y-axis scale based on the dataset
          beginAtZero: true,
          ticks: {
            min: 0, // Ensures the y-axis doesn't go below 0
            stepSize: 1, // Adjust step size for sparse data
          },
          title: {
            display: true,
            text: "Views",
          },
        },
      },
      plugins: {
        tooltip: {
          mode: 'index', // Shows tooltip for each data point
          intersect: false,
        },
        legend: {
          position: 'top', // Places the legend at the top
        },
      },
    };
    

    return (
      <div>
        <h2 className="mb-4 text-lg font-semibold text-red-800">
          Project Analytics
        </h2>
        <p>Total Views: {analyticsData.views}</p>
        <div className="chart-container" style={{width:610,height:400}}>
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="time-scale-selector mt-4">
        <button
            onClick={() => setTimeScale("minute")}
            className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
              timeScale === "day" ? "font-semibold" : ""
            }`}
          >
            Minutes
          </button>
          <button
            onClick={() => setTimeScale("hour")}
            className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
              timeScale === "month" ? "font-semibold" : ""
            }`}
          >
          Hours
        </button>
          <button
            onClick={() => setTimeScale("day")}
            className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
              timeScale === "day" ? "font-semibold" : ""
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeScale("month")}
            className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
              timeScale === "month" ? "font-semibold" : ""
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeScale("year")}
            className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
              timeScale === "year" ? "font-semibold" : ""
            }`}
          >
            Year
          </button>
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
