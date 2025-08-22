import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setProjectId, setProjectName } from "../../redux/appSlice";
// import { setProjectId } from "@/redux/appSlice";
import { setActiveCollection } from "@/redux/collectionsSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://13.203.56.29/v1/api/projects";
const userId = 1; // Replace with actual user ID from auth

const MODAL_SHOWN_KEY = 'modalShownInSession';


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [projectToDelete, setProjectToDelete] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const handleProjectClick = (project: { id: string; name: string }) => {
    dispatch(setProjectId(project.id));
    dispatch(setProjectName(project.name));
    dispatch(setActiveCollection(null));
    localStorage.removeItem(MODAL_SHOWN_KEY)
    // navigate(`/project/manual-test-cases`); // dynamic route
     navigate("/dashboard");
  };
  // ✅ Fetch projects once on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/get-projects/${userId}/`
        );
        const fetchedProjects = res.data.response || [];

        const transformed = fetchedProjects.map((p) => ({
          id: p.project_id,
          name: p.name,
          description: p.description,
          status: p.status || "pending",
          updated: p.updated_at ? p.updated_at.split("T")[0] : "-",
          image: p.image || "",
        }));

        setProjects(transformed);
      } catch (err) {
        console.error("Error fetching projects:", err);
        toast.error("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  // ✅ Create project with validation
  const handleSave = async () => {
    if (!newProject.name.trim()) {
      toast.error("Project name is required!");
      return;
    }
    if (!newProject.description.trim()) {
      toast.error("Project description is required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", `${userId}`);
      formData.append("name", newProject.name);
      formData.append("description", newProject.description);
      if (newProject.image) formData.append("image", newProject.image);

      const createProj= await axios.post(`${API_BASE_URL}/create-project/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Refresh project list after adding new one
      const res = await axios.get(`${API_BASE_URL}/get-projects/${userId}/`);
      console.log(res,'res')
      setProjects(
        res.data.response.map((p) => ({
          id: p.project_id,
          name: p.name,
          description: p.description,
          status: p.status || "pending",
          updated: p.updated_at ? p.updated_at.split("T")[0] : "-",
          image: p.image || "",
        }))
      );
      handleProjectClick({
        id: createProj.data.project_id,
        name: newProject.name,
      });
      dispatch(setProjectId(createProj.data.project_id))
      dispatch(setActiveCollection(null))
      navigate(`/project/manual-test-cases/`)

      toast.success("Project created successfully!");
      setIsModalOpen(false);
      setNewProject({ name: "", description: "", image: null });
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project. Please try again.");
    }
  };

  // ✅ Delete project
  const confirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/delete-project/${projectToDelete}/`);

      // Refresh list after deletion
      const res = await axios.get(`${API_BASE_URL}/get-projects/${userId}/`);
      setProjects(
        res.data.response.map((p) => ({
          id: p.project_id,
          name: p.name,
          description: p.description,
          status: p.status || "pending",
          updated: p.updated_at ? p.updated_at.split("T")[0] : "-",
          image: p.image || "",
        }))
      );

      toast.success("Project deleted successfully!");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project. Please try again.");
    }
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="p-6 text-white">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

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
            onClick={() => {
              handleProjectClick(project)
              // dispatch(setProjectId(project.id))
              // dispatch(setActiveCollection(null))

              // navigate(`/project/manual-test-cases/`)
            }
              // navigate(`/project/ui-automation`, {
              //   state: { projectName: project.name },
              // })

            }
            className="bg-[#1e1e2e] rounded-lg p-5 shadow border border-gray-700 flex flex-col justify-between 
            hover:border-blue-500 hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">{project.name}</h2>
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
              <p className="text-gray-400 text-sm mb-6">
                {project.description}
              </p>
            </div>
            <hr className="my-3 border-gray-700" />
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>Updated: {project.updated}</span>
              <TrashIcon
                className="h-4 w-4 cursor-pointer hover:text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setProjectToDelete(project.id);
                  setIsDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative bg-[#1e1e2e] p-6 rounded-lg w-full max-w-sm shadow-lg z-10">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>

            <label className="block mb-2">Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="w-full p-2 rounded bg-[#11111b] text-white mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full p-2 rounded bg-[#11111b] text-white mb-4"
            ></textarea>

            <label className="block mb-2">Profile Image</label>
            <input
              type="file"
              onChange={(e) =>
                setNewProject({ ...newProject, image: e.target.files[0] })
              }
              className="w-full p-2 rounded bg-[#11111b] text-white mb-4"
            />

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
              Are you sure you want to delete this project? Once deleted, you
              will lose all data associated with this project.
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg text-white"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white"
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

