import React from "react";
import { Link } from "react-router-dom";

const projects = [
	{ path: "api-testing-suite", name: "API Testing Suite" },
	{ path: "ui-automation", name: "UI Automation" },
	{ path: "manual-test-cases", name: "Manual Test Cases" },
	{ path: "database-testing", name: "Database Testing" },
];

const Projects: React.FC = () => {
	return (
		<div className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-bold'>Projects</h1>
				<Link
					to='/projects/new'
					className='bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition'>
					+ Create New Project
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{projects.map((project) => (
					<Link
						to={`/project/${project.path}`}
						key={project.path}
						className='bg-gray-800 text-white rounded-xl p-5 shadow hover:bg-gray-700 transition'>
						<h2 className='text-xl font-semibold mb-2'>{project.name}</h2>
						<p className='text-sm text-gray-400'>
							Click to explore the {project.name.toLowerCase()} project.
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Projects;
