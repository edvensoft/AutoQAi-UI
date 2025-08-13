import React, { useState } from "react";
import type { ChangeEvent } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import useMapping from "./Hooks/useMapping";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ColumnMapping: React.FC = () => {
  const [mappings, setMappings] = useState<Record<string, string[]>>({});
  const { selectedFields } = useMapping(mappings);

  console.log(mappings,"checking-a")


  const handleChange =
    (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
      setMappings((prev) => ({ ...prev, [field]: [...prev[field]||[],e.target.value] }));
    };

  const options = [
    { value: "", label: "Select mapping..." },
    { value: "Test Case Name", label: "Test Case Name" },
    { value: "Test Steps", label: "Test Steps" },
    { value: "Expected Result", label: "Expected Result" },
    { value: "Test Data", label: "Test Data" },
    { value: "Precondition", label: "Precondition" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
      <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">Column Mapping</h2>
            <p className="text-gray-400 text-sm mb-4">
              Map your file columns to the required fields. Fields marked with * are
              mandatory.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center gap-2">
            <CollectionsBookmarkIcon /> Save Mapping
          </button>
        </div>

        {/* Required Fields */}
        <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6">
          {["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"].map(
            (field) => {
                let color=selectedFields?.includes(field)?"green":"red"
                return      (
              <span
                key={field}
                className={`bg-${color}-500/20 border text-${color}-500 border-${color}-500 px-3 py-1 rounded-full`}
              >
                {field} *
              </span>
            )
            }
           
          )}
        </div>

        {/* Mapping Fields */}
        {[
          { label: "Test Case ID", col: "Column A", field: "testCaseId" },
          { label: "Test Description", col: "Column B", field: "testDescription" },
          { label: "Steps to Execute", col: "Column C", field: "stepsToExecute" },
          { label: "Expected Output", col: "Column D", field: "expectedOutput" },
          { label: "Input Data", col: "Column E", field: "inputData" },
        ].map((item) => (
          <div
            key={item.field}
            className="mb-6 max-w-5xl mx-auto bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="w-[70%] bg-[#0d0d1a] rounded-lg flex items-center justify-between">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-blue-500">
                  <ViewColumnIcon />
                </div>
                <div>
                  <div className="text-white font-semibold">{item.label}</div>
                  <div className="text-gray-400 text-sm">{item.col}</div>
                </div>
              </div>

              {/* Dropdown */}
              <div className="relative bg-[#0d0d1a]  w-[50%]">
                <select
                  value={item.field|| ""}
                  onChange={handleChange(item.field)}
                  className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <KeyboardArrowDownIcon className="absolute right-2 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
                {<CheckCircleOutlineIcon className="absolute right-[-10%] top-2.5 text-green-400 w-4 h-4 pointer-events-none"/>}
              </div>
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">
            Back
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center gap-2">
            Process Mapping →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnMapping;
