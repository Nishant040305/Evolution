import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const Project = ({ projectId }) => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch project data (future-proof for backend)
  const fetchProjectData = async () => {
    try {
      // Simulate an API call with dummy data for now
      const fetchedProjectData = {
        title: "Project A",
        description: "This is a description of Project A",
        url: "#",
        stars: 42,
      };
      setProjectData(fetchedProjectData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching project data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return <div className="text-center text-[#c9d1d9]">Loading project...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
      <div className="flex items-center justify-between mb-2">
        <a
          href={projectData.url}
          className="text-[#c9d1d9] font-medium hover:underline"
        >
          {projectData.title}
        </a>
        <div className="flex items-center space-x-2 text-[#7d8590]">
          <Star className="w-4 h-4" />
          <span>{projectData.stars}</span>
        </div>
      </div>
      <p className="text-[#7d8590]">{projectData.description}</p>
    </div>
  );
};

export default Project;
