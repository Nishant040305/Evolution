import React, { useState, useEffect } from "react";
import { Calendar, GitCommit, GitPullRequest, Star } from "lucide-react";

// Dummy stats for now, can later be replaced with data from an API
const dummyStats = [
  { icon: GitCommit, label: "Commits", value: "2,431" },
  { icon: GitPullRequest, label: "Pull Requests", value: "147" },
  { icon: Star, label: "Stars Earned", value: "328" },
  { icon: Calendar, label: "Streak", value: "45 days" },
];

export default function ContributionSection() {
  const [stats, setStats] = useState([]);
  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch stats and contribution data (future-proof for API)
  const fetchContributionData = async () => {
    try {
      // For now, use dummy data
      const fetchedStats = dummyStats;
      const fetchedContributionData = Array.from({ length: 52 }).map(() =>
        Array.from({ length: 7 }).map(() => Math.floor(Math.random() * 4))
      );

      setStats(fetchedStats);
      setContributionData(fetchedContributionData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  // Call fetch function on component mount
  useEffect(() => {
    fetchContributionData();
  }, []);

  if (loading) {
    return <div className="text-center text-[#c9d1d9]">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[896px] mx-auto mt-6 space-y-6">
      {/* Stats Display */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161b22] rounded-md p-4 border border-[#30363d]"
          >
            <div className="flex items-center space-x-2 text-[#7d8590] mb-2">
              <stat.icon className="w-4 h-4" />
              <span className="text-sm">{stat.label}</span>
            </div>
            <div className="text-xl font-semibold text-[#c9d1d9]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Contributions Graph */}
      <div className="bg-[#161b22] rounded-md p-4 border border-[#30363d]">
        <h3 className="text-sm font-medium text-[#c9d1d9] mb-4">
          2,847 contributions in the last year
        </h3>
        <div className="overflow-x-auto">
          <div className="contribution-graph min-w-[720px] h-[120px] flex items-end">
            {contributionData.map((weekData, weekIndex) => (
              <div key={weekIndex} className="flex flex-col-reverse space-y-1">
                {weekData.map((intensity, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-[10px] h-[10px] m-[2px] rounded-sm ${
                      intensity === 0
                        ? "bg-[#161b22] border border-[#1b1f23]"
                        : intensity === 1
                        ? "bg-[#0e4429]"
                        : intensity === 2
                        ? "bg-[#006d32]"
                        : "bg-[#26a641]"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
