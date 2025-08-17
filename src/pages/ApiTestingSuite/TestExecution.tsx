import React, { useEffect, useRef, useState } from 'react'
import TestCaseHeader from './components/TestCaseHeader'
import { useDispatch, useSelector } from 'react-redux';
import { nextStep } from '@/redux/apiTestingSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/config';
import { CircularProgress } from '@mui/material';
import ExecutionLoader from './ExecutionLoader';
import ExecutionTable from './components/ExecutionTable';
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

const TestExecution = () => {
    const dispatch = useDispatch();

    const [selectedApis, setSelectedApis] = useState<any | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [apiData, setApiData] = useState<Data[] | []>([])
    const [isExecutionLoad, setIsExecutionLoad] = useState<boolean>(false)
    // const { projectId } = useParams();

    const projectId = useSelector((state: RootState) => state.appState.project_id);
    const navigate = useNavigate();



    const handleExecuteCode = () => {
        // dispatch(nextStep())
        setIsExecutionLoad(true)
        console.log(selectedApis, 'sele')
        const payload = {
            // "endpoint_ids": [...selectedApis]
            "project_id": projectId,
            "api_endpoint_ids": [...selectedApis]
        }
        console.log('Payload for approval:', payload);
        axios.post(`${API_URL}/v1/api/projects/execute-tests/`, payload)
            .then((response) => {
                console.log('Approval response:', response);
                if (response.status === 200) {
                    // alert('Selected APIs approved successfully!');
                    setIsExecutionLoad(false)
                    setSelectedApis([]);
                    navigate(`/project/api-testing-suite/recent-reports/`)

                    // getEndpointsData();
                }
            })
            .catch((error) => {
                console.error('Error approving selected APIs:', error);
                alert('Failed to approve selected APIs. Please try again.');
            });

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
            const response = await axios.get(`${API_URL}/v1/api/endpoints/get-endpoints/${projectId}`);
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

    console.log('load', isExecutionLoad)

    useEffect(() => {
        getEndpointsData()
    }, [])





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
                    submitBtnClass="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    submitBtnClick={handleExecuteCode}
                    submitBtnIcon={<i className="fa-solid fa-play"></i>}
                    selectedApis={selectedApis}
                />

                <div className="overflow-x-auto">
                    {
                        loading ?
                            <div className="h-60 flex justify-center items-center">
                                <CircularProgress size="3rem" />
                            </div>
                            :
                            <ExecutionTable
                                apiData={apiData}
                                tableName="test_data"
                                selectedApis={selectedApis}
                                handleSelectAll={handleSelectAll}
                                totalNoApi={apiData.length}
                                handleSelection={handleSelection}
                            />
                    }
                </div>
            </div>



            <div id="navigation-buttons" className="mt-8 pt-6 border-t border-[#374151]">
            </div>
            {
                isExecutionLoad && <ExecutionLoader />
            }
        </div>
    )
}

export default TestExecution
