// import React, { useState } from "react";
// import { EyeIcon, EyeSlashIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

// const ZephyrIntegration: React.FC = () => {
//   const [projectKey, setProjectKey] = useState("");
//   const [accessToken, setAccessToken] = useState("");
//   const [showProjectKey, setShowProjectKey] = useState(false);
//   const [showAccessToken, setShowAccessToken] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Zephyr Project Key:", projectKey);
//     console.log("Zephyr Access Token:", accessToken);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f1221]">
//       <div className="bg-[#15182b] text-white rounded-xl shadow-lg p-8 w-full max-w-md">
//         {/* Header Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="bg-blue-700 p-4 rounded-full">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="white"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 3v18m9-9H3"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-center">Zephyr Integration</h2>
//         <p className="text-gray-400 text-center mt-2">
//           Enter your Zephyr credentials to connect and fetch test cases
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//           {/* Project Key */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Zephyr Project Key <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showProjectKey ? "text" : "password"}
//                 placeholder="Enter project key"
//                 value={projectKey}
//                 onChange={(e) => setProjectKey(e.target.value)}
//                 className="w-full rounded-lg bg-[#0f1221] border border-gray-700 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-400"
//                 onClick={() => setShowProjectKey(!showProjectKey)}
//               >
//                 {showProjectKey ? (
//                   <EyeSlashIcon className="w-5 h-5" />
//                 ) : (
//                   <EyeIcon className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-gray-500 text-xs mt-1">
//               Your Zephyr project key identifier
//             </p>
//           </div>

//           {/* Access Token */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Zephyr Access Token <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showAccessToken ? "text" : "password"}
//                 placeholder="Enter access token"
//                 value={accessToken}
//                 onChange={(e) => setAccessToken(e.target.value)}
//                 className="w-full rounded-lg bg-[#0f1221] border border-gray-700 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-400"
//                 onClick={() => setShowAccessToken(!showAccessToken)}
//               >
//                 {showAccessToken ? (
//                   <EyeSlashIcon className="w-5 h-5" />
//                 ) : (
//                   <EyeIcon className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-gray-500 text-xs mt-1">
//               Your Zephyr API access token
//             </p>
//           </div>

//           {/* Info Box */}
//           <div className="bg-[#1d2136] border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
//             <div className="flex items-start">
//               <InformationCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
//               <div>
//                 <p className="font-medium">How to get your Zephyr credentials:</p>
//                 <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
//                   <li>Go to your Zephyr project settings</li>
//                   <li>Generate an API token from your account settings</li>
//                   <li>Copy the project key from project details</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 rounded-lg"
//           >
//             Connect to Zephyr
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ZephyrIntegration;
// import React, { useState } from "react";
// import {
//   EyeIcon,
//   EyeSlashIcon,
//   InformationCircleIcon,
// } from "@heroicons/react/24/outline";

// const ZephyrIntegration = () => {
//   const [projectKey, setProjectKey] = useState("");
//   const [accessToken, setAccessToken] = useState("");
//   const [showProjectKey, setShowProjectKey] = useState(false);
//   const [showAccessToken, setShowAccessToken] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Zephyr Project Key:", projectKey);
//     console.log("Zephyr Access Token:", accessToken);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0f1221]">
//       <div className="bg-[#15182b] text-white rounded-xl shadow-lg p-10 w-full max-w-2xl">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <img
//             src="/logo.png" // <-- replace with your logo path
//             alt="Zephyr Logo"
//             className="h-14"
//           />
//         </div>

//         {/* Title */}
//         <h2 className="text-3xl font-semibold text-center">Zephyr Integration</h2>
//         <p className="text-gray-400 text-center mt-2">
//           Enter your Zephyr credentials to connect and fetch test cases
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {/* Project Key */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Zephyr Project Key <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showProjectKey ? "text" : "password"}
//                 placeholder="Enter project key"
//                 value={projectKey}
//                 onChange={(e) => setProjectKey(e.target.value)}
//                 className="w-full rounded-lg bg-[#0f1221] border border-gray-700 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-400"
//                 onClick={() => setShowProjectKey(!showProjectKey)}
//               >
//                 {showProjectKey ? (
//                   <EyeSlashIcon className="w-5 h-5" />
//                 ) : (
//                   <EyeIcon className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-gray-500 text-xs mt-1">
//               Your Zephyr project key identifier
//             </p>
//           </div>

//           {/* Access Token */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Zephyr Access Token <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showAccessToken ? "text" : "password"}
//                 placeholder="Enter access token"
//                 value={accessToken}
//                 onChange={(e) => setAccessToken(e.target.value)}
//                 className="w-full rounded-lg bg-[#0f1221] border border-gray-700 text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-3 text-gray-400"
//                 onClick={() => setShowAccessToken(!showAccessToken)}
//               >
//                 {showAccessToken ? (
//                   <EyeSlashIcon className="w-5 h-5" />
//                 ) : (
//                   <EyeIcon className="w-5 h-5" />
//                 )}
//               </button>
//             </div>
//             <p className="text-gray-500 text-xs mt-1">
//               Your Zephyr API access token
//             </p>
//           </div>

//           {/* Info Box */}
//           <div className="bg-[#1d2136] border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
//             <div className="flex items-start">
//               <InformationCircleIcon className="w-5 h-5 text-blue-400 mt-0.5 mr-2" />
//               <div>
//                 <p className="font-medium">How to get your Zephyr credentials:</p>
//                 <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
//                   <li>Go to your Zephyr project settings</li>
//                   <li>Generate an API token from your account settings</li>
//                   <li>Copy the project key from project details</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={!projectKey || !accessToken}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Connect to Zephyr
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ZephyrIntegration;
import  { useState } from "react";
// import {Flask} from "../../assets/Flask.svg";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ZephyrIntegration = () => {
  const [projectKey, setProjectKey] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [showProjectKey, setShowProjectKey] = useState(false);
  const [showAccessToken, setShowAccessToken] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Zephyr Project Key:", projectKey);
    console.log("Zephyr Access Token:", accessToken);
  };

  return (
    <div className="min-h-screen flex items-center justify-center -mt-3">
      <div className="bg-[#15182b] text-white rounded-xl shadow-lg p-10 w-full max-w-2xl border border-white/20">
      <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
      <img src="/Flask.svg" alt="Flask" className="w-8 h-8 text-blue-400" />
      </div>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center text-white">
          Zephyr Integration
        </h2>
        <p className="text-[#9ca3af] text-center mt-2">
          Enter your Zephyr credentials to connect and fetch test cases
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Project Key */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Zephyr Project Key <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showProjectKey ? "text" : "password"}
                placeholder="Enter project key"
                value={projectKey}
                onChange={(e) => setProjectKey(e.target.value)}
                className="w-full rounded-lg bg-[#0f1221] border border-[#2d3045] text-sm px-4 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#9ca3af]"
                onClick={() => setShowProjectKey(!showProjectKey)}
              >
                {showProjectKey ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-[#9ca3af] text-xs mt-1">
              Your Zephyr project key identifier
            </p>
          </div>

          {/* Access Token */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Zephyr Access Token <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showAccessToken ? "text" : "password"}
                placeholder="Enter access token"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full rounded-lg bg-[#0f1221] border border-[#2d3045] text-sm px-4 py-3 text-white placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#9ca3af]"
                onClick={() => setShowAccessToken(!showAccessToken)}
              >
                {showAccessToken ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-[#9ca3af] text-xs mt-1">
              Your Zephyr API access token
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-[#1d2136] border border-[#2d3045] rounded-lg p-4 text-sm text-[#9ca3af]">
            <div className="flex items-start">
              <InformationCircleIcon className="w-5 h-5 text-[#89CFF0] mt-0.5 mr-2" />
              <div>
                <p className="font-medium text-[#89CFF0]">
                  How to get your Zephyr credentials:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-[#89CFF0]">
                  <li>Go to your Zephyr project settings</li>
                  <li>Generate an API token from your account settings</li>
                  <li>Copy the project key from project details</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={!projectKey || !accessToken}
            className="w-full bg-[#2b4c8c] hover:bg-[#1d4ed8] transition-colors text-white font-medium py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Connect to Zephyr
          </button>
        </form>
      </div>
    </div>
  );
};

export default ZephyrIntegration;
