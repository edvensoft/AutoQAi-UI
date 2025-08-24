import { Portal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import {
    useEffect,
    useState
} from 'react';
import extractSchemaPaths from '@/utilities/extractSchemaNodes';
import axios from 'axios';
import { API_URL } from '@/config';
import { toast } from 'react-toastify';

interface ModalProps {
    onClose: (modal: string) => void
    setApiMappingStatus: React.Dispatch<React.SetStateAction<any>>,
    selectedEndpoint: object,
    apiMappingStatus: any,
    currentItems: any
}


const ApiMapingModal = ({ onClose, setApiMappingStatus, apiMappingStatus, currentItems }: ModalProps) => {
    console.log('apist', apiMappingStatus, currentItems)
    const [sourceApi, setSourceAPi] = useState(null)
    const [dependentApi, setDependentAPi] = useState(null)

    const [responseVar, setResponseVar] = useState([])
    const [requestParam, setRequestParam] = useState([])
    const [mappingSummary, setMappingSummary] = useState([])


    const sett_up_states = () => {
        if (apiMappingStatus.data) {
            let source = currentItems.find(item => item.id === apiMappingStatus.data.id)
            let depend = currentItems.find(item => item.id === apiMappingStatus.data.depId)
            setSourceAPi(source)
            setDependentAPi(depend)
            // const nodes = Object.keys(source.response_schema).length > 0 ? extractSchemaPaths(source.response_schema.properties) : []
            // const nodes = Object.keys(source.response_schema).length > 0 && source.response_schema.hasOwnProperty('properties') ? extractSchemaPaths(source.response_schema.properties.data) : []
            const nodes = Object.keys(source.response_schema).length > 0 && source.response_schema.hasOwnProperty('properties') ? extractSchemaPaths(source.response_schema) : []

            console.log(depend, 'depend')
            const params = depend.path_variables
            setResponseVar(nodes)
            setRequestParam(params)
        }
    }


    const handleSelectRequest = (e: React.ChangeEvent<HTMLSelectElement>, req) => {
        console.log('checkLogs', e.target.value, req)
        let update = {
            id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            req: req,
            res: e.target.value
        }
        setMappingSummary((prev) => [...prev, update])
    }

    const onDeleteSummary = (id) => {
        let filterData = mappingSummary.filter(item => item.id !== id)
        setMappingSummary(filterData)
    }

    const handleSave = () => {
        if (mappingSummary.length === 0) {
            toast.warning('No Mapping Summary')
            return;
        }
        let update = mappingSummary.map(item => {
            return {
                "source_variable": item.res, "target_variable": item.req
            }
        })
        // console.log('update', update)
        let payload = {
            "api_endpoint": sourceApi.id,
            "dependent_api": dependentApi.id,
            // "mappings": [
            //     { "source_variable": "user.id", "target_variable": "userId" },
            //     { "source_variable": "token", "target_variable": "authToken" }
            // ]
            "mappings": [...update]
        }
        axios.post(`${API_URL}/v1/api/projects/dependency-mappings/`, payload).then(
            res => {
                if (res.status === 200) {
                    toast.success('Saved Successfully!')
                    onClose('api_map')
                }
            }
        ).catch((e)=>{
            toast.error(`Error: ${e.response.data.error}`)
        })

        // setApiMappingStatus((prev) => ({ ...prev, status: true }))
    }

    useEffect(() => {
        sett_up_states()
    }, [])

    return (
        <Portal>
            <div id="api-mapping-modal" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-[#1A1A2E] rounded-lg p-6 w-full max-w-4xl mx-4 border border-[#374151]  ">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-[#FFFFFF]">Variable Mapping</h3>
                        <button className=" cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => onClose('api_map')}
                        >
                            {/* <i className="fa-solid fa-times"></i> */}
                            <CloseIcon />

                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="text-lg font-medium text-[#FFFFFF] mb-4">
                                Source API:
                                <span id="source-api-name" className="text-[#3B82F6]">{sourceApi?.api_name}</span>
                            </h4>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-2">
                                <label className="block text-sm font-medium text-[#FFFFFF] mb-2">
                                    Response Variables
                                </label>

                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar p-2">
                                    {
                                        responseVar.length > 0 ?
                                            responseVar.map(item => (
                                                <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                                    <span className="text-sm text-gray-300">{item.path}</span>
                                                    <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">{item.type}</span>
                                                </div>
                                            ))
                                            :
                                            <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                                <p className='text-red-500'>No Response Variables</p>
                                            </div>
                                    }


                                    {/* <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                        <span className="text-sm text-gray-300">user.name</span>
                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                    </div>
                                    <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                        <span className="text-sm text-gray-300">token</span>
                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                    </div>
                                    <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                        <span className="text-sm text-gray-300">expires</span>
                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">datetime</span>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-[#FFFFFF] mb-4">
                                Dependent API:
                                <span id="dependent-api-name" className="text-[#8B5CF6]">
                                    {dependentApi?.api_name}
                                </span>
                            </h4>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-2">
                                <label className="block text-sm font-medium text-[#FFFFFF] mb-2">
                                    Request Parameters
                                </label>
                                <div className="space-y-3 max-h-40 overflow-y-auto p-2">

                                    {
                                        requestParam.length > 0 && responseVar.length > 0 ?
                                            requestParam.map(item => (
                                                <div className=" flex items-center space-x-3">
                                                    <div className="flex-1">
                                                        <input type="text"
                                                            // value="userId"
                                                            value={item.title}
                                                            readOnly={true}
                                                            className="w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-gray-300"
                                                        />
                                                    </div>
                                                    <i className="fa-solid fa-arrow-left text-[#3B82F6]"></i>
                                                    <div className="flex-1">
                                                        <select
                                                            className=" w-full bg-[#1A1A2E] border custom-scrollbar border-[#374151] rounded px-3 py-2 text-sm text-[#FFFFFF]"
                                                            onChange={(e) => handleSelectRequest(e, item.title)}
                                                        >
                                                            <option value="">Select source variable</option>
                                                            {
                                                                responseVar.map((item, index) => (
                                                                    <option value={item.path} key={index}>{item.path}</option>
                                                                ))
                                                            }
                                                            {/* <option value="user.id">user.id</option>
                                                            <option value="user.name">user.name</option>
                                                            <option value="token">token</option>
                                                            <option value="expires">expires</option> */}
                                                        </select>
                                                    </div>
                                                </div>

                                            ))

                                            : <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                                <p className='text-red-500'>No Request Parameters</p>
                                            </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#374151] pt-4">
                        <h5 className="text-md font-medium text-[#FFFFFF] mb-3">
                            Mapping Summary
                        </h5>
                        {
                            mappingSummary.length > 0 &&
                            mappingSummary.map((item, index) => (
                                <div id="mapping-summary" className="space-y-2 mb-4"
                                    key={index}
                                >
                                    <div
                                        className="mapping-summary-item  flex items-center justify-between p-2 bg-[#0F0F23] rounded border text-sm"
                                    >

                                        <span className="text-gray-300">
                                            <span className="dependent-param">
                                                {item.req}
                                            </span>
                                            ←
                                            <span className="source-var text-[#3B82F6]">
                                                {item.res}
                                            </span>
                                        </span>

                                        <button className="cursor-pointer text-red-400 hover:text-red-300"
                                            onClick={() => onDeleteSummary(item.id)}
                                        >
                                            <i className="fa-solid fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            className=" cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                            onClick={() => {
                                setApiMappingStatus((prev) => ({ ...prev, status: false }))
                                onClose('api_map')
                            }}

                        >Cancel</button>
                        <button id="save-mapping"
                            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors"
                            // onClick={() => setApiMappingStatus((prev) => ({ ...prev, status: true }))}
                            onClick={handleSave}
                        >Save Mapping</button>
                    </div>
                </div>
            </div>
        </Portal >
    )
}

export default ApiMapingModal
