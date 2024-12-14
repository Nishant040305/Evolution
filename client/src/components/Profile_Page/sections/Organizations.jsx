import React, { useState, useEffect } from "react";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch organization data (future-proof for backend)
  const fetchOrganizationsData = async () => {
    try {
      // Simulating an API call with dummy data for now
      const fetchedOrganizations = [
        { name: "techcorp", url: "#" },
        { name: "opensourcr", url: "#" },
      ];
      setOrganizations(fetchedOrganizations);
      setLoading(false);
    } catch (err) {
      setError("Error fetching organization data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchOrganizationsData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-[#c9d1d9]">Loading organizations...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#161b22] rounded-md p-4 border border-[#30363d] mt-4">
      <h3 className="text-sm font-medium text-[#c9d1d9] mb-4">Organizations</h3>
      <div className="flex flex-wrap gap-4">
        {organizations.map((org, index) => (
          <a
            key={index}
            href={org.url}
            className="bg-[#0d1117] rounded-md px-3 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
          >
            @{org.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
