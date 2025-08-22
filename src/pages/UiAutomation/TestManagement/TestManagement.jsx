import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CloudIcon from "../../../assets/cloudIcon.svg"
import { useNavigate } from "react-router-dom";
// impo

const tools = [
  { name: "Zephyr", desc: "Enterprise test management for Jira", icon: "☁️" },
  { name: "TestRail", desc: "Comprehensive test case management", icon: "🚆" },
  { name: "TestLodge", desc: "Simple test case management", icon: "🏠" },
  { name: "Xray", desc: "Test management for Jira", icon: "🈸" },
  { name: "qTest", desc: "Agile test management platform", icon: "🔧" },
  { name: "Azure DevOps", desc: "Microsoft test management", icon: "🟦" },
];


const TestManagement = () => {
  const [selected, setSelected] = useState("");
  const navigate=useNavigate();

  return (
    <div className="min-h-screen flex w-[100%] justify-center bg-[#0F172A]">
      <div className="bg-[#111827] p-6 rounded-2xl shadow-lg w-full">
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">
          Test Management Integration
        </h2>
        <p className="text-gray-400 mb-6">
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
                    : "border-gray-700 bg-[#0F172A] hover:border-blue-400"
                }`}
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
              <p className="text-gray-400 text-sm text-center">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl"
          onClick={()=> { navigate("/testcases") }}>
            
            <ArrowLeft size={18} /> Back
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl" onClick={()=>{
              if(selected==="Zephyr")
                        navigate("/zephyr")
          }}>
            Proceed <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestManagement;
