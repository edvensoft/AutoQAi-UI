import React, { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "API Testing Suite", description: "Comprehensive API testing framework with automated validation and reporting capabilities.", status: "success", updated: "15/12/2024" },
    { id: 2, name: "UI Automation", description: "Automated UI testing framework for web applications with cross-browser support.", status: "error", updated: "08/12/2024" },
    { id: 3, name: "Manual Test Cases", description: "Comprehensive manual testing documentation and test case management system.", status: "success", updated: "28/11/2024" },
    { id: 4, name: "Database Testing", description: "Database validation and performance testing tools for data integrity verification.", status: "error", updated: "15/11/2024" },
    { id: 5, name: "Performance Testing", description: "Load and stress testing framework for application performance optimization.", status: "success", updated: "03/12/2024" },
    { id: 6, name: "Security Testing", description: "Security vulnerability assessment and penetration testing automation tools.", status: "error", updated: "12/12/2024" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  const handleSave = () => {
    if (!newProject.name) return;
    setProjects([
      ...projects,
      {
        id: Date.now(),
        ...newProject,
        status: "success",
        updated: new Date().toLocaleDateString("en-GB"),
      },
    ]);
    setNewProject({ name: "", description: "" });
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (projectToDelete !== null) {
      setProjects(projects.filter((p) => p.id !== projectToDelete));
    }
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg font-medium"
        >
          + New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => navigate(`/project/ui-automation`)} // navigate to report page
            className="bg-[#1e1e2e] rounded-lg p-5 shadow border border-gray-700 flex flex-col justify-between 
            hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">{project.name}</h2>

                {/* Tooltip wrapper */}
                <div className="relative group">
                  {project.status === "success" ? (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 cursor-pointer" />
                  ) : (
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                  )}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                    {project.status === "success"
                      ? "Project settings complete"
                      : "Complete the project settings"}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">{project.description}</p>
            </div>
            <hr className="my-3 border-gray-700" />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Updated: {project.updated}</span>
              <TrashIcon
                className="h-4 w-4 cursor-pointer hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering navigation
                  setProjectToDelete(project.id);
                  setIsDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative bg-[#1e1e2e] p-6 rounded-lg w-full max-w-sm shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>

            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="w-full p-2 rounded bg-[#11111b] text-white mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="w-full p-2 rounded bg-[#11111b] text-white mb-4"
            ></textarea>

            <label className="block mb-2">Profile Image</label>
            <input type="file" className="w-full p-2 rounded bg-[#11111b] text-white mb-4" />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative bg-[#1e1e2e] p-6 rounded-lg w-full max-w-sm shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Delete Project</h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this project? Once deleted, you will lose all data associated with this project.
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 px-18 py-2 rounded-lg text-white"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 px-18 py-2 rounded-lg text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
