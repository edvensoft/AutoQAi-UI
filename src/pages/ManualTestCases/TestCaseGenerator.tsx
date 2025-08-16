import { useEffect, useState } from "react";
import ModalWithTestCases from "./components/ModalWithTestCases";
import type { RootState } from "@/redux/store";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "@/config";
import { setTestCases } from "@/redux/collectionsSlice";

// type TestCases = {
// 	id: string;
// 	test_case_id: string;
// 	name: string;
// 	steps: string;
// 	expected_output: string;
// }

export default function TestCaseGenerator() {
	const [openModal, setOpenModal] = useState(false);
	// const [testCases, setTestCases] = useState<TestCases[]>([])

	const collections = useSelector((state: RootState) => state.collections.list);
	const testCases = useSelector((state: RootState) => state.collections.testCases);

	const activeCollectionId = useSelector(
		(state: RootState) => state.collections.activeCollectionId,
	);
	const activeCollection = collections.find((c) => c.id === activeCollectionId);
	const [input, setInput] = useState("");
	const dispatch = useDispatch();


	type Message = {
		type: "user" | "system";
		text: string;
		loading?: boolean;
		showCTA?: boolean;
		error?: string | '';
	};
	const [messages, setMessages] = useState<Message[]>([]);



	const handleSend = () => {
		if (!input.trim()) return;

		const userMessage: Message = { type: "user", text: input };
		const loaderMessage: Message = {
			type: "system",
			text: "Generating test cases...",
			loading: true,
		};

		setMessages((prev) => [...prev, userMessage, loaderMessage]);
		setInput("");


		const formData = new FormData();

		formData.append('collection_id', '0c32be2e-c485-4aa2-b3fa-3783ab831e4a');
		formData.append('user_message', input);
		formData.append('filepath', 'null');



		// for (const [key, value] of formData.entries()) {
		// 	console.log(`${key}: ${value}`);
		// }

		axios.post(`${API_URL}/v1/api/test-cases/generate-test-cases/`, formData).then(
			response => {
				console.log('res', response)
				setMessages((prev) => {
					const updated = [...prev];
					// Replace loader
					updated[updated.length - 1] = {
						type: "system",
						text: "Test cases generated successfully! Click to view and edit.",
						showCTA: true,
					};
					return updated;
				});
				dispatch(setTestCases(response.data.response.test_cases))
			}
		).catch(e => {
			console.log('err', e)
			if (e.status === 500) {
				setMessages((prev) => {
					const updated = [...prev];
					// Replace loader
					updated[updated.length - 1] = {
						type: "system",
						text: "Test cases generated successfully! Click to view and edit.",
						error: 'Please try after some time',
					};
					return updated;
				});
			} else {
				setMessages((prev) => {
					const updated = [...prev];
					// Replace loader
					updated[updated.length - 1] = {
						type: "system",
						text: "Test cases generated successfully! Click to view and edit.",
						error: e.response.data,
					};
					return updated;
				});
			}

		})


		// Simulate API delay
		// setTimeout(() => {
		// 	setMessages((prev) => {
		// 		const updated = [...prev];
		// 		// Replace loader
		// 		updated[updated.length - 1] = {
		// 			type: "system",
		// 			text: "Test cases generated successfully! Click to view and edit.",
		// 			showCTA: true,
		// 		};
		// 		return updated;
		// 	});
		// }, 2000); // 2-second delay
	};

	const getChatByCollection = () => {
		const userMessage: Message = { type: "user", text: 'Generating' };
		const loaderMessage: Message = {
			type: "system",
			text: "Generating test cases...",
			loading: true,
		};
		setMessages(() => [userMessage, loaderMessage]);

		axios.get(`${API_URL}/v1/api/test-cases/get-chat/${activeCollectionId}/`).then(
			response => {
				console.log('responseChats', response)
				if (response.status === 200) {
					setMessages((prev) => {
						const updated = [...prev];
						//replace message
						updated[updated.length - 2] = {
							type: "user",
							text: response.data.response.user_message,
							// showCTA: true,
						};
						// Replace loader
						updated[updated.length - 1] = {
							type: "system",
							text: "Test cases generated successfully! Click to view and edit.",
							showCTA: true,
						};
						return updated;
					});
					dispatch(setTestCases(response.data.response.test_cases))
				}
			}
		).catch(err => {
			console.log('error', err)
			if (err.response.data.error === "No test cases found for this collection") {
				console.log('incoming')
				setMessages((prev) => {
					const updated = [...prev];
					//replace message
					updated[updated.length - 2] = {
						type: "user",
						text: '',
						// error: 'No test cases found for this collection',
					};

					// Replace loader
					updated[updated.length - 1] = {
						type: "system",
						text: "Test cases generated successfully! Click to view and edit.",
						error: "No test cases found for this collection",
					};
					return updated;
				});
			}
			// 
		})
	}

	console.log('mess', messages, activeCollectionId)

	useEffect(() => {
		if (activeCollectionId) {
			getChatByCollection()

		}
	}, [activeCollectionId])

	return (
		<>
			{/* Top Info Card */}
			<section className='bg-gray-800 max-w-full text-gray-300 p-6 rounded-lg flex flex-col md:max-w-2xl md:mx-auto items-center gap-2'>
				<span className='text-3xl'>💬</span>
				<p className='text-sm text-gray-400'>
					Collection:{" "}
					<strong>{activeCollection ? activeCollection.name : "New"}</strong>
				</p>
				<p className='text-center text-sm'>
					Upload a file or describe your feature to generate test cases
				</p>
				{/* This is will come if there are no collections*/}
				{collections.length === 0 && (
					<div className='mt-2 text-center text-sm text-red-300 bg-red-900/40 rounded p-3'>
						There are no collections. Please click on{" "}
						<strong>Create New Collection</strong> or add a new collection by
						clicking the button above.
					</div>
				)}
			</section>

			{/* Chat Area */}
			<section className='flex-1 overflow-y-auto p-4 space-y-4 max-w-full'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
							}`}>
						<div
							className={`p-3 rounded max-w-xs ${msg.type === "user" && msg.text === '' ?'bg-inherit':msg.type === "user"?"bg-gray-700 text-right" : "bg-blue-700"
								}`}>
							{
								msg.error?.length > 0 ?
									<p className="text-red-500">{msg.error}</p>
									:
									<p>{msg.text}</p>
							}

							{msg.loading && (
								<p className='text-xs text-gray-300 animate-pulse mt-1'>
									⏳ Loading...
								</p>
							)}
							{msg.showCTA && (
								<button
									className={`mt-2 text-sm underline text-white hover:text-blue-200${!activeCollection
										? " pointer-events-none opacity-50 cursor-not-allowed"
										: ""
										}`}
									disabled={!activeCollection}
									onClick={() => activeCollection && setOpenModal(true)}>
									View Test Cases
								</button>
							)}

						</div>
					</div>
				))}
			</section>

			{/* Footer Input */}
			<div
				className={`w-full border-t border-gray-700 px-6 py-4 max-w-full${!activeCollection
					? " pointer-events-none opacity-50 cursor-not-allowed"
					: ""
					}`}>
				<div className='w-full  px-6 py-4'>
					<div className='relative flex items-start gap-3'>
						{/* Textarea with icon inside */}
						<div className='relative flex-1'>
							<AttachFileIcon
								className='absolute top-3 left-3 text-gray-400 cursor-pointer hover:text-white'
								fontSize='small'
							/>

							<textarea
								rows={3}
								placeholder='Describe your feature or upload requirements...'
								className='w-full resize-none bg-gray-700 pl-10 pr-3 py-3 rounded text-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 transition'
								value={input}
								onChange={(e) => setInput(e.target.value)}
							/>
						</div>

						{/* Send Icon Button */}
						<button
							type='button'
							onClick={handleSend}
							className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition'>
							<SendIcon fontSize='small' />
						</button>
					</div>
				</div>
			</div>
			<ModalWithTestCases
				open={openModal}
				// testCases={testCases}
				// setTestCases={setTestCases}
				onClose={() => setOpenModal(false)}
				collectionId={activeCollectionId}
			/>
		</>
	);
}
