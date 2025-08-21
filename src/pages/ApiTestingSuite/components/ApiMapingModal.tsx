import { Portal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    onClose: (modal: string) => void
    setApiMappingStatus: React.Dispatch<React.SetStateAction<any>>,
    selectedEndpoint:object
}


const ApiMapingModal = ({ onClose, setApiMappingStatus,selectedEndpoint }: ModalProps) => {
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
                            <h4 className="text-lg font-medium text-[#FFFFFF] mb-4">Source API: <span id="source-api-name" className="text-[#3B82F6]">User Authentication</span></h4>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                                <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Response Variables</label>
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
                                        <span className="text-sm text-gray-300">user.id</span>
                                        <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                    </div>
                                    <div className="source-variable flex items-center justify-between p-2 bg-[#1A1A2E] rounded border">
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-medium text-[#FFFFFF] mb-4">Dependent API: <span id="dependent-api-name" className="text-[#8B5CF6]">User Profile API</span></h4>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                                <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Request Parameters</label>
                                <div className="space-y-3 max-h-40 overflow-y-auto">
                                    <div className=" flex items-center space-x-3">
                                        <div className="flex-1">
                                            <input type="text" value="userId" className="w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-gray-300" />
                                        </div>
                                        <i className="fa-solid fa-arrow-left text-[#3B82F6]"></i>
                                        <div className="flex-1">
                                            <select className=" w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-[#FFFFFF]">
                                                <option value="">Select source variable</option>
                                                <option value="user.id">user.id</option>
                                                <option value="user.name">user.name</option>
                                                <option value="token">token</option>
                                                <option value="expires">expires</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className=" flex items-center space-x-3">
                                        <div className="flex-1">
                                            <input type="text" className="w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-gray-300" />
                                        </div>
                                        <i className="fa-solid fa-arrow-left text-[#3B82F6]"></i>
                                        <div className="flex-1">
                                            <select className=" w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-[#FFFFFF]">
                                                <option value="">Select source variable</option>
                                                <option value="user.id">user.id</option>
                                                <option value="user.name">user.name</option>
                                                <option value="token">token</option>
                                                <option value="expires">expires</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className=" flex items-center space-x-3">
                                        <div className="flex-1">
                                            <input type="text" className="w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-gray-300" />
                                        </div>
                                        <i className="fa-solid fa-arrow-left text-[#3B82F6]"></i>
                                        <div className="flex-1">
                                            <select className=" w-full bg-[#1A1A2E] border border-[#374151] rounded px-3 py-2 text-sm text-[#FFFFFF]">
                                                <option value="">Select source variable</option>
                                                <option value="user.id">user.id</option>
                                                <option value="user.name">user.name</option>
                                                <option value="token">token</option>
                                                <option value="expires">expires</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-[#374151] pt-4">
                        <h5 className="text-md font-medium text-[#FFFFFF] mb-3">Mapping Summary</h5>
                        <div id="mapping-summary" className="space-y-2 mb-4">
                            <div className="mapping-summary-item  flex items-center justify-between p-2 bg-[#0F0F23] rounded border text-sm">
                                <span className="text-gray-300"><span className="dependent-param"></span> ← <span className="source-var text-[#3B82F6]"></span></span>
                                <button className="remove-mapping text-red-400 hover:text-red-300">
                                    <i className="fa-solid fa-trash text-xs"></i>
                                </button>
                            </div>
                        </div>
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
                            onClick={() => setApiMappingStatus((prev) => ({ ...prev, status: true }))}
                        >Save Mapping</button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default ApiMapingModal
