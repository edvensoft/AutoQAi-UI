import ChartSection from "./ChartSection";
import TestCollections from "./TestCollections";
import CreateCollection from "./CreateCollection";

export default function ManualTestCases() {
	return (
		<div className='flex flex-1'>
			<div className='flex flex-1 h-[calc(100vh-80px)] flex-col bg-gray-900 text-gray-200 gap-4'>
				<CreateCollection />
				<ChartSection />
			</div>
			<TestCollections />
		</div>
	);
}
