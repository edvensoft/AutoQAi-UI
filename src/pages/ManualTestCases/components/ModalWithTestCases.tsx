import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from "@headlessui/react";

interface ModalWithTestCasesProps {
	open: boolean;
	onClose: () => void;
	collectionId?: string | number | null;
	title?: string;
	children?: React.ReactNode;
}

const ModalWithTestCases: React.FC<ModalWithTestCasesProps> = ({
	open,
	onClose,
	title = "Collection Details",
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			className='relative z-50'>
			<DialogBackdrop className='fixed inset-0 bg-black/30' />
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

					<div className='p-6 text-white'>
						{/* Add Test Case Button */}
						<div className='mb-4'>
							<button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2'>
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
									<TableRowWithEdit />
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
function TableRowWithEdit() {
	const [isEditing, setIsEditing] = useState(false);
	const [testCaseId, setTestCaseId] = useState("TC001");
	const [testSteps, setTestSteps] = useState(
		"1. Navigate to login page\n2. Enter valid credentials\n3. Click login button",
	);
	const [expectedResult, setExpectedResult] = useState(
		"User should be successfully logged in and redirected to dashboard",
	);
	return (
		<tr>
			<td className='px-4 py-3 border-r border-gray-700 align-top'>
				{isEditing ? (
					<input
						className='bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 w-full'
						value={testCaseId}
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
				{isEditing ? (
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

export default ModalWithTestCases;
