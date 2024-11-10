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
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [collaborator, setCollaborator] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API = new ApiDashboard();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };
  const handleCollaboratorEmailChange = async (e) => {
    console.log(e.target.value);
    const email = e.target.value;
    setCollaboratorEmail(e.target.value);
    if (email.length>0) {
      try {
        console.log("TEst",email)
        const userData = await API.FindUserByEmail(email); // API call to get user by email
        console.log("userData",userData)
        setCollaborator(userData);
        console.log(userData);
      } catch(e) {
        console.log(e)
        setCollaborator(null);
      }
    } else {
      setCollaborator(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return setMessage("Project name is required.");

    setLoading(true);
    setMessage("");

    try {
      // Create Project
      const projectData = await API.createProject({ ...newProject, user });
      setMessage("Project created successfully!");
      console.log(collaborator)
      // Invite Collaborator if email is valid and collaborator is found
      if (collaborator) {
        await API.inviteCollaborator(
          projectData._id,
          "editor",
           collaborator._id,
        );
        setMessage("Collaborator invited successfully.");
      }

      onCreateProject(projectData);

      // Reset form
      setNewProject({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "Medium",
      });
      setCollaboratorEmail("");
      setCollaborator(null);
    } catch (error) {
      console.log(error)
      setMessage("Error creating project or inviting collaborator.");
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
        Invite Collaborator
      </h3>
      <input
        type="email"
        placeholder="Collaborator Email"
        value={collaboratorEmail}
        onChange={(e)=>handleCollaboratorEmailChange(e)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      {collaborator && (
        <p className="text-sm text-green-500">Collaborator found: {collaborator.name}</p>
      )}
      {!collaborator && collaboratorEmail && (
        <p className="text-sm text-red-500">No user found with this email</p>
      )}

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
