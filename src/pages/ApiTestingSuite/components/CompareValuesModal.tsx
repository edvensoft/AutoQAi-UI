import { API_URL } from '@/config';
import extractSchemaPaths from '@/utilities/extractSchemaNodes';
import CloseIcon from '@mui/icons-material/Close';
import { Portal } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';




interface ModalProps {
    onClose: (modal: string) => void
    selectedEndpoint: any
}

const CompareValuesModal = ({ onClose, selectedEndpoint }: ModalProps) => {

    const [selectedParam, setselectedParam] = useState(null)
    const [selectedNode, setselectedNode] = useState(null)
    const [selectedPair, setSelectedPair] = useState([])

    const nodes = Object.keys(selectedEndpoint.response_schema).length > 0 ? extractSchemaPaths(selectedEndpoint.response_schema.properties.data) : []
    // console.log(nodes, 'noses', selectedEndpoint);

    console.log('sele', selectedEndpoint, nodes, selectedPair)

    const handleSelectParam = (val) => {
        if (selectedNode) {
            let obj = {
                param: val,
                node: selectedNode
            }
            setSelectedPair((prev) => [...prev, obj])
            setselectedNode(null)
            setselectedParam(null)
        } else if (!selectedParam) {
            setselectedParam(val)
        } else {
            setselectedParam(null)
        }
    }

    const handleSelectNode = (val) => {
        if (selectedParam) {
            let obj = {
                param: selectedParam,
                node: val
            }
            setSelectedPair((prev) => [...prev, obj])
            setselectedNode(null)
            setselectedParam(null)
        } else if (!selectedNode) {
            setselectedNode(val)
        } else {
            setselectedNode(null)
        }
    }

    const SaveChanges = () => {
        if (selectedPair.length > 0) {
            let updateSelected = selectedPair.map((item) => {
                return { input: item.param.title, output: item.node.path }

            })
            // console.log('updaat', updateSelected)
            const payload = {
                "api_endpoint_id": selectedEndpoint.id,
                // "comparisons": [
                //     { "input": "username", "output": "user.name" },
                //     { "input": "email", "output": "user.email" },
                //     { "input": "userId", "output": "user.id" }
                // ]
                "comparisons": [...updateSelected]
            }
            console.log('payloa',payload)
            axios.post(`${API_URL}//v1/api/projects/save-comparison-value/`,payload).then(
                resp=>{
                    console.log('resp',resp)
                    if(resp.status ===200){
                        toast.success('Saved Successfully!')
                    }
                }
            ).catch(()=>{
                toast.error("Error Please try again")
            })
        } else {
            toast.warning('No Comparison matches')
        }
    }

    const clearAll = () => {
        setSelectedPair([])
    }

    useEffect(() => {

    }, [])

    return (
        <Portal >
            <div id="compare-values-modal"
                className=" fixed inset-0 bg-black/50 flex items-center justify-center overflow-auto z-50"
            // className='fixed inset-0 bg-black/50 z-50 overflow-y-auto'

            >
                <div className="bg-[#1A1A2E]  rounded-lg p-3 w-full max-w-5xl mx-auto my-auto border border-[#374151]  ">
                    <div className=' sticky top-0 z-50 bg-[#1A1A2E] '>
                        <div className="flex justify-between py-4 items-center mb-2">
                            <h3 className="text-xl font-semibold text-[#FFFFFF]">Configure Parameter Comparison</h3>
                            <button className=" text-gray-400 hover:text-white cursor-pointer"
                                onClick={() => onClose('compare')}

                            >
                                {/* <i className="fa-solid fa-times"></i> */}
                                <CloseIcon />

                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Input Parameters</label>
                            {/* API Integration  */}
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4 h-60 max-h-60 overflow-y-auto">
                                <div className="space-y-2">
                                    {

                                        selectedEndpoint.path_variables.length > 0 ?
                                            selectedEndpoint.path_variables.map((item) => (
                                                <div
                                                    className={`${selectedParam && selectedParam?.path === item.path ? 'border-[#3B82F6]' : ''} p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20`}
                                                    key={item.title}
                                                    data-type="string"
                                                    onClick={() => handleSelectParam(item)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-300">{item.title}</span>
                                                        <span
                                                            className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                            : <div className='flex justify-center items-center'>
                                                <p className='text-red-500'>Sorry No paramateres</p>
                                            </div>

                                    }
                                </div>
                            </div>
                            {/* API Integration ends */}

                            {/* <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4 max-h-60 overflow-y-auto">
                                <div className="space-y-2">
                                    <div
                                        className={`${selectedParam ? 'border-[#3B82F6]' : ''} p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20`}
                                        data-param="username"
                                        data-type="string"
                                        onClick={() => handleSelectParam('username')}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">username</span>
                                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="input-param-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-param="email" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">email</span>
                                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>

                                </div>
                            </div> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Response Nodes</label>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4 max-h-60 overflow-y-auto">
                                <div className="space-y-2">
                                    {
                                        nodes.length > 0 ?
                                            nodes.map(item => (
                                                <div
                                                    className={`${selectedNode && selectedNode?.path === item.path ? 'border-[#3B82F6]' : ''} p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20`}

                                                    onClick={() => handleSelectNode(item)}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-300 font-mono">{item.path}</span>
                                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                            :
                                            <div className='flex justify-center items-center'>
                                                <p className='text-red-500'>No Response Nodes</p>
                                            </div>
                                    }


                                    {/* <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="user.name" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">user.name</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div> */}

                                    {/* <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="user.email" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">user.email</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="status" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">status</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="timestamp" data-type="datetime">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">timestamp</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">datetime</span>
                                        </div>
                                    </div>
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="sessionId" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">sessionId</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium text-[#FFFFFF]">Parameter Comparison Matches</label>
                            {
                                selectedPair.length > 0 &&
                                <button id="clear-all-matches"
                                    className="text-red-400 hover:text-red-300 text-sm"
                                    onClick={clearAll}
                                >
                                    <i className="fa-solid fa-trash mr-1"></i>Clear All
                                </button>
                            }

                        </div>
                        {
                            selectedPair.length > 0 ?
                                <div id="comparison-matches"
                                    className="space-y-3 mb-4 min-h-[100px] bg-[#0F0F23] border border-[#374151] rounded-lg p-4"
                                >
                                    {
                                        selectedPair.map(item => (
                                            <div className="comparison-match-item flex items-center justify-between p-3 bg-[#1A1A2E] rounded-lg border border-[#374151]">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="px-2 py-1 bg-[#8B5CF6]/20 text-[#8B5CF6] rounded text-sm font-mono">
                                                            {item.param.title}</span>
                                                        <span className="text-xs text-gray-500">
                                                            {item.param.type}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <i className="text-[#3B82F6]" data-fa-i2svg=""><svg className="svg-inline--fa fa-arrows-left-right" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-left-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"></path></svg></i>
                                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">
                                                            {item.node.path}
                                                        </span>
                                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">
                                                            {item.node.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>
                                :
                                <div id="comparison-matches" className="space-y-3 mb-4 min-h-[100px] bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                                    <div className="text-center text-gray-400 py-8" id="no-matches-message">
                                        <i className="fa-solid fa-info-circle mb-2"></i>
                                        <p className="text-sm">Click on input parameters and response nodes to create comparison matches</p>
                                        <p className="text-xs text-gray-500 mt-1">You can create multiple matches for comprehensive validation</p>
                                    </div>
                                </div>
                        }



                        <div className="bg-[#1A1A2E] border border-[#374151] rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h5 className="text-sm font-medium text-[#FFFFFF]">How to create matches:</h5>
                                <span className="text-xs text-gray-400">Step by step</span>
                            </div>
                            <div className="space-y-2 text-xs text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <span className="w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-xs flex items-center justify-center">1</span>
                                    <span>Select an input parameter from the left panel</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-4 h-4 rounded-full bg-[#3B82F6] text-white text-xs flex items-center justify-center">2</span>
                                    <span>Select a response node from the right panel</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="w-4 h-4 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">3</span>
                                    <span>The match will appear in the comparison area above</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#374151] pt-2">
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                                <span id="match-count">0</span> comparison matches configured
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-2 rounded-lg transition-colors"
                                    onClick={() => onClose('compare')}
                                >Cancel</button>
                                <button id="save-compare-values"
                                    className="bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB] text-white px-3 py-2 rounded-lg transition-colors"
                                    onClick={SaveChanges}
                                >
                                    Save Comparisons
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal >
    )
}

export default CompareValuesModal
