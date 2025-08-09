import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setActiveCollection } from "@/redux/collectionsSlice";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from "@headlessui/react";

export default function TestCollections() {
	const dispatch = useDispatch();
	const [selectAll, setSelectAll] = useState(false);
	const collections = useSelector((state: RootState) => state.collections.list);
	const activeCollectionId = useSelector(
		(state: RootState) => state.collections.activeCollectionId,
	);

	const [openModal, setOpenModal] = useState(false);

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
									title='Delete Selected'>
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
									className={`p-3 rounded shadow-sm transition flex justify-between items-center ${
										isActive
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
											<p className='text-sm text-gray-400'>Test Cases: 4</p>
										</div>
									</div>
									<button
										className='px-2 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded'
										onClick={() => setOpenModal(true)}>
										View
									</button>
								</li>
							);
						})}
					</ul>
				)}
			</aside>

			<Dialog
				open={openModal}
				onClose={() => setOpenModal(false)}
				className='relative z-50'>
				<DialogBackdrop className='fixed inset-0 bg-black/30' />
				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<DialogPanel className='w-full max-w-md rounded bg-white p-6 shadow-xl'>
						<DialogTitle className='text-lg font-semibold mb-2'>
							Collection Details
						</DialogTitle>
						<div className='mb-4 text-gray-800'>
							Collection ID:{" "}
							<span className='font-mono text-blue-600'>
								{activeCollectionId}
							</span>
						</div>
						<button
							className='mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
							onClick={() => setOpenModal(false)}>
							Close
						</button>
					</DialogPanel>
				</div>
			</Dialog>
		</>
	);
}
