
import { useNavigate } from "react-router-dom";

const ManualTestCollections = () => {
  const collections = [
    { title: "Login Feature", cases: 5 },
    { title: "Payment Flow", cases: 8 },
  ];

const navigate = useNavigate();
  return (
    <div className="flex justify-center items-start bg-[#0E0E17] w-full max-w-5xl">
      <div className="bg-[#151526] p-6 rounded-lg border border-gray-700 w-full">
        <h2 className="text-white text-lg font-semibold mb-6">
          Manual Test Collections 
        </h2>

        <div className="flex gap-4 mb-6">
          {collections.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0B0B15] p-4 rounded-md flex-1 cursor-pointer hover:bg-[#1C1C2E] transition"
            >
              <p className="text-white font-medium">{item.title}</p>
              <p className="text-gray-400 text-sm">{item.cases} test cases</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/testcases")} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md">
          Back
        </button>
      </div>
    </div>
  );
};

export default ManualTestCollections;
