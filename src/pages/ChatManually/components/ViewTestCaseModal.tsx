// import { API_URL } from '@/config';
import { addTestCases } from '@/redux/collectionsSlice';
import type { RootState } from '@/redux/store';
import { Portal } from '@mui/material'
// import axios from 'axios';
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TestCaseRow from './TestCaseRow';

interface Props {
    close: () => void;
    from: string
}

const ViewTestCaseModal = (props: Props) => {
    const { close, from } = props
    // const [testCases, setTestCases] = useState([{
    //     test_case_id: '001',
    //     steps: 'aaa',
    //     expected_result: 'aaa'
    // }])
    const collections = useSelector((state: RootState) => state.collections.list);
    const testCases = useSelector((state: RootState) => state.collections.testCases);

    const activeCollectionId = useSelector((state: RootState) => state.collections.activeCollectionId);

    const activeCollection = collections.find(col => col.id === activeCollectionId)
    const dispatch = useDispatch();

    // console.log(testCases, 'testCase')

    const lastRow = useRef(null)


    // const getTestCases = () => {
    //     axios.get(`${API_URL}/v1/api/test-cases/get-test-cases/${activeCollectionId}/`).then(res => {
    //         console.log('res', res)
    //         // setTestCases(res.data.test_cases)
    //         // setOpenModal(true)

    //     })
    // }

    function incrementString(input: string): string {
        const match = input.match(/^([a-zA-Z]+)(\d+)$/);

        if (!match) return input; // Return unchanged if it doesn't match the pattern

        const [, prefix, numberPart] = match;
        const incremented = parseInt(numberPart, 10) + 1;

        return `${prefix}${incremented}`;
    }

    const handleAddTestCase = () => {
        const emptyTestCase = {
            // id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            id: 'new',
            test_case_id: incrementString(testCases[testCases.length - 1].test_case_id),
            name: '',
            steps: '',
            expected_output: ''
        }
        // dispatch(setTestCases([{...emptyTestCase}]))
        dispatch(addTestCases(emptyTestCase))
        if (lastRow.current) {
            lastRow.current?.scrollIntoView({ behavior: 'smooth' })
        }
        // lastRow.current?.scrollIntoView({ behavior: 'smooth' });
        // setTestCases((prev) => [...prev, emptyTestCase])
    }


    // const handleSave = () => {
    //     console.log('save', testCases)
    //     // const checkNewTestCase = storeTestCase.find(item => item.id === "new")
    //     // let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
    //     // if (testCases.id === 'new') {
    //     //     const payLoad = {
    //     //         "collection_id": activeCollectionId,
    //     //         "test_case_chat_id": storeTestCase.length > 0 ? storeTestCase[0].test_case_chat_id : '',
    //     //         "name": 'new',
    //     //         "steps": testSteps,
    //     //         "expected_output": expectedResult
    //     //     }
    //     //     // setIsEditing(false)
    //     //     // dispatch(deleteTestCaseById(checkNewTestCase.id))

    //     //     console.log(payLoad, testCases.length, 'payloa')
    //     //     axios.post(`${API_URL}/v1/api/test-cases/add-testcase/`, payLoad).then(
    //     //         resp => {
    //     //             console.log('res', resp)
    //     //             if (resp.data.message === "Test case added sucessfully") {
    //     //                 let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
    //     //                 let filteredCases = copyTestcases.filter(item => item.id !== 'new')
    //     //                 filteredCases.push(resp.data.response)
    //     //                 dispatch(setTestCases(filteredCases))
    //     //                 setIsEditing(false)
    //     //             }
    //     //         }
    //     //     )
    //     // } else {
    //     //     const payload = {
    //     //         "id": testCases.id, //this is generate testcase id
    //     //         "test_case_chat_id": testCases.test_case_chat_id,
    //     //         "name": testCases.name,
    //     //         "steps": testSteps,
    //     //         "expected_output": expectedResult
    //     //     }
    //     //     console.log(payload, storeTestCase.length, 'payload old')
    //     //     // axios.put(`${API_URL}/v1/api/test-cases/update-testcase/`, payload).then(
    //     //     //     resp => {
    //     //     //         console.log('res', resp)
    //     //     //         if (resp.data.message === "updated sucessfully") {
    //     //     //             let copyTestcases = JSON.parse(JSON.stringify(storeTestCase))
    //     //     //             let filteredCases = copyTestcases.map(item => {
    //     //     //                 if (item.id === testCases.id) {
    //     //     //                     item = {
    //     //     //                         ...item,
    //     //     //                         steps: testSteps,
    //     //     //                         expected_output: expectedResult
    //     //     //                     }
    //     //     //                 }
    //     //     //                 return item
    //     //     //             })
    //     //     //             // filteredCases.push(resp.data.response)
    //     //     //             console.log('filter', filteredCases)
    //     //     //             // dispatch(setTestCases(filteredCases))
    //     //     //             setIsEdit(false)
    //     //     //         }
    //     //     //     }
    //     //     // )
    //     // }

    // }

    useEffect(() => {
        // getTestCases()
    })

    // const TableRow = ({ test }) => {
    //     return (
    //         <tr>
    //             <td className="border border-[#374151] p-3">
    //                 <input type="text" value={test.test_case_id}
    //                     readOnly={isEdit}
    //                     // onChange={}
    //                     className="bg-transparent text-[#FFFFFF] border-none outline-none w-full"
    //                 />
    //             </td>
    //             <td className="border border-[#374151] p-3">
    //                 <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
    //                     // rows="3"
    //                     readOnly={isEdit}
    //                 >
    //                     {/* 1. Navigate to login page
    //                     2. Enter valid credentials
    //                     3. Click login button */}
    //                     {test.steps}
    //                 </textarea>
    //             </td>
    //             <td className="border border-[#374151] p-3">
    //                 <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
    //                     // rows="3"
    //                     readOnly={isEdit}
    //                 >
    //                     {/* User should be successfully logged in and redirected to dashboard */}
    //                     {test.expected_output}

    //                 </textarea>
    //             </td>
    //             <td className="border border-[#374151] p-3">
    //                 <div className="flex space-x-2 items-center ">
    //                     {
    //                         isEdit ?
    //                             <p className='cursor-pointer text-amber-500'
    //                                 onClick={() => setIsEdit(false)}
    //                             >Edit</p>
    //                             :
    //                             <button
    //                                 // className="save-test-case-btn text-[#3B82F6] hover:text-[#8B5CF6] transition-colors"
    //                                 className="cursor-pointer  text-[#3B82F6] hover:text-[#8B5CF6] p-2 rounded transition-colors group relative"
    //                                 onClick={handleSave}
    //                             >
    //                                 {/* <i data-fa-i2svg=""><svg className="svg-inline--fa fa-floppy-disk" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="floppy-disk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i> */}
    //                                 <i className="fa-solid fa-floppy-disk"></i>
    //                                 <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    //                                     Save
    //                                 </div>
    //                             </button>
    //                     }

    //                     {/* <span className="tooltiptext">Save test case</span> */}

    //                     <button
    //                         // className="delete-test-case-btn text-red-500 hover:text-red-400 transition-colors"
    //                         className="cursor-pointer  text-red-500 hover:text-red-400 p-2 rounded transition-colors group relative"
    //                     >
    //                         {/* <i data-fa-i2svg=""><svg className="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i> */}
    //                         <i className="fa-solid fa-trash"></i>
    //                         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    //                             Delete
    //                         </div>
    //                     </button>
    //                 </div>
    //             </td>
    //         </tr>
    //     )
    // }

    return (
        <Portal>
            <div id="view-testcases-modal"
                className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto'
            >
                <div className="bg-[#1A1A2E] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
                    <div className="p-6 border-b border-[#374151] flex justify-between items-center">
                        {
                            from === "chat" ?
                                <h2
                                    className="text-xl font-bold text-[#FFFFFF]"
                                    id="collection-modal-title">
                                    Generated Test Cases
                                </h2>
                                :
                                <h2
                                    className="text-xl font-bold text-[#FFFFFF]"
                                    id="collection-modal-title">
                                    {activeCollection.name} - Test Cases
                                </h2>

                        }
                        <button id="close-collection-modal"
                            className="text-gray-400 hover:text-white cursor-pointer"
                            onClick={close}
                        >
                            {/* <i className="text-xl" data-fa-i2svg=""><svg className="svg-inline--fa fa-xmark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i> */}
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto max-h-[70vh]">

                        <div className="mb-4">
                            {
                                testCases.length > 0 &&
                                <button id="add-test-case-collection-btn"
                                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors"
                                    onClick={handleAddTestCase}
                                >
                                    {/* <i className="mr-2" data-fa-i2svg=""><svg className="svg-inline--fa fa-plus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg></i> */}
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    Add Test Case
                                </button>
                            }

                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-700">
                                        <th className="border border-[#374151] p-3 text-left text-[#FFFFFF]">Test Case ID</th>
                                        <th className="border border-[#374151] p-3 text-left text-[#FFFFFF]">Test Steps</th>
                                        <th className="border border-[#374151] p-3 text-left text-[#FFFFFF]">Expected Results</th>
                                        <th className="border border-[#374151] p-3 text-left text-[#FFFFFF]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="collection-test-cases-tbody">
                                    {
                                        testCases.length > 0 ?
                                            testCases.map((test) => (
                                                // <TableRow test={test} />
                                                <TestCaseRow test={test}
                                                    // index={index} 
                                                    ref={lastRow}
                                                //ref={collections.length - 1 === index ? lastRow : null} 
                                                />
                                            ))
                                            :
                                            <p className='text-red-500'>No TestCases Found</p>
                                    }

                                    {/* <tr>
                                        <td className="border border-[#374151] p-3">
                                            <input type="text" value="TC002" className="bg-transparent text-[#FFFFFF] border-none outline-none w-full" />
                                        </td>
                                        <td className="border border-[#374151] p-3">
                                            <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
                                            // rows="3"
                                            >1. Navigate to login page
                                                2. Enter invalid credentials
                                                3. Click login button</textarea>
                                        </td>
                                        <td className="border border-[#374151] p-3">
                                            <textarea className="bg-transparent text-[#FFFFFF] border-none outline-none w-full resize-none"
                                            // rows="3"
                                            >Error message should be displayed and user should remain on login page</textarea>
                                        </td>
                                        <td className="border border-[#374151] p-3">
                                            <div className="flex space-x-2">
                                                <div className="tooltip">
                                                    <button className="save-test-case-btn text-[#3B82F6] hover:text-[#8B5CF6] transition-colors">
                                                        <i data-fa-i2svg=""><svg className="svg-inline--fa fa-floppy-disk" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="floppy-disk" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg></i>
                                                    </button>
                                                    <span className="tooltiptext">Save test case</span>
                                                </div>
                                                <button className="delete-test-case-btn text-red-500 hover:text-red-400 transition-colors">
                                                    <i data-fa-i2svg=""><svg className="svg-inline--fa fa-trash" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        {
                            from === 'chat' &&
                            <div className="mt-4 flex justify-end">
                                <button id="save-test-cases-btn" className="bg-[#8B5CF6] hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    Save Collection
                                </button>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </Portal>
    )
}

export default ViewTestCaseModal
