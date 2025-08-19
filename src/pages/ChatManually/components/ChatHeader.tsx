import  { useState } from 'react'
import CreateCollection from './CreateCollection'

interface Props {
    // openCreateCollection: () => void;
    // closeCreateCollection: () => void,

}

const ChatHeader = (props: Props) => {
    const { } = props

    const [isCreateCollection, setIsCreateCollection] = useState(false)

    const openCreateCollection = () => {
        setIsCreateCollection(true)
    }
    const closeCreateCollection = () => {
        setIsCreateCollection(false)
    }

    return (
        <div id="chat-header"
            className="bg-[#1A1A2E] border-b border-[#374151] p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#FFFFFF]">Manual Test Cases</h1>
            <div className="flex items-center space-x-2">
                <span id="selected-feature-name" className="text-sm text-gray-400 hidden">Selected: </span>
                <button id="new-chat-btn"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    onClick={() => openCreateCollection()}
                >
                    <i className="fa-solid fa-plus"></i>
                    <span>Create New Collection</span>
                </button>
            </div>

            {
                isCreateCollection &&
                <CreateCollection close={closeCreateCollection} />
            }
        </div>
    )
}

export default ChatHeader
