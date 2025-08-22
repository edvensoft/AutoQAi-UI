import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceMetrics({ scatterConfig, barConfig }) {
  // Line chart data (Response Time)

  // Bar chart data (Success Rate)
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Success Rate (%)",
        data: [20, 58, 97, 47, 98, 65, 99],
        backgroundColor: "#4ade80",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" }, position: "bottom", display: false },
      title: { display: false, text: "Success Rate", color: "#fff" },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: {
        ticks: { color: "#ccc" },
        title: { text: "Seconds", color: "gray", display: true },
        grid: { drawTicks: true, drawOnChartArea: true, color: "gray" },
      },
    },
  };

  // const scatterData = {
  //   labels: ["UserAuth", "Payment", "Data Sync", "Upload", "Notify"], // X-axis API names
  //   datasets: [
  //     {
  //       label: "Exec-001",
  //       data: [4.0, 3.8, 4.1, 3.9, 4.2], // Seconds for each API
  //       pointStyle: "circle",
  //       pointBackgroundColor: "teal",
  //       borderColor: "teal",
  //       showLine: false,
  //     },
  //     {
  //       label: "Exec-002",
  //       data: [3.7, 3.9, 4.0, 3.8, 3.9],
  //       pointStyle: "rectRot",
  //       pointBackgroundColor: "blue",
  //       borderColor: "blue",
  //       showLine: false,
  //     },
  //     {
  //       label: "Exec-003",
  //       data: [3.9, 4.1, 3.8, 3.7, 4.0],
  //       pointStyle: "rect",
  //       pointBackgroundColor: "purple",
  //       borderColor: "purple",
  //       showLine: false,
  //     },
  //     {
  //       label: "Exec-004",
  //       data: [4.2, 4.0, 3.9, 4.1, 4.3],
  //       pointStyle: "triangle",
  //       pointBackgroundColor: "orange",
  //       borderColor: "orange",
  //       showLine: false,
  //     },
  //     {
  //       label: "Exec-005",
  //       data: [3.6, 3.7, 3.8, 3.9, 4.0],
  //       pointStyle: "triangle", // inverted triangle is not built-in, need custom plugin
  //       rotation: 180, // rotate to make it upside-down
  //       pointBackgroundColor: "red",
  //       borderColor: "red",
  //       showLine: false,
  //     },
  //   ],
  // };

  // const scatterOptions = {
  //   responsive: true,
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Seconds vs API Name",
  //       font: { size: 20 },
  //       color: "white",
  //     },
  //     legend: {
  //       position: "bottom",
  //       labels: {
  //         color: "white",
  //         padding: 20, // space between legend items
  //         usePointStyle: true, // show as circle/triangle instead of box
  //       },
  //     },
  //     datalabels: {
  //     display: false
  //   },

  //   },
  //   scales: {
  //     x: {
  //       type: "category",
  //       labels: ["UserAuth", "Payment", "Data Sync", "Upload", "Notify"],
  //       ticks: { color: "white" },
  //       grid: { display: false },
  //       offset: true,
  //     },
  //     y: {
  //       // beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: "Seconds",
  //         color: "gray",
  //       },
  //       ticks: { color: "white" },
  //       grid: { display: false },
  //     },
  //   },
  // };

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 w-full text-white border-gray-500 border hover:border-blue-500 mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-3 rounded-lg">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3v18h18M3 12h18M3 6h18M3 18h18"
              />
            </svg> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24  "
              viewBox="0 0 8 8"
            >
              <path
                fill="currentColor"
                d="M0 8V0h1v7h7v1M0 5l3-3l2 2l3-3v1L5 5L3 3L0 6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Performance Metrics</h2>
        </div>
        <span className="text-purple-400 font-medium">Real Time Data</span>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        {barConfig && (
          <div className="bg-[#0f0f1a] h-110 rounded-lg p-4 pb-20">
            <h2 className="font-bold text-start">
              Last Execution Response Time
            </h2>
            <h2 className="font-bold text-center">Seconds Vs API Name</h2>
            <Bar data={barConfig?.barData} options={barConfig?.barOptions} />
          </div>
        )}
        {scatterConfig && (
          <div className="bg-[#0f0f1a] h-110 rounded-lg p-4">
            {/* <Line data={lineData} options={lineOptions} /> */}
            <h2 className="font-bold  text-md text-start">
              Last 5 Execution Response Time
            </h2>
            <Scatter
              data={scatterConfig?.scatterData}
              options={scatterConfig?.scatterOptions}
              // height={}
            />
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-6 mt-6 border-t border-gray-700 pt-4 text-center">
        <div>
          <p className="text-green-400 text-2xl font-bold">98.5%</p>
          <p className="text-gray-400 text-sm">Success Rate</p>
        </div>
        <div>
          <p className="text-blue-400 text-2xl font-bold">245ms</p>
          <p className="text-gray-400 text-sm">Avg Response</p>
        </div>
        <div>
          <p className="text-yellow-400 text-2xl font-bold">1.2k</p>
          <p className="text-gray-400 text-sm">Total Tests</p>
        </div>
        <div>
          <p className="text-red-400 text-2xl font-bold">18</p>
          <p className="text-gray-400 text-sm">Failed Tests</p>
        </div>
      </div>
    </div>
  );
}
