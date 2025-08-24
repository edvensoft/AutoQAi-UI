import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

interface Data {
    api_header: string,
    api_method: string,
    api_name: string,
    api_url: string,
    custom_instruction: string,
    description: string | null,
    id: number,
    missing_schema_status_codes: Array<any>,
    is_selected: boolean,
    operation_id: string,
    project_id: string,
    request_body: string,
}

interface TableRowProps {
    item: Data| any,
    selectedApis: any[],
    handleSelection: (e: any, apiId: number) => void,
    currentItems: Data[] | any,
    handleAditionalActions: (e: React.ChangeEvent<HTMLInputElement>, action: string, id: number, item: object) => void,
    setIsApiMapingModal: React.Dispatch<React.SetStateAction<boolean>>,
    apiMappingStatus: boolean | any,
    setApiMappingStatus: React.Dispatch<React.SetStateAction<any>>,
    isApiMapingModal: boolean
    // inputValue:string,
    // setInputValue:React.Dispatch<React.SetStateAction<any>>
}

const ApiListTableRow = (props: TableRowProps) => {
    const { item, selectedApis, handleSelection, setApiMappingStatus,
        isApiMapingModal, currentItems, apiMappingStatus, handleAditionalActions, setIsApiMapingModal } = props
    const [inputValue, setInputValue] = React.useState<{ label: string; id: number } | null>(null);
    const [selectedDependeAPi, setSelectedDependeAPi] = useState([])

    const handleDependentApi = (val, item) => {
        console.log('value', val, item.id)
        let selected = { label: val.label, id: item.id, depId: val.id }
        setInputValue(val ? { label: val.label, id: val.id } : null)

        setApiMappingStatus((prev) => ({ ...prev, data: selected }))
        // setSelectedDependeAPi((prev) => {
        //     let updated = prev.filter(s => s.depId !== selected.depId)
        //     console.log('upd', updated)
        //     return [...updated, selected]
        // })
        setIsApiMapingModal(true)
        // setInputValue(val)
        // setInputValue('')
    }



    useEffect(() => {
        if (apiMappingStatus.status) {
            setSelectedDependeAPi((prev) => {
                let updated = prev.filter(s => s.depId !== apiMappingStatus.data.depId)
                // console.log('upd', updated)
                return [...updated, apiMappingStatus.data]
            })
        }
        if (isApiMapingModal) {
            setInputValue(null)
        }
        // setInputValue('')

    }, [apiMappingStatus])

    const handleRemoveDependt = (depId) => {

        setSelectedDependeAPi((prev) => {
            let updated = prev.filter(f => f.depId !== depId)
            console.log('rr', updated, depId)
            return [...updated]
        })
    }

    return (
        <tr className="hover:bg-[#0F0F23]/50" key={item?.id}>
            <td className="px-6 py-4">
                <input type="checkbox"
                    checked={selectedApis.includes(item.id)}
                    onChange={(e) => handleSelection(e, item.id)}
                    className="api-checkbox w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded focus:ring-[#3B82F6]" />
            </td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF]">{item?.id}</td>
            <td 
            title={item?.api_name}
            className="px-6 py-4 text-sm w-36 truncate whitespace-nowrap overflow-hidden max-w-xs text-[#FFFFFF]">
                {item?.api_name}
            </td>
            <td className="px-6 py-4">
                {
                    item.api_method === 'Get' ?
                        <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">{item.api_method}</span>
                        :
                        <span className="px-2 py-1 text-xs font-medium bg-green-600 text-white rounded">{item.api_method}</span>

                }
            </td>
            <td className="px-6 py-4">
                <div className="relative">
                    {/* <input type="text" 
                            className="dependent-api-input bg-[#0F0F23] border border-[#374151] rounded-lg px-3 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full"
                             placeholder="Type to search APIs..."
                            // autocomplete="off" 
                            />
                            <div className="dependent-api-suggestions hidden absolute top-full left-0 right-0 bg-[#1A1A2E] border border-[#374151] rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_002">User Profile API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_003">Session Management API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_004">Payment Gateway API</div>
                                <div className="suggestion-item px-3 py-2 text-sm text-gray-300 hover:bg-[#3B82F6] hover:text-white cursor-pointer" data-value="api_005">Notification Service API</div>
                            </div>
                            <div className="selected-apis mt-2 flex flex-wrap gap-1">
    
                            </div> */}

                    <Autocomplete
                        // id="free-solo-demo"
                        // id='Type to search APIs...'

                        // inputValue={inputValue}
                        // defaultValue={''}
                        // onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
                        value={inputValue}
                        onChange={(_event, value: any) => handleDependentApi(value, item)}
                        options={currentItems.filter(i => i.id !== item.id).map(s => ({ label: s.api_name, id: s.id }))}
                        renderInput={(params) => <TextField
                            // className='w-full'
                            placeholder="Type to search APIs..."
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '28px', // Set height
                                    borderRadius: '0.375rem', // Tailwind rounded-md equivalent
                                    // paddingX: 1.5,
                                    paddingY: '0.6rem',
                                    fontSize: '0.875rem',
                                    color: '#ffffff',
                                    '& fieldset': {
                                        borderColor: '#374151', // Tailwind blue-500
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#374151', // Tailwind blue-600 on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#374151', // Tailwind blue-700 on focus
                                    },
                                },
                            }}
                            {...params}

                        />}
                    />
                    {
                        selectedDependeAPi.length > 0 &&
                        selectedDependeAPi.map(selected => {
                            if (selected.id === item.id) {
                                return (
                                    <div className="selected-apis mt-2 flex flex-wrap gap-1">
                                        <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-xs flex items-center">
                                            {selected.label}
                                            <button className="ml-1 cursor-pointer text-white hover:text-gray-300"

                                                onClick={() => handleRemoveDependt(selected.depId)}
                                                data-value="api_002">
                                                <i className="fa fa-times" aria-hidden="true"></i>
                                            </button>
                                        </span>
                                    </div>
                                )
                            }
                        })

                    }

                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex space-x-2">
                    <label className="flex items-center">
                        <input type="checkbox"
                            // checked={item.additional_actions.return_value}
                            onChange={(e) => handleAditionalActions(e, 'return', item.id, item)}
                            className="w-4 h-4 text-[#3B82F6] cursor-pointer bg-transparent border-[#374151] rounded"
                        />
                        <span className="ml-2 text-sm text-gray-300">Return Values</span>
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox"
                            // checked={item.additional_actions.compared_value}
                            onChange={(e) => handleAditionalActions(e, 'compare', item.id, item)}
                            className="compare-values-cb w-4 h-4 cursor-pointer text-[#3B82F6] bg-transparent border-[#374151] rounded" />
                        <span className="ml-2 text-sm text-gray-300">Compare Values</span>
                    </label>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    {
                        item.missing_schema_status_codes.length > 0 ?
                            item.missing_schema_status_codes.map((missing, index) => (
                                <div className='flex items-center gap-1'
                                    key={index}
                                >
                                    <div className="text-sm text-red-400">
                                        {missing}
                                        {index !== item.missing_schema_status_codes.length-1 && ','}
                                    </div>
                                    {/* <button className="add-schema-btn cursor-pointer text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema"
                                    // onClick={() => handleSchema(item.id)}
                                    >
                                        <i className="fa-solid fa-plus-circle"></i>
                                    </button> */}
                                    {/* <button className="add-schema-btn text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema"
                            onClick={() => handleSchema(item.id)}
                        >
                           
                            <AddCircleIcon className='text-sm' />
                        </button> */}
                                </div>
                            )) : <span className="text-sm text-green-400">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                                Complete
                            </span>


                    }

                    {/* <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-400">400, 500</span>
                        {/* <button className="add-schema-btn cursor-pointer text-[#3B82F6] hover:text-[#2563EB]" title="Add JSON Schema">
                            <i className="fa-solid fa-plus-circle"></i>
                        </button> 
                    </div> */}

                </div>
            </td >
        </tr >
    )
}

export default ApiListTableRow
