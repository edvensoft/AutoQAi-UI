import React, { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TaskIcon from '@mui/icons-material/Task';
import ClearIcon from '@mui/icons-material/Clear';

const FileUpload: React.FC = () => {
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [testSuiteName, setTestSuiteName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setSelectedFile(file);
      console.log("Uploaded file:", file.name);
    }
  };

  return (
    <div className="mt-6 min-h-screen text-white space-y-6">
      {/* Standard Template Download */}
      {/* <div className="bg-[#0f0f1a] rounded-lg p-4 border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Standard Template Download</h2>
        <p className="text-sm text-gray-400 mb-4">
          Download our sample template to see the expected format and structure
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          <DownloadIcon/> Download Sample Template
        </button>
      </div> */}

      {/* Upload Your File */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upload Your File</h2>

        {/* Test Suite Name Input */}
        <label className="block mb-2 text-sm font-medium">
          Test Suite Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={testSuiteName}
          onChange={(e) => setTestSuiteName(e.target.value)}
          placeholder="e.g., Regression, Sanity, Smoke, Integration, End-to-End"
          className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter a name to organize your test cases into a suite
        </p>

        {/* File Upload */}
        <div className="mt-4 p-6 border-2 border-dashed border-gray-600 rounded-lg bg-[#1a1a2e] text-center">
          <p className="mb-2 text-blue-400 font-semibold"> <CloudUploadIcon/> </p>
          <p className="text-mb text-white-500 mb-2">
           Upload CSV or Excel File
          </p>
          <p className="text-sm text-gray-400 mb-4">
            Drag and drop your file here or click to browse
          </p>
          <label>
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Browse Files
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: CSV, XLS, XLSX (Max 10MB)
          </p>
        </div>
           {/* <div className="bg-[#0f0f1a] flex rounded-lg p-4 border border-gray-700 items-center">
            <TaskIcon className="text-green-500"/>
          <div> <p>{selectedFile?.name}</p><p className="text-xs text-gray-500">{selectedFile?.size}</p>
          <ClearIcon className="text-red-500"/>
          </div>
           </div> */}

            <div className="flex items-center justify-between rounded-lg bg-[#0f0f1a] p-3 border border-gray-700 mt-2">
      {/* Left Side */}
      <div className="flex items-center space-x-3">
        {/* File Icon */}
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0A3E1E]">
           <TaskIcon className="text-green-500"/>
        </div>

        {/* File Info */}
        <div className="flex flex-col">
          <span className="text-sm text-white truncate max-w-[220px]">
            {selectedFile?.name}
          </span>
          <span className="text-xs text-gray-400">{selectedFile?.size}MB</span>
        </div>
      </div>

      {/* Delete Icon */}
      <button className="text-red-500 hover:text-red-400 transition-colors">
         <ClearIcon className="text-red-500"/>
      </button>
            </div>
      </div>
    </div>
  );
};

export default FileUpload;
