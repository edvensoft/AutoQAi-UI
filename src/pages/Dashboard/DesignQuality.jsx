import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DesignQuality = () => {
  const data = {
    labels: ["REST Compliance", "Documentation", "Security Score", "Error Handling"],
    datasets: [
      {
        label: "Score",
        data: [94, 78, 87, 65], // your values
        backgroundColor: [
          "#10B981", // green
          "#F59E0B", // amber
          "#10B981", // green
          "#EF4444", // red
        ],
        borderRadius: 8, // rounded edges
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Quality Metrics Overview",
        color: "white",
        font: { size: 20, weight: "bold" },
        padding: { bottom: 20 },
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "end",
        formatter: (value) => value + "%",
        font: { weight: "bold", size: 14 },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Score (%)",
          color: "white",
          font: { weight: "bold" },
        },
        ticks: { color: "white" },
        grid: { color: "#374151" },
      },
      y: {
        ticks: { color: "white" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-[#0F172A] p-6 rounded-2xl shadow-lg mt-3 mb-3" style={{ height: "400px" }}>
      <Bar data={data} options={options} />
      {/* <h3 className="text-center text-white font-bold mt-2">API Quality Metrics</h3> */}
    </div>
  );
};

export default DesignQuality;
