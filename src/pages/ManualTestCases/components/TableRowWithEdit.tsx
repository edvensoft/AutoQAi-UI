import { API_URL } from "@/config";
import { setTestCases } from "@/redux/collectionsSlice";
import type { RootState } from "@/redux/store";
import axios from "axios";
import { DeleteIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

	const storeTestCase = useSelector((state: RootState) => state.collections.testCases);
	const activeCollectionId = useSelector(
		(state: RootState) => state.collections.activeCollectionId,
	);
	const dispatch = useDispatch();


	const handleTestCaseId = (e) => {
		const val = e.target.value
		setTestCaseId(val)
		
	}
	const handleTestCaseResult = (e) => {
		const val = e.target.value
		setExpectedResult(val)
		
	}
	const handleTestCaseStep = (e) => {
		const val = e.target.value
		setTestSteps(val)
	}


	const handleSave = () => {
		// const checkNewTestCase = storeTestCase.find(item => item.id === "new")
		// let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
		if (testCases.id === 'new') {
			const payLoad = {
				"collection_id": activeCollectionId,
				"test_case_chat_id": storeTestCase.length > 0 ? storeTestCase[0].test_case_chat_id : '',
				"name": 'new',
				"steps": testSteps,
				"expected_output": expectedResult
			}
			// setIsEditing(false)
			// dispatch(deleteTestCaseById(checkNewTestCase.id))

			console.log(payLoad, storeTestCase.length, 'payloa')
			axios.post(`${API_URL}/v1/api/test-cases/add-testcase/`, payLoad).then(
				resp => {
					console.log('res', resp)
					if (resp.data.message === "Test case added sucessfully") {
						let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
						let filteredCases = copyTestcases.filter(item => item.id !== 'new')
						filteredCases.push(resp.data.response)
						dispatch(setTestCases(filteredCases))
						setIsEditing(false)
					}
				}
			)
		} else {
			const payload = {
				"id": testCases.id, //this is generate testcase id
				"test_case_chat_id": testCases.test_case_chat_id,
				"name": testCases.name,
				"steps": testSteps,
				"expected_output": expectedResult
			}
			console.log(payload, storeTestCase.length, 'payload old')
			axios.put(`${API_URL}/v1/api/test-cases/update-testcase/`, payload).then(
				resp => {
					console.log('res', resp)
					if (resp.data.message === "updated sucessfully") {
						let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
						let filteredCases = copyTestcases.map(item => {
							if (item.id === testCases.id) {
								item = {
									...item,
									steps: testSteps,
									expected_output: expectedResult
								}
							}
							return item
						})
						// filteredCases.push(resp.data.response)
						console.log('filter', filteredCases)
						dispatch(setTestCases(filteredCases))
						setIsEditing(false)
					}
				}
			)
		}
		// setIsEditing(false)
	}

	const handleDeleteTestcase = (id) => {
		axios.delete(`${API_URL}/v1/api/test-cases/delete-testcase/${id}/`).then((
			resp => {
				console.log('res', resp)
				if (resp.data.message === "Test case deleted successfully") {
					let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
					let filteredCases = copyTestcases.filter(item => item.id !== id)
					dispatch(setTestCases(filteredCases))

				}
			}
		))
	}

	return (
		<tr key={testCases.id}>
			<td className='px-4 py-3 border-r border-gray-700 align-top'>
				{isEditing ? (
					<input
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full'
						value={testCaseId}
						placeholder="enter"
						// onChange={(e) => setTestCaseId(e.target.value)}
						onChange={(e) => handleTestCaseId(e)}
					/>
				) : (
					testCases.test_case_id
				)}
			</td>
			<td className='px-4 py-3 border-r border-gray-700 whitespace-pre-line align-top'>
				{isEditing ? (
					<textarea
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full min-h-[60px]'
						value={testSteps}
						// onChange={(e) => setTestSteps(e.target.value)}
						onChange={(e) => handleTestCaseStep(e)}

					/>
				) : (
					testCases.steps
				)}
			</td>
			<td className='px-4 py-3 border-r border-gray-700 align-top'>
				{isEditing ? (
					<input
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full'
						value={expectedResult}
						// onChange={(e) => setExpectedResult(e.target.value)}
						onChange={(e) => handleTestCaseResult(e)}

					/>
				) : (
					testCases.expected_output

				)}
			</td>
			<td className='px-4 py-3 flex gap-2 align-top'>
				{isEditing ? (
					<button
						className='text-green-400 hover:text-green-500 cursor-pointer'
						title='Save'
						onClick={handleSave}>
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
					title='Delete'
					onClick={() => handleDeleteTestcase(testCases.id)}
				>
					<DeleteIcon />
				</button>
			</td>
		</tr>
	);
}
export default TableRowWithEdit;