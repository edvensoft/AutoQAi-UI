// import React, { useState } from "react";

// const TestCases: React.FC = () => {
//   const [selected, setSelected] = useState<string[]>([]);

//   const testCases = [
//     {
//       id: "TC-001",
//       name: "User Login with Valid Credentials",
//       steps: [
//         "Navigate to login page",
//         "Enter valid email",
//         "Enter valid password",
//         "Click login button",
//       ],
//       expected: "User successfully logs in and redirects to dashboard",
//       data: "Email: test@example.com\nPassword: Test123!",
//     },
//     {
//       id: "TC-002",
//       name: "User Login with Invalid Credentials",
//       steps: [
//         "Navigate to login page",
//         "Enter invalid email",
//         "Enter invalid password",
//         "Click login button",
//       ],
//       expected: "Error message displayed and login fails",
//       data: "Email: invalid@test.com\nPassword: wrongpass",
//     },
//     {
//       id: "TC-003",
//       name: "Password Reset Functionality",
//       steps: [
//         "Click forgot password",
//         "Enter email address",
//         "Submit reset request",
//         "Check email for reset link",
//       ],
//       expected: "Reset email sent successfully with valid reset link",
//       data: "Email: user@domain.com",
//     },
//   ];

//   const toggleSelect = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const selectAll = () => {
//     setSelected(testCases.map((tc) => tc.id));
//   };

//   const clearAll = () => {
//     setSelected([]);
//   };

//   return (
//     <div className="min-h-screen bg-[] text-white p-8">
//       <div className="bg-[#1A1B2E] border border-white/20 rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-semibold">Zephyr Test Cases</h1>
//           <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//             ← Back
//           </button>
//         </div>

//         <p className="text-gray-400 mb-4">
//           Select test cases to execute from your Zephyr project
//         </p>

//         {/* Summary + Controls */}
//         <div className="flex justify-between items-center bg-[#0f1120] border border-white/20 rounded-lg p-4 mb-6">
//           <p className="text-sm">
//             <span className="font-semibold">Total Test Cases:</span>{" "}
//             {testCases.length} &nbsp; | &nbsp;
//             <span className="font-semibold">Selected:</span> {selected.length}
//           </p>
//           <div className="flex gap-3">
//             <button
//               onClick={selectAll}
//               className="bg-gradient-to-r from-violet-400 to-violet-400 text-white px-4 py-1 rounded-md hover:opacity-90"
//             >
//               Select All
//             </button>
//             <button
//               onClick={clearAll}
//               className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-600"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="space-y-4">
//           {testCases.map((tc) => (
//             <div
//               key={tc.id}
//               className="bg-[#0f1120] border border-white/20 rounded-lg p-4"
//             >
//               <div className="flex items-start gap-3">
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(tc.id)}
//                   onChange={() => toggleSelect(tc.id)}
//                   className="mt-1 h-4 w-4 accent-purple-500"
//                 />
//                 <div className="flex-1 grid grid-cols-4 gap-4 text-sm">
//                   {/* ID */}
//                   <div>
//                     <p className="text-gray-400 font-medium">Test Case ID</p>
//                     <p className="text-indigo-400 font-semibold">{tc.id}</p>
//                   </div>
//                   {/* Name */}
//                   <div>
//                     <p className="text-gray-400 font-medium">Test Case Name</p>
//                     <p className="font-semibold">{tc.name}</p>
//                   </div>
//                   {/* Steps */}
//                   <div>
//                     <p className="text-gray-400 font-medium">Test Steps</p>
//                     <ul className="list-decimal list-inside text-gray-300">
//                       {tc.steps.map((step, idx) => (
//                         <li key={idx}>{step}</li>
//                       ))}
//                     </ul>
//                   </div>
//                   {/* Expected + Data */}
//                   <div>
//                     <p className="text-gray-400 font-medium">Expected Result</p>
//                     <p className="mb-2">{tc.expected}</p>
//                     <p className="text-gray-400 font-medium">Test Data</p>
//                     <pre className="whitespace-pre-wrap text-gray-300 text-sm">
//                       {tc.data}
//                     </pre>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Execute Button */}
//         <div className="flex justify-end mt-6">
//           <button
//             disabled={selected.length === 0}
//             className={`px-6 py-2 rounded-lg shadow-md flex items-center gap-2 ${
//               selected.length === 0
//                 ? "bg-gray-700 text-gray-400 cursor-not-allowed"
//                 : "bg-blue-400 hover:bg-blue-500 text-white"
//             }`}
//           >
//             ▶ Execute Selected Tests
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestCases;
// import React, { useState } from "react";

// const TestCases: React.FC = () => {
//   const [selected, setSelected] = useState<string[]>([]);

//   const testCases = [
//     {
//       id: "TC-001",
//       name: "User Login with Valid Credentials",
//       steps: [
//         "Navigate to login page",
//         "Enter valid email",
//         "Enter valid password",
//         "Click login button",
//       ],
//       expected: "User successfully logs in and redirects to dashboard",
//       data: "Email: test@example.com\nPassword: Test123!",
//     },
//     {
//       id: "TC-002",
//       name: "User Login with Invalid Credentials",
//       steps: [
//         "Navigate to login page",
//         "Enter invalid email",
//         "Enter invalid password",
//         "Click login button",
//       ],
//       expected: "Error message displayed and login fails",
//       data: "Email: invalid@test.com\nPassword: wrongpass",
//     },
//     {
//       id: "TC-003",
//       name: "Password Reset Functionality",
//       steps: [
//         "Click forgot password",
//         "Enter email address",
//         "Submit reset request",
//         "Check email for reset link",
//       ],
//       expected: "Reset email sent successfully with valid reset link",
//       data: "Email: user@domain.com",
//     },
//   ];

//   const allSelected = selected.length === testCases.length;

//   const toggleSelect = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelected([]);
//     } else {
//       setSelected(testCases.map((tc) => tc.id));
//     }
//   };

//   return (
//     <div className="min-h-screen text-white p-8">
//       <div className="bg-[#1A1B2E] border border-white/20 rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-semibold">Zephyr Test Cases</h1>
//           <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
//             ← Back
//           </button>
//         </div>

//         <p className="text-gray-400 mb-4">
//           Select test cases to execute from your Zephyr project
//         </p>

//         {/* Summary + Controls */}
//         <div className="flex justify-between items-center bg-[#0f1120] border border-white/20 rounded-lg p-4 mb-6">
//           <p className="text-sm">
//             <span className="font-semibold">Total Test Cases:</span>{" "}
//             {testCases.length} &nbsp; | &nbsp;
//             <span className="font-semibold">Selected:</span> {selected.length}
//           </p>
//           <div className="flex gap-3">
//             <button
//               onClick={toggleSelectAll}
//               className="bg-gradient-to-r from-violet-400 to-violet-400 text-white px-4 py-1 rounded-md hover:opacity-90"
//             >
//               {allSelected ? "Unselect All" : "Select All"}
//             </button>
//             <button
//               onClick={() => setSelected([])}
//               className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-600"
//             >
//               Clear All
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border border-white/20 rounded-lg text-sm">
//             {/* Table Head */}
//             <thead className="bg-[#15182b]">
//               <tr className="text-left text-gray-300">
//                 <th className="p-3">
//                   <input
//                     type="checkbox"
//                     checked={allSelected}
//                     onChange={toggleSelectAll}
//                     className="h-4 w-4 accent-purple-500"
//                   />
//                 </th>
//                 <th className="p-3">Test Case ID</th>
//                 <th className="p-3">Test Case Name</th>
//                 <th className="p-3">Test Steps</th>
//                 <th className="p-3">Expected Result</th>
//                 <th className="p-3">Test Data</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody>
//               {testCases.map((tc, idx) => (
//                 <tr
//                   key={tc.id}
//                   className={`border-t border-white/10 ${
//                     idx % 2 === 0 ? "bg-[#0f1120]" : "bg-[#121426]"
//                   }`}
//                 >
//                   {/* Checkbox */}
//                   <td className="p-3">
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(tc.id)}
//                       onChange={() => toggleSelect(tc.id)}
//                       className="h-4 w-4 accent-purple-500"
//                     />
//                   </td>
//                   {/* ID */}
//                   <td className="p-3 text-indigo-400 font-semibold">
//                     {tc.id}
//                   </td>
//                   {/* Name */}
//                   <td className="p-3 font-semibold">{tc.name}</td>
//                   {/* Steps */}
//                   <td className="p-3 text-gray-300 whitespace-pre-line">
//                     {tc.steps.map((step, i) => `${i + 1}. ${step}`).join("\n")}
//                   </td>
//                   {/* Expected */}
//                   <td className="p-3">{tc.expected}</td>
//                   {/* Data */}
//                   <td className="p-3 whitespace-pre-wrap text-gray-300">
//                     {tc.data}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Execute Button */}
//         <div className="flex justify-end mt-6">
//           <button
//             disabled={selected.length === 0}
//             className={`px-6 py-2 rounded-lg shadow-md flex items-center gap-2 ${
//               selected.length === 0
//                 ? "bg-blue-400 text-white-400 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600 text-white"
//             }`}
//           >
//             ▶ Execute Selected Tests
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestCases;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  ListChecks,
  CheckSquare,
  XSquare,
  // ClipboardList,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "@/config";
import ExecutionLoader from "../ApiTestingSuite/ExecutionLoader";

const TestCases: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
   const headerCheckboxRef = useRef<HTMLInputElement>(null);
   const location=useLocation();
   const [cases,setCases]=useState([]);
   const [loading,setLoading]=useState(false);
useEffect(() => {
    if (headerCheckboxRef.current) {
      if (selected.length > 0 && selected.length < testCases.length) {
        headerCheckboxRef.current.indeterminate = true;
      } else {
        headerCheckboxRef.current.indeterminate = false;
      }
    }
  }, [selected]);


  useEffect(() => {
console.log(location.state,"checking-state")
setCases(location.state.data)
  }, [])
  
  const testCases = [
    {
      id: "TC-001",
      name: "User Login with Valid Credentials",
      steps: [
        "Navigate to login page",
        "Enter valid email",
        "Enter valid password",
        "Click login button",
      ],
      expected: "User successfully logs in and redirects to dashboard",
      data: "Email: test@example.com\nPassword: Test123!",
    },
    {
      id: "TC-002",
      name: "User Login with Invalid Credentials",
      steps: [
        "Navigate to login page",
        "Enter invalid email",
        "Enter invalid password",
        "Click login button",
      ],
      expected: "Error message displayed and login fails",
      data: "Email: invalid@test.com\nPassword: wrongpass",
    },
    {
      id: "TC-003",
      name: "Password Reset Functionality",
      steps: [
        "Click forgot password",
        "Enter email address",
        "Submit reset request",
        "Check email for reset link",
      ],
      expected: "Reset email sent successfully with valid reset link",
      data: "Email: user@domain.com",
    },
  ];

  const allSelected = selected.length === cases.length;

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(cases.map((tc) => tc.id));
    }
  };
 const navigate = useNavigate();
 const onExecute=()=>{
  setLoading(true);
  axios.post(`${API_URL}/v1/api/ui-automation/execute-zephyr-testcase/`,{ids:[...selected]}).then((res)=>{
    console.log(res,"response")
    setLoading(false)
    navigate("/project/ui-automation/report/",{state:{testResult:res.data}});
  })
 }
  return (
    loading?<><ExecutionLoader/></>:<div className="min-h-screen text-white p-8">
      <div className="bg-[#1A1B2E] border border-white/20 rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Zephyr Test Cases</h1>
          <button 
           onClick={() => navigate("/zephyr")}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
            ← Back
          </button>
        </div>

        <p className="text-gray-400 mb-4">
          Select test cases to execute from your Zephyr project
        </p>

        {/* Summary + Controls */}
        <div className="flex justify-between items-center bg-[#0f1120] border border-white/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-6 text-sm">
            {/* Total Test Cases */}
            <div className="flex items-center gap-2">
                 <ListChecks className="w-4 h-4 text-blue-400" />
              {/* <ClipboardList className="w-4 h-4 text-gray-300" /> */}
              <span className="font-semibold">Total Test Cases:</span>
              <span className="text-blue-400">{cases?.length}</span>
            </div>

            {/* Selected */}
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-gray-300" />
              <span className="font-semibold">Selected:</span>
              <span
                className={
                  selected.length === 1
                    ? "text-purple-400 font-semibold"
                    : "text-white"
                }
              >
                {selected.length}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-400 to-violet-400 text-white px-4 py-1 rounded-md hover:opacity-90"
            >
              <CheckSquare className="w-4 h-4" />
              {allSelected ? "Unselect All" : "Select All"}
            </button>
            <button
              onClick={() => setSelected([])}
              className="flex items-center gap-2 bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-600"
            >
              <XSquare className="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-white/20 rounded-lg text-sm">
            {/* Table Head */}
            <thead className="bg-[#15182b]">
              <tr className="text-left text-gray-300">
                <th className="p-3">
                  <input
                    type="checkbox"
                    ref={headerCheckboxRef}
                    checked={selected.length === cases?.length}
                    // checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 accent-purple-500"
                  />
                </th>
                <th className="p-3">Test Case ID</th>
                <th className="p-3">Test Case Name</th>
                <th className="p-3">Test Steps</th>
                <th className="p-3">Expected Result</th>
                <th className="p-3">Test Data</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {cases.map((tc, idx) => (
                <tr
                  key={tc.id}
                  className={`border-t border-white/10 ${
                    idx % 2 === 0 ? "bg-[#0f1120]" : "bg-[#121426]"
                  }`}
                >
                  {/* Checkbox */}
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(tc.id)}
                      onChange={() => toggleSelect(tc.id)}
                      className="h-4 w-4 accent-purple-500"
                    />
                  </td>
                  {/* ID */}
                  <td className="p-3 text-indigo-400 font-semibold cursor-pointer underline">
                    {tc.test_id}
                  </td>
                  {/* Name */}
                  <td className="p-3 font-semibold">{tc.name}</td>
                  {/* Steps */}
                  <td className="p-3 text-gray-300 whitespace-pre-line">
                    {/* {tc?.test_scripts.map((step, i) => `${i + 1}. ${step}`).join("\n")} */}
                     {tc?.test_scripts.map((step) => step?.testDescription?<li dangerouslySetInnerHTML={{ __html: step?.testDescription }}></li>:<></>)}
                    {/* {tc?.test_scripts?.testDescription} */}
                  </td>
                  {/* Expected */}
                  <td className="p-3">
                    {/* {tc?.test_scripts[0]?.expectedResult} */}
                    {tc?.test_scripts.map((step) => step?.expectedResult?<li dangerouslySetInnerHTML={{ __html: step?.expectedResult }}></li>:<></>)}
                    </td>
                  {/* Data */}
                  <td className="p-3 whitespace-pre-wrap text-gray-300">
                    {/* {tc?.test_scripts[0]?.testData} */}
                     {tc?.test_scripts.map((step) => step?.testData?<li dangerouslySetInnerHTML={{ __html: step?.testData }}></li>:<></>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Execute Button */}
        <div className="flex justify-end mt-6" onClick={()=>{
onExecute()
        }}>
          <button
            disabled={selected.length === 0}
            className={`px-6 py-2 rounded-lg shadow-md flex items-center gap-2 ${
              selected.length === 0
                ? "bg-blue-400 text-white cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            ▶ Execute Selected Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCases;
