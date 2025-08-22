import React, { useEffect, useState } from "react";
import AutomationAnalysis from "./AutomationAnalysis";
import PerformanceMetrics from "./PerformanceMetrics";
import Pages from "./Pages";
import ApexChartsExample from "./ApexChartExample";
import Header from "@/layout/Header";
import DesignQuality from "./DesignQuality";
import { useSelector } from "react-redux";
import { execution } from "./functions/lastFiveExecution";
import { lastexecution } from "./functions/lastExecution";
import { qualityMetrics } from "./functions/designMetrics";
import { API_URL } from "@/config";
import axios from "axios";

const Dashboard = () => {
  const projectId = useSelector((state) => state.appState.project_id);
  const [scatterConfig, setScatterConfig] = useState();
  const [barConfig, setBarConfig] = useState();
  const [designGrapgh, setDesignGraph] = useState();

  const formatScatterConfig = (response) => {
    console.log(response, "response-scatter");
    const apiNames = response.response.map((api) => api?.api_name);
    const colors = ["teal", "blue", "purple", "orange", "red"]; // rotate colors
    const shapes = ["circle", "rectRot", "rect", "triangle", "triangle"];

    const executions = {};

    (response.response || []).forEach((api) => {
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
            tooltip: {
          backgroundColor: "#fff",
          titleColor: "#0f0f1a",
           bodyColor: "#0f0f1a",
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
    console.log(scatterData, scatterOptions, "Checking");
    setScatterConfig({ scatterData, scatterOptions });
  };

  const formatBarConfig = (response) => {
    const executedApis = response?.response?.executed_apis;

    // labels will be api_name
    const labels = executedApis.map((api) => api.api_name);

    // data will be response_time (null -> 0 fallback)
    const dataValues = executedApis.map((api) => api.response_time ?? 0);

    const barData = {
      labels,
      datasets: [
        {
          label: "Response Time (ms)",
          data: dataValues,
          backgroundColor: "#2979FF",
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
        datalabels: { display: false },
          tooltip: {
          backgroundColor: "#fff",
          titleColor: "#0f0f1a",
           bodyColor: "#0f0f1a",
        },
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

    setBarConfig({ barData, barOptions });
  };

  const formatDesignAnalysisConfig = (apiResponse) => {
    const categories = apiResponse.response.category_scores;
    const labels = categories.map((item) => item.category);

    const dataValues = categories.map((item) =>
      Math.round((item.score / item.benchmark) * 100)
    );

    const backgroundColors = dataValues.map((value) => {
      if (value >= 80) return "#10B981"; // green
      if (value >= 60) return "#F59E0B"; // amber
      return "#EF4444"; // red
    });

    const data = {
      labels,
      datasets: [
        {
          label: "Score",
          data: dataValues,
          backgroundColor: backgroundColors,
          borderRadius: 8,
          barThickness: 30,
        },
      ],
    };

    const options = {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "API Quality Metrics",
          color: "white",
          font: { size: 20, weight: "bold" },
          padding: { bottom: 20 },
        },
        tooltip: {
          backgroundColor: "#fff",
          titleColor: "#0f0f1a",
           bodyColor: "#0f0f1a",
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

    setDesignGraph({ data, options });
  };

  const getLastFiveExexutions = async () => {
    try {
      let response = await axios.get(
        `${API_URL}/v1/api/projects/last-five-executions/${projectId}/`
      );
      console.log(response, "response");
      if (response?.data?.response?.length) {
        formatScatterConfig(response?.data);
      } else {
        formatScatterConfig(execution);
      }
    } catch {
      formatScatterConfig(execution);
    } finally {
    }
  };

  const getLastExexutions = async () => {
    try {
      let response = await axios.get(
        `${API_URL}/v1/api/projects/latest-execution/${projectId}/`
      );
      console.log(response, "response");
      formatBarConfig(lastexecution);
      if (response?.data?.response) {
        formatBarConfig(response?.data);
      } else {
        formatBarConfig(lastexecution);
      }
    } catch {
      formatBarConfig(lastexecution);
    } finally {
    }
  };

  const getDesignAnalysis = () => {
    formatDesignAnalysisConfig(qualityMetrics);
  };

  useEffect(() => {
    getLastFiveExexutions();
    getLastExexutions();
    getDesignAnalysis();
  }, []);

  return (
    <div className="p-20 bg-[#0f0f1a] w-full m-auto">
      <Header />
      <h3 className="text-3xl font-bold mt-5 mb-5">Dashboard</h3>
      <AutomationAnalysis />
      {scatterConfig && barConfig && (
        <PerformanceMetrics
          scatterConfig={scatterConfig}
          barConfig={barConfig}
        />
      )}
      {designGrapgh && <DesignQuality designGrapgh={designGrapgh} />}
      <Pages />
      {/* <ApexChartsExample/> */}
    </div>
  );
};

export default Dashboard;
