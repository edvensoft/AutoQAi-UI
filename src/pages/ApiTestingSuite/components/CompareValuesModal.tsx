import CloseIcon from '@mui/icons-material/Close';
import { Portal } from '@mui/material';


interface ModalProps {
    onClose: (modal: string) => void
}

const CompareValuesModal = ({ onClose }: ModalProps) => {
    return (
        <Portal >
            <div id="compare-values-modal"
                className=" fixed inset-0 bg-black/50 flex items-center justify-center overflow-auto z-50"
                // className='fixed inset-0 bg-black/50 z-50 overflow-y-auto'

            >
                <div className="bg-[#1A1A2E]  rounded-lg p-3 w-full max-w-5xl mx-auto my-auto border border-[#374151]  ">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-[#FFFFFF]">Configure Parameter Comparison</h3>
                        <button className=" text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => onClose('compare')}

                        >
                            {/* <i className="fa-solid fa-times"></i> */}
                            <CloseIcon />

                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
                        <div>
                            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Input Parameters</label>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4 max-h-60 overflow-y-auto">
                                <div className="space-y-2">
                                    <div className="input-param-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-param="username" data-type="string">
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
                                    <div className="input-param-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-param="userId" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">userId</span>
                                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="input-param-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-param="sessionToken" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">sessionToken</span>
                                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="input-param-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-param="timestamp" data-type="datetime">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300">timestamp</span>
                                            <span className="text-xs text-[#8B5CF6] bg-[#8B5CF6]/20 px-2 py-1 rounded">datetime</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Response Nodes</label>
                            <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4 max-h-60 overflow-y-auto">
                                <div className="space-y-2">
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="user.id" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">user.id</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="user.name" data-type="string">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-300 font-mono">user.name</span>
                                            <span className="text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                                        </div>
                                    </div>
                                    <div className="response-node-item p-2 bg-[#1A1A2E] rounded border cursor-pointer hover:bg-[#3B82F6]/20" data-node="user.email" data-type="string">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex justify-between items-center mb-4">
                            <label className="block text-sm font-medium text-[#FFFFFF]">Parameter Comparison Matches</label>
                            <button id="clear-all-matches" className="text-red-400 hover:text-red-300 text-sm">
                                <i className="fa-solid fa-trash mr-1"></i>Clear All
                            </button>
                        </div>

                        <div id="comparison-matches" className="space-y-3 mb-4 min-h-[100px] bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                            <div className="text-center text-gray-400 py-8" id="no-matches-message">
                                <i className="fa-solid fa-info-circle mb-2"></i>
                                <p className="text-sm">Click on input parameters and response nodes to create comparison matches</p>
                                <p className="text-xs text-gray-500 mt-1">You can create multiple matches for comprehensive validation</p>
                            </div>
                        </div>

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
                                <button id="save-compare-values" className="bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB] text-white px-3 py-2 rounded-lg transition-colors">Save Comparisons</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default CompareValuesModal
