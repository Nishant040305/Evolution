import React, { useState } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";
import { useSelector } from "react-redux";

const CreateProjectForm = ({ onCreateProject }) => {
  const user = useSelector((state) => state.user.userInfo._id);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
  });
  const [collaborators, setCollaborators] = useState([{ email: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API = new ApiDashboard();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleCollaboratorChange = (index, value) => {
    const newCollaborators = [...collaborators];
    newCollaborators[index].email = value;
    setCollaborators(newCollaborators);
  };

  const addCollaboratorField = () => {
    setCollaborators([...collaborators, { email: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return setMessage("Project name is required.");

    setLoading(true);
    setMessage("");

    try {
      // Create Project
      const projectData = { ...newProject, user };
      await API.createProject(projectData);

      setMessage("Project created successfully!");

      // Invite Collaborators
      await Promise.all(
        collaborators
          .filter((collab) => collab.email.trim())
          .map((collab) =>
            API.inviteCollaborator({
              projectId: projectData.id,
              email: collab.email,
            })
          )
      );

      setMessage("Collaborators invited successfully.");
      onCreateProject(projectData);

      // Reset form
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
      });
      setCollaborators([{ email: "" }]);
    } catch (error) {
      setMessage("Error creating project or inviting collaborators.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-red-600">
        Create New Project
      </h2>

      {message && <p className="mb-4 text-center text-green-500">{message}</p>}

      <input
        type="text"
        name="name"
        value={newProject.name}
        onChange={handleInputChange}
        placeholder="Project Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        required
      />
      <textarea
        name="description"
        value={newProject.description}
        onChange={handleInputChange}
        placeholder="Project Description"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        required
      />

      <h3 className="mb-2 text-lg font-semibold text-red-600">
        Invite Collaborators
      </h3>
      {collaborators.map((collaborator, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="email"
            placeholder="Collaborator Email"
            value={collaborator.email}
            onChange={(e) => handleCollaboratorChange(index, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addCollaboratorField}
        className="w-full py-2 mt-2 mb-4 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        + Add Collaborator
      </button>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};

export default CreateProjectForm;
