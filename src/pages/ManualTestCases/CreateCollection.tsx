import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addCollection } from "../../redux/collectionsSlice";

export default function CreateCollection() {
	const [isOpen, setIsOpen] = useState(false);
	const [collectionName, setCollectionName] = useState("");
	const dispatch = useDispatch();

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<div className='w-full flex justify-between items-center border-b border-gray-700 px-6 py-4'>
				<h1 className='text-xl font-semibold'>Manual Test Cases</h1>
				<button
					onClick={openModal}
					className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition'>
					+ Create New Collection
				</button>
			</div>

			<Dialog
				as='div'
				className='fixed inset-0 z-10 overflow-y-auto'
				onClose={closeModal}
				open={isOpen}>
				<div className='min-h-screen px-4 text-center'>
					<DialogBackdrop className='fixed inset-0 bg-white/30 -z-10' />

					{/* Trick to center modal content */}
					<span
						className='inline-block h-screen align-middle'
						aria-hidden='true'>
						&#8203;
					</span>

					<div className='inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded'>
						<DialogPanel className='max-w-lg space-y-4 p-6'>
							<DialogTitle className='text-lg font-medium leading-6 '>
								Create New Collection
							</DialogTitle>
							<div className='mt-4 space-y-4'>
								<input
									type='text'
									id='collection-name'
									name='collection-name'
									value={collectionName}
									onChange={(e) => setCollectionName(e.target.value)}
									placeholder='Enter a name for your test collection'
									className='w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
								/>

								{/* Action Buttons */}
								<div className='flex justify-end gap-3 pt-2'>
									<button
										type='button'
										onClick={() => setIsOpen(false)}
										className='px-4 py-2 rounded border border-gray-300 text-white hover:text-gray-900 cursor-pointer hover:bg-gray-100 transition'>
										Cancel
									</button>
									<button
										type='button'
										onClick={() => {
											if (collectionName.trim()) {
												dispatch(
													addCollection({
														id: Date.now().toString(),
														name: collectionName.trim(),
													}),
												);
												setCollectionName("");
												setIsOpen(false);
											}
										}}
										className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700  cursor-pointer transition'>
										Add
									</button>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
