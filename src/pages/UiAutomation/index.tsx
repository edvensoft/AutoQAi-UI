import TestCaseOptions from "./TestCaseOptions";


export default function UiAutomation() {
	return (
		<div>
			<h2 className='text-4xl font-bold mb-2'>
				UI Automation
			</h2>
			<div className="min-h-screen flex flex-col items-start justify-start">
      <h2 className="text-gray-400 text-lg mb-8 text-start">
        Upload test cases, integrate with test management tools, or select from manual test collections
      </h2>
      <TestCaseOptions/>
    </div>
			
		</div>
	);
}	
