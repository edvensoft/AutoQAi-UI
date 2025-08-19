
import extractSchemaNodes from '@/utilities/extractSchemaNodes';
import CloseIcon from '@mui/icons-material/Close';
import { Portal } from '@mui/material';


interface ModalProps {
    onClose: (modal: string) => void,
}
type JSONSchema = {
  type?: string;
  properties?: {
    [key: string]: JSONSchema;
  };
  items?: JSONSchema;
  // Add more fields if needed
};

const dummyJson={
    "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "profile": {
      "avatar": "string",
      "preferences": {}
    }
  },
  "token": "string",
  "expires": "datetime",
  "status": "string"

}

const ReturnValueModal = ({ onClose }: ModalProps) => {
    const exampleSchema: JSONSchema = {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number' },
            address: {
                type: 'object',
                properties: {
                    street: { type: 'string' },
                    city: { type: 'string' }
                }
            },
            tags: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    };



    const nodes = extractSchemaNodes(exampleSchema);
    console.log(nodes,'noses');
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

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Response JSON Schema</label>
                        <textarea className="w-full h-40 bg-[#0F0F23] border border-[#374151] rounded-lg p-3 text-[#FFFFFF] font-mono text-sm" >

                        </textarea>
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-[#FFFFFF] mb-2">Select Multiple Nodes to Return</label>
                        <div className="space-y-2 max-h-60 overflow-y-auto bg-[#0F0F23] border border-[#374151] rounded-lg p-4">
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
                                <input type="checkbox" className=" w-4 h-4 text-[#3B82F6] bg-transparent border-[#374151] rounded" data-node="user.id" />
                                <span className="ml-3 text-sm text-gray-300 font-mono">user.id</span>
                                <span className="ml-auto text-xs text-[#3B82F6] bg-[#3B82F6]/20 px-2 py-1 rounded">string</span>
                            </label>
                            <label className="flex items-center hover:bg-[#1A1A2E] p-2 rounded">
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
                            </label>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div id="selected-return-nodes" className="flex flex-wrap gap-2">
                            {/* Selected nodes will appear here as tags  */}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => onClose('return')}
                        >Cancel</button>
                        <button id="save-return-values" className="bg-[#3B82F6] cursor-pointer hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors">Save Selection</button>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default ReturnValueModal
