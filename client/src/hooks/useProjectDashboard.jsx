import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const useProjects = (userId, APIUser) => {
  const [projects, setProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [sharedFilteredProjects, setSharedFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const organizationChanges = useSelector((state) => state.organization);
  const [mounted, setMounted] = useState(false);
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
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchProjects(); // Refetch projects when dependencies change
    } else {
      setMounted(true); // Set mounted to true after first render
    }
  }, [userId, organizationChanges, mounted]); // Dependencies include mounted to trigger on first load

  useEffect(() => {
    const filterProjects = () => {
      console.log(projects);
      const results = searchQuery
        ? projects.filter((project) =>
            project?.name.toLowerCase().includes(searchQuery.toLowerCase())
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
