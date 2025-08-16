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
import RecentReports from "./pages/RecentReports";
import ListOfApis from "./pages/ApiTestingSuite/ListOfApis";
import CodeReview from "./pages/ApiTestingSuite/CodeReview";
import TestDataReview from "./pages/ApiTestingSuite/TestDataReview";
import TestExecution from "./pages/ApiTestingSuite/TestExecution";
import ExecutionLoader from "./pages/ApiTestingSuite/ExecutionLoader";

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
						path='/project/api-testing-suite/:projectId'
						element={<ApiTestingSuite />}
					/>
					<Route
						path='/project/recent-reports'
						element={<RecentReports />}
					/>
					<Route
						path='/project/api-testing-suite/api-list/:projectId'
						element={<ListOfApis />}
					/>
					<Route
						path='/project/api-testing-suite/code-review/:projectId'
						element={<CodeReview />}
					/>
					<Route
						path='/project/api-testing-suite/test-data-review/:projectId'
						element={<TestDataReview />}
					/>
					<Route
						path='/project/api-testing-suite/test-execution/:projectId'
						element={<TestExecution />}
					/>
					{/* <Route
						path='/project/api-testing-suite/execution-loader'
						element={<ExecutionLoader />}
					/> */}
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
