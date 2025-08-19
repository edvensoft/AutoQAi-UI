import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  CodeBracketIcon,
  CpuChipIcon,
  ClipboardDocumentCheckIcon,
  CircleStackIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const projects = [
  { name: "API Testing", path: "/project/api-testing-suite", icon: <CodeBracketIcon className="h-5 w-5" /> },
  { name: "UI Automation", path: "/project/ui-automation", icon: <CpuChipIcon className="h-5 w-5" /> },
  { name: "Manual Test Cases", path: "/project/manual-test-cases", icon: <ClipboardDocumentCheckIcon className="h-5 w-5" /> },
  { name: "Database Testing", path: "/project/database-testing", icon: <CircleStackIcon className="h-5 w-5" /> },
];

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(true); // default maximized
  const location = useLocation();
const projectName = location.state?.projectName || "My Project";
  // find active project based on current route
  const activeProject = projects.find((proj) =>
    location.pathname.startsWith(proj.path)
  );
 
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
                  isActive ? "bg-blue-400 font-semibold" : "hover:bg-blue-400"
                }`
              }
            >
              <span className="flex-shrink-0 text-white">{proj.icon}</span>
              {isOpen && <span className="whitespace-nowrap">{proj.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        {/* <div className="absolute bottom-0 w-full p-3 border-t border-gray-700">
          {activeProject && (
            <div className="flex items-center gap-2 bg-[#1E1E3F] text-white p-3 rounded-lg">
              {activeProject.icon}
              {isOpen && <span className="font-medium">{activeProject.name}</span>}
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-3 w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            {isOpen ? (
              <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-300" />
            ) : (
              <ChevronDoubleRightIcon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div> */}
         <div className="absolute bottom-0 w-full p-3 border-t border-gray-700 flex flex-col items-center">
          {isOpen ? (
            <div className="flex items-center justify-between w-full bg-[#0D0D1A] text-white p-3 rounded-lg">
              <div className="flex items-center gap-2">
                {/* {activeProject.icon} */}
                <span className="font-medium truncate">{projectName}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ml-2 flex items-center justify-center"
              >
                <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className=" p-3 rounded-lg mb-2">
                {/* {activeProject.icon} */}
                </div>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center p-2 rounded-lg bg-[#0D0D1A] hover:bg-gray-700"
              >
                <ChevronDoubleRightIcon className="h-5 w-5 text-gray-300" />
              </button>
            </div>
          )}
        </div>
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
