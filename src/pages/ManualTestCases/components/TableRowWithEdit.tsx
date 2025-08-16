import { DeleteIcon, SaveIcon } from "lucide-react";
import { useState } from "react";

function TableRowWithEdit({ testCases }) {
	const [isEditing, setIsEditing] = useState(false);
	const [testCaseId, setTestCaseId] = useState(testCases.test_case_id);
	// const [testSteps, setTestSteps] = useState(
	// 	"1. Navigate to login page\n2. Enter valid credentials\n3. Click login button",
	// );
	// const [expectedResult, setExpectedResult] = useState(
	// 	"User should be successfully logged in and redirected to dashboard",
	// );
	const [testSteps, setTestSteps] = useState(testCases.steps);
	const [expectedResult, setExpectedResult] = useState(testCases.expected_output);
	console.log('testcase', testCases)
	return (
		<tr key={testCases.id}>
			<td className='px-4 py-3 border-r border-gray-700 align-top'>
				{isEditing ? (
					<input
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full'
						// value={testCaseId}
						placeholder="enter"
						onChange={(e) => setTestCaseId(e.target.value)}
					/>
				) : (
					testCaseId
				)}
			</td>
			<td className='px-4 py-3 border-r border-gray-700 whitespace-pre-line align-top'>
				{isEditing ? (
					<textarea
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full min-h-[60px]'
						value={testSteps}
						onChange={(e) => setTestSteps(e.target.value)}
					/>
				) : (
					testSteps
				)}
			</td>
			<td className='px-4 py-3 border-r border-gray-700 align-top'>
				{isEditing  ? (
					<input
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full'
						value={expectedResult}
						onChange={(e) => setExpectedResult(e.target.value)}
					/>
				) : (
					expectedResult
				)}
			</td>
			<td className='px-4 py-3 flex gap-2 align-top'>
				{isEditing ? (
					<button
						className='text-green-400 hover:text-green-500 cursor-pointer'
						title='Save'
						onClick={() => setIsEditing(false)}>
						<SaveIcon />
					</button>
				) : (
					<button
						className='text-yellow-400 hover:text-yellow-500 cursor-pointer'
						title='Edit'
						onClick={() => setIsEditing(true)}>
						Edit
					</button>
				)}
				<button
					className='text-red-500 hover:text-red-600 cursor-pointer'
					title='Delete'>
					<DeleteIcon />
				</button>
			</td>
		</tr>
	);
}
export default TableRowWithEdit;