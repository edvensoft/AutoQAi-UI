import { useEffect, useState } from 'react'
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
import { ToastContainer } from 'react-toastify'

const MODAL_SHOWN_KEY = 'modalShownInSession';
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
                        // const hasShownModal = sessionStorage.getItem(MODAL_SHOWN_SESSION_KEY);
                        // if (!hasShownModal) {
                        //     setIsExistColModalOpen(true)
                        //     sessionStorage.setItem(MODAL_SHOWN_SESSION_KEY, 'true');
                        // }
                        const hasShownModal = localStorage.getItem(MODAL_SHOWN_KEY);
                        if (!hasShownModal) {
                             setIsExistColModalOpen(true)
                            localStorage.setItem(MODAL_SHOWN_KEY, 'true');
                        }


                    } else {
                        dispatch(setChats([]))
                    }
                }
            }
        ).catch(
            () => {
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

            <div className='flex flex-col w-[70%]'>
                <ChatHeader
                />
                <ChatSection
                />
                <ChatPrompt />
            </div>
            <div className='w-[30%]'>
                <CollectionsSidebar getCollections={getCollections} />
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
