import { useSelector } from "react-redux";
import ApiTesingOptions from "./ApiTesingOptions";
import type { RootState } from "@/redux/store";
import { useEffect, } from "react";
import ListOfApis from "./ListOfApis";
import CodeReview from "./CodeReview";
import TestDataReview from "./TestDataReview";
import TestExecution from "./TestExecution";
import ExecutionLoader from "./ExecutionLoader";
import { ToastContainer } from "react-toastify";


const StepData = [
	{
		step: 1,
		component: <ApiTesingOptions />
	},
	{
		step: 2,
		component: <ListOfApis />
	},
	{
		step: 3,
		component: <CodeReview />
	},
	{
		step: 4,
		component: <TestDataReview />
	},
	{
		step: 5,
		component: <TestExecution />
	},
	{
		step: 6,
		component: <ExecutionLoader />
	},
]

export default function ApiTestingSuite() {

	const apiTesingState = useSelector((state: RootState) => state.apiTesting);
	// const [component, setComponent] = useState<JSX.Element | undefined>()


	useEffect(() => {
		console.log('state', apiTesingState)
		console.log('getCompo', StepData.find((item) => item.step === apiTesingState.currentStep))
		// let currntComponent = StepData.find((item) => item.step === apiTesingState.currentStep)
		// setComponent(currntComponent?.component)
	}, [apiTesingState])

	return (
		<div className="mt-[40px]">
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar />

			<ApiTesingOptions />
			{/* {component} */}
		</div>

	);
}
