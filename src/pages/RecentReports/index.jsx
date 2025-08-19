import { API_URL } from "@/config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

// import type { RootState } from '@/redux/store';
// import RootState from '../../redux/store'


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

const reportResponse = {
  response: {
    count: 6,
    next: null,
    previous: null,
    results: [
      {
        id: "38cf6bb7-6008-4c1f-91b8-8bc53aa920f7",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "completed",
        report_file: "/reports/Report_2025_08_01_18_04_14.html",
        presigned_url:
          "https://qa-automation-ai.s3.amazonaws.com/reports/Report_2025_08_01_18_04_14.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAULRYZ3QANA4UN5FK%2F20250802%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250802T124544Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=00c84760e4476fdd6eeb5aca1771cac835dde2317f77c4235ef8f8e74ad03b59",
        executed_at: "2025-08-02T12:01:00.795993Z",
      },
      {
        id: "15171555-adf8-4b62-b122-4a42ce03b2b0",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "failed",
        report_file: null,
        presigned_url: null,
        executed_at: "2025-08-02T11:04:38.519570Z",
      },
      {
        id: "f40df324-865c-4231-a2da-94c6c988bcc5",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "failed",
        report_file: null,
        presigned_url: null,
        executed_at: "2025-08-02T11:03:27.928271Z",
      },
      {
        id: "fefd1677-f742-45d3-a5c5-a50493f5f0f0",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "failed",
        report_file: null,
        presigned_url: null,
        executed_at: "2025-08-02T11:00:58.229560Z",
      },
      {
        id: "aaa8104f-7dae-427a-b011-c20425b1265e",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "processing",
        report_file: null,
        presigned_url: null,
        executed_at: "2025-08-02T11:00:33.565877Z",
      },
      {
        id: "e4e27f0d-3960-43ae-b470-a46b41cc3599",
        project_id: "4170823d-978c-4ebf-aa76-cf50dbe50b14",
        status: "processing",
        report_file: null,
        presigned_url: null,
        executed_at: "2025-08-02T10:57:37.030324Z",
      },
    ],
  },
};

export default function RecentReports() {
  // const { projectId } = useParams();
  // const projectId = useSelector((state: import("../../redux/store").RootState) => state.appState.project_id);
  const projectId = useSelector((state) => state.appState.project_id);
  // console.log('proje',projectId)
  const [recentReports, setRecentReports] = useState([])

  useEffect(() => {
    axios
      .get(
        // `${API_URL}/v1/api/projects/${"fce9e73a-9b1f-4cb0-81e2-34506b33edf0"}/reports/`
        `${API_URL}/v1/api/projects/${projectId}/reports`

      )
      .then((response) => {
        console.log()
        if (response?.data?.response?.results?.length) {
          setRecentReports(response.data.response.results);
        } else {
          setRecentReports([]);
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d1a] p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
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
        </div>{" "}
        <div className="bg-gray-900 rounded-md text-gray-200 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 p-2 border border-gray-700">
            Recent Reports
          </h2>
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
              {recentReports.map((report) => {
                let statusColor = report?.status === "completed" ? "bg-green-100 text-green-800" : report?.status === "failed" ? "bg-red-100 text-red-800" : report?.status === "processing" ? "bg-yellow-100 text-yellow-800" : ""
                return (
                  <tr
                    key={report.id}
                    className="border-b border-gray-800 hover:bg-gray-800"
                  >
                    <td className="py-3 px-4 text-blue-500 font-medium cursor-pointer hover:underline" onClick={()=>{
                      if(report?.presigned_url){
                        window.open(report?.presigned_url)
                      }else{
                         toast.error("File Doesn't Exist!");
                      }
                    }}>
                      {report?.id}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {report?.executedBy}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {report?.executed_at?.split(".")[0].replace("T", " ")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                      >
                        {report?.status?.charAt(0)?.toUpperCase() + report?.status?.slice(1)?.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
