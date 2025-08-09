import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function TestCollections() {
	const [selectAll, setSelectAll] = useState(false);
	const collections = useSelector((state: RootState) => state.collections.list);

	return (
		<aside
			className='w-72 bg-gray-850 p-4 overflow-y-auto text-gray-200'
			aria-label='Test Collections Sidebar'>
			<h2 className='font-semibold mb-4 text-lg'>Test Collections</h2>
			{collections?.length === 0 && (
				<div className='flex w-full items-center justify-between'>
					<label className='flex items-center space-x-2 mb-4 cursor-pointer'>
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
							<button className='flex items-center gap-1 px-3 py-1 border rounded'>
								<DownloadIcon style={{ fontSize: 20 }} />
							</button>
							<button className='flex items-center gap-1 px-3 py-1 border rounded'>
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
					{collections?.map((collection: { id: React.Key; name: string }) => {
						return (
							<li
								key={collection.id}
								className='p-3 bg-gray-800 rounded shadow-sm'>
								<div className='flex gap-3 items-center'>
									<input
										type='checkbox'
										className='h-4 w-4 ring-0 outline-neutral-300 focus:ring-2 rounded-lg'
										name=''
										id=''
									/>
									<div className='flex-1 flex flex-col gap-1'>
										<p className='font-semibold leading-4'>{collection.name}</p>
										<p className='text-sm text-gray-400'>Test Cases: 4</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</aside>
	);
}
