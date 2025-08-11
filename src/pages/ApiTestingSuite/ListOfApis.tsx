import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApiListTable from './components/ApiListTable';
import CustomeCodeIcon from '@/assets/customeIcons/CustomeCodeIcon';

const ListOfApis = () => {



    return (
        <div id="api-list-content" className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">API List</h1>
                <p className="text-gray-400">Manage and configure your API endpoints for testing</p>
            </div>

            <div className="bg-[#1A1A2E] rounded-lg border border-[#374151] overflow-hidden">
                <div className="p-6 border-b border-[#374151]">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#FFFFFF]">API Endpoints</h2>
                        <button id="generate-code-btn" className="bg-[#3B82F6] flex gap-2 items-center hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors">
                            {/* <i className="fa fa-code text-white" aria-hidden="true"></i> */}
                            <CustomeCodeIcon width={18} height={18} fill='#ffffff' />
                            <span>
                                Generate Code
                            </span>
                            
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <ApiListTable />
                </div>
            </div>
        </div>
    )
}

export default ListOfApis
