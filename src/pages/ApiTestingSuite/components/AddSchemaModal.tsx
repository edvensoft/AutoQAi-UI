import { Portal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
    onClose: (modal: string) => void
}

const AddSchemaModal = ({ onClose }: ModalProps) => {
    return (
        <Portal>
            <div id="add-schema-modal" className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#1A1A2E] rounded-lg p-6 w-full max-w-4xl mx-4 border border-[#374151]  overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-[#FFFFFF]">Add JSON Schema for Missing Status Codes</h3>
                        <button className=" text-gray-400 hover:text-white cursor-pointer"
                            onClick={() => onClose('schema')}
                        >
                            {/* <i className="fa-solid fa-times"></i> */}
                            <CloseIcon />

                        </button>
                    </div>

                    <div className="mb-6">
                        <div className="bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                            <h4 className="text-md font-medium text-[#FFFFFF] mb-3">Missing Status Codes</h4>
                            <div id="status-codes-list" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Status code schema inputs will be populated here  */}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                            Add JSON schemas for all missing status codes to complete API configuration
                        </div>
                        <div className="flex space-x-3">
                            <button
                                className=" cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                                onClick={() => onClose('schema')}

                            >Cancel</button>
                            <button id="save-all-schemas" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors">Save All Schemas</button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default AddSchemaModal
