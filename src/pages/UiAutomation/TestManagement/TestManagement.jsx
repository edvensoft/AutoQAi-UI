import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
// import CloudIcon from "../../../assets/cloudIcon.svg";
import { useNavigate } from "react-router-dom";
import CloudIcon from "@mui/icons-material/Cloud";
import TramIcon from "@mui/icons-material/Tram";
import HomeIcon from "@mui/icons-material/Home";
import ScannerIcon from "@mui/icons-material/Scanner";
import BiotechIcon from "@mui/icons-material/Biotech";
// impo

const tools = [
  {
    name: "Zephyr",
    desc: "Enterprise test management for Jira",
    // icon: "☁️",
    // icons: (
    //   <svg
    //     // xmlns="http://www.w3.org/2000/svg"
    //     width="50"
    //     height="50"
    //     viewBox="50 50"
    //   >
    //     <path
    //     className="fill-blue-600"
    //       // fill="#000"
    //       d="M18.944 11.112C18.507 7.67 15.56 5 12 5C9.244 5 6.85 6.611 5.757 9.15C3.609 9.792 2 11.82 2 14c0 2.757 2.243 5 5 5h11c2.206 0 4-1.794 4-4a4.01 4.01 0 0 0-3.056-3.888"
    //     />
    //   </svg>
    // ),
    icon: <CloudIcon size={80} sx={{ fill: "#51A2FF", fontSize: 45 }} />,
  },
  {
    name: "TestRail",
    desc: "Comprehensive test case management",
    // icon: "🚆"
    icon: <TramIcon size={80} sx={{ fill: "#51A2FF", fontSize: 45 }} />,
  },
  {
    name: "TestLodge",
    desc: "Simple test case management",
    //  icon: "🏠"
    icon: <HomeIcon size={80} sx={{ fill: "#51A2FF", fontSize: 45 }} />,
  },
  {
    name: "Xray",
    desc: "Test management for Jira",
    // icon: "🈸"
    icon: <ScannerIcon size={80} sx={{ fill: "#51A2FF", fontSize: 45 }} />,
  },
  {
    name: "qTest",
    desc: "Agile test management platform",
    // icon: "🔧"
    icon: <BiotechIcon size={80} sx={{ fill: "#51A2FF", fontSize: 45 }} />,
  },
  { name: "Azure DevOps", desc: "Microsoft test management", icon: "🟦" },
];

const TestManagement = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex w-[100%] justify-center bg-[#15152B]">
      <div className="bg-[#15152B] p-6 rounded-2xl shadow-lg w-full border border-gray-700">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white mb-2">
          Test Management Integration
        </h2>
        <p className="text-gray-400 mb-6 mt-6 text-xl">
          Select a test management tool to integrate with AutoQAi
        </p>

        {/* Grid of Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              onClick={() => {
                setSelected(tool.name);
              }}
              className={`flex flex-col items-center justify-center rounded-xl border cursor-pointer p-6 transition
                ${
                  selected === tool.name
                    ? "border-blue-500 bg-[#1E293B]"
                    : "border-gray-400 bg-[#0F0F23] hover:border-blue-400"
                }`}
            >
              <div className="mb-3 text-2xl">{tool?.icon}</div>
              <h3 className=" text-2xl font-semibold text-white">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-lg text-center">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
          <button
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
            onClick={() => {
              navigate("/testcases");
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
            onClick={() => {
              if (selected === "Zephyr") navigate("/zephyr");
            }}
          >
            Proceed <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestManagement;
