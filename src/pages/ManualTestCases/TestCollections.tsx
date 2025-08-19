import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import type { RootState } from "@/redux/store";
import { setActiveCollection, setCollections } from "@/redux/collectionsSlice";
import ModalWithTestCases from "./components/ModalWithTestCases";
import axios from "axios";
import { API_URL } from "@/config";

// type TestCases = {
// 	id: string;
// 	test_case_id: string;
// 	name: string;
// 	steps: string;
// 	expected_output: string;
// }

export default function TestCollections() {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = useState(false);
	const collections = useSelector((state: RootState) => state.collections.list);
	const testCases = useSelector((state: RootState) => state.collections.testCases);


	const activeCollectionId = useSelector(
		(state: RootState) => state.collections.activeCollectionId,
	);
	const projectId = useSelector((state: RootState) => state.appState.project_id);


	// const [testCases, setTestCases] = useState<TestCases[]>([])

	const [openModal, setOpenModal] = useState(false);

	const getCollections = () => {
		axios.get(`${API_URL}/v1/api/test-cases/get-collections/${projectId}/`).then(
			response => {
				console.log('colle', response)
				if (response.status === 200) {
					let updateCollections = response.data.response.map((item) => {
						return {
							'id': item.id,
							'name': item.name
						}
					})
					console.log('updated', updateCollections)
					dispatch(setCollections(updateCollections))
				}
				// dispatch()
			}
		)
	}



	const handleView = (id: string) => {
		// 
		// 
		if (id) {
			setOpenModal(true)

		}
		// axios.get(`${API_URL}/v1/api/test-cases/get-test-cases/${id}/`).then(res => {
		// 	console.log('res', res)
		// 	// setTestCases(res.data.test_cases)
		// 	setOpenModal(true)

		// })
	}

	const deleteCollection = () => {
		const collectionIds = collections.map(item => item.id);
		console.log('ids', collectionIds)
		const payLoad = {
			"collection_ids": [...collectionIds]
		}
		axios.delete(`${API_URL}/v1/api/test-cases/delete-collection/`, {
			data: payLoad
		}).then(
			res => {
				console.log('res', res)
				if (res.data.message === "Sucessfully Deleted collections") {
					getCollections()

				}
			}
		)
	}

	useEffect(() => {
		getCollections()
	}, [])


	return (
		<>
			<aside
				className='w-72 bg-gray-850 p-4 overflow-y-auto text-gray-200'
				aria-label='Test Collections Sidebar'>
				<h2 className='font-semibold mb-4 text-lg'>Test Collections</h2>

				{collections?.length > 0 && (
					<div className='flex w-full items-center justify-between mb-4'>
						<label className='flex items-center space-x-2 cursor-pointer'>
							<input
								type='checkbox'
								checked={selectAll}
								onChange={(e) => setSelectAll(e.target.checked)}
								className='form-checkbox h-5 w-5 rounded-lg ring-0 outline-neutral-300 focus:ring-2'
								aria-label='Select all test collections'
							/>
							<span>Select All</span>
						</label>

						{selectAll && (
							<div className='flex gap-2'>
								<button
									className='flex items-center cursor-pointer gap-1 px-3 py-1 border border-blue-500 bg-blue-600 text-white rounded shadow transition hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
									title='Download Selected'>
									<DownloadIcon style={{ fontSize: 20 }} />
								</button>
								<button
									className='flex items-center cursor-pointer gap-1 px-3 py-1 border border-red-500 bg-red-600 text-white rounded shadow transition hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400'
									title='Delete Selected'
									onClick={deleteCollection}
								>
									<DeleteIcon style={{ fontSize: 20 }} />
								</button>
							</div>
						)}
					</div>
				)}

				{collections?.length === 0 ? (
					<p className='text-gray-500'>No collections added yet.</p>
				) : (
					<ul className='space-y-3'>
						{[...collections].reverse().map((collection) => {
							const isActive = activeCollectionId === collection.id;
							return (
								<li
									key={collection.id}
									onClick={() => dispatch(setActiveCollection(collection.id))}
									className={`p-3 rounded shadow-sm transition flex justify-between items-center ${isActive
										? "bg-blue-800 text-white"
										: "bg-gray-800 hover:bg-gray-700 cursor-pointer"
										}`}>
									<div className='flex gap-3 items-center'>
										{selectAll && (
											<input
												type='checkbox'
												checked={selectAll}
												className='h-4 w-4 ring-0 outline-neutral-300 focus:ring-2 rounded-lg'
												onClick={(e) => e.stopPropagation()}
											/>
										)}

										<div className='flex-1 flex flex-col gap-1'>
											<p className='font-semibold leading-4'>
												{collection.name}
											</p>
											<p className='text-sm text-gray-400'>Test Cases: {testCases.length}</p>
										</div>
									</div>
									<button
										className='px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded'
										onClick={() => handleView(collection.id)}>
										View
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</aside>
			{
				collections.length > 0 &&
				<ModalWithTestCases
					open={openModal}
					// testCases={testCases}
					// setTestCases={setTestCases}
					onClose={() => setOpenModal(false)}
				// collectionId={activeCollectionId}
				/>
			}


		</>
	);
}
