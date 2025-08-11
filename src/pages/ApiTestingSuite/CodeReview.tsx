import { nextStep, prevStep } from "@/redux/apiTestingSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TestCaseHeader from "./components/TestCaseHeader";
import TestCaseTable from "./components/TestCaseTable";

interface Data {
  id: string,
  operation_id: string,
  api_name: string,
  apiPath: string,
  api_method: string,
  language: string,
  status: boolean,
  code: string
}

const sampleData: Data[] = [
  {
    id: '001',
    operation_id: '001',
    api_name: 'getUserProfile',
    language: 'java',
    apiPath: '/api/user/profile',
    api_method: 'GET',
    status: true,
    code: `async function getUserProfile(req, res) {try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
         return res.status(500).json({
            error: 'Internal server error'
        });
    }
}`
  },

  {
    id: '002',
    operation_id: '002',
    api_name: 'createOrder',
    language: 'java',
    api_method: 'POST',
    apiPath: '/api/v1/orders',
    status: true,
    code: `async function getUserProfile(req, res) {try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                profile: user.profile
            }
        });
    } catch (error) {
         return res.status(500).json({
            error: 'Internal server error'
        });
    }
}`
  },
]


const CodeReview = () => {
  const dispatch = useDispatch();
  const [selectedApis, setSelectedApis] = useState<any | []>([]);


  const handleBack = () => {
    dispatch(prevStep())
  }
  const handleNext = () => {
    dispatch(nextStep())
  }
  const handleApproveCode = () => {

  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const updatedElements = sampleData.map(item => item.id)
      setSelectedApis([...updatedElements])
    } else {
      setSelectedApis([])
    }
  }

  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>, apiId: string) => {
    if (e.target.checked) {
      setSelectedApis([...selectedApis, apiId]);
    } else {
      setSelectedApis(selectedApis.filter((id: any) => id !== apiId));
    }
  }

  return (
    <div id="code-review-content" className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">Code Review</h1>
        <p className="text-gray-400">Review and approve generated API codes for seamless integration</p>
      </div>

      <div className="bg-[#1A1A2E] rounded-lg border border-[#374151] overflow-hidden">
        {/* <div className="p-6 border-b border-[#374151]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#FFFFFF]">Generated API Codes</h2>
            <div id="approve-button-container" className="hidden">
              <button id="approve-selected-btn" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <i className="fa-solid fa-check"></i>
                <span>Approve Code</span>
              </button>
            </div>
          </div>
        </div> */}
        <TestCaseHeader
          title="Generated API Codes"
          submitBtnText="Approve Code"
          submitBtnClass="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          submitBtnIcon={<i className="fa-solid fa-check"></i>}
          submitBtnClick={handleApproveCode}
          selectedApis={selectedApis}

        />
        <div className="overflow-x-auto">
          <TestCaseTable
            apiData={sampleData}
            tableName="code_review"
            selectedApis={selectedApis}
            handleSelectAll={handleSelectAll}
            totalNoApi={sampleData.length}
            handleSelection={handleSelection}
          />
        </div>
      </div>


      <div id="navigation-buttons" className="flex justify-between items-center mt-8 pt-6 border-t border-[#374151]">
        <button id="back-btn"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
          onClick={handleBack}
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back</span>
        </button>
        <button id="next-btn"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
          onClick={handleNext}
        >
          <span>Next</span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>



    </div>
  )
}

export default CodeReview
