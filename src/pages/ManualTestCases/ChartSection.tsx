import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

export default function ManualTestCases() {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	const handleSend = () => {
		if (!input.trim()) return;

		const userMessage = { type: "user", text: input };
		const loaderMessage = {
			type: "system",
			text: "Generating test cases...",
			loading: true,
		};

		setMessages((prev) => [...prev, userMessage, loaderMessage]);
		setInput("");

		// Simulate API delay
		setTimeout(() => {
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
		}, 2000); // 2-second delay
	};

	return (
		<>
			{/* Top Info Card */}
			<section className='bg-gray-800 max-w-full text-gray-300 p-6 rounded-lg flex flex-col md:max-w-2xl md:mx-auto items-center gap-2'>
				<span className='text-3xl'>💬</span>
				<p className='text-sm text-gray-400'>
					Collection: <strong>New</strong>
				</p>
				<p className='text-center text-sm'>
					Upload a file or describe your feature to generate test cases
				</p>
			</section>

			{/* Chat Area */}
			<section className='flex-1 overflow-y-auto p-4 space-y-4 max-w-full'>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`flex ${
							msg.type === "user" ? "justify-end" : "justify-start"
						}`}>
						<div
							className={`p-3 rounded max-w-xs ${
								msg.type === "user" ? "bg-gray-700 text-right" : "bg-blue-700"
							}`}>
							<p>{msg.text}</p>
							{msg.loading && (
								<p className='text-xs text-gray-300 animate-pulse mt-1'>
									⏳ Loading...
								</p>
							)}
							{msg.showCTA && (
								<button className='mt-2 text-sm underline text-white hover:text-blue-200'>
									View Test Cases
								</button>
							)}
						</div>
					</div>
				))}
			</section>

			{/* Footer Input */}
			<div className='w-full border-t border-gray-700 px-6 py-4 max-w-full'>
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
		</>
	);
}
