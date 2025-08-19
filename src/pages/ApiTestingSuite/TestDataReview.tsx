// import { nextStep, prevStep } from '@/redux/apiTestingSlice';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import TestCaseHeader from './components/TestCaseHeader';
import TestCaseTable from './components/TestCaseTable';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/config';
import { CircularProgress } from '@mui/material';
import type { RootState } from '@/redux/store';


interface Data {
    id: string,
    operation_id: string,
    api_name: string,
    api_url: string,
    custom_instruction: string,
    project_id: string,
    api_header: string,
    is_selected: boolean,
    api_method: string,
    language: string,
    status: string,
    request_body: string
}

// const sampleData: Data[] = [
//     {
//         id: '001',
//         operation_id: '001',
//         api_name: 'getUserProfile',
//         language: 'java',
//         apiPath: '/api/user/profile',
//         api_method: 'GET',
//         status: true,
//         code: `async function getUserProfile(req, res) {try {
//         const userId = req.params.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 profile: user.profile
//             }
//         });
//     } catch (error) {
//          return res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// }`
//     },

//     {
//         id: '002',
//         operation_id: '002',
//         api_name: 'createOrder',
//         language: 'java',
//         api_method: 'POST',
//         apiPath: '/api/v1/orders',
//         status: true,
//         code: `async function getUserProfile(req, res) {try {
//         const userId = req.params.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             data: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 profile: user.profile
//             }
//         });
//     } catch (error) {
//          return res.status(500).json({
//             error: 'Internal server error'
//         });
//     }
// }`
//     },
// ]

const TestDataReview = () => {
    // const dispatch = useDispatch();
    const [selectedApis, setSelectedApis] = useState<any | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiData, setApiData] = useState<Data[] | []>([])
    // const { projectId } = useParams();
    const projectId = useSelector((state: RootState) => state.appState.project_id);

    const navigate = useNavigate();

    const handleBack = () => {
        // dispatch(prevStep())
        // navigate(`/project/api-testing-suite/code-review/${projectId}`)
        navigate(`/project/api-testing-suite/code-review/`)

    }
    const handleNext = () => {
        // dispatch(nextStep())
        // navigate(`/project/api-testing-suite/test-execution/${projectId}`)
        navigate(`/project/api-testing-suite/test-execution/`)


    }
    const handleApproveCode = (id) => {
        console.log(selectedApis, 'sele')
        if (id) {
            const payload = {
                "endpoint_ids": [id]
            }
            console.log('Payload for approval:', payload);
            axios.put(`${API_URL}/v1/api/endpoints/update-test-data-status/`, payload)
                .then((response) => {
                    console.log('Approval response:', response);
                    if (response.status === 200) {
                        alert('Selected APIs approved successfully!');
                        setSelectedApis([]);
                        getEndpointsData()
                        // navigate(`/project/api-testing-suite/test-execution/`)

                        // getEndpointsData();
                    }
                })
                .catch((error) => {
                    console.error('Error approving selected APIs:', error);
                    alert('Failed to approve selected APIs. Please try again.');
                });
        } else {
            const payload = {
                "endpoint_ids": [...selectedApis]
            }
            console.log('Payload for approval:', payload);
            axios.put(`${API_URL}/v1/api/endpoints/update-test-data-status/`, payload)
                .then((response) => {
                    console.log('Approval response:', response);
                    if (response.status === 200) {
                        alert('Selected APIs approved successfully!');
                        setSelectedApis([]);
                        getEndpointsData()
                        // navigate(`/project/api-testing-suite/test-execution/`)

                        // getEndpointsData();
                    }
                })
                .catch((error) => {
                    console.error('Error approving selected APIs:', error);
                    alert('Failed to approve selected APIs. Please try again.');
                });
        }

    }

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const updatedElements = apiData.map(item => item.id)
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

    const getEndpointsData = async () => {

        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/v1/api/endpoints/get-endpoints/${projectId}/?status_from=2`);
            console.log('Fetched APIs:', response);
            if (response?.data?.response && response?.data?.response.length > 0) {
                // setEndPointsData(response.data.response);
                console.log(response.data.response, 'data')
                setApiData(response.data.response)
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getEndpointsData()
    }, [])

    return (
        <div id="code-review-content" className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">Test Data Review</h1>
                <p className="text-gray-400">Review and approve generated test data for seamless integration</p>
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
                    title="Generated Test Data"
                    submitBtnText="Approve Data"
                    submitBtnClass="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    submitBtnIcon={<i className="fa-solid fa-check"></i>}
                    submitBtnClick={handleApproveCode}
                    selectedApis={selectedApis}
                />
                <div className="overflow-x-auto">
                    {
                        loading ?
                            <div className="h-60 flex justify-center items-center">
                                <CircularProgress size="3rem" />
                            </div>
                            :
                            error && error.length > 0 ?
                                <div className="h-60 flex justify-center items-center">
                                    <div className="text-red-500">{error}</div>
                                </div>
                                :
                                <TestCaseTable
                                    apiData={apiData}
                                    tableName="test_data"
                                    selectedApis={selectedApis}
                                    handleSelectAll={handleSelectAll}
                                    totalNoApi={apiData.length}
                                    handleSelection={handleSelection}
                                    approve={handleApproveCode}
                                />
                    }
                </div>
            </div>


            <div id="navigation-buttons" className="flex justify-between items-center mt-8 pt-6 border-t border-[#374151]">
                <button id="back-btn"
                    className="bg-gray-600 cursor-pointer hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    onClick={handleBack}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Back</span>
                </button>
                <button id="next-btn"
                    className="bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                    onClick={handleNext}
                >
                    <span>Next</span>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
    )
}

export default TestDataReview
