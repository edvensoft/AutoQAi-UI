import React, {  useEffect, useRef, useState } from 'react'
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




    const [isCompareValue, setIsCompareValue] = useState<boolean>(false)
    const [isSchemaModal, setIsSchemaModal] = useState<boolean>(false)
    const [isApiMapingModal, setIsApiMapingModal] = useState<boolean>(false)
    const [apiMappingStatus, setApiMappingStatus] = useState({status:false})



    const handleAditionalActions = (e: React.ChangeEvent<HTMLInputElement>, action: string, id: number) => {
        console.log('check', e.target.checked, action, id, action === 'return' && e.target.checked)
        if (action === 'return' && e.target.checked) {
            setIsReturnValue(true)
        } else if (action === 'compare' && e.target.checked) {
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


    // const TableRow = ({ item }: TableRowProps) => {

    //     const [inputValue, setInputValue] = React.useState('');
    //     const [selectedDependeAPi, setSelectedDependeAPi] = useState([{ label: 'ss', id: 2 }])
    //     const handleDependentApi = (val, id) => {
    //         console.log('value', val, id)
    //         let selected = { label: val.label, id: id }
    //         setSelectedDependeAPi((prev) => [...prev, selected])

    //         setInputValue('')
    //         setIsApiMapingModal(true)
    //     }



    //     return (
    //         <tr className="hover:bg-[#0F0F23]/50" key={item?.id}>
    //             <td className="px-6 py-4">
    //                 <input type="checkbox"
    //                     checked={selectedApis.includes(item.id)}
    //                     onChange={(e) => handleSelection(e, item.id)}
    //                     className="api-checkbox w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
    //             </td>
    //             <td className="px-6 py-4 text-sm text-[#FFFFFF]">{item?.id}</td>
    //             <td className="px-6 py-4 text-sm w-36 text-[#FFFFFF]">{item?.api_name}</td>
    //             <td className="px-6 py-4">
    //                 {
    //                     item.api_method === 'Get' ?
    //                         <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">{item.api_method}</span>
    //                         :
    //                         <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded">{item.api_method}</span>
    // const TableRow = ({ item }: TableRowProps) => {

    //     const [inputValue, setInputValue] = React.useState('');
    //     const [selectedDependeAPi, setSelectedDependeAPi] = useState([{ label: 'ss', id: 2 }])
    //     const handleDependentApi = (val, id) => {
    //         console.log('value', val, id)
    //         let selected = { label: val.label, id: id }
    //         setSelectedDependeAPi((prev) => [...prev, selected])

    //         setInputValue('')
    //         setIsApiMapingModal(true)
    //     }



    //     return (
    //         <tr className="hover:bg-[#0F0F23]/50" key={item?.id}>
    //             <td className="px-6 py-4">
    //                 <input type="checkbox"
    //                     checked={selectedApis.includes(item.id)}
    //                     onChange={(e) => handleSelection(e, item.id)}
    //                     className="api-checkbox w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
    //             </td>
    //             <td className="px-6 py-4 text-sm text-[#FFFFFF]">{item?.id}</td>
    //             <td className="px-6 py-4 text-sm w-36 text-[#FFFFFF]">{item?.api_name}</td>
    //             <td className="px-6 py-4">
    //                 {
    //                     item.api_method === 'Get' ?
    //                         <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">{item.api_method}</span>
    //                         :
    //                         <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded">{item.api_method}</span>

    //                 }
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="relative">
    //                     {/* <input type="text" 
    //                     className="dependent-api-input bg-[#0F0F23] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full"
    //                      placeholder="Type to search APIs..."
    //                     // autocomplete="off" 
    //                     />
    //                     <div className="dependent-api-suggestions hidden absolute top-full left-0 right-0 bg-[#1A1A2E] border border-[#374151] rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_002">User Profile API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_003">Session Management API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_004">Payment Gateway API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_005">Notification Service API</div>
    //                     </div>
    //                     <div className="selected-apis mt-2 flex flex-wrap gap-1">
    //                 }
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="relative">
    //                     {/* <input type="text" 
    //                     className="dependent-api-input bg-[#0F0F23] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full"
    //                      placeholder="Type to search APIs..."
    //                     // autocomplete="off" 
    //                     />
    //                     <div className="dependent-api-suggestions hidden absolute top-full left-0 right-0 bg-[#1A1A2E] border border-[#374151] rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_002">User Profile API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_003">Session Management API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_004">Payment Gateway API</div>
    //                         <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_005">Notification Service API</div>
    //                     </div>
    //                     <div className="selected-apis mt-2 flex flex-wrap gap-1">

    //                     </div> */}

    //                     <Autocomplete
    //                         // id="free-solo-demo"
    //                         // id='Type to search APIs...'
    //                         freeSolo
    //                         inputValue={inputValue}
    //                         value={inputValue}
    //                         onChange={(_event, value: string | null) => handleDependentApi(value, item.id)}
    //                         options={currentItems.filter(i => i.id !== item.id).map(s => ({ label: s.api_name, id: s.id }))}
    //                         renderInput={(params) => <TextField
    //                             // className='w-full'
    //                             placeholder="Type to search APIs..."
    //                             sx={{
    //                                 '& .MuiOutlinedInput-root': {
    //                                     height: '28px', // Set height
    //                                     borderRadius: '0.375rem', // Tailwind rounded-md equivalent
    //                                     // paddingX: 1.5,
    //                                     paddingY: '0.6rem',
    //                                     fontSize: '0.875rem',
    //                                     color: '#ffffff',
    //                                     '& fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-500
    //                                     },
    //                                     '&:hover fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-600 on hover
    //                                     },
    //                                     '&.Mui-focused fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-700 on focus
    //                                     },
    //                                 },
    //                             }}
    //                             {...params}

    //                         />}
    //                     />
    //                     {
    //                         selectedDependeAPi.length > 0 &&
    //                         selectedDependeAPi.map(selected => {
    //                             if (selected.id === item.id) {
    //                                 return (
    //                                     <div className="selected-apis mt-2 flex flex-wrap gap-1">
    //                                         <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-xs flex items-center">
    //                                             {selected.label}
    //                                             <button className="ml-1 text-white hover:text-gray-300"
    //                                                 // onclick="removeSelectedApi(this)" 
    //                                                 data-value="api_002">
    //                                                 <i className="fa fa-times" aria-hidden="true"></i>
    //                                             </button>
    //                                         </span>
    //                                     </div>
    //                                 )
    //                             }
    //                         })

    //                     }

    //                 </div>
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="flex space-x-2">
    //                     <label className="flex items-center">
    //                         <input type="checkbox"
    //                             // checked={item.additional_actions.return_value}
    //                             onChange={(e) => handleAditionalActions(e, 'return', item.id)}
    //                             className="w-4 h-4 text-[#3B82F6] cursor-pointer bg-transparent border-[#374151] rounded"
    //                         />
    //                         <span className="ml-2 text-sm text-gray-300">Return Values</span>
    //                     </label>
    //                     <label className="flex items-center">
    //                         <input type="checkbox"
    //                             // checked={item.additional_actions.compared_value}
    //                             onChange={(e) => handleAditionalActions(e, 'compare', item.id)}
    //                             className="compare-values-cb w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded" />
    //                         <span className="ml-2 text-sm text-gray-300">Compare Values</span>
    //                     </label>
    //                 </div>
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="flex items-center space-x-2">
    //                     {/* {
    //                         item.missing_schema === 'completed' ?
    //                             <div className='flex items-center gap-1'>
    //                                 <CheckCircleIcon className='text-sm text-green-400 ' />
    //                                 <div className="text-sm text-green-400 capitalize">

    //                     {item.missing_schema}
    //                 </div>
    //             </div>
    //             :
    //             <div className='flex items-center gap-1'>
    //                 <div className="text-sm text-red-400">{item.missing_schema}</div>
    //                 <button className="add-schema-btn text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema"
    //                     onClick={() => handleSchema(item.id)}
    //                 >

    //                     <AddCircleIcon className='text-sm' />
    //                 </button>
    //             </div>
    //                     } */}
    //                     </div> */}

    //                     <Autocomplete
    //                         // id="free-solo-demo"
    //                         // id='Type to search APIs...'
    //                         freeSolo
    //                         inputValue={inputValue}
    //                         value={inputValue}
    //                         onChange={(_event, value: string | null) => handleDependentApi(value, item.id)}
    //                         options={currentItems.filter(i => i.id !== item.id).map(s => ({ label: s.api_name, id: s.id }))}
    //                         renderInput={(params) => <TextField
    //                             // className='w-full'
    //                             placeholder="Type to search APIs..."
    //                             sx={{
    //                                 '& .MuiOutlinedInput-root': {
    //                                     height: '28px', // Set height
    //                                     borderRadius: '0.375rem', // Tailwind rounded-md equivalent
    //                                     // paddingX: 1.5,
    //                                     paddingY: '0.6rem',
    //                                     fontSize: '0.875rem',
    //                                     color: '#ffffff',
    //                                     '& fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-500
    //                                     },
    //                                     '&:hover fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-600 on hover
    //                                     },
    //                                     '&.Mui-focused fieldset': {
    //                                         borderColor: '#374151', // Tailwind blue-700 on focus
    //                                     },
    //                                 },
    //                             }}
    //                             {...params}

    //                         />}
    //                     />
    //                     {
    //                         selectedDependeAPi.length > 0 &&
    //                         selectedDependeAPi.map(selected => {
    //                             if (selected.id === item.id) {
    //                                 return (
    //                                     <div className="selected-apis mt-2 flex flex-wrap gap-1">
    //                                         <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-xs flex items-center">
    //                                             {selected.label}
    //                                             <button className="ml-1 text-white hover:text-gray-300"
    //                                                 // onclick="removeSelectedApi(this)" 
    //                                                 data-value="api_002">
    //                                                 <i className="fa fa-times" aria-hidden="true"></i>
    //                                             </button>
    //                                         </span>
    //                                     </div>
    //                                 )
    //                             }
    //                         })

    //                     }

    //                 </div>
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="flex space-x-2">
    //                     <label className="flex items-center">
    //                         <input type="checkbox"
    //                             // checked={item.additional_actions.return_value}
    //                             onChange={(e) => handleAditionalActions(e, 'return', item.id)}
    //                             className="w-4 h-4 text-[#3B82F6] cursor-pointer bg-transparent border-[#374151] rounded"
    //                         />
    //                         <span className="ml-2 text-sm text-gray-300">Return Values</span>
    //                     </label>
    //                     <label className="flex items-center">
    //                         <input type="checkbox"
    //                             // checked={item.additional_actions.compared_value}
    //                             onChange={(e) => handleAditionalActions(e, 'compare', item.id)}
    //                             className="compare-values-cb w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded" />
    //                         <span className="ml-2 text-sm text-gray-300">Compare Values</span>
    //                     </label>
    //                 </div>
    //             </td>
    //             <td className="px-6 py-4">
    //                 <div className="flex items-center space-x-2">
    //                     {/* {
    //                         item.missing_schema === 'completed' ?
    //                             <div className='flex items-center gap-1'>
    //                                 <CheckCircleIcon className='text-sm text-green-400 ' />
    //                                 <div className="text-sm text-green-400 capitalize">

    //                     {item.missing_schema}
    //                 </div>
    //             </div>
    //             :
    //             <div className='flex items-center gap-1'>
    //                 <div className="text-sm text-red-400">{item.missing_schema}</div>
    //                 <button className="add-schema-btn text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema"
    //                     onClick={() => handleSchema(item.id)}
    //                 >

    //                     <AddCircleIcon className='text-sm' />
    //                 </button>
    //             </div>
    //                     } */}

    //                     <div className="flex items-center space-x-2">
    //                         <span className="text-sm text-red-400">400, 500</span>
    //                         <button className="add-schema-btn cursor-pointer text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema">
    //                             <i className="fa-solid fa-plus-circle"></i>
    //                         </button>
    //                     </div>
    //                     <div className="flex items-center space-x-2">
    //                         <span className="text-sm text-red-400">400, 500</span>
    //                         <button className="add-schema-btn cursor-pointer text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema">
    //                             <i className="fa-solid fa-plus-circle"></i>
    //                         </button>
    //                     </div>

    //                 </div>
    //             </td >
    //         </tr >
    //     )
    // }
    //                 </div>
    //             </td >
    //         </tr >
    //     )
    // }

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
                            />
                        ))
                    }
                    {/* <tr className="hover:bg-[#0F0F23]/50">
                    <td className="px-6 py-4">
                        <input type="checkbox" className="api-checkbox w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
                    </td>
                    <td className="px-6 py-4 text-sm text-[#FFFFFF]">API_002</td>
                    <td className="px-6 py-4 text-sm text-[#FFFFFF]">User Profile</td>
                    <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">GET</span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="relative">
                            <input type="text" className="dependent-api-input bg-[#0F0F23] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full" placeholder="Type to search APIs..."
                            // autocomplete="off"
                            />
                            <div className="dependent-api-suggestions hidden absolute top-full left-0 right-0 bg-[#1A1A2E] border border-[#374151] rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_001">User Authentication API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_003">Session Management API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_004">Payment Gateway API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_005">Notification Service API</div>
                            </div>
                            <div className="selected-apis mt-2 flex flex-wrap gap-1">
                                <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-xs flex items-center">
                                    User Authentication API
                                    <button className="ml-1 text-white hover:text-gray-300"
                                    // onclick="removeSelectedApi(this)"
                                    >
                                        <i className="fa-solid fa-times text-xs"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex space-x-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="return-values-cb w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" />
                                <span className="ml-2 text-sm text-gray-300">Return Values</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="compare-values-cb w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" />
                                <span className="ml-2 text-sm text-gray-300">Compare Values</span>
                            </label>
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="text-sm text-green-400">
                            <i className="fa-solid fa-check-circle"></i> Complete
                        </span>
                    </td>
                </tr> */}
                </tbody>
            </table>


            {
                isReturnValue &&
                <ReturnValueModal onClose={closeModal} />
            }
            {
                isCompareValue &&
                <CompareValuesModal onClose={closeModal} />
            }
            {
                isSchemaModal &&
                <AddSchemaModal onClose={closeModal} />
            }

            {
                isApiMapingModal &&
                <ApiMapingModal onClose={closeModal}
                    setApiMappingStatus={setApiMappingStatus}
                />
            }

        </>
    )
}

export default ApiListTable
