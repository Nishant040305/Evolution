import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/Dashboard/Topbar';
import Modal from '../components/Dashboard/Modal';
import CreateProjectForm from '../components/Dashboard/CreateProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import ApiDashboard from '../scripts/API.Dashboard';
import User from '../scripts/API.User';
import url from '../url.json';
import { toast, ToastContainer } from 'react-toastify';
import useProjects from '../hooks/useProjectDashboard';
import ProjectList from '../components/Dashboard/ProjectList';

import 'react-toastify/dist/ReactToastify.css';
import { setPresentChat ,setChats} from '../Store/Chat';

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userInfo._id);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSharedView, setIsSharedView] = useState(false);
  const dispatch = useDispatch();
  const API = new ApiDashboard();
  const APIUser = new User(userId);

  const {
    projects,
    sharedProjects,
    filteredProjects,
    sharedFilteredProjects,
    setProjects,
    setSearchQuery,
    isLoading,
    error,
  } = useProjects(userId, APIUser);

  const handleCreateProject = async (newProject) => {
    try {
      const createdProject = await API.getProjectById(newProject._id);
      setProjects((prev) => [createdProject, ...prev]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };
  const onUpdateProject = async (projectId, updatedProject) => {
    try {
      setProjects((prev) =>
        prev.map((p) =>
          p?._id === projectId ? { ...p, ...updatedProject } : p
        )
      );
      toast.success('Project updated successfully.');
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };
  const handleDeleteProject = async (projectId) => {
    try {
      await API.deleteProject(projectId);
      toast.success('Project deleted successfully.');
      setProjects((prev) => prev.filter((p) => p?._id !== projectId));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };
  const handleProjectClick = (projectID) => {
    let group = projects.find((p)=>p._id==projectID);
    if(!group){
      group = sharedProjects.find((p)=>p._id==projectID);
    }
    console.log(group);
    dispatch(setPresentChat({chatId:group.groupChatId,userId:userId}));
    navigate(url.WebsiteBuilder.replace(':projectID', projectID));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <TopBar setSearchQuery={setSearchQuery} />
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setIsSharedView(false)}
            className={`px-4 py-2 rounded ${
              !isSharedView
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            My Projects
          </button>
          <button
            onClick={() => setIsSharedView(true)}
            className={`px-4 py-2 rounded ${
              isSharedView
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Shared With Me
          </button>
        </div>
        <ProjectList
          isSharedView={isSharedView}
          filteredProjects={filteredProjects}
          sharedFilteredProjects={sharedFilteredProjects}
          onCreate={() => setIsCreateModalOpen(true)}
          onDelete={handleDeleteProject}
          onUpdate={onUpdateProject}
          onProjectClick={handleProjectClick}
          isLoading={isLoading}
          toast={toast}
        />
      </div>
      <Modal isOpen={isCreateModalOpen} onClose={setIsCreateModalOpen}>
        <CreateProjectForm
          onCreateProject={handleCreateProject}
          toast={toast}
        />
      </Modal>
    </div>
  );
};

export default ProjectDashboard;
