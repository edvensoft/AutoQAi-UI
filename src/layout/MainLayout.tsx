import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainLayout() {
	return (
		<div className="min-h-screen bg-[#0D0D1A] text-white flex flex-col">
			<Header />

			<div className="flex flex-1" style={{ marginTop: "2.5rem" }}> 
				{/* Sidebar */}
				<Sidebar />

				{/* Main content */}
				<main className="flex-1 p-6 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
