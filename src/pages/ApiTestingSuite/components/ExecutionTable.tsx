import React, { useEffect, useRef } from 'react'

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
interface TableProps {
    apiData: Data[],
    tableName: string,
    selectedApis: any[],
    handleSelectAll: (e: any) => void,
    totalNoApi: number,
    handleSelection: (e: any, apiId: string) => void
}

const ExecutionTable = (props: TableProps) => {
    const { apiData, tableName, selectedApis, handleSelectAll, totalNoApi, handleSelection } = props

    const selectAllRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        console.log('ss', selectAllRef.current, selectedApis.length,)
        if (selectAllRef.current) {
            if (selectedApis.length === 0) {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = false;
            } else if (selectedApis.length === apiData.length) {
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
            <tr className="hover:bg-[#0F0F23]/50" key={item.id}>
                <td className="px-6 py-4">
                    <input type="checkbox"
                        checked={selectedApis.includes(item.id)}
                        onChange={(e) => handleSelection(e, item.id)}
                        className="test-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                </td>
                <td className="px-6 py-4 text-sm text-[#FFFFFF]">{item.id}</td>
                <td className="px-6 py-4">
                    <span className="text-sm text-[#FFFFFF] font-medium">{item.api_name}</span>
                </td>
            </tr>
        )
    }
    return (
        <table className="w-full">
            <thead className="bg-[#0F0F23]">
                <tr>
                    <th className="px-6 py-4 text-left">
                        <input type="checkbox" id="select-all-tests"
                            ref={selectAllRef}
                            onChange={handleSelectAll}
                            className="w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Test ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Test Name</th>
                </tr>
            </thead>
            <tbody id="test-table-body" className="divide-y divide-[#374151]">
                {
                    apiData.map((item) => (
                        <TableRow item={item} />
                    ))
                }
                {/* <tr className="hover:bg-[#0F0F23]/50">
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
                            </tr> */}
            </tbody>
        </table>
    )
}

export default ExecutionTable
