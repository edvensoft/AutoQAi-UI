import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsLayout from "./layout/ProjectsLayout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Projects from "./pages/Projects";

// Project detail child pages
import ApiTestingSuite from "./pages/ApiTestingSuite";
import UiAutomation from "./pages/UiAutomation";
import ManualTestCases from "./pages/ManualTestCases";
import DatabaseTesting from "./pages/DatabaseTesting";


function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='*'
					element={<Login />}
				/>

				{/* Projects page without sidebar */}
				<Route element={<ProjectsLayout />}>
					<Route
						path='/projects'
						element={<Projects />}
					/>
				</Route>

				{/* Project details with sidebar */}
				<Route element={<MainLayout />}>
					<Route
						path='/project/api-testing-suite'
						element={<ApiTestingSuite />}
					/>
					<Route
						path='/project/ui-automation'
						element={<UiAutomation />}
					/>
					<Route
						path='/project/manual-test-cases'
						element={<ManualTestCases />}
					/>
					<Route
						path='/project/database-testing'
						element={<DatabaseTesting />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
