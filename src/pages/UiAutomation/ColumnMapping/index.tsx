// import React, { useState } from "react";
// import type { ChangeEvent } from "react";
// import ViewColumnIcon from "@mui/icons-material/ViewColumn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
// import useMapping from "./Hooks/useMapping";
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// const ColumnMapping: React.FC = () => {
//   const [mappings, setMappings] = useState<Record<string, string[]>>({});
//   const { selectedFields } = useMapping(mappings);

//   console.log(mappings,"checking-a")


//   const handleChange =
//     (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
//       setMappings((prev) => ({ ...prev, [field]: [...prev[field]||[],e.target.value] }));
//     };

//   const options = [
//     { value: "", label: "Select mapping..." },
//     { value: "Test Case Name", label: "Test Case Name" },
//     { value: "Test Steps", label: "Test Steps" },
//     { value: "Expected Result", label: "Expected Result" },
//     { value: "Test Data", label: "Test Data" },
//     { value: "Precondition", label: "Precondition" },
//   ];

//   return (
//     <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
//       <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-white text-2xl font-bold mb-4">Column Mapping</h2>
//             <p className="text-gray-400 text-sm mb-4">
//               Map your file columns to the required fields. Fields marked with * are
//               mandatory.
//             </p>
//           </div>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center gap-2">
//             <CollectionsBookmarkIcon /> Save Mapping
//           </button>
//         </div>

//         {/* Required Fields */}
//         <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6">
//           {["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"].map(
//             (field) => {
//                 let color=selectedFields?.includes(field)?"green":"red"
//                 return      (
//               <span
//                 key={field}
//                 className={`bg-${color}-500/20 border text-${color}-500 border-${color}-500 px-3 py-1 rounded-full`}
//               >
//                 {field} *
//               </span>
//             )
//             }
           
//           )}
//         </div>

//         {/* Mapping Fields */}
//         {[
//           { label: "Test Case ID", col: "Column A", field: "testCaseId" },
//           { label: "Test Description", col: "Column B", field: "testDescription" },
//           { label: "Steps to Execute", col: "Column C", field: "stepsToExecute" },
//           { label: "Expected Output", col: "Column D", field: "expectedOutput" },
//           { label: "Input Data", col: "Column E", field: "inputData" },
//         ].map((item) => (
//           <div
//             key={item.field}
//             className="mb-6 max-w-5xl mx-auto bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
//           >
//             <div className="w-[70%] bg-[#0d0d1a] rounded-lg flex items-center justify-between">
//               {/* Left side */}
//               <div className="flex items-center gap-3">
//                 <div className="w-5 h-5 text-blue-500">
//                   <ViewColumnIcon />
//                 </div>
//                 <div>
//                   <div className="text-white font-semibold">{item.label}</div>
//                   <div className="text-gray-400 text-sm">{item.col}</div>
//                 </div>
//               </div>

//               {/* Dropdown */}
//               <div className="relative bg-[#0d0d1a]  w-[50%]">
//                 <select
//                   value={item.field|| ""}
//                   onChange={handleChange(item.field)}
//                   className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
//                 >
//                   {options.map((option) => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//                 <KeyboardArrowDownIcon className="absolute right-2 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
//                 {<CheckCircleOutlineIcon className="absolute right-[-10%] top-2.5 text-green-400 w-4 h-4 pointer-events-none"/>}
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">
//             Back
//           </button>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 flex items-center gap-2">
//             Process Mapping →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColumnMapping;
// import React, { useState } from "react";
// import type { ChangeEvent } from "react";
// import ViewColumnIcon from "@mui/icons-material/ViewColumn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import useMapping from "./Hooks/useMapping";

// const ColumnMapping: React.FC = () => {
//   const [mappings, setMappings] = useState<Record<string, string>>({});
//   const [saved, setSaved] = useState(false);
//   const { selectedFields } = useMapping(mappings);

//   const handleChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
//     setMappings((prev) => ({ ...prev, [field]: e.target.value }));
//     setSaved(false); // reset saved on change
//   };

//   const options = [
//     { value: "", label: "Select mapping..." },
//     { value: "Test Case Name", label: "Test Case Name" },
//     { value: "Test Steps", label: "Test Steps" },
//     { value: "Expected Result", label: "Expected Result" },
//     { value: "Test Data", label: "Test Data" },
//     { value: "Precondition", label: "Precondition" },
//   ];

//   const requiredFields = ["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"];

//   const allRequiredMapped = requiredFields.every((field) => Object.values(mappings).includes(field));

//   return (
//     <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
//       <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-white text-2xl font-bold mb-2">Column Mapping</h2>
//             <p className="text-gray-400 text-sm mb-4">
//               Map your file columns to the required fields. Fields marked with * are mandatory.
//             </p>
//           </div>
//           <button
//             disabled={Object.keys(mappings).length === 0}
//             onClick={() => setSaved(true)}
//             className={`px-4 py-2 rounded-md flex items-center gap-2 ${
//               Object.keys(mappings).length === 0
//                 ? "bg-violet-400 text-white cursor-not-allowed"
//                 : "bg-violet-500 text-white hover:bg-violet-500"
//             }`}
//           >
//             <CollectionsBookmarkIcon /> Save Mapping
//           </button>
//         </div>

//         {/* Required Fields */}
//         <div className="mb-2 text-white font-semibold">Required</div>
//         <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6">
//           {requiredFields.map((field) => {
//             const color = selectedFields?.includes(field) ? "green" : "red";
//             return (
//               <span
//                 key={field}
//                 className={`bg-${color}-500/20 border text-${color}-500 border-${color}-500 px-3 py-1 rounded-full`}
//               >
//                 {field} *
//               </span>
//             );
//           })}
//         </div>

//         {/* Mapping Fields */}
//         {[
//           { label: "Test Case ID", col: "Column A", field: "testCaseId" },
//           { label: "Test Description", col: "Column B", field: "testDescription" },
//           { label: "Steps to Execute", col: "Column C", field: "stepsToExecute" },
//           { label: "Expected Output", col: "Column D", field: "expectedOutput" },
//           { label: "Input Data", col: "Column E", field: "inputData" },
//         ].map((item) => {
//           const selectedValue = mappings[item.field] || "";

//           return (
//             <div
//               key={item.field}
//               className="mb-6 max-w-5xl mx-auto bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
//             >
//               <div className="w-[70%] bg-[#0d0d1a] rounded-lg flex items-center justify-between">
//                 {/* Left side */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-5 h-5 text-blue-500">
//                     <ViewColumnIcon />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold">{item.label}</div>
//                     <div className="text-gray-400 text-sm">{item.col}</div>
//                   </div>
//                 </div>

//                 {/* Dropdown */}
//                 <div className="relative bg-[#0d0d1a] w-[50%] flex items-center">
//                   <select
//                     value={selectedValue}
//                     onChange={handleChange(item.field)}
//                     disabled={saved && !!selectedValue} // prevent change after saved until edit
//                     className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
//                   >
//                     {options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <KeyboardArrowDownIcon className="absolute right-10 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
//                   {selectedValue && (
//                     <div className="absolute right-2 top-2.5 flex items-center gap-1">
//                       <CheckCircleOutlineIcon className="text-green-400 w-4 h-4 pointer-events-none" />
//                       <button
//                         onClick={() => setMappings((prev) => ({ ...prev, [item.field]: "" }))}
//                         className="text-blue-400 hover:text-blue-300 w-4 h-4 p-0"
//                       >
//                         <EditIcon className="w-4 h-4" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* Buttons */}
//         <div className="flex justify-between mt-6">
//           <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">
//             Back
//           </button>
//           <button
//             disabled={!allRequiredMapped || !saved}
//             className={`px-4 py-2 rounded-md flex items-center gap-2 ${
//               !allRequiredMapped || !saved
//                 ? "bg-gray-600 text-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 text-white hover:bg-blue-500"
//             }`}
//           >
//             Process Mapping →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColumnMapping;
// import React, { useState } from "react";
// import type { ChangeEvent } from "react";
// import ViewColumnIcon from "@mui/icons-material/ViewColumn";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
// import useMapping from "./Hooks/useMapping";

// const ColumnMapping: React.FC = () => {
//   const [mappings, setMappings] = useState<Record<string, string>>({});
//   const [saved, setSaved] = useState(false);
//   const [error, setError] = useState("");
//   const { selectedFields } = useMapping(mappings);
// const [success, setSuccess] = useState(false);

//   const options = [
//     { value: "", label: "Select mapping..." },
//     { value: "Test Case Name", label: "Test Case Name" },
//     { value: "Test Steps", label: "Test Steps" },
//     { value: "Expected Result", label: "Expected Result" },
//     { value: "Test Data", label: "Test Data" },
//     { value: "Precondition", label: "Precondition" },
//   ];

//   const requiredFields = ["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"];
//   const allRequiredMapped = requiredFields.every((field) => Object.values(mappings).includes(field));

//   const handleChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;

//     // Check if selected value is already used
//     if (Object.values(mappings).includes(value) && value !== mappings[field] && value !== "") {
//       setError(`"${value}" has already been selected in another field.`);
//       return;
//     }

//     setError("");
//     setMappings((prev) => ({ ...prev, [field]: value }));
//     setSaved(false); // reset saved when any change
//   };

//   return (
//     <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
//       <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h2 className="text-white text-2xl font-bold mb-2">Column Mapping</h2>
//             <p className="text-gray-400 text-sm mb-4">
//               Map your file columns to the required fields. Fields marked with * are mandatory.
//             </p>
//           </div>
//           <button
//             disabled={Object.keys(mappings).length === 0}
//             onClick={() => setSaved(true)}
//             className={`px-4 py-2 rounded-md flex items-center gap-2 ${
//               Object.keys(mappings).length === 0
//                 ? "bg-purple-300 text-white cursor-not-allowed"
//                 : "bg-purple-600 text-white hover:bg-purple-500"
//             }`}
//           >
//             <CollectionsBookmarkIcon /> Save Mapping
//           </button>
//         </div>

//         {/* Error message */}
//         {error && (
//           <div className="mb-4 p-2 text-sm bg-red-700 text-white rounded">
//             {error}
//           </div>
//         )}

//         {/* Required Fields */}
//         <div className="mb-2 text-white font-semibold">Required Fields</div>
//         <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6">
//           {requiredFields.map((field) => {
//             const color = selectedFields?.includes(field) ? "green" : "red";
//             return (
//               <span
//                 key={field}
//                 className={`bg-${color}-500/20 border text-${color}-500 border-${color}-500 px-3 py-1 rounded-full`}
//               >
//                 {field} *
//               </span>
//             );
//           })}
//         </div>

//         {/* Mapping Fields */}
//         {[
//           { label: "Test Case ID", col: "Column A", field: "testCaseId" },
//           { label: "Test Description", col: "Column B", field: "testDescription" },
//           { label: "Steps to Execute", col: "Column C", field: "stepsToExecute" },
//           { label: "Expected Output", col: "Column D", field: "expectedOutput" },
//           { label: "Input Data", col: "Column E", field: "inputData" },
//         ].map((item) => {
//           const selectedValue = mappings[item.field] || "";

//           return (
//             <div
//               key={item.field}
//               className="mb-6 max-w-5xl mx-auto bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
//             >
//               <div className="w-[70%] bg-[#0d0d1a] rounded-lg flex items-center justify-between">
//                 {/* Left side */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-5 h-5 text-blue-500">
//                     <ViewColumnIcon />
//                   </div>
//                   <div>
//                     <div className="text-white font-semibold">{item.label}</div>
//                     <div className="text-gray-400 text-sm">{item.col}</div>
//                   </div>
//                 </div>
// <div className="flex items-center gap-2 w-[50%]">
//   <div className="relative flex-1">
//     <select
//       value={selectedValue}
//       onChange={handleChange(item.field)}
//       disabled={saved && !!selectedValue}
//       className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//     <KeyboardArrowDownIcon className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
//   </div>
  
//   {selectedValue && (
//     <div className="flex items-center gap-1">
//       <CheckCircleOutlineIcon className="text-green-400 w-4 h-4" />
//       {/* {saved && (
//         <button
//           onClick={() =>
//             setMappings((prev) => ({ ...prev, [item.field]: "" }))
//           }
//           className="text-blue-400 hover:text-blue-300 text-sm font-medium px-2 py-1 border border-blue-400 rounded-md"
//         >
//           Edit
//         </button>
//       )} */}
//       {saved && (
//         <button
//           onClick={() => setMappings((prev) => ({ ...prev, [item.field]: "" }))}
//           className="text-blue-400 hover:text-blue-300 text-sm font-medium px-2 py-1 border border-blue-400 rounded-md flex items-center gap-1"
//         >
//           <EditIcon className="w-4 h-4" /> Edit
//         </button>
//       )}

//     </div>
//   )}
// </div>

//                 {/* Dropdown */}
//                 {/* <div className="relative bg-[#0d0d1a] w-[50%] flex items-center">
//                   <select
//                     value={selectedValue}
//                     onChange={handleChange(item.field)}
//                     disabled={saved && !!selectedValue} // prevent change after saved until edit
//                     className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
//                   >
//                     {options.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <KeyboardArrowDownIcon className="absolute right-10 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
//                   {selectedValue && (
//                     <div className="absolute right-2 top-2.5 flex items-center gap-1">
//                       <CheckCircleOutlineIcon className="text-green-400 w-4 h-4 pointer-events-none" />
//                       {saved && (
//                         <button
//                           onClick={() => setMappings((prev) => ({ ...prev, [item.field]: "" }))}
//                           className="text-blue-400 hover:text-blue-300 w-4 h-4 p-0"
//                         >
//                           <EditIcon className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </div> */}
//               </div>
//             </div>
//           );
//         })}

//         {/* Buttons */}
//         <div className="flex justify-between mt-4">
//           <button className="bg-gray-600 text-white px-9 py-0 rounded-md hover:bg-gray-500 flex items-center gap-1">
//             ← Back
//           </button>
//           {saved && (
//             <span className="bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
//               Mapping Saved Successfully
//             </span>
//           )}

//           {/* {success && (
//             <div className="mt-4 p-4 bg-green-900 border border-green-600 rounded-md text-green-300 text-sm flex items-center gap-2">
//               <CheckCircleOutlineIcon className="bg-green-500 text-white rounded-full p-[2px]" />
//               Mapping Saved Successfully
//             </div>
//           )} */}

//           <button
//             disabled={!allRequiredMapped || !saved}
//               onClick={() => {
//               if (allRequiredMapped && saved) {
//                 setSuccess(true);
//               }
//             }}
//             className={`px-4 py-2 rounded-md flex items-center gap-2 ${
//               !allRequiredMapped || !saved
//                 ? "bg-blue-400 text-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 text-white hover:bg-blue-500"
//             }`}
//           >
//             Process Mapping →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColumnMapping;
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import useMapping from "./Hooks/useMapping";

const ColumnMapping: React.FC = () => {
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { selectedFields } = useMapping(mappings);

  const options = [
    { value: "", label: "Select mapping..." },
    { value: "Test Case Name", label: "Test Case Name" },
    { value: "Test Steps", label: "Test Steps" },
    { value: "Expected Result", label: "Expected Result" },
    { value: "Test Data", label: "Test Data" },
    { value: "Precondition", label: "Precondition" },
  ];

  const requiredFields = ["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"];
  const allRequiredMapped = requiredFields.every((field) => Object.values(mappings).includes(field));

  const hasAnySelection = Object.values(mappings).some(Boolean);

  const handleChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // prevent duplicate mapping selection
    if (Object.values(mappings).includes(value) && value !== mappings[field] && value !== "") {
      setError(`"${value}" has already been selected in another field.`);
      return;
    }

    setError("");
    setSuccess(false); // hide success banner on any change
    setSaved(false);   // require saving again after change
    setMappings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
      <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Column Mapping</h2>
            <p className="text-gray-400 text-sm">
              Map your file columns to the required fields. Fields marked with * are mandatory.
            </p>
          </div>

          <button
            disabled={!hasAnySelection}
            onClick={() => { setSaved(true); setSuccess(false); }}
            className={`px-4 py-2 rounded-md flex items-center gap-2 font-medium
              ${!hasAnySelection
                ? "bg-purple-300 text-white cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-500"}`}
          >
            <CollectionsBookmarkIcon fontSize="small" /> Save Mapping
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 text-sm bg-red-900/40 border border-red-600 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Required Fields */}
        <div className="mb-2 text-white font-semibold">Required Fields</div>
        <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6 border border-gray-700">
          {requiredFields.map((field) => {
            const ok = selectedFields?.includes(field);
            return (
              <span
                key={field}
                className={
                  ok
                    ? "bg-green-500/20 border border-green-500 text-green-500 px-3 py-1 rounded-full text-sm"
                    : "bg-red-500/20 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm"
                }
              >
                {field} *
              </span>
            );
          })}
        </div>

        {/* Mapping Fields */}
        {[
          { label: "Test Case ID", col: "Column A", field: "testCaseId" },
          { label: "Test Description", col: "Column B", field: "testDescription" },
          { label: "Steps to Execute", col: "Column C", field: "stepsToExecute" },
          { label: "Expected Output", col: "Column D", field: "expectedOutput" },
          { label: "Input Data", col: "Column E", field: "inputData" },
        ].map((item) => {
          const selectedValue = mappings[item.field] || "";
          const showCheck = !!selectedValue;

          return (
            <div
              key={item.field}
              className="mb-6 max-w-5xl mx-auto bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="w-[70%] flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-blue-500">
                    <ViewColumnIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.col}</div>
                  </div>
                </div>

                {/* Select + status */}
                <div className="flex items-center gap-2 w-[50%]">
                  <div className="relative flex-1">
                    <select
                      value={selectedValue}
                      onChange={handleChange(item.field)}
                      disabled={saved && !!selectedValue}
                      className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <KeyboardArrowDownIcon className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>

                  {/* Filled green check */}
                  {showCheck && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}

                  {/* Edit (after saved) */}
                  {showCheck && saved && (
                    <button
                      onClick={() => { setMappings((p) => ({ ...p, [item.field]: "" })); setSaved(false); setSuccess(false); }}
                      className="text-white bg-blue-600 hover:bg-blue-500 text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <EditIcon className="w-4 h-4" /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Success banner (exact style of first image) */}
        {success && (
          <div className="max-w-5xl mx-auto mb-4">
            <div className="flex items-start gap-3 p-4 rounded-md border border-green-600 bg-green-900/30">
              <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                <CheckIcon className="w-4 h-4 text-white" />
              </span>
              <div className="text-green-200">
                <div className="font-semibold">Mapping Saved Successfully</div>
                <div className="text-sm text-green-300">
                  All required fields have been mapped correctly.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex items-center gap-2">
            <ArrowBackIosNewIcon className="w-4 h-4" /> Back
          </button>

          <button
            disabled={!allRequiredMapped || !saved}
            onClick={() => {
              if (allRequiredMapped && saved) setSuccess(true);
            }}
            className={`px-4 py-2 rounded-md flex items-center gap-2
              ${!allRequiredMapped || !saved
                ? "bg-blue-600/60 text-white/80 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"}`}
          >
            Process Mapping →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnMapping;
