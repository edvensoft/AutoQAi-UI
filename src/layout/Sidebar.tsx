import { NavLink } from "react-router-dom";

const projects = [
	{ name: "API Testing Suite", path: "/project/api-testing-suite" },
	{ name: "UI Automation", path: "/project/ui-automation" },
	{ name: "Manual Test Cases", path: "/project/manual-test-cases" },
	{ name: "Database Testing", path: "/project/database-testing" },
];

export default function Sidebar() {
	return (
		<aside className='w-64 bg-[#15152B] p-4 text-white'>
			<h2 className='text-lg font-bold mb-4'>Projects</h2>
			<nav className='flex flex-col gap-2'>
				{projects.map((proj) => (
					<NavLink
						key={proj.path}
						to={proj.path}
						className={({ isActive }) =>
							`p-2 rounded transition-colors ${
								isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-800"
							}`
						}>
						{proj.name}
					</NavLink>
				))}
			</nav>
		</aside>
	);
}
