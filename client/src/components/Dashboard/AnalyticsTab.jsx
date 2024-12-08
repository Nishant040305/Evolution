import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { groupViewsByTime } from "../../scripts/analyticsHelper";

const AnalyticsTab = ({ project }) => {
  const SEO = () => {
    const server = import.meta.env.VITE_REACT_APP_BACKWEB;
    window.open(`${server}/audit/${project.domain}`, "_blank");
  };

  const [timeScale, setTimeScale] = useState("month");
  const [analyticsData, setAnalyticsData] = useState({
    views: project.analytics.views.length, // Total views as an example
    viewHistory: project.analytics.views, // Dummy data for views over time
  });

  // Group views by time scale (day, month, year, hour, or minute)
  // Function to group views by time scale (day, month, or minute)
  const { labels, data } = groupViewsByTime(analyticsData.viewHistory, timeScale);
  const chartData = {
    labels, // Dynamically set based on the selected time scale
    datasets: [
      {
        label: "Views Over Time",
        data,
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        fill: true,
      },
    ],
  };
  
  // Chart options to handle small datasets and responsive behavior
  const chartOptions = {
    responsive: true, // Makes the chart responsive to window resizing
    maintainAspectRatio: false, // Allows the chart to adjust to available space
    scales: {
      x: {
        // Automatically adjust the ticks on the x-axis based on the data
        ticks: {
          autoSkip: true, // Skip ticks for smaller datasets
          maxRotation: 45, // Rotate labels for better readability
          minRotation: 0,
        },
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        // Dynamically adjusts the y-axis scale based on the dataset
        beginAtZero: true,
        ticks: {
          min: 0, // Ensures the y-axis doesn't go below 0
          stepSize: 1, // Adjust step size for sparse data
        },
        title: {
          display: true,
          text: "Views",
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index', // Shows tooltip for each data point
        intersect: false,
      },
      legend: {
        position: 'top', // Places the legend at the top
      },
    },
  };
  

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-red-800">
        Project Analytics
      </h2>
      <div className="flex justify-between items-center">
        <p>Total Views: {analyticsData.views}</p>
        <button
          onClick={SEO}
          className={`ml-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "day" ? "font-semibold" : ""
          }`}
        >
          Lighthouse SEO
        </button>
      </div>
      <div className="chart-container" style={{width:610,height:400}}>
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="time-scale-selector mt-4">
      <button
          onClick={() => setTimeScale("minute")}
          className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "day" ? "font-semibold" : ""
          }`}
        >
          Minutes
        </button>
        <button
          onClick={() => setTimeScale("hour")}
          className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "month" ? "font-semibold" : ""
          }`}
        >
        Hours
      </button>
        <button
          onClick={() => setTimeScale("day")}
          className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "day" ? "font-semibold" : ""
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setTimeScale("month")}
          className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "month" ? "font-semibold" : ""
          }`}
        >
          Month
        </button>
        <button
          onClick={() => setTimeScale("year")}
          className={`mr-2 px-4 py-2 bg-red-200 text-red-800 rounded-md ${
            timeScale === "year" ? "font-semibold" : ""
          }`}
        >
          Year
        </button>
      </div>
    </div>
  );
};

export default AnalyticsTab;
