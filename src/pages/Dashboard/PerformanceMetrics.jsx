import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API_URL } from "@/config";
import { useSelector } from "react-redux";
import { execution } from "./functions/lastFiveExecution";
import { lastexecution } from "./functions/lastExecution";

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

export default function PerformanceMetrics() {
  const projectId = useSelector((state) => state.appState.project_id);
  const [scatterConfig, setScatterConfig] = useState();
  const [barConfig,setBarConfig]=useState()
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

  console.log(scatterConfig,"scatterConfig")

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

  const formatScatterConfig = (response) => {
    console.log(response,"response-scatter")
    const apiNames = response.response.map((api) => api?.api_name);
    const colors = ["teal", "blue", "purple", "orange", "red"]; // rotate colors
    const shapes = ["circle", "rectRot", "rect", "triangle", "triangle"];

    const executions = {};

   ( response.response||[]).forEach((api) => {
      api.last_5_executions.forEach((exec, index) => {
        const label = `Exec-${exec.id}`;
        if (!executions[label]) {
          executions[label] = {
            label,
            data: [],
            pointStyle: shapes[index % shapes.length],
            pointBackgroundColor: colors[index % colors.length],
            borderColor: colors[index % colors.length],
            showLine: false,
          };
        }
      });
    });

  

    // Now push API execution times aligned with apiNames
    response.response.forEach((api) => {
      api.last_5_executions.forEach((exec) => {
        executions[`Exec-${exec.id}`].data.push(exec.response_time);
      });
    });
    const scatterData = {
      labels: apiNames,
      datasets: Object.values(executions),
    };
    const scatterOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Seconds vs API Name",
          font: { size: 14 },
          color: "white",
        },
        legend: {
          position: "bottom",
          labels: {
            color: "white",
            padding: 20,
            usePointStyle: true,
          },
        },
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: {
          type: "category",
          labels: apiNames, // 👈 dynamic labels
          ticks: { color: "white" },
          grid: { display: false, color: "gray" },
          offset: true,
        },
        y: {
          title: {
            display: true,
            text: "Seconds",
            color: "gray",
          },
          ticks: { color: "white" },
          grid: { display: true, color: "gray" },
        },
      },
    };
console.log(scatterData,scatterOptions,"Checking")
    setScatterConfig({ scatterData, scatterOptions });
  };

  const formatBarConfig=(response)=>{
 const executedApis = response?.response?.executed_apis;

  // labels will be api_name
  const labels = executedApis.map(api => api.api_name);

  // data will be response_time (null -> 0 fallback)
  const dataValues = executedApis.map(api => api.response_time ?? 0);

  const barData = {
    labels,
    datasets: [
      {
        label: "Response Time (ms)",
        data: dataValues,
        backgroundColor: "#4ade80",
        borderRadius: 6,
        barThickness: 50,
      },
   
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
       datalabels:{display:false}
    },
    scales: {
      x: { ticks: { color: "#ccc" }, grid: { display: false } },
      y: {
        ticks: { color: "#ccc" },
        title: { text: "Response Time (ms)", color: "gray", display: true },
        grid: { drawTicks: true, drawOnChartArea: true, color: "gray" },
      },
    },
  };

  setBarConfig({barData,barOptions})
  }

  const getLastFiveExexutions = async () => {
    try {
      let response = await axios.get(
        `${API_URL}/v1/api/projects/last-five-executions/${projectId}/`
      );
      console.log(response, "response");
      if (response?.data?.response?.length) {
    
         formatScatterConfig(execution);
      } else {
      }
    } catch {
    } finally {
    }
  };

   const getLastExexutions = async () => {
    try {
      let response = await axios.get(
        `${API_URL}/v1/api/projects/latest-execution/${projectId}/`
      );
      console.log(response, "response");
      if (response?.data?.response) {
           formatBarConfig(lastexecution);
      } else {
      }
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    getLastFiveExexutions();
    getLastExexutions();
  }, []);

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 w-full text-white border-gray-500 border hover:border-blue-500 mt-5">
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
                d="M3 3v18h18M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Performance Metrics</h2>
        </div>
        <span className="text-purple-400 font-medium">Real-time Data</span>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
       {barConfig&& <div className="bg-[#0f0f1a] h-90 rounded-lg p-4">
           <h2 className="font-bold text-start">Last Execution Response Time</h2>
           <h2 className="font-bold text-center">Seconds Vs API Name</h2>
          <Bar data={barConfig?.barData} options={barConfig?.barOptions} />
        </div>}
        {scatterConfig && (
          <div className="bg-[#0f0f1a] rounded-lg p-4">
            {/* <Line data={lineData} options={lineOptions} /> */}
             <h2 className="font-bold  text-md text-start">Last 5 Execution Response Time</h2>
            <Scatter
              data={scatterConfig?.scatterData}
              options={scatterConfig?.scatterOptions}
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
