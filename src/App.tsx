import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectsLayout from "./layout/ProjectsLayout";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login/Login";
import Projects from "./pages/Projects/Projects";
// Project detail child pages
import ApiTestingSuite from "./pages/ApiTestingSuite";
import UiAutomation from "./pages/UiAutomation";
import ManualTestCases from "./pages/ManualTestCases";
import DatabaseTesting from "./pages/DatabaseTesting";
import Index from "./pages/UiAutomation/index.jsx";
import Loader from "./pages/UiAutomation/Loader/Loader.jsx";
import Execution from "./pages/UiAutomation/UploadCases/Execution.jsx";
import ReportPage from "./pages/UiAutomation/UploadCases/Report.jsx";
import ColumnMapping from "./pages/UiAutomation/ColumnMapping/index.js";

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
						path='/project/ui-automation/loader'
						element={<Loader />}
					/>
					<Route
						path='/project/ui-automation/execution'
						element={<Execution />}
					/>
					<Route
						path='/project/ui-automation/report'
						element={<ReportPage />}
					/>
						<Route
						path='/project/ui-automation/column-mapping'
						element={<ColumnMapping />}
					/>
					<Route
						path='/project/manual-test-cases'
						element={<ManualTestCases />}
					/>
					<Route
						path='/project/database-testing'
						element={<DatabaseTesting />}
					/>
					<Route
						path='/testcases'
						element={<Index />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
