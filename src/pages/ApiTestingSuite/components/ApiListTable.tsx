import React, { useEffect, useRef, useState } from 'react'
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReturnValueModal from './ReturnValueModal';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CompareValuesModal from './CompareValuesModal';
import AddSchemaModal from './AddSchemaModal';
import ApiMapingModal from './ApiMapingModal';
// import { Autocomplete, Chip, TextField } from '@mui/material';
// import MultiSelect from './MultiSelect';
// import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import ApiListTableRow from './ApiListTableRow';


// interface AdditionalActions {
//     return_value: boolean,
//     compared_value: boolean,
// }

// interface Data {
//     id: number,
//     api_name: string,
//     api_method: string,
//     dependent_api: string,
//     additional_actions: AdditionalActions,
//     missing_schema: string
// }

interface Data {
    api_header: string,
    api_method: string,
    api_name: string,
    api_url: string,
    custom_instruction: string,
    description: string | null,
    id: number,
    is_selected: boolean,
    operation_id: string,
    project_id: string,
    request_body: string,
}


// interface TableRowProps {
//     item: Data,
//     index: number
// }

interface TableProps {
    data: Data[],
    currentPage: number,
    totalPages: number,
    noApisPerPage: number,
    selectedApis: any[],
    handleSelectAll: (e: any) => void,
    handleSelection: (e: any, apiId: number) => void
}

// const sampleData = [
//     {
//         id: 1,
//         api_name: 'User Authentication',
//         api_method: 'Post',
//         dependent_api: 'JWT-based authentication with reference token',
//         additional_actions: {
//             return_value: false,
//             compared_value: false,
//         },
//         missing_schema: '4000'
//     },
//     {
//         id: 2,
//         api_name: 'User Profile',
//         api_method: 'Get',
//         dependent_api: 'JWT-based authentication with reference token',
//         additional_actions: {
//             return_value: false,
//             compared_value: true,
//         },
//         missing_schema: 'completed'
//     },
// ]


const ApiListTable = (props: TableProps) => {
    const { currentPage, data, noApisPerPage, handleSelection, handleSelectAll, selectedApis } = props
    const [isReturnValue, setIsReturnValue] = useState<boolean>(false)
    const [inputValue, setInputValue] = React.useState('');
    console.log(inputValue)

    const [isCompareValue, setIsCompareValue] = useState<boolean>(false)
    const [isSchemaModal, setIsSchemaModal] = useState<boolean>(false)
    const [isApiMapingModal, setIsApiMapingModal] = useState<boolean>(false)
    const [apiMappingStatus, setApiMappingStatus] = useState({ status: false })
    const [selectedEndpoint, setSelectedEndpoint] = useState(null)
    // const [dependentEndpoint, setDependentEndpoint] = useState(null)




    const handleAditionalActions = (e: React.ChangeEvent<HTMLInputElement>, action: string, id: number, item: object) => {
        console.log('check', e.target.checked, action, id, action === 'return' && e.target.checked)
        if (action === 'return' && e.target.checked) {
            setSelectedEndpoint(item)
            setIsReturnValue(true)

        } else if (action === 'compare' && e.target.checked) {
             setSelectedEndpoint(item)
            setIsCompareValue(true)
        }
    }

    const closeModal = (modal: string) => {
        console.log('moda', modal)
        if (modal === 'return') {
            setIsReturnValue(false)

        } else if (modal === 'compare') {
            setIsCompareValue(false)

        } else if (modal === 'schema') {
            setIsSchemaModal(false)

        } else if (modal === 'api_map') {
            setIsApiMapingModal(false)
            setInputValue('')
        }

    }

    // const handleSchema = (id: number) => {
    //     setIsSchemaModal(true)
    // }
    // const handleSchema = (id: number) => {
    //     setIsSchemaModal(true)
    // }

    const startIndex = (currentPage - 1) * noApisPerPage;
    const endIndex = startIndex + noApisPerPage;

    const currentItems = data.slice(startIndex, endIndex);


    const selectAllRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // console.log('ss', selectAllRef.current, selectedApis.length, totalNoApi)
        if (selectAllRef.current) {
            if (selectedApis.length === 0) {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = false;
            } else if (selectedApis.length === currentItems.length) {
                selectAllRef.current.checked = true;
                selectAllRef.current.indeterminate = false;
            } else {
                selectAllRef.current.indeterminate = true;
                selectAllRef.current.checked = false;
            }
        }


    }, [selectedApis]);


    return (
        <>
            <table className="w-full">
                <thead className="bg-[#0F0F23]">
                    <tr>
                        <th className="px-6 py-4 text-left">
                            <input type="checkbox" id="select-all"
                                ref={selectAllRef}
                                onChange={handleSelectAll}
                                className="w-4 h-4 text-[#3B82F6] cursor-pointer bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">API ID</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">API Name</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Dependent API</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Additional Action</th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Missing Schema</th>
                    </tr>
                </thead>
                <tbody id="api-table-body" className="divide-y divide-[#374151]">
                    {
                        currentItems.map((item: Data) => (
                            // <TableRow item={item} index={index} />
                            <ApiListTableRow
                                item={item}
                                selectedApis={selectedApis}
                                handleSelection={handleSelection}
                                currentItems={currentItems}
                                handleAditionalActions={handleAditionalActions}
                                setIsApiMapingModal={setIsApiMapingModal}
                                apiMappingStatus={apiMappingStatus}
                                setApiMappingStatus={setApiMappingStatus}
                                // setDependentEndpoint={setDependentEndpoint}
                                isApiMapingModal={isApiMapingModal}
                            // setInputValue={setInputValue}
                            // inputValue={inputValue}
                            />
                        ))
                    }
                </tbody>
            </table>


            {
                isReturnValue &&
                <ReturnValueModal onClose={closeModal}
                    selectedEndpoint={selectedEndpoint}
                />
            }
            {
                isCompareValue &&
                <CompareValuesModal onClose={closeModal}
                    selectedEndpoint={selectedEndpoint}
                />
            }
            {
                isSchemaModal &&
                <AddSchemaModal onClose={closeModal} 
                
                />
            }

            {
                isApiMapingModal &&
                <ApiMapingModal onClose={closeModal}
                    setApiMappingStatus={setApiMappingStatus}
                    apiMappingStatus={apiMappingStatus}
                    selectedEndpoint={selectedEndpoint}
                    currentItems={currentItems}
                />
            }

        </>
    )
}

export default ApiListTable
