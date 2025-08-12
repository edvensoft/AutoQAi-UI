// import { NavLink } from "react-router-dom";

// const projects = [
// 	{ name: "API Testing Suite", path: "/project/api-testing-suite" },
// 	{ name: "UI Automation", path: "/project/ui-automation" },
// 	{ name: "Manual Test Cases", path: "/project/manual-test-cases" },
// 	{ name: "Database Testing", path: "/project/database-testing" },
// ];

// export default function Sidebar() {
// 	return (
// 		<aside className='w-64 bg-[#15152B] p-4 text-white'>
// 			<h2 className='text-lg font-bold mb-4'>Projects</h2>
// 			<nav className='flex flex-col gap-2'>
// 				{projects.map((proj) => (
// 					<NavLink
// 						key={proj.path}
// 						to={proj.path}
// 						className={({ isActive }) =>
// 							`p-2 rounded transition-colors ${
// 								isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
// 							}`
// 						}>
// 						{proj.name}
// 					</NavLink>
// 				))}
// 			</nav>
// 		</aside>
// 	);
// }
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FolderIcon } from "@heroicons/react/24/outline"; // You can choose any icon

// const projects = [
//   { name: "API Testing Suite", path: "/project/api-testing-suite" },
//   { name: "UI Automation", path: "/project/ui-automation" },
//   { name: "Manual Test Cases", path: "/project/manual-test-cases" },
//   { name: "Database Testing", path: "/project/database-testing" },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-[#15152B] text-white transition-all duration-300 shadow-lg z-50
//         ${isOpen ? "w-64" : "w-14"}`}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center gap-2 p-4">
//         <FolderIcon className="h-6 w-6" />
//         {isOpen && <h2 className="text-lg font-bold">Projects</h2>}
//       </div>

//       {/* Nav Links */}
//       {isOpen && (
//         <nav className="flex flex-col gap-2 px-4">
//           {projects.map((proj) => (
//             <NavLink
//               key={proj.path}
//               to={proj.path}
//               className={({ isActive }) =>
//                 `p-2 rounded transition-colors ${
//                   isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
//                 }`
//               }
//             >
//               {proj.name}
//             </NavLink>
//           ))}
//         </nav>
//       )}
//     </div>
//   );
// }
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FolderIcon } from "@heroicons/react/24/outline";

// const projects = [
//   { name: "API Testing Suite", path: "/project/api-testing-suite" },
//   { name: "UI Automation", path: "/project/ui-automation" },
//   { name: "Manual Test Cases", path: "/project/manual-test-cases" },
//   { name: "Database Testing", path: "/project/database-testing" },
// ];

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className={`fixed left-0 h-[calc(100%-0rem)] bg-[#15152B] text-white transition-all duration-300 shadow-lg z-40
//         ${isOpen ? "w-64" : "w-14"}`}
//       style={{ top: "3rem" }} // 4rem = 64px header height
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center gap-2 p-4">
//         <FolderIcon className="h-6 w-6" />
//         {isOpen && <h2 className="text-lg font-bold">Projects</h2>}
//       </div>

//       {/* Nav Links */}
//       {isOpen && (
//         <nav className="flex flex-col gap-2 px-4">
//           {projects.map((proj) => (
//             <NavLink
//               key={proj.path}
//               to={proj.path}
//               className={({ isActive }) =>
//                 `p-2 rounded transition-colors ${
//                   isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
//                 }`
//               }
//             >
//               {proj.name}
//             </NavLink>
//           ))}
//         </nav>
//       )}
//     </div>
//   );
// }

// export default Sidebar;
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   CodeBracketIcon,
//   CpuChipIcon,
//   ClipboardDocumentCheckIcon,
//   CircleStackIcon,
// } from "@heroicons/react/24/outline";

// const projects = [
//   { name: "API Testing", path: "/project/api-testing-suite", icon: <CodeBracketIcon className="h-5 w-5" /> },
//   { name: "UI Automation", path: "/project/ui-automation", icon: <CpuChipIcon className="h-5 w-5" /> },
//   { name: "Manual Test Cases", path: "/project/manual-test-cases", icon: <ClipboardDocumentCheckIcon className="h-5 w-5" /> },
//   { name: "Database Testing", path: "/project/database-testing", icon: <CircleStackIcon className="h-5 w-5" /> },
// ];

// function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div
//       className={`fixed left-0 bg-[#15152B] text-white transition-all duration-300 shadow-lg z-40
//         ${isOpen ? "w-64" : "w-14"}`}
//       style={{
//         top: "3rem", // keeps sidebar under header
//         height: "calc(100vh - 3rem)",
//       }}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center gap-2 p-4 border-b border-gray-700">
//         <span className="h-6 w-6 flex-shrink-0 text-gray-300">{projects[0].icon}</span>
//         {isOpen && <h2 className="text-lg font-bold whitespace-nowrap">Projects</h2>}
//       </div>

//       {/* Nav Links */}
//       <nav className="flex flex-col gap-2 px-2 py-2 overflow-y-auto">
//         {projects.map((proj) => (
//           <NavLink
//             key={proj.path}
//             to={proj.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 p-2 rounded transition-colors ${
//                 isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
//               }`
//             }
//           >
//             <span className="flex-shrink-0 text-white">{proj.icon}</span>
//             {isOpen && <span className="whitespace-nowrap">{proj.name}</span>}
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Bars3Icon,
  CodeBracketIcon,
  CpuChipIcon,
  ClipboardDocumentCheckIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

const projects = [
  { name: "API Testing", path: "/project/api-testing-suite", icon: <CodeBracketIcon className="h-5 w-5" /> },
  { name: "UI Automation", path: "/project/ui-automation", icon: <CpuChipIcon className="h-5 w-5" /> },
  { name: "Manual Test Cases", path: "/project/manual-test-cases", icon: <ClipboardDocumentCheckIcon className="h-5 w-5" /> },
  { name: "Database Testing", path: "/project/database-testing", icon: <CircleStackIcon className="h-5 w-5" /> },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`fixed left-0 bg-[#15152B] text-white transition-all duration-300 shadow-lg z-40
        ${isOpen ? "w-64" : "w-14"}`}
      style={{
        top: "3rem",
        height: "calc(100vh - 3rem)",
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-700">
        <Bars3Icon className="h-6 w-6 flex-shrink-0 text-gray-300" />
        {isOpen && <h2 className="text-lg font-bold whitespace-nowrap">Projects</h2>}
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 px-2 py-2 overflow-y-auto">
        {projects.map((proj) => (
          <NavLink
            key={proj.path}
            to={proj.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition-colors ${
                isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
              }`
            }
          >
            <span className="flex-shrink-0 text-white">{proj.icon}</span>
            {isOpen && <span className="whitespace-nowrap">{proj.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
