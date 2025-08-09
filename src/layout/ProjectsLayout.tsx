import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function ProjectsLayout() {
	return (
		<div className='min-h-screen bg-[#0D0D1A] text-white'>
			<Header />
			<main className='p-6'>
				<Outlet />
			</main>
		</div>
	);
}
