import { Editor } from '@monaco-editor/react'
import { Portal } from '@mui/material'
import { useState } from 'react'



interface CodeData {
    code: string,
    file_name: string,
    id: number,
    status: string
}

interface ModalProps {
    onClose: () => void,
    // codeData:
    data: CodeData,
    language: string
}



const CodeEditorModal = ({ onClose, data, language }: ModalProps) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [editData, setEditData] = useState<any | null>(data.code)
    // const [currentData, setCurrentData] = useState<any | null>(data.code)

    console.log('inco', data, language)


    const onEdit = () => {
        setIsEditable(true)
    }

    const handleEditorChange = (value) => {
        // console.log('Editor content:', value);
        setEditData(value);
    };

    const handleCancelEdit = () => {
        setEditData(data.code)
        setIsEditable(false)
    }

  

    return (
        <Portal>
            <div id="code-editor-modal" className="fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="w-full h-full bg-[#0F0F23] flex flex-col">
                    <div className="bg-[#1A1A2E] border-b border-[#374151] p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-[#FFFFFF]">Code Editor</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">API:</span>
                                <span id="editor-api-name" className="text-sm text-[#3B82F6] font-medium">User Authentication</span>
                                <span className="text-sm text-gray-400">|</span>
                                <span id="editor-api-id" className="text-sm text-gray-300">{data.id}</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button id="copy-code-btn" className="bg-[#8B5CF6] cursor-pointer hover:bg-[#8B5CF6]/80 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fa-solid fa-copy mr-2"></i>Copy
                            </button>
                            {
                                isEditable ? <>
                                    <button id="save-code-btn" className=" bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        <i className="fa-solid fa-save mr-2"></i>Save
                                    </button>
                                    <button id="cancel-edit-btn"
                                        className=" bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
                                        // onClick={() => setIsEditable(false)}
                                        onClick={handleCancelEdit}
                                    >
                                        <i className="fa-solid fa-times mr-2"></i>Cancel
                                    </button>
                                </>
                                    : <button id="edit-code-btn"
                                        className="bg-[#3B82F6] hover:bg-[#2563EB] cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={onEdit}
                                    >
                                        <i className="fa-solid fa-edit mr-2"></i>Edit
                                    </button>
                            }



                            <button id="close-editor-btn"
                                className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-lg transition-colors"
                                onClick={() => onClose()}
                            >
                                <i className="fa-solid fa-times mr-2"></i>Close
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="bg-[#1A1A2E] border-b border-[#374151] px-4 py-2">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <i className="fa-solid fa-file-code text-[#3B82F6]"></i>
                                    <span className="text-sm text-[#FFFFFF]">{data.file_name}</span>
                                </div>
                                <div id="file-status"
                                    className={`text-xs ${isEditable ? "text-yellow-400" : "text-gray-400"} `}
                                >
                                    {
                                        isEditable ? "Editing" : "Read Only"
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="absolute inset-0 flex">
                                <div className="flex-1">
                                    <Editor
                                        // language="java"
                                        // language="plaintext"
                                        // value={editData}
                                        language={language}
                                        value={editData}
                                        options={{ readOnly: !isEditable }}
                                        onChange={handleEditorChange}
                                        // defaultLanguage='properties'
                                        // defaultValue={propertiesContent}
                                        theme="vs-dark"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default CodeEditorModal
