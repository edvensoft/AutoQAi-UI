import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Execution = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const testResult = location.state?.testResult;

  // ✅ Debug log to verify data is received
  useEffect(() => {
    console.log("✅ testResult received:", testResult);
  }, [testResult]);

  const handleViewReport = () => {
    if (!testResult) {
      alert("No test result found!");
      return;
    }
    navigate('/project/ui-automation/report', { state: { testResult } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl text-center">
        <CheckCircle className="mx-auto text-green-500 animate-bounce mb-4" size={48} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Execution Completed Successfully</h2>
        <p className="text-gray-600 mb-8">All test cases have been executed. You can now view the detailed report.</p>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleViewReport}
            className="text-blue-600 font-medium underline hover:text-blue-800 transition"
          >
            📄 View Full Report
          </button>

          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <ArrowLeft size={18} />
            Back to Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Execution;