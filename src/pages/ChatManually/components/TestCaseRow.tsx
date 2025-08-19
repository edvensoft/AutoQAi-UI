import { API_URL } from '@/config';
import { setTestCases } from '@/redux/collectionsSlice';
import type { RootState } from '@/redux/store';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const TestCaseRow = ({ test }) => {

    const [isEdit, setIsEdit] = useState(true)
    const [testCaseId, setTestCaseId] = useState(test.test_case_id);
    const [testSteps, setTestSteps] = useState(test.steps);
    const [expectedResult, setExpectedResult] = useState(test.expected_output);
    const testCases = useSelector((state: RootState) => state.collections.testCases);

    const activeCollectionId = useSelector((state: RootState) => state.collections.activeCollectionId);

    const dispatch = useDispatch();

    const handleTestCaseId = (e) => {
        const val = e.target.value
        setTestCaseId(val)

    }
    const handleTestCaseResult = (e) => {
        const val = e.target.value
        setExpectedResult(val)

    }
    const handleTestCaseStep = (e) => {
        const val = e.target.value
        setTestSteps(val)
    }

    const handleSave = () => {
        console.log('save', testCases)
        const checkNewTestCase = testCases.find(item => item.id === "new")
        let copyTestcases = JSON.parse(JSON.stringify(testCases))
        if (test.id === 'new') {
            const payLoad = {
                "collection_id": activeCollectionId,
                "test_case_chat_id": testCases.length > 0 ? testCases[0].test_case_chat_id : '',
                "name": 'new',
                "steps": testSteps,
                "expected_output": expectedResult
            }
            // setIsEditing(false)
            // dispatch(deleteTestCaseById(checkNewTestCase.id))

            console.log(payLoad, testCases.length, 'payloa')
            axios.post(`${API_URL}/v1/api/test-cases/add-testcase/`, payLoad).then(
                resp => {
                    console.log('res', resp)
                    if (resp.data.message === "Test case added sucessfully") {
                        let copyTestcases = JSON.parse(JSON.stringify(testCases))
                        let filteredCases = copyTestcases.filter(item => item.id !== 'new')
                        filteredCases.push(resp.data.response)
                        dispatch(setTestCases(filteredCases))
                        setIsEdit(true)
                    }
                }
            )
        } else {
            const payload = {
                "id": test.id, //this is generate testcase id
                "test_case_chat_id": test.test_case_chat_id,
                "name": test.name,
                "steps": testSteps,
                "expected_output": expectedResult
            }
            console.log(payload, testCases.length, 'payload old')
            axios.put(`${API_URL}/v1/api/test-cases/update-testcase/`, payload).then(
                resp => {
                    console.log('res', resp)
                    if (resp.data.message === "updated sucessfully") {
                        let copyTestcases = JSON.parse(JSON.stringify(testCases))
                        let filteredCases = copyTestcases.map(item => {
                            if (item.id === test.id) {
                                item = {
                                    ...item,
                                    steps: testSteps,
                                    expected_output: expectedResult
                                }
                            }
                            return item
                        })
                        // filteredCases.push(resp.data.response)
                        console.log('filter', filteredCases)
                        dispatch(setTestCases(filteredCases))
                        setIsEdit(true)

                    }
                }
            )
        }

    }

    return (
        <tr>
            <td className="border border-[#374151] p-3">
                <input type="text" value={testCaseId}
                    readOnly={isEdit}
                    onChange={handleTestCaseId}
                    className="bg-transparent text-[#FFFFFF] border-none outline-none w-full"
                />
            </td>
            <td className="border border-[#374151] p-3">
                <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
                    // rows="3"
                    readOnly={isEdit}
                    value={testSteps}
                    onChange={handleTestCaseStep}
                />
                {/* 1. Navigate to login page
                        2. Enter valid credentials
                        3. Click login button */}
                {/* {test.steps} */}
                {/* </textarea> */}
            </td>
            <td className="border border-[#374151] p-3">
                <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
                    // rows="3"
                    readOnly={isEdit}
                    value={expectedResult}
                    onChange={handleTestCaseResult}

                />
                {/* User should be successfully logged in and redirected to dashboard */}
                {/* {test.expected_output}

                </textarea> */}
            </td>
            <td className="border border-[#374151] p-3">
                <div className="flex space-x-2 items-center ">
                    {
                        isEdit ?
                            <p className='cursor-pointer text-amber-500'
                                onClick={() => setIsEdit(false)}
                            >Edit</p>
                            :
                            <button
                                // className="save-test-case-btn text-[#3B82F6] hover:text-[#8B5CF6] transition-colors"
                                className="cursor-pointer  text-[#3B82F6] hover:text-[#8B5CF6] p-2 rounded transition-colors group relative"
                                onClick={handleSave}
                            >
                                {/* <i data-fa-i2svg=""><svg className="svg-inline--fa fa-floppy-disk" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="floppy-disk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i> */}
                                <i className="fa-solid fa-floppy-disk"></i>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Save
                                </div>
                            </button>
                    }

                    {/* <span className="tooltiptext">Save test case</span> */}

                    <button
                        // className="delete-test-case-btn text-red-500 hover:text-red-400 transition-colors"
                        className="cursor-pointer  text-red-500 hover:text-red-400 p-2 rounded transition-colors group relative"
                    >
                        {/* <i data-fa-i2svg=""><svg className="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> */}
                        <i className="fa-solid fa-trash"></i>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Delete
                        </div>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default TestCaseRow
