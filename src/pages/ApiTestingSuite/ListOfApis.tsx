import React, { useEffect, useState } from 'react'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApiListTable from './components/ApiListTable';
// import CustomeCodeIcon from '@/assets/customeIcons/CustomeCodeIcon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/config';
import { Backdrop, CircularProgress,} from '@mui/material';
import TestCaseHeader from './components/TestCaseHeader';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

// interface Data {
//     api_header: string,
//     api_method: string,
//     api_name: string,
//     api_url: string,
//     custom_instruction: string,
//     description: string | null,
//     id: number,
//     is_selected: boolean,
//     operation_id: string,
//     project_id: string,
//     request_body: string,
// }


const ListOfApis = () => {

    const [allApis, setAllApis] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [isGeneratingCode, setIsGeneratingCode] = React.useState(false);

    const [noApisPerPage, setNoApisPerPage] = useState(10)
    // const noApisPerPage = 10;
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const navigate = useNavigate();
    // const { projectId } = useParams();
    const projectId = useSelector((state: RootState) => state.appState.project_id);

    const [selectedApis, setSelectedApis] = React.useState<any | []>([])


    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const startIndex = (currentPage - 1) * noApisPerPage;
            const endIndex = startIndex + noApisPerPage;

            const currentItems = allApis.slice(startIndex, endIndex);

            const updatedElements = currentItems.map(item => item.id)
            setSelectedApis([...updatedElements])
        } else {
            setSelectedApis([])
        }
    }


    const handleSelection = (e: React.ChangeEvent<HTMLInputElement>, apiId: number) => {
        if (e.target.checked) {
            setSelectedApis([...selectedApis, apiId]);
        } else {
            setSelectedApis(selectedApis.filter((id: any) => id !== apiId));
        }
    }



    const handlePrevPage = () => {
        let prevPage = currentPage - 1
        if (prevPage > 0) {
            setCurrentPage(prevPage)
        }
    }
    const handleNextPage = () => {
        let nextPage = currentPage + 1
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage)
        }
    }

    const handleSelectePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('select', e.target.value)
        const val = e.target.value
        setNoApisPerPage(Number(val))
        setTotalPages(Math.ceil(allApis.length / Number(val)))
        setCurrentPage(1)
    }

    // console.log('pag', currentPage, totalPages, noApisPerPage)

    const getAllApis = async () => {
        try {
            setLoading(true);
            // const response = await axios.get(`${API_URL}/v1/api/projects/get-apis/0dded977-6d16-4f8b-bff0-12771a92f08d/`);
            // const response = await axios.get(`${API_URL}/v1/api/projects/get-apis/${projectId}/`);

            axios.get(`${API_URL}/v1/api/projects/get-apis/${projectId}/`).then((response) => {
                console.log('Fetched APIs:', response);

                if (response?.data?.response && response?.data?.response.length > 0) {
                    setAllApis(response.data.response);
                    setTotalPages(Math.ceil(response.data.response.length / noApisPerPage));
                }
            }).catch(e => {
                console.log('Fetched APIs:', e);
                setError(e.response.data.error)
            })

            // console.log('Fetched APIs:', response);


        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }

    const handleGenerateCode = async () => {
        console.log('Selected APIs for code generation:', selectedApis, allApis);
        const updatedData = selectedApis.map(apiId => {
            const apiFound = allApis.find(api => api.id === apiId);
            return {
                id: apiFound.id,
                custom_instruction: apiFound.custom_instruction
            };
        });
        const payload = {
            "endpoints": [...updatedData],
        }
        console.log('Updated Data:', updatedData, payload);

        try {
            setIsGeneratingCode(true);
            const response = await axios.post(`${API_URL}/v1/api/endpoints/generate-test-cases/`, payload);
            console.log('Code Generation Response:', response);
            if (response?.status === 200) {
                // alert('Code generated successfully!');
                setSelectedApis([]);
                setIsGeneratingCode(false)
                // navigate(`/project/api-testing-suite/code-review/${projectId}`)
                navigate(`/project/api-testing-suite/code-review/`)

                // navigate(`/api-code-review/${id}/${encodeURIComponent(projectTitle)}`);

            }
        } catch (error) {
            console.error('Error generating code:', error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getAllApis();
        // console.log('API URL:', import.meta.env.VITE_API_URL);
    }, []);

    return (
        <div id="api-list-content" className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">API List</h1>
                <p className="text-gray-400">Manage and configure your API endpoints for testing</p>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg border border-[#374151] overflow-hidden">
                {/* <div className="p-6 border-b border-[#374151]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#FFFFFF]">API Endpoints</h2>
                        <button id="generate-code-btn" className="bg-[#3B82F6] flex gap-2 items-center hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors">
                          
                            <CustomeCodeIcon width={18} height={18} fill='#ffffff' />
                            <span>
                                Generate Code
                            </span>

                        </button>
                    </div>
                </div> */}
                {/* <i className="fa fa-code text-white" aria-hidden="true"></i> */}

                <TestCaseHeader
                    title="API Endpoints"
                    submitBtnText="Generate Code"
                    submitBtnClass="bg-[#3B82F6] cursor-pointer flex gap-2 items-center hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors"
                    submitBtnIcon={<i className="fa fa-code text-white" aria-hidden="true" />}
                    submitBtnClick={handleGenerateCode}
                    selectedApis={selectedApis}

                />

                <div className="overflow-x-auto">
                    {
                        loading ?
                            <div className="h-60 flex justify-center items-center">
                                <CircularProgress size="3rem" />
                            </div>
                            :
                            error ?
                                <div className='flex justify-center items-center h-40'>

                                    <h3 className='text-red-500'>{error}</h3>
                                </div>
                                :
                                <>
                                    <ApiListTable
                                        data={allApis}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        noApisPerPage={noApisPerPage}
                                        handleSelection={handleSelection}
                                        handleSelectAll={handleSelectAll}
                                        selectedApis={selectedApis}
                                    />
                                    <hr className="border-t border-[#374151]  my-4" />
                                    <div className='flex justify-between px-6 py-6'>
                                        <div className='flex items-center'>
                                            <p className='text-white text-[18px] mr-4'>Rows Per Page</p>
                                            <select
                                                onChange={handleSelectePerPage}
                                                className=' w-12 bg-[#1A1A2E] border border-white text-white'>
                                                <option value={10}>10</option>
                                                <option value={25}>25</option>
                                                <option value={50}>50</option>
                                            </select>
                                        </div>
                                        <div className='flex items-center'>
                                            <i className="fa fa-chevron-left mr-4 cursor-pointer"
                                                onClick={handlePrevPage}
                                                aria-hidden="true"
                                            ></i>
                                            <div className='text-white mr-4'>
                                                {currentPage}
                                            </div>
                                            <i className="fa fa-chevron-right cursor-pointer"
                                                onClick={handleNextPage}
                                                aria-hidden="true"></i>
                                        </div>

                                    </div>
                                </>

                    }

                </div>

                <Backdrop
                    sx={(theme) => ({ color: '#3b82f6', zIndex: theme.zIndex.drawer + 1 })}
                    open={isGeneratingCode}
                // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    )
}

export default ListOfApis
