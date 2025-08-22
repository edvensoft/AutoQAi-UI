import React from "react";
import { useLocation } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const htmlReport = location.state?.testResult;

  if (!htmlReport || typeof htmlReport !== "string") {
    return (
      <div className="text-center text-red-500 mt-10 p-4">
        No data available
      </div>
    );
  }

  return (
    <div
      className="p-6 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800
                 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6
                 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-4
                 [&_table]:mt-8"
      dangerouslySetInnerHTML={{ __html: htmlReport }}
    />
  );
};

export default ReportPage;
