import React, { useState, useEffect } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
import server from "../../server.json";
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
  console.log(project)
  const [activeTab, setActiveTab] = useState("settings");
  const [emailInput, setEmailInput] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const [updatedProject, setUpdatedProject] = useState({
    name: project.name,
    description: project.description,
    keywords: project.keywords,
    domain: project.domain,
  });
  const [timeScale, setTimeScale] = useState("month"); // Default view by month
  const convertTimeToDate = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date(); // Get today's date
    now.setHours(hours, minutes, 0, 0); // Set the time to the given hours and minutes
    return now;
  };
  
  const [collaborators, setCollaborators] = useState(
    [...project.members]
  );
  const [roleAssignments, setRoleAssignments] = useState([
   [...project.members]
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
  const renderManageCollaboratorsTab = (projectId) => {
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
  

  const renderRolesTab = () => {
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
