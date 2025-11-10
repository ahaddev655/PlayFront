import React, { useState } from "react";
import {
  FaUsers,
  FaGamepad,
  FaGlobe,
  FaChartLine,
  FaTimes,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // === Card States ===
  const [totalVisitors, setTotalVisitors] = useState(12540);
  const [totalUsers, setTotalUsers] = useState(3210);
  const [publishedGames, setPublishedGames] = useState(58);
  const [totalGames, setTotalGames] = useState(124);

  // === Activities State ===
  const [activities, setActivities] = useState([
    "User John registered an account.",
    "New game 'Space Blaster' was published.",
    "Visitor milestone reached 10,000.",
    "User Alex updated their profile.",
  ]);

  const handleDelete = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  // === Chart Data ===
  const visitorsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Visitors",
        data: [400, 600, 800, 700, 1000, 1200, 900],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Total Visitors (This Week)",
        color: "#fff",
        font: { size: 16 },
      },
    },
    scales: {
      x: { ticks: { color: "#d1d5db" }, grid: { color: "rgba(75,75,75,0.3)" } },
      y: { ticks: { color: "#d1d5db" }, grid: { color: "rgba(75,75,75,0.3)" } },
    },
  };

  return (
    <div className="min-h-screen text-white p-6 space-y-10">
      {/* === Cards === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-300 text-sm">Total Visitors</h3>
            <FaGlobe className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{totalVisitors}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-300 text-sm">Total Users</h3>
            <FaUsers className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-300 text-sm">Published Games</h3>
            <FaChartLine className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{publishedGames}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-300 text-sm">Total Games</h3>
            <FaGamepad className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{totalGames}</p>
        </div>
      </div>

      {/* === Chart === */}
      <div className="bg-gray-900 p-5 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Total Visitors
        </h2>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <Line
            data={visitorsData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
                y: {
                  ticks: { color: "white" },
                  grid: { color: "rgba(255,255,255,0.1)" },
                },
              },
              plugins: {
                legend: {
                  labels: { color: "white" },
                },
              },
            }}
          />
        </div>
      </div>

      {/* === Recent Activities === */}
      <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition">
        <h2 className="text-lg font-semibold text-red-400 mb-3">
          Recent Activities
        </h2>
        <ul className="space-y-2 text-gray-300">
          {activities.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-l-2 border-red-500 pl-3 pr-2 py-1 hover:text-white transition"
            >
              <span>{item}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FaTimes />
              </button>
            </li>
          ))}
          {activities.length === 0 && (
            <p className="text-gray-500 italic text-sm">
              No recent activities.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
