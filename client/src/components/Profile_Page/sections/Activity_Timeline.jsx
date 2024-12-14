import { useState, useEffect } from "react";
import { GitCommit, GitPullRequest } from "lucide-react";

const ActivityTimeline = () => {
  const [activityData, setActivityData] = useState([]); // State for storing activity data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch activity data (this will be easy to replace with a backend API call later)
  const fetchActivityData = async () => {
    try {
      // For now, using dummy data
      const mockData = [
        {
          type: "commit",
          message: "Fixed bug in login flow",
          date: "2023-05-01",
        },
        {
          type: "pr",
          message: "Implemented new feature",
          date: "2023-04-20",
        },
        {
          type: "commit",
          message: "Refactored codebase",
          date: "2023-03-15",
        },
      ];

      // Simulating a delay to mimic an API call
      setTimeout(() => {
        setActivityData(mockData);
        setLoading(false);
      }, 1000); // 1 second delay for demo
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  // Call the fetch function on component mount
  useEffect(() => {
    fetchActivityData();
  }, []);

  if (loading) {
    return <div className="text-center text-[#c9d1d9]">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
      <h3 className="text-sm font-medium text-[#c9d1d9] mb-4">
        Activity Timeline
      </h3>
      <div className="space-y-4">
        {activityData.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3">
            {activity.type === "commit" ? (
              <GitCommit className="w-5 h-5 text-[#7d8590]" />
            ) : (
              <GitPullRequest className="w-5 h-5 text-[#7d8590]" />
            )}
            <div>
              <p className="text-[#c9d1d9]">{activity.message}</p>
              <p className="text-[#7d8590] text-sm">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
