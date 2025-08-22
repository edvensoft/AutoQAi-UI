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
import pdf from "./pdf/API_Design_Quality_Report (2).pdf"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DesignQuality = ({ designGrapgh }) => {
  const data = {
    labels: [
      "REST Compliance",
      "Documentation",
      "Security Score",
      "Error Handling",
    ],
    datasets: [
      {
        label: "Score",
        data: [94, 78, 87, 65],
        color: "gray", // your values
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
        color: "gray",
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
          color: "gray",
          font: { weight: "bold" },
        },
        ticks: { color: "white" },
        grid: { color: "#374151" },
      },
      y: {
        ticks: { color: "gray" },
        grid: { display: false },
      },
    },
  };

  function downloadPDF() {
  const link = document.createElement("a");
  link.href = pdf; // path relative to public folder or server
  link.download = "API_Design_Quality_Report.pdf";    // suggested file name
  link.click();
}

  return (
    <div className="bg-[#1a1a2e] border-gray-500 border h-200 hover:border-blue-500 p-6 h-140 rounded-2xl shadow-lg mt-3 mb-3">
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
              width="28"
              height="28"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                d="M7 22q-1.25 0-2.125-.875T4 19q0-.975.563-1.75T6 16.175v-8.35q-.875-.3-1.437-1.075T4 5q0-1.25.875-2.125T7 2t2.125.875T10 5q0 .975-.562 1.75T8 7.825V8q0 1.25.875 2.125T11 11h2q2.075 0 3.538 1.463T18 16v.175q.875.3 1.438 1.075T20 19q0 1.25-.875 2.125T17 22t-2.125-.875T14 19q0-.975.563-1.75T16 16.175V16q0-1.25-.875-2.125T13 13h-2q-.85 0-1.612-.262T8 12v4.175q.875.3 1.438 1.075T10 19q0 1.25-.875 2.125T7 22m0-2q.425 0 .713-.288T8 19t-.288-.712T7 18t-.712.288T6 19t.288.713T7 20m10 0q.425 0 .713-.288T18 19t-.288-.712T17 18t-.712.288T16 19t.288.713T17 20M7 6q.425 0 .713-.288T8 5t-.288-.712T7 4t-.712.288T6 5t.288.713T7 6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">API Design Quality Analysis</h2>
        </div>
        <div className="font-medium text-[#2979FF] border border-gray-500 bg-black rounded-lg pl-5 pt-1 pb-1 pr-5 flex items-center gap-2" onClick={()=>{
          downloadPDF()
        }}>
          More Details{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1"
            />
            <path
              fill="currentColor"
              d="M6 17a1 1 0 1 0-2 0v.6C4 19.482 5.518 21 7.4 21h9.2c1.882 0 3.4-1.518 3.4-3.4V17a1 1 0 1 0-2 0v.6c0 .778-.622 1.4-1.4 1.4H7.4c-.778 0-1.4-.622-1.4-1.4z"
            />
          </svg>
        </div>
      </div>
      <div className="bg-[#0f0f1a] border-gray-500 p-10 pb-20 h-[80%] rounded-2xl shadow-lg">
        <h2 className="text-center font-bold text-2xl mb-4">
          Quality Metric OverView
        </h2>
        <Bar data={designGrapgh?.data} options={designGrapgh?.options} />
        {/* <h3 className="text-center text-white font-bold mt-2">API Quality Metrics</h3> */}
      </div>
      <div className="w-full border-t border-gray-700 py-3 mt-10 flex justify-between items-center text-sm">
        {/* Left side */}
        <div className="text-gray-400 text-lg">
          Last Analysis: <span className="text-white font-medium">{20}</span>
        </div>

        {/* Right side */}
        <div className="text-gray-400 text-lg">
          Total APIs Analyzed:{" "}
          <span className="text-blue-400 font-semibold">{120}</span>
        </div>
      </div>
    </div>
  );
};

export default DesignQuality;
