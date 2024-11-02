import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { API } from "./apiService";
import TopBar from "../components/Dashboard/Topbar";
import ProjectCard from "../components/Dashboard/ProjectCard";
import Modal from "../components/Dashboard/Modal";
import CreateProjectForm from "../components/Dashboard/CreateProjectForm";
import { useSelector } from "react-redux";
import ApiDashboard from "../scripts/API.Dashboard";
import User from "../scripts/API.User";
const ProjectDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(state=>state.user.userInfo._id)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = new ApiDashboard();
  let APIUser = new User(user);
  useEffect(() => {
    APIUser = new User(user);
    fetchProjects();
    
  }, [user]);

  useEffect(() => {
    const filterProjects = async () => {
      try {
        const results = searchQuery
          ? projects.filter((project) =>
              project.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : projects;
        setFilteredProjects(results);
      } catch (err) {
        console.error("Error searching projects:", err);
        setError("Failed to search projects");
      }
    };
    filterProjects();
  }, [searchQuery, projects]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const data = await APIUser.getAllUsersProject();
      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (newProject) => {
    try {
      console.log(newProject)
      const createdProject = await API.createProject(newProject);
      setProjects((prev) => [...prev, createdProject]);
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.deleteProject(projectId)
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`main/${user}/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center justify-center h-64 gap-4 p-6 transition-colors bg-white border-2 border-red-300 border-dashed rounded-lg cursor-pointer hover:border-red-500"
          >
            Create New Project
          </button>

          {isLoading ? (
            <div className="col-span-3 py-12 text-center">
              Loading projects...
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
                onClick={handleProjectClick}
              />
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateProjectForm onCreateProject={handleCreateProject} />
      </Modal>
    </div>
  );
};

export default ProjectDashboard;
