import React from "react";
// import SaveIcon from "@mui/icons-material/Save";
// import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from "@headlessui/react";
import TableRowWithEdit from "./TableRowWithEdit";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { addTestCases } from "@/redux/collectionsSlice";


// type TestCases = {
// 	id: string,
// 	test_case_id: string,
// 	name: string,
// 	steps: string,
// 	expected_output: string
// }

interface ModalWithTestCasesProps {
	open: boolean;
	onClose: () => void;
	collectionId?: string | number | null;
	title?: string;
	children?: React.ReactNode;
	// testCases?: TestCases[],
	// setTestCases?: React.Dispatch<React.SetStateAction<TestCases[]>>
}


const ModalWithTestCases: React.FC<ModalWithTestCasesProps> = ({
	open,
	onClose,
	title = "Collection Details",
	// testCases,
	// setTestCases
}) => {


	const testCases = useSelector((state: RootState) => state.collections.testCases);
	const dispatch = useDispatch();

console.log('testcase',testCases)
	const handleAddTestCase = () => {
		
		const emptyTestCase = {
			// id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
			id:'new',
			test_case_id: '',
			name: '',
			steps: '',
			expected_output: ''
		}
		// dispatch(setTestCases([{...emptyTestCase}]))
		dispatch(addTestCases(emptyTestCase))
		// setTestCases((prev) => [...prev, emptyTestCase])
	}


	return (
		<Dialog
			open={open}
			onClose={onClose}
			className='relative z-50'
			
		>
			<DialogBackdrop className='fixed  inset-0 bg-black/30' />
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<DialogPanel className='w-full max-w-full lg:max-w-5xl rounded bg-[#1A1A2E] p-6 shadow-xl'>
					<div className='flex w-full justify-between items-center mb-2 border-b border-gray-700 pb-2'>
						<DialogTitle className='text-lg font-semibold '>
							{title}
						</DialogTitle>
						<IconButton
							aria-label='close'
							onClick={onClose}
							color='inherit'>
							<CloseIcon className='text-white hover:text-blue-400' />
						</IconButton>
					</div>

					<div className='p-6 text-white '>
						{/* Add Test Case Button */}
						<div className='mb-4'>
							<button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2'
								onClick={handleAddTestCase}
							>
								<span className='text-xl'>+</span> Add Test Case
							</button>
						</div>

						{/* Table */}
						<div className='overflow-x-auto rounded-lg border border-gray-700'>
							<table className='min-w-full text-left border-collapse'>
								<thead className='bg-gray-800 text-white font-semibold text-sm'>
									<tr>
										<th className='px-4 py-3 border-r border-gray-700 w-32'>
											Test Case ID
										</th>
										<th className='px-4 py-3 border-r border-gray-700 w-96'>
											Test Steps
										</th>
										<th className='px-4 py-3 border-r border-gray-700 w-96'>
											Expected Results
										</th>
										<th className='px-4 py-3 w-32'>Actions</th>
									</tr>
								</thead>

								<tbody className='divide-y divide-gray-700 text-sm'>

									{
										testCases?.length > 0 ?
											testCases.map((item) => (
												<TableRowWithEdit
													testCases={item}
												/>
											))

											: <div className="flex justify-center items-center fixed mt-4">
												<p className="text-red-500">No Test cases found</p>
											</div>
									}

								</tbody>



							</table>
						</div>
					</div>
				</DialogPanel>
			</div>
		</Dialog>
	);
};

// Row component with Edit/Save toggle


export default ModalWithTestCases;
