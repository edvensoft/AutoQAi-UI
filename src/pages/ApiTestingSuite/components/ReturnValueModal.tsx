
import { API_URL } from '@/config';
import extractSchemaPaths from '@/utilities/extractSchemaNodes';

import { Editor } from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import { Portal } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';


interface ModalProps {
    onClose: (modal: string) => void,
    selectedEndpoint: any
}
;


// const dummyJson = {
//     "type": "object",
//     "required": ["status", "data"],
//     "properties": {
//         "status": {
//             "type": "object",
//             "required": ["code", "message"],
//             "properties": {
//                 "code": { "type": "integer" },
//                 "message": { "type": "string" }
//             }
//         },
//         "data": {
//             "type": "object",
//             "required": [
//                 "_id", "workspace_id", "linked_store_id", "store_name", "store_website",
//                 "country", "source_marketplace", "store_taxonomy", "product_sale_type",
//                 "channels", "languages", "active", "last_modified_time", "billing_tier"
//             ],
//             "properties": {
//                 "_id": { "type": "string" },
//                 "workspace_id": { "type": "string" },
//                 "linked_store_id": { "type": "string" },
//                 "store_name": { "type": "string" },
//                 "store_website": { "type": "string" },
//                 "country": {
//                     "type": "array",
//                     "items": { "type": "string" }
//                 },
//                 "source_marketplace": { "type": "string" },
//                 "store_taxonomy": { "type": "string" },
//                 "product_sale_type": {
//                     "type": "array",
//                     "items": { "type": "string" }
//                 },
//                 "channels": {
//                     "type": "object",
//                     "additionalProperties": { "type": "integer" }
//                 },
//                 "languages": {
//                     "type": "array",
//                     "items": { "type": "string" }
//                 },
//                 "active": { "type": "boolean" },
//                 "last_modified_time": { "type": "integer" },
//                 "billing_tier": { "type": "string" }
//             }
//         }
//     }
// }

// const dummyJson = {
//     "type": "object",
//     "properties": {
//         "id": {
//             "type": "integer",
//             "format": "int64"
//         },
//         "petId": {
//             "type": "integer",
//             "format": "int64"
//         },
//         "quantity": {
//             "type": "integer",
//             "format": "int32"
//         },
//         "shipDate": {
//             "type": "string",
//             "format": "date-time"
//         },
//         "status": {
//             "type": "string",
//             "description": "Order Status",
//             "enum": [
//                 "placed",
//                 "approved",
//                 "delivered"
//             ]
//         },
//         "complete": {
//             "type": "boolean"
//         }
//     },
//     "xml": {
//         "name": "Order"
//     }
// }


const ReturnValueModal = ({ onClose, selectedEndpoint }: ModalProps) => {

    const [selectedNodes, setSelectedNodes] = useState([])
    console.log('sele', selectedEndpoint)
    // const parsed = dummyJson;
    // const nodes = extractSchemaNodes(dummyJson);
    const nodes = Object.keys(selectedEndpoint.response_schema).length > 0 ? extractSchemaPaths(selectedEndpoint.response_schema.properties.data) : []
    console.log(nodes, 'noses', selectedEndpoint);

    const editorRef = useRef<any>(null);

    // function handleEditorDidMount(editor: any) {
    //     editorRef.current = editor;
    //     editorRef.current.getAction('editor.action.formatDocument').run();
    //     editor.getAction('editor.action.formatDocument').run();
    // }

    const handleSave = () => {
        const payload = {
            "api_endpoint_id": selectedEndpoint?.id,
            "return_value": [...selectedNodes]
        }
        axios.post(`${API_URL}/v1/api/projects/save-return-value/`, payload).then(
            res => {
                if (res.status === 201) {
                    toast.success("Saved Successfully")
                }
            }
        )
    }

    const handleSection = (path) => {
        if (selectedNodes.includes(path)) {
            let updateNodes = selectedNodes.filter(p => p !== path)
            setSelectedNodes(updateNodes)
        } else {
            setSelectedNodes((prev) => [...prev, path])

        }
    }

    // const formatJson = () => {
    //     if (editorRef.current) {
    //         editorRef.current.getAction('editor.action.formatDocument').run();
    //     }
    // };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    }, [editorRef])

    return (
        <Portal>
            <div id="return-values-modal"
                // className='flex items-center justify-center mt-4'
                className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto'

            // className="fixed inset-0 bg-black/50 h-full  flex items-center justify-center z-50"
            >
                <div className="bg-[#1A1A2E] my-auto rounded-lg p-6 w-full max-w-2xl  border border-[#374151]">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-[#FFFFFF]">Select Response Nodes to Retrieve</h3>
                        <button className=" text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => onClose('return')}
                        >
                            {/* <i className="fa-solid fa-times"></i> */}
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="mb-2 flex-1">
                        <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Response JSON Schema</label>
                        <div className="h-46 w-full overflow-auto overflow-y-auto">
                            {
                                nodes.length > 0 ?
                                    <Editor
                                        language="json"

                                        // value={JSON.stringify(dummyJson)}
                                        value={JSON.stringify(selectedEndpoint.response_schema.properties)}
                                        // defaultValue='{"ugly":true,"nested":{"thing":1}}'
                                        theme="vs-dark"
                                        options={{
                                            // automaticLayout: true,
                                            readOnly: true,
                                        }}
                                    // onMount={handleEditorDidMount}
                                    />
                                    : <div className='flex justify-center items-center'>
                                        <p className='text-red-500'>No JSON Schema</p>
                                    </div>
                            }

                        </div>
                        {/* <textarea className="w-full h-40 bg-[#0F0F23] border border-[#374151] rounded-lg p-3 text-[#FFFFFF] font-mono text-sm" >
                            {JSON.stringify(dummyJson)}
                        </textarea> */}
                    </div>
                    {
                        nodes.length > 0 ?
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Select Multiple Nodes to Return</label>
                                <div className="space-y-2 max-h-60 overflow-y-auto bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                                    {

                                        nodes.map(
                                            item => (
                                                <label key={item.id}
                                                    className="flex items-center hover:bg-[#1A1A2E] p-2 rounded"

                                                >
                                                    <input type="checkbox"
                                                        checked={selectedNodes.includes(item.path)}
                                                        className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="user.id"
                                                        onChange={() => handleSection(item.path)}
                                                    />
                                                    <span className="ml-3 text-sm text-gray-300 font-mono">{item.path}</span>
                                                    <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">{item.type}</span>
                                                </label>
                                            )
                                        )
                                    }


                                    {/* <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="user.name" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">user.name</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="user.email" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">user.email</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="user.profile.avatar" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">user.profile.avatar</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="token" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">token</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="expires" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">expires</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">datetime</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="status" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">status</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label> */}
                                </div>
                            </div>
                            : <></>
                    }

                    <div className="mb-2">
                        <div id="selected-return-nodes" className="flex flex-wrap gap-2">
                            {/* Selected nodes will appear here as tags  */}
                            {
                                selectedNodes.length > 0 && selectedNodes.map(selected =>
                                (
                                    <span className="bg-[#3B82F6] text-white px-2 py-1 rounded text-xs flex items-center">
                                        {selected}
                                        <button className="ml-1 text-white hover:text-gray-300 cursor-pointer"
                                            onClick={() => handleSection(selected)}
                                        >
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    </span>
                                )
                                )
                            }
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => onClose('return')}
                        >Cancel</button>
                        <button id="save-return-values"
                            onClick={handleSave}
                            className="bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Save Selection
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default ReturnValueModal
