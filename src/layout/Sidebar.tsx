// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Bars3Icon,
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
//         top: "3rem",
//         height: "calc(100vh - 3rem)",
//       }}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       {/* Sidebar Header */}
//       <div className="flex items-center gap-2 p-4 border-b border-gray-700">
//         <Bars3Icon className="h-6 w-6 flex-shrink-0 text-gray-300" />
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
  {
    name: "API Testing Suite",
    path: "/project/api-testing-suite",
    icon: <CodeBracketIcon className="h-5 w-5" />,
  },
  {
    name: "UI Automation",
    path: "/project/ui-automation",
    icon: <CpuChipIcon className="h-5 w-5" />,
  },
  {
    name: "Manual Test Cases",
    path: "/project/manual-test-cases",
    icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
  },
  {
    name: "Database Testing",
    path: "/project/database-testing",
    icon: <CircleStackIcon className="h-5 w-5" />,
  },
];

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
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
          {isOpen && (
            <h2 className="text-lg font-bold whitespace-nowrap">Projects</h2>
          )}
        </div>

        {/* Nav Links with Icons */}
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

      {/* Main Content */}
      <div
        className={`transition-all duration-300`}
        style={{
          marginLeft: isOpen ? "16rem" : "3.5rem", // 64px or 14px
          width: `calc(100% - ${isOpen ? "16rem" : "3.5rem"})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Sidebar;
