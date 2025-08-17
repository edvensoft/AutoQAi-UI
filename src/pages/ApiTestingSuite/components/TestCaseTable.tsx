import React, { useEffect, useRef, useState } from 'react'
import CodeEditorModal from './CodeEditorModal'
import { API_URL } from '@/config'
import axios from 'axios'

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


interface TableRowProps {
    item: Data
}

interface CodeData {
    code: string,
    file_name: string,
    id: number,
    status: string
}

interface TableProps {
    apiData: Data[],
    tableName: string,
    selectedApis: any[],
    handleSelectAll: (e: any) => void,
    totalNoApi: number,
    handleSelection: (e: any, apiId: string) => void,
    approve: (id) => void
}

const TestCaseTable = (props: TableProps) => {
    const { apiData, tableName, selectedApis, handleSelectAll, totalNoApi, handleSelection, approve } = props
    const [isViewCodeModal, setIsViewCodeModal] = useState<boolean>(false)
    const [codeData, setCodeData] = useState<CodeData | null>(null)

    function objectToPropertiesFromObject(obj: Record<string, string>): string {
        return Object.entries(obj)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
    }


    const handleCodeView = (id: string) => {
        // setIsViewCodeModal(true)
        if (id) {
            if (tableName === "code_review") {
                axios.get(`${API_URL}/v1/api/endpoints/get-test-case/${id}/`).then((response) => {
                    console.log('Code response:', response);
                    setCodeData(response.data.response[0]);
                    setIsViewCodeModal(true)
                });
            } else if (tableName === "test_data") {
                axios.get(`${API_URL}/v1/api/endpoints/get-test-data/${id}/`).then((response) => {
                    console.log('Code response:', response);
                    let customizeData: CodeData = {
                        code: objectToPropertiesFromObject(response.data.response[0].data),
                        file_name: response.data.response[0].file_name,
                        id: response.data.response[0].id,
                        status: response.data.response[0].status
                    }
                    setCodeData(customizeData);
                    setIsViewCodeModal(true)
                });
            }



        }
    }

    const handleClose = () => {
        setIsViewCodeModal(false)

    }

    const selectAllRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        console.log('ss', selectAllRef.current, selectedApis.length, totalNoApi)
        if (selectAllRef.current) {
            if (selectedApis.length === 0) {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = false;
            } else if (selectedApis.length === totalNoApi) {
                selectAllRef.current.checked = true;
                selectAllRef.current.indeterminate = false;
            } else {
                selectAllRef.current.indeterminate = true;
                selectAllRef.current.checked = false;
            }
        }


    }, [selectedApis]);


    const TableRow = ({ item }: TableRowProps) => {
        return (
            <tr className="hover:bg-[#0F0F23]/50"
                key={item.id}
            >
                <td className="px-6 py-4">
                    <input type="checkbox"
                        checked={selectedApis.includes(item.id)}
                        onChange={(e) => handleSelection(e, item.id)}
                        className="code-checkbox w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]"
                    />
                </td>
                <td className="px-6 py-4 text-sm text-[#FFFFFF]">{item.id}</td>
                <td className="px-6 py-4 ">
                    <button
                        className="text-sm cursor-pointer truncate text-[#3B82F6] hover:text-[#2563EB] font-medium open-code-editor" data-api-id="API_001" data-api-name="User Authentication"
                        onClick={() => handleCodeView(item.id)}
                    >
                        {item.api_name}
                    </button>
                </td>
                {
                    tableName === "code_review" &&
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded capitalize">{item.language}</span>
                    </td>
                }

                <td className="px-6 py-4">
                    {
                        item.status === 'approved' ?
                            <span className="px-2 py-1 text-xs font-medium truncate bg-green-600 text-white rounded">Approved</span>
                            :
                            <span className="px-2 py-1 text-xs font-medium truncate bg-yellow-600 text-white rounded">Pending Review</span>

                    }
                </td>
                <td className="px-6 py-4">
                    <div className="flex space-x-2">
                        <button
                            className="open-code-editor cursor-pointer bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 rounded transition-colors group relative" data-api-id="API_001" data-api-name="User Authentication" title="View Code"
                            onClick={() => handleCodeView(item.id)}
                        >
                            <i className="fa-solid fa-eye"></i>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                View Code
                            </div>
                        </button>
                        {
                            item.status === 'approved' ?
                                <button className="text-green-600 hover:text-green-400 p-2 rounded transition-colors group relative cursor-default" title="Already Approved">
                                    <i className="fa-solid fa-check"></i>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Already Approved
                                    </div>
                                </button>
                                :
                                <button
                                    className="approve-single cursor-pointer bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors group relative"
                                    data-api-id="API_001"
                                    title="Approve"
                                    onClick={()=>approve(item.id)}

                                >
                                    <i className="fa-solid fa-check"></i>
                                    <div className="absolute bottom-full  left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Approve
                                    </div>
                                </button>
                        }

                    </div>
                </td>
            </tr>
        )
    }

    return (
        <>
            <table className="w-full">
                <thead className="bg-[#0F0F23]">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            <input type="checkbox" id="select-all-codes"
                                ref={selectAllRef}
                                className="w-4 h-4 text-[#3B82F6] cursor-pointer bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]"
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                            {
                                tableName === "code_review" ? "API ID" : "DATA ID"
                            }
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                            {
                                tableName === "code_review" ? "API Name" : "DATA Name"
                            }
                        </th>
                        {
                            tableName === "code_review" &&
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Language</th>

                        }
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody id="code-table-body" className="divide-y divide-[#374151]">
                    {
                        apiData.map((item) => (
                            <TableRow item={item} />
                        ))
                    }
                    {/* <tr className="hover:bg-[#0F0F23]/50">
                    <td className="px-6 py-4">
                        <input type="checkbox" className="code-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#FFFFFF]">API_002</td>
                    <td className="px-6 py-4">
                        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium open-code-editor" data-api-id="API_002" data-api-name="User Profile">
                            User Profile
                        </button>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-orange-600 text-white rounded">JavaScript</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded">Approved</span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <button className="open-code-editor bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 rounded transition-colors group relative" data-api-id="API_002" data-api-name="User Profile" title="View Code">
                                <i className="fa-solid fa-eye"></i>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    View Code
                                </div>
                            </button>
                            <button className="text-green-600 hover:text-green-400 p-2 rounded transition-colors group relative cursor-default" title="Already Approved">
                                <i className="fa-solid fa-check"></i>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Already Approved
                                </div>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr className="hover:bg-[#0F0F23]/50">
                    <td className="px-6 py-4">
                        <input type="checkbox" className="code-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#FFFFFF]">API_003</td>
                    <td className="px-6 py-4">
                        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium open-code-editor" data-api-id="API_003" data-api-name="Session Management">
                            Session Management
                        </button>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded">Java</span>
                    </td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-600 text-white rounded">Pending Review</span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <button className="open-code-editor bg-[#3B82F6] hover:bg-[#2563EB] text-white p-2 rounded transition-colors group relative" data-api-id="API_003" data-api-name="Session Management" title="View Code">
                                <i className="fa-solid fa-eye"></i>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    View Code
                                </div>
                            </button>
                            <button className="approve-single bg-green-600 hover:bg-green-700 text-white p-2 rounded transition-colors group relative" data-api-id="API_003" title="Approve">
                                <i className="fa-solid fa-check"></i>
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    Approve
                                </div>
                            </button>
                        </div>
                    </td>
                </tr> */}
                </tbody>
            </table>
            {
                isViewCodeModal && <CodeEditorModal language={tableName === "code_review" ? 'java' : 'plaintext'} data={codeData} onClose={handleClose} />
            }
        </>
    )
}

export default TestCaseTable
