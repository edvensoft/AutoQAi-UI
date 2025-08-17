// import React from "react";

// const Header: React.FC = () => {
// 	return (
// 		<header className='fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 bg-gray-800 shadow z-50'>
// 			<div className='flex items-center space-x-2'>
// 				<span className='font-bold text-xl'>AutoQAi</span>
// 			</div>
// 			<div className='flex items-center space-x-3'>
// 				<span className='text-sm'>Elena Voyage</span>
// 				<div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center'>
// 					EV
// 				</div>
// 			</div>
// 		</header>
// 	);
// };

// export default Header;
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {

	const navigate = useNavigate();


	return (
		<header
			className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 
            bg-gray-800 shadow z-50"
			style={{ height: "3rem" }} // consistent height for layout calculations
		>
			{/* Logo / Brand */}
			<div className="flex items-center cursor-pointer space-x-2"
				onClick={() => navigate('/projects')}
			>
				<span className="font-bold text-xl text-white">AutoQAi</span>
			</div>

			{/* User Info */}
			<div className="flex items-center space-x-3">
				<div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
					EV
				</div>
				<span className="text-sm text-gray-200">Elena Voyage</span>

			</div>
		</header>
	);
};

export default Header;
