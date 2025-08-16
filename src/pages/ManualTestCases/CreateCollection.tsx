import {
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { addCollection } from "../../redux/collectionsSlice";
import axios from "axios";
import { API_URL } from "@/config";

export default function CreateCollection() {
	const [isOpen, setIsOpen] = useState(false);
	const [collectionName, setCollectionName] = useState("");
	const [inputError, setInputError] = useState("");

	const dispatch = useDispatch();

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	function handleCreateCollection() {
		if (!collectionName) {
			setInputError("Please enter collection name")
		}

		if (collectionName.trim()) {
			let payload = {
				"user_id": "1",
				"project_id": "0c32be2e-c485-4aa2-b3fa-3783ab831e4a",
				"name": collectionName
			}
			axios.post(`${API_URL}/v1/api/test-cases/create-collection/`, payload).then(
				(resp) => {
					console.log('resp', resp)
					if (resp.data) {
						console.log('resp', resp)
						dispatch(
							addCollection({
								id: resp.data.collection_id,
								name: collectionName.trim(),
							}),
						);

						setCollectionName("");
						setIsOpen(false)
					}
				}
			)
		}

	}

	return (
		<>
			<div className='w-full flex justify-between items-center border-b border-gray-700 px-6 py-4'>
				<h1 className='text-xl font-semibold'>Manual Test Cases</h1>
				<button
					onClick={openModal}
					className='bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded  transition'>
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
									onFocus={() => setInputError('')}
									onChange={(e) => setCollectionName(e.target.value)}
									placeholder='Enter a name for your test collection'
									className={`w-full p-2 rounded border ${inputError.length > 0 ? 'border-red-500' : 'border-gray-300 '} focus:outline-none mb-0 focus:ring-2 focus:ring-blue-500`}
								/>
								{
									inputError.length > 0 && <p className="text-red-500">{inputError}</p>
								}

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
										onClick={handleCreateCollection}
										className='px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700  cursor-pointer transition'>
										Create
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
