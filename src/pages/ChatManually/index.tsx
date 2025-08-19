import  { useEffect, useState } from 'react'
import CollectionsSidebar from './components/CollectionsSidebar'
// import ChatLayout from './components/ChatSection'
import ChatPrompt from './components/ChatPrompt'
import ChatHeader from './components/ChatHeader'
import ChatSection from './components/ChatSection'
// import CreateCollection from './components/CreateCollection'
import axios from 'axios'
import { API_URL } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { setChats, setCollections } from '@/redux/collectionsSlice'
import ExistingCollections from './components/ExistingCollections'


const ChatManually = () => {
    const projectId = useSelector((state: RootState) => state.appState.project_id);
    // const collections = useSelector((state: RootState) => state.collections.list);
    const [isExistColModalOpen, setIsExistColModalOpen] = useState(false)

    const dispatch = useDispatch();

    const closeExistColModal = () => {
        setIsExistColModalOpen(false)
    }

    const getCollections = () => {
        axios.get(`${API_URL}/v1/api/test-cases/get-collections/${projectId}/`).then(
            response => {
                if (response.status === 200) {
                // console.log('Fetched Data', response.data)
                   
                    dispatch(setCollections(response.data.response))
                    if (response.data.response.length > 0) {
                        setIsExistColModalOpen(true)
                        
                    }else{
                        dispatch(setChats([]))
                    }
                }
            }
        ).catch(
            e=>{
                dispatch(setChats([]))
            }
        )
    }

    useEffect(() => {
        // if (collections.length > 0) {
        // }
        getCollections()

        return (() => {
            // setIsExistColModalOpen(false)
        })
    }, [])

    return (
        <div className='flex flex-row w-full h-full '>
            <div className='flex flex-col w-[70%]'>
                <ChatHeader
                />
                <ChatSection
                />
                <ChatPrompt />
            </div>
            <div className='w-[30%]'>
                <CollectionsSidebar />
            </div>
            {
                isExistColModalOpen &&
                <ExistingCollections
                    close={closeExistColModal}

                />
            }
        </div>
    )
}

export default ChatManually
