import type { RootState } from '@/redux/store';
import { Portal } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateCollection from './CreateCollection';
import { setActiveCollection } from '@/redux/collectionsSlice';

interface Props {
    close: () => void;
}

const ExistingCollections = (props: Props) => {
    const { close } = props
    const [isCreateCollection, setIsCreateCollection] = useState(false)
    const dispatch = useDispatch();

    const openCreateCollection = () => {
        setIsCreateCollection(true)
        // close()
    }
    const closeCreateCollection = () => {
        setIsCreateCollection(false)
    }
    const collections = useSelector((state: RootState) => state.collections.list);
    const handleCollectionClick = (colId) => {
        dispatch(setActiveCollection(colId))
        close()
    }
    return (
        <Portal>
            <div id="view-testcases-modal"
                className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto'
            >
                <div id="chat-messages" className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="bg-[#1A1A2E] rounded-lg p-8 text-center max-w-lg">
                            <i className="fa-solid fa-folder-plus text-5xl text-[#3B82F6] mb-6"></i>
                            <h3 className="text-xl font-semibold text-[#FFFFFF] mb-4">Get Started with Test Cases
                            </h3>
                            <p className="text-gray-400 mb-6">To begin generating test cases, please select an existing
                                collection</p>

                            <div className="space-y-4">
                                <div className="bg-[#0F0F23] rounded-lg p-4 border border-[#374151]">
                                    <h4 className="text-lg font-semibold text-[#FFFFFF] mb-3">Select Existing
                                        Collection</h4>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {
                                            collections.map(col => (
                                                <div
                                                    className="existing-feature-item bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors text-left"
                                                    data-feature="login-feature"
                                                    key={col.id}
                                                    onClick={() => handleCollectionClick(col.id)}
                                                >
                                                    <span className="font-medium text-[#FFFFFF]">{col.name}</span>
                                                    <span className="text-sm text-gray-400 block">5 test cases</span>
                                                </div>
                                            ))
                                        }

                                        {/* <div className="existing-feature-item bg-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-600 transition-colors text-left"
                                            data-feature="payment-flow">
                                            <span className="font-medium text-[#FFFFFF]">Payment Flow</span>
                                            <span className="text-sm text-gray-400 block">8 test cases</span>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="text-gray-500 font-medium">OR</div>

                                <button id="create-new-feature-btn"
                                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                    onClick={openCreateCollection}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                    <span>Create New Collection</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isCreateCollection &&
                    <CreateCollection close={closeCreateCollection} />
                }
            </div>

        </Portal>
    )
}

export default ExistingCollections
