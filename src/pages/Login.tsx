import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		// TODO: Implement real login logic
		navigate("/projects");
	};

	return (
		<div className='h-screen flex items-center justify-center bg-gray-900 text-white'>
			<div className='bg-gray-800 p-8 rounded shadow-lg w-96'>
				<h1 className='text-2xl font-bold mb-4'>Login</h1>
				<input
					type='text'
					placeholder='Username'
					className='w-full mb-3 px-3 py-2 rounded bg-gray-700 border border-gray-600'
				/>
				<input
					type='password'
					placeholder='Password'
					className='w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600'
				/>
				<button
					onClick={handleLogin}
					className='w-full bg-blue-600 py-2 rounded hover:bg-blue-700'>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
