import React, { useEffect, useState } from 'react'
import ViewTestCaseModal from './ViewTestCaseModal'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import axios from 'axios';
import { API_URL } from '@/config';
// import ExistingCollections from './ExistingCollections';
import { setChats, setTestCases } from '@/redux/collectionsSlice';
// import { setTestCases } from '@/redux/collectionsSlice';


const ChatSection = () => {
    const [isTestCasesOpen, setIsTestCasesOpen] = useState(false)
    // const [apiError, setApiError] = useState('')

    const collections = useSelector((state: RootState) => state.collections.list);
    const chats = useSelector((state: RootState) => state.collections.chats);
    const activeCollectionId = useSelector((state: RootState) => state.collections.activeCollectionId);

    const activeCollection = collections.length > 0 && collections.find(col => col.id === activeCollectionId)
    // console.log('chat', chats, activeCollection, activeCollectionId)

    const dispatch = useDispatch();

    const openTestCases = () => {
        axios.get(`${API_URL}/v1/api/test-cases/get-chat/${activeCollectionId}/`).then(
            response => {
                if (response.status === 200) {
                    dispatch(setTestCases(response.data.response.test_cases))
                    setIsTestCasesOpen(true)

                }
            }
        )
    }
    const closeTestCases = () => {
        setIsTestCasesOpen(false)
    }

    const getChatByCollection = () => {

        axios.get(`${API_URL}/v1/api/test-cases/get-chat/${activeCollectionId}/`).then(
            response => {
                console.log('responseChats', response)
                if (response.status === 200) {
                    let chats = []
                    let chatObj = {
                        ...response.data.response,
                        generateMessage: 'Test cases generated successfully! Click to view and edit.',
                        showVTC: true,
                        loading: false
                    }
                    chats.push(chatObj)
                    dispatch(setChats(chats))
                    dispatch(setTestCases(response.data.response.test_cases))
                    // setApiError('')

                }
            }
        ).catch(err => {
            // console.log('error', err)
            if (err.response.data.error === "No test cases found for this collection") {
                console.log('incoming')
                // setApiError(err.response.data.error)
                dispatch(setChats([]))
                dispatch(setTestCases([]))

            }
            // 
        })
    }

    useEffect(() => {
        if (activeCollectionId) {
            getChatByCollection()
        }
    }, [activeCollectionId])

    return (
        <div id="chat-section" className="flex-1 flex flex-col">
            {/* check exist or not */}

            <div id="chat-messages" className="flex-1 p-6 space-y-4 overflow-y-auto">
                <div className="flex justify-center">
                    {
                        collections.length > 0 ?
                            <div className="bg-[#1A1A2E] rounded-lg p-6 text-center max-w-md">
                                {/* <i className="text-4xl text-[#3B82F6] mb-4" data-fa-i2svg="">
                            <svg className="svg-inline--fa fa-comments" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"></path></svg>
                        </i> */}
                                <i className="fa fa-comments text-4xl text-[#3B82F6] mb-4" aria-hidden="true"></i>
                                <h3 className="text-lg font-semibold text-[#FFFFFF] mb-2">Collection: {activeCollection && activeCollection.name}</h3>
                                <p className="text-gray-400">Upload a file or describe your feature to generate test cases</p>
                            </div>
                            :
                            <div className='mt-2 text-center text-sm text-red-300 bg-red-900/40 rounded p-3'>
                                There are no collections. Please click on{" "}
                                <strong>Create New Collection</strong> or add a new collection by
                                clicking the button above.
                            </div>
                    }


                </div>
                <div id='api-error '
                    className='flex justify-center items-center '
                >
                    {/* {apiError.length > 0 &&
                        <div className='bg-[#1A1A2E] text-red-500 rounded-lg p-6 flex flex-col justify-center items-center w-[28rem] h-[150px]'>

                            <i className="fa fa-times-circle text-3xl " aria-hidden="true"></i>
                            <h2 className='mt-2'>{apiError}</h2>
                        </div>
                    } */}
                </div>
                {
                    chats?.length > 0 &&
                    chats.map(chat => (
                        <React.Fragment key={chat.checkId}>
                            {/* Chat messages */}
                            <div className="flex justify-end">
                                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#3B82F6] text-white">
                                    {chat.user_message}
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-[#1A1A2E] text-[#FFFFFF]">
                                    {chat.generateMessage}
                                </div>
                            </div>
                            {
                                chat.showVTC &&
                                <div className="flex justify-start mt-2">
                                    <button
                                        className="view-test-cases-btn bg-[#8B5CF6] hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={openTestCases}
                                    >
                                        View Test Cases
                                    </button>
                                </div>
                            }

                            {/* Chat messages ends*/}
                        </React.Fragment>
                    ))
                }


            </div>

            {
                isTestCasesOpen &&
                <ViewTestCaseModal
                    close={closeTestCases}
                    from='chat'
                />
            }

        </div>
    )
}

export default ChatSection
