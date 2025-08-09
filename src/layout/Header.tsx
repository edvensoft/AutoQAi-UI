import React from "react";

const Header: React.FC = () => {
	return (
		<header className='flex justify-between items-center px-4 py-2 bg-gray-800 shadow'>
			<div className='flex items-center space-x-2'>
				<span className='font-bold text-xl'>AutoQAi</span>
			</div>
			<div className='flex items-center space-x-3'>
				<span className='text-sm'>Elena Voyage</span>
				<div className='w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center'>
					EV
				</div>
			</div>
		</header>
	);
};

export default Header;
