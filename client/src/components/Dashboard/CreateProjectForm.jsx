import React, { useState } from 'react';
import ApiDashboard from '../../scripts/API.Dashboard';
import { useSelector } from 'react-redux';
import { FaUser, FaUserShield, FaUserEdit } from 'react-icons/fa';
import { SocketSendNotificationToUser } from '../../event/SocketEvent';
const CreateProjectForm = ({ onCreateProject, toast }) => {
  const user = useSelector((state) => state.user.userInfo._id);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
  });
  const [collaborators, setCollaborators] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentRole, setCurrentRole] = useState('editor');
  const [potentialCollaborator, setPotentialCollaborator] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userID = useSelector((state) => state.user.userInfo._id);
  const API = new ApiDashboard();
  const roleIcons = {
    admin: <FaUserShield className="inline mr-2 text-red-500" />,
    editor: <FaUserEdit className="inline mr-2 text-yellow-500" />,
    viewer: <FaUser className="inline mr-2 text-blue-500" />,
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value;
    setCurrentEmail(email);

    if (email.length > 0) {
      try {
        const userData = await API.FindUserByEmail(email);
        setPotentialCollaborator(userData);
      } catch (error) {
        setPotentialCollaborator(null);
      }
    } else {
      setPotentialCollaborator(null);
    }
  };

  const handleAddCollaborator = () => {
    if (potentialCollaborator) {
      const isAlreadyAdded = collaborators.some(
        (collab) => collab._id === potentialCollaborator._id
      );
      if (potentialCollaborator._id === userID) {
        setPotentialCollaborator(null);
        setCurrentEmail('');
        setCurrentRole('editor');
        return;
      }
      if (!isAlreadyAdded) {
        setCollaborators((prev) => [
          ...prev,
          { ...potentialCollaborator, role: currentRole },
        ]);
        setPotentialCollaborator(null);
        setCurrentEmail('');
        setCurrentRole('editor');
      } else {
        setCollaborators((prev) =>
          prev.filter((collab) => collab._id !== potentialCollaborator._id)
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return setMessage('Project name is required.');

    setLoading(true);
    setMessage('');

    try {
      // Create Project
      const projectData = await API.createProject({ ...newProject, user });
      toast.success('Project created successfully!');
      // Invite each collaborator
      for (const collaborator of collaborators) {
        const response = await API.inviteCollaborator(
          projectData._id,
          collaborator.role,
          collaborator._id
        );
        SocketSendNotificationToUser(response.Notification);
      }
      setMessage('Collaborators invited successfully.');
      onCreateProject(projectData);

      // Reset form
      setNewProject({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'Medium',
      });
      setCollaborators([]);
    } catch (error) {
      console.error(error);
      setMessage('Error creating project or inviting collaborators.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 relative">
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

      <h3 className="mb-2 text-lg font-semibold text-red-600">Collaborators</h3>

      {/* Selected Collaborators List */}
      <div className="space-y-2 mb-4">
        {collaborators.map((collab, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-white border border-gray-300 rounded-md shadow-sm"
          >
            <img
              src={collab.avatar}
              alt={`${collab.displayname}'s Avatar`}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
            <div className="text-sm">
              <p className="font-medium text-gray-800">{collab.displayname}</p>
              <p className="text-gray-600">{collab.email}</p>
              <p className="text-gray-500">
                {roleIcons[collab.role]} Role: {collab.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="email"
            placeholder="Collaborator Email"
            value={currentEmail}
            onChange={handleEmailChange}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          />
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Dynamic Popup for Potential Collaborator */}
        {potentialCollaborator && (
          <div
            className="absolute top-full mt-2 left-0 right-0 p-2 bg-white border border-gray-300 rounded-md shadow-md cursor-pointer"
            onClick={handleAddCollaborator}
          >
            <div className="flex items-center space-x-3">
              <img
                src={potentialCollaborator.avatar}
                alt={`${potentialCollaborator.displayname}'s Avatar`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  {potentialCollaborator.displayname}
                </p>
                <p className="text-gray-600">{potentialCollaborator.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
      >
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
};

export default CreateProjectForm;
