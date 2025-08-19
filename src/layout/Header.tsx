//  import React from "react";

// const Header = () => {
// 	return (
// 		<header
// 			className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 
//             bg-gray-800 shadow z-50"
// 			style={{ height: "3rem" }} 
// 		>
// 			{/* Logo / Brand */}
// 			<div className="flex items-center space-x-2">
// 				<span className="font-bold text-xl text-white">AutoQAi</span>
// 			</div>

// 			{/* User Info */}
// 			<div className="flex items-center space-x-3">
// 				<div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
// 					EV
// 				</div>
// 				<span className="text-sm text-gray-200">Elena Voyage</span>
				
// 			</div>
// 		</header>
// 	);
// };

// export default Header;

import { useNavigate } from "react-router-dom";
import { useUserDetails } from "../context/UserDetailsContext";

const Header = () => {
  const { fullName } = useUserDetails();
  const navigate=useNavigate()
  const initials = fullName
    ? fullName.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header
      className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 
      bg-gray-800 shadow z-50"
      style={{ height: "3rem" }}
    >
      <div className="flex items-center space-x-2 cursor-pointer"
      onClick={()=>navigate('/projects')}
      >
        <span className="font-bold text-xl text-white">AutoQAi</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <span className="text-sm text-gray-200">{fullName || "User"}</span>
      </div>
    </header>
  );
};

export default Header;
