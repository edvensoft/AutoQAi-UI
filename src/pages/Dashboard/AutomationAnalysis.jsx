import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { apiAutomationData } from "./functions/apiAutomation";
import getPlots from "./functions/getPlots";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      labels: {
        color: "#fff",
        usePointStyle: true, // 👈 makes legend markers circular
        pointStyle: "circle",
        padding: 20, // 👈 shape can be "circle", "rect", "star", etc.
      },
      position: "bottom",
    },
    title: {
      display: true,
      text: "Minute Vs API Name",
      color: "#fff",
      font: {
        size: 14, // 👈 increase title font size (default ~12-14)
        weight: "bold",
        padding: { bottom: 10 }, // optional: make it bold
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "gray" },
    },
    y: {
      //  min:0,
      // max:100,
      ticks: { color: "gray" },
      grid: {
        color: "gray", // grid line color
        drawTicks: true,
        drawOnChartArea: true, // ensures horizontal lines are shown
      },
    },
  },
};

const chartData = {
  labels: [
    "Authentication",
    "User Management",
    "Data Processing",
    "File Operations",
    // "Notifications",
  ],
  datasets: [
    {
      label: "Manual Effort",
      data: [50, 48, 55, 30],
      backgroundColor: "#ff4d4f",
      borderRadius: 4,
      borderColor: "#fff",
      borderWidth: 2,
    },
    {
      label: "Automation Effort",
      data: [10, 8, 12, 7],
      backgroundColor: "#4ade80",
      borderRadius: 4,
      borderColor: "#fff",
      borderWidth: 2,
    },
  ],
};

let dataSets = [
  {
    label: "Manual Effort",
    data: [50, 48, 55, 30],
    backgroundColor: "#ff4d4f",
    borderRadius: 4,
    borderColor: "#fff",
    borderWidth: 2,
  },
  {
    label: "Automation Effort",
    data: [10, 8, 12, 7],
    backgroundColor: "#4ade80",
    borderRadius: 4,
    borderColor: "#fff",
    borderWidth: 2,
  },
];

export default function AutomationAnalysis() {
  const [apiNames, setApiNames] = useState();
  const [testSuits, setTestSuites] = useState();
  const [testCollections, setTestCollections] = useState();

  console.log(apiNames, "apiNames");

  // const chartData = {
  //   labels: [
  //     "Authentication",
  //     "User Management",
  //     "Data Processing",
  //     "File Operations",
  //     // "Notifications",
  //   ],
  // };

  useEffect(() => {
    let labels = [];
    let dataSets = [
      {
        label: "Mid Level",
        key: "mid_level",
        backgroundColor: "#ff4d4f",
        borderRadius: 4,
        borderColor: "#fff", // 👈 white border
        borderWidth: 2,
      },
      {
        label: "Senior Level",
        backgroundColor: "#4ade80",
        key: "senior_level",
        borderRadius: 4,
        borderColor: "#fff",
        borderWidth: 2,
      },
      {
        label: "Automation Effort",
        backgroundColor: "#3A7EEF",
        borderRadius: 4,
        key: "ai_level",
        borderColor: "#fff",
        borderWidth: 2,
      },
    ];
    let values = {
      mid_level: [],
      senior_level: [],
      ai_level: [],
    };
    if (apiAutomationData.apis?.length) {
      apiAutomationData.apis.forEach((api) => {
        labels.push(api["API Name"].slice(0, 10));
        values?.mid_level.push(api?.manualEffort?.qa1yr);
        values?.senior_level.push(api?.manualEffort?.qa5yrs);
        values?.ai_level.push(api?.aiEffort);
      });
    }

    const allValues = [
      ...values.mid_level,
      ...values.senior_level,
      ...values.ai_level,
    ];

    let max = Math.max(...allValues);
    let stepSize = getPlots(0, max, 5);
    max = max + 2;

    setApiNames({
      data: {
        labels,
        datasets: dataSets.map((set) => {
          return { ...set, data: values[set?.key] };
        }),
      },
      options: {
        ...chartOptions,
        scales: {
          ...chartOptions?.scales,
          y: {
            ...chartOptions?.scales?.y,
            min: 0,
            max,
            ticks: { color: "gray", stepSize },
          },
        },
        plugins: {
          ...chartOptions?.plugins,
          title: {
            ...chartOptions?.plugins?.title,
            text: "Minute Vs Automation Effort",
          },
        },
      },
    });
  }, []);

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 w-full text-white border border-gray-500 hover:border-blue-500 mt-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-purple-500 p-3 rounded-lg">
            <svg
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
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 4h6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">
            Automation vs Manual Effort Analysis
          </h2>
        </div>
        <span className="text-purple-400 font-medium">100+ APIs</span>
      </div>

      {/* Charts Row */}
      <div className="flex justify-between items-center">
        {apiNames && (
          <div className="bg-[#0f0f1a] rounded-lg pb-15 p-4 h-100 w-[32%] flex flex-col justify-between items-center">
            <h2 className="font-bold text-2xl text-center">Api Automation</h2>
            <Bar data={apiNames?.data} options={apiNames?.options} />
          </div>
        )}
        {true && (
          <div className="bg-[#0f0f1a] rounded-lg p-4 pb-15 h-100 w-[32%] flex flex-col justify-between items-center">
            <h2 className="font-bold text-2xl text-center">UI Automation</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
        {true && (
          <div className="bg-[#0f0f1a] rounded-lg p-4 pb-15 h-100 w-[32%] flex flex-col justify-between items-center">
            <h2 className="font-bold text-2xl text-center">
              Test Case Generator
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-6 mt-6 border-t border-gray-700 pt-4 text-center">
        <div>
          <p className="text-green-400 text-2xl font-bold">78%</p>
          <p className="text-gray-400 text-sm">API Automation</p>
        </div>
        <div>
          <p className="text-blue-400 text-2xl font-bold">65%</p>
          <p className="text-gray-400 text-sm">UI Automation</p>
        </div>
        <div>
          <p className="text-purple-400 text-2xl font-bold">82%</p>
          <p className="text-gray-400 text-sm">Test Generation</p>
        </div>
        <div>
          <p className="text-blue-400 text-2xl font-bold">156</p>
          <p className="text-gray-400 text-sm">Automated APIs</p>
        </div>
        <div>
          <p className="text-yellow-400 text-2xl font-bold">44</p>
          <p className="text-gray-400 text-sm">Manual Tests</p>
        </div>
        <div>
          <p className="text-green-400 text-2xl font-bold">65%</p>
          <p className="text-gray-400 text-sm">Effort Reduction</p>
        </div>
      </div>
    </div>
  );
}
