// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/teech.png";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [fullName, setFullName] = useState("");
//   const [orgName, setOrgName] = useState("");

//   const handleSendOTP = () => {
//     if (email) {
//       setStep(2);
//     }
//   };

//   const handleVerifyOTP = () => {
//     if (otp.join("").length === 6) {
//       setStep(3);
//     }
//   };

//   const handleProceedDashboard = () => {
//     if (fullName && orgName) {
//       navigate("/projects");
//     }
//   };

//   const handleOtpChange = (value: string, index: number) => {
//     if (/^\d?$/.test(value)) {
//       const updatedOtp = [...otp];
//       updatedOtp[index] = value;
//       setOtp(updatedOtp);
//       // Auto focus next field
//       if (value && index < 5) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         nextInput?.focus();
//       }
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-[#0b0b20]">
//       <div className="bg-[#141426] p-8 rounded-lg shadow-lg w-96 text-center">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="p-1 rounded-lg">
//            <img src={logo} alt="Logo" className="h-18 w-18" />


//           </div>
//         </div>

//         {/* Step 1: Email */}
//         {step === 1 && (
//           <>
//             <h1 className="text-xl font-bold text-white mb-1">
//               Sign In to Your Account
//             </h1>
//             <p className="text-gray-400 text-sm mb-6">
//               Enter your email to receive a one-time password.
//             </p>
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
//             />
//             <button
//               onClick={handleSendOTP}
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium"
//             >
//               Send OTP
//             </button>
//           </>
//         )}

//         {/* Step 2: OTP */}
//         {step === 2 && (
//           <>
//             <h1 className="text-xl font-bold text-white mb-1">
//               Check Your Email
//             </h1>
//             <p className="text-gray-400 text-sm mb-6">
//               We've sent a 6-digit code to{" "}
//               <span className="font-semibold">{email}</span>
//             </p>
//             <div className="flex justify-center gap-2 mb-6">
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`otp-${index}`}
//                   type="text"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(e.target.value, index)}
//                   className="w-10 h-12 text-center rounded border border-gray-600 bg-transparent text-white text-lg focus:outline-none focus:border-blue-500"
//                 />
//               ))}
//             </div>
//             <button
//               onClick={handleVerifyOTP}
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium"
//             >
//               Verify & Login
//             </button>
//             <div className="mt-4 flex justify-center gap-4 text-sm">
//               <button className="text-gray-400 hover:text-white">
//                 Resend OTP
//               </button>
//               <button
//                 className="text-gray-400 hover:text-white"
//                 onClick={() => setStep(1)}
//               >
//                 Change Email
//               </button>
//             </div>
//           </>
//         )}

//         {/* Step 3: Complete Profile */}
//         {step === 3 && (
//           <>
//             <h1 className="text-xl font-bold text-white mb-1">
//               Complete Your Profile
//             </h1>
//             <p className="text-gray-400 text-sm mb-6">
//               Just one more step to get you started.
//             </p>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
//             />
//             <input
//               type="text"
//               placeholder="Organisation Name"
//               value={orgName}
//               onChange={(e) => setOrgName(e.target.value)}
//               className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
//             />
//             <button
//               onClick={handleProceedDashboard}
//               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium"
//             >
//               Proceed to Dashboard
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/teech.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [fullName, setFullName] = useState("");
  const [orgName, setOrgName] = useState("");

  const handleSendOTP = () => {
    if (email) {
      setStep(2);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.join("").length === 6) {
      setStep(3);
    }
  };

  const handleProceedDashboard = () => {
    if (fullName && orgName) {
      navigate("/projects");
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0b0b20]">
      <div className="bg-[#141426] p-8 rounded-lg shadow-lg w-96 text-center border-[0.5px] border-white/20">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-1 rounded-lg">
            <img src={logo} alt="Logo" className="h-18 w-18" />
          </div>
        </div>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <h1 className="text-2xl font-bold text-white mb-1">
              Sign In to Your Account
            </h1>
            <p className="text-gray-300 text-sm font-medium mb-6">
              Enter your email to receive a one-time password.
            </p>
            {/* <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mb-4 px-3 py-2 rounded border border-gray-600 placeholder:text-sm placeholder:font-medium focus:outline-none focus:border-blue-500 ${
                email
                  ? "bg-white text-black"
                  : "bg-transparent text-white placeholder-gray-400"
              }`}
            /> */}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              // value={emailEntered}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailEntered(false); // reset until user leaves field
              }}
              onBlur={() => {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setEmailEntered(true);
                }
              }}
              className={`w-full mb-4 px-3 py-2 rounded border border-gray-600 placeholder:text-sm placeholder:font-medium focus:outline-none focus:border-blue-500'
  }`}
            />
            {
              emailEntered && <p className="text-green-500">Valid email</p>
            }

            <button
              onClick={handleSendOTP}
              className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 font-medium"
            >
              Send OTP
            </button>
          </>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <>
            <h1 className="text-xl font-bold text-white mb-1">
              Check Your Email
            </h1>
            <p className="text-gray-300 text-sm font-bold mb-6">
              We've sent a 6-digit code to{" "}
              <span className="font-semibold">{email}</span>
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-8 h-10 text-center rounded border border-gray-600 bg-transparent text-white text-lg font-bold focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <button
              onClick={handleVerifyOTP}
              className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 font-medium"
            >
              Verify & Login
            </button>
            <div className="mt-4 flex justify-center gap-4 text-xs">
              <button className="text-blue-300 border-r border-gray-600 pr-4">
                Resend OTP
              </button>
              <button
                className="text-blue-300 pl-4"
                onClick={() => setStep(1)}
              >
                Change Email
              </button>
            </div>
          </>
        )}

        {/* Step 3: Complete Profile */}
        {/* {step === 3 && (
          <>
            <h1 className="text-2xl font-bold text-white mb-1">
              Complete Your Profile
            </h1>
            <p className="text-gray-300 text-sm font-bold mb-6">
              Just one more step to get you started.
            </p>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded border border-gray-600 placeholder:text-sm placeholder:font-bold bg-white text-black focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Organisation Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded border border-gray-600 placeholder:text-sm placeholder:font-bold bg-white text-black focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleProceedDashboard}
              className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 font-medium"
            >
              Proceed to Dashboard
            </button>
          </>
        )} */}
        {step === 3 && (
          <>
            <h1 className="text-xl font-bold text-white mb-1">
              Complete Your Profile
            </h1>
            <p className="text-gray-400 text-sm mb-6">
              Just one more step to get you started.
            </p>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Organisation Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleProceedDashboard}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 font-medium"
            >
              Proceed to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
