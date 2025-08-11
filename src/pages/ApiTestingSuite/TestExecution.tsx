import React, { useState } from 'react'
import TestCaseHeader from './components/TestCaseHeader'
import { useDispatch } from 'react-redux';
import { nextStep } from '@/redux/apiTestingSlice';

const TestExecution = () => {
    const dispatch = useDispatch();

    const [selectedApis, setSelectedApis] = useState<any | []>([]);


    const handleExecuteCode = () => {
        dispatch(nextStep())
    }

    return (
        <div id="execution-content" className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">Test Execution</h1>
                <p className="text-gray-400">Execute selected test cases and monitor results</p>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg border border-[#374151] overflow-hidden">
                {/* <div className="p-6 border-b border-[#374151]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#FFFFFF]">Test Cases for Execution</h2>
                        <div id="execute-button-container" className="hidden">
                            <button id="execute-selected-btn" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                                <i className="fa-solid fa-play"></i>
                                <span>Execute Tests</span>
                            </button>
                        </div>
                    </div>
                </div> */}

                <TestCaseHeader
                    title="Test Cases for Execution"
                    submitBtnText="Execute Tests"
                    submitBtnClass="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    submitBtnClick={handleExecuteCode}
                    submitBtnIcon={<i className="fa-solid fa-play"></i>}
                    selectedApis={selectedApis}
                />

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#0F0F23]">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <input type="checkbox" id="select-all-tests" className="w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Test ID</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Test Name</th>
                            </tr>
                        </thead>
                        <tbody id="test-table-body" className="divide-y divide-[#374151]">
                            <tr className="hover:bg-[#0F0F23]/50">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="test-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                                </td>
                                <td className="px-6 py-4 text-sm text-[#FFFFFF]">TEST_001</td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-[#FFFFFF] font-medium">User Registration Test</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#0F0F23]/50">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="test-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                                </td>
                                <td className="px-6 py-4 text-sm text-[#FFFFFF]">TEST_002</td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-[#FFFFFF] font-medium">Login Functionality</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#0F0F23]/50">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="test-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                                </td>
                                <td className="px-6 py-4 text-sm text-[#FFFFFF]">TEST_003</td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-[#FFFFFF] font-medium">Product Search</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-[#0F0F23]/50">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="test-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                                </td>
                                <td className="px-6 py-4 text-sm text-[#FFFFFF]">TEST_004</td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-[#FFFFFF] font-medium">Payment Processing</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div id="navigation-buttons" className="mt-8 pt-6 border-t border-[#374151]">
            </div>
        </div>
    )
}

export default TestExecution
