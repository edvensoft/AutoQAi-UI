// import { Outlet } from "react-router-dom";

// import Header from "./Header";

// export default function ProjectsLayout() {
// 	return (
// 		<div className='min-h-screen bg-[#0D0D1A] text-white'>
// 			<Header />
// 			<main className='p-6'>
// 				<Outlet />
// 			</main>
// 		</div>
// 	);
// }
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function ProjectsLayout() {
	return (
		<div className="min-h-screen bg-[#0D0D1A] text-white overflow-x-hidden">
			<Header />
			<main className="p-6 mt-[56px] w-full box-border">
				<Outlet />
			</main>
		</div>
	);
}
