import React from "react";
import Chart from "react-apexcharts";

export default function ApexChartsExample() {
  const lineChartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yaxis: {
      min: 0,
      max: 25,
      tickAmount: 5, // Controls number of ticks
      labels: {
        formatter: (value) => `${value}k`, // Custom format
      },
    },
    colors: ["#4FD1C5"],
    dataLabels: { enabled: false },
    grid: { borderColor: "#e7e7e7" },
  };

  const lineChartSeries = [
    {
      name: "Sales",
      data: [5, 10, 8, 15, 12, 20],
    },
  ];

  return (
    <div style={{ padding: 20, background: "#1a1a2e", borderRadius: 12 }}>
      <Chart
        options={lineChartOptions}
        series={lineChartSeries}
        type="line"
        height={300}
      />
    </div>
  );
}
