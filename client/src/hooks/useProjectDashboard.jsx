import { useEffect, useState } from "react";

const useProjects = (userId, APIUser) => {
  const [projects, setProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sharedFilteredProjects, setSharedFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const personalProjects = await APIUser.getAllUsersProject();
      const fetchedSharedProjects = await APIUser.getAllSharedProjects();
      setProjects(personalProjects);
      setFilteredProjects(personalProjects);
      setSharedProjects(fetchedSharedProjects);
      setSharedFilteredProjects(fetchedSharedProjects);
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [userId]);

  useEffect(() => {
    const filterProjects = () => {
      const results = searchQuery
        ? projects.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : projects;
      setFilteredProjects(results);

      const sharedResults = searchQuery
        ? sharedProjects.filter((project) =>
            project.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : sharedProjects;
      setSharedFilteredProjects(sharedResults);
    };

    filterProjects();
  }, [searchQuery, projects, sharedProjects]);

  return {
    projects,
    sharedProjects,
    filteredProjects,
    sharedFilteredProjects,
    setProjects,
    setSearchQuery,
    isLoading,
    error,
  };
};

export default useProjects;
