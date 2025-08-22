// import React from "react";
// import { useUserDetails } from "../context/UserDetailsContext";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//   const { fullName } = useUserDetails();
//   const navigate = useNavigate();
//   const initials = fullName
//     ? fullName.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()
//     : "U";

//   return (
//     <header
//       className="fixed top-0 left-0 w-full flex justify-between items-center px-4 py-2 
//       bg-gray-800 shadow z-50"
//       style={{ height: "3rem" }}
//     >
//       <div className="flex items-center cursor-pointer space-x-2" onClick={() => navigate('/projects')}>
//         <div className="w-8 h-8">
//           <img
//             // className="h-24 w-auto mx-auto scale-125 transform"
//             className="h-full w-full  "

//             style={{
//               animation: 'scaleFade 3s ease-in-out infinite',
//               transformOrigin: 'center',
//             }}
//             src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9b7d96063c-ea5136f19585b669bf04.png" alt="AutoQAi logo"
//           />
//         </div>
//         <span className="font-bold text-xl text-white">AutoQAi</span>
//       </div>
//       <div className="flex items-center space-x-3">
//         <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
//           {initials}
//         </div>
//         <span className="text-sm text-gray-200">{fullName || "User"}</span>
//       </div>
//     </header>
//   );
// };

// export default Header;
import { useUserDetails } from "../context/UserDetailsContext";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const { fullName } = useUserDetails();
  console.log("fullName from context:", fullName);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = fullName
    ? fullName.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsOpen(false); // Close dropdown
    navigate("/");
  };

  const handleProfile = () => {
    setIsOpen(false); // Close dropdown
   // navigate("/profile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full flex justify-between items-center px-20 py-2 
      bg-[#121223] shadow z-50 border-b border-white/20"
      style={{ height: "3rem" }}
    >
      {/* Left Logo + Project Name */}
      <div
        className="flex items-center cursor-pointer space-x-2"
        onClick={() => navigate("/projects")}
      >
        <div className="w-8 h-8">
          <img
            className="h-full w-full"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9b7d96063c-ea5136f19585b669bf04.png"
            alt="AutoQAi logo"
          />
        </div>
        <span className="font-bold text-lg text-white">AutoQAi</span>
      </div>

      {/* Right Profile Section */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-4 bg-[#1A1B2E] px-3 py-1 rounded cursor-pointer 
                    border border-transparent hover:border-blue-500 transition"
        >
          <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white font-semibold">
            {initials}
          </div>
          <span className="text-sm text-gray-200">
          {fullName && fullName.trim().length > 0 ? fullName : "User"}
           </span>

          {/* <span className="text-sm text-gray-200">{fullName || "User"}</span> */}
          <ChevronDownIcon className="h-4 w-4 text-gray-300" />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#1A1B2E] rounded shadow-lg py-2 z-50">
            <button
              onClick={handleProfile}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-200 hover:bg-blue-400 space-x-2"
            >
              <UserIcon className="h-4 w-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-200 hover:bg-blue-400 space-x-2"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
