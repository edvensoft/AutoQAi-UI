import React from "react";

const reports = [
  {
    id: "RPT-2024-001",
    executedBy: "Elena Voyage",
    executionTime: "2024-01-15 14:30:25",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "RPT-2024-002",
    executedBy: "John Smith",
    executionTime: "2024-01-15 13:45:12",
    status: "Failed",
    statusColor: "bg-red-100 text-red-800",
  },
  {
    id: "RPT-2024-003",
    executedBy: "Sarah Johnson",
    executionTime: "2024-01-15 12:20:45",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "RPT-2024-004",
    executedBy: "Michael Brown",
    executionTime: "2024-01-15 11:15:30",
    status: "In Progress",
    statusColor: "bg-yellow-100 text-yellow-800",
  },
];

export default function RecentReports() {
  return (
    <div className="min-h-screen bg-[#0d0d1a]">
      <div className="w-full rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">
              Execution Reports
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Map your file columns to the required fields. Fields marked with *
              are mandatory.
            </p>
          </div>
        </div>
        {" "}
        <div className="max-w-4xl bg-gray-900 rounded-md text-gray-200 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 p-2 border border-gray-700">Recent Reports</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-4 text-sm uppercase">
                  Report ID
                </th>
                <th className="text-left py-2 px-4 text-sm uppercase">
                  Executed By
                </th>
                <th className="text-left py-2 px-4 text-sm uppercase">
                  Execution Time
                </th>
                <th className="text-left py-2 px-4 text-sm uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="py-3 px-4 text-blue-500 font-medium cursor-pointer hover:underline">
                    {report.id}
                  </td>
                  <td className="py-3 px-4 font-semibold">
                    {report.executedBy}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {report.executionTime}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${report.statusColor}`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
