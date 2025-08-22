import { API_URL } from '@/config';
import { addChat, setTestCases, updateChat } from '@/redux/collectionsSlice';
import type { RootState } from '@/redux/store';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ChatPrompt = () => {
    const [input, setInput] = useState('')
    // const [messages, setMessages] = useState({
    //     userMessage: '',
    //     generateMessage: '',
    //     showVTC: false,
    //     loading: false
    // })

    const [isSubmit, setIsSubmit] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const collections = useSelector((state: RootState) => state.collections.list);


    const uploadRef = useRef<HTMLInputElement>(null);


    const activeCollectionId = useSelector(
        (state: RootState) => state.collections.activeCollectionId,
    );
    const chats = useSelector((state: RootState) => state.collections.chats);
    const dispatch = useDispatch();
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to bottom whenever chats change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    useEffect(() => {
        collections.length === 0 ? setIsSubmit(true) : setIsSubmit(false)
    }, [collections])
    const handleSend = () => {
        console.log('submit', file)

        // if (!input.trim()) return;


        // if (file) {
        //     setIsSubmit(true)
        //     let newChat = {
        //         checkId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        //         // id:'',
        //         collection_id: '',
        //         // test_case_chat_id:'',
        //         user_message: 'file upload',
        //         // test_cases:[],
        //         generateMessage: 'Generating test cases...',
        //         showVTC: false,
        //         loading: true
        //     }
        //     dispatch(addChat(newChat))
        //     setInput("");
        //     const formData = new FormData();
        //     formData.append('collection_id', activeCollectionId);
        //     formData.append('user_message', `File uploaded: ${file.name}`);
        //     formData.append('filepath', file);

        //     axios.post(`${API_URL}/v1/api/test-cases/generate-test-cases/`, formData).then(
        //         response => {
        //             console.log('res', response)
        //             dispatch(updateChat({
        //                 ...newChat,
        //                 // id:response.data.response.id,
        //                 user_message: response.data.response.user_message,
        //                 collection_id: response.data.response.collection_id,
        //                 // test_case_chat_id:response.data.response.test_case_chat_id,
        //                 // test_cases:response.data.response.test_cases,
        //                 generateMessage: 'Test cases generated successfully! Click to view and edit.',
        //                 showVTC: true,
        //                 loading: false
        //             }))
        //             setIsSubmit(false)
        //             setFile(null)
        //             dispatch(setTestCases(response.data.response.test_cases))
        //         }
        //     ).catch(e => {
        //         console.log('err', e)
        //         dispatch(updateChat({
        //             ...newChat,
        //             // id:response.data.response.id,
        //             // collection_id: response.data.response.collection_id,
        //             // test_case_chat_id:response.data.response.test_case_chat_id,
        //             // test_cases:response.data.response.test_cases,
        //             generateMessage: 'Error try again',
        //             showVTC: false,
        //             loading: false
        //         }))
        //         setIsSubmit(false)
        //     })

        // } 
        // else if (file && input) {
        //     setIsSubmit(true)
        //     let newChat = {
        //         checkId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        //         // id:'',
        //         collection_id: '',
        //         // test_case_chat_id:'',
        //         user_message: input,
        //         // test_cases:[],
        //         generateMessage: 'Generating test cases...',
        //         showVTC: false,
        //         loading: true
        //     }

        //     dispatch(addChat(newChat))

        //     setInput("");
        //     const formData = new FormData();
        //     formData.append('collection_id', activeCollectionId);
        //     formData.append('user_message', input);
        //     formData.append('filepath', file);

        //     axios.post(`${API_URL}/v1/api/test-cases/generate-test-cases/`, formData).then(
        //         response => {
        //             console.log('res', response)
        //             dispatch(updateChat({
        //                 ...newChat,
        //                 // id:response.data.response.id,
        //                 collection_id: response.data.response.collection_id,
        //                 // test_case_chat_id:response.data.response.test_case_chat_id,
        //                 // test_cases:response.data.response.test_cases,
        //                 generateMessage: 'Test cases generated successfully! Click to view and edit.',
        //                 showVTC: true,
        //                 loading: false
        //             }))
        //             setIsSubmit(false)
        //             dispatch(setTestCases(response.data.response.test_cases))
        //         }
        //     ).catch(e => {
        //         console.log('err', e)
        //         dispatch(updateChat({
        //             ...newChat,
        //             // id:response.data.response.id,
        //             // collection_id: response.data.response.collection_id,
        //             // test_case_chat_id:response.data.response.test_case_chat_id,
        //             // test_cases:response.data.response.test_cases,
        //             generateMessage: 'Error try again',
        //             showVTC: false,
        //             loading: false
        //         }))
        //         setIsSubmit(false)
        //     })
        // } 
        // else {
        setIsSubmit(true)
        let newChat = {
            checkId: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
            // id:'',
            collection_id: '',
            // test_case_chat_id:'',
            user_message: input,
            // test_cases:[],
            generateMessage: 'Generating test cases...',
            showVTC: false,
            loading: true
        }

        dispatch(addChat(newChat))

        setInput("");
        const formData = new FormData();
        formData.append('collection_id', activeCollectionId);
        formData.append('user_message', input);
        formData.append('filepath', file);

        axios.post(`${API_URL}/v1/api/test-cases/generate-test-cases/`, formData).then(
            response => {
                console.log('res', response)
                dispatch(updateChat({
                    ...newChat,
                    // id:response.data.response.id,
                    collection_id: response.data.response.collection_id,
                    // test_case_chat_id:response.data.response.test_case_chat_id,
                    // test_cases:response.data.response.test_cases,
                    generateMessage: 'Test cases generated successfully! Click to view and edit.',
                    showVTC: true,
                    loading: false
                }))
                setIsSubmit(false)
                setFile(null)
                dispatch(setTestCases(response.data.response.test_cases))
            }
        ).catch(e => {
            console.log('err', e)
            dispatch(updateChat({
                ...newChat,
                user_message: file ? file.name : 'Failure',
                // id:response.data.response.id,
                // collection_id: response.data.response.collection_id,
                // test_case_chat_id:response.data.response.test_case_chat_id,
                // test_cases:response.data.response.test_cases,
                generateMessage: 'Error try again',
                showVTC: false,
                loading: false
            }))
            setIsSubmit(false)
            setFile(null)
        })
        // }

    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const files = e?.target?.files;
        const selectedFile = files && files.length > 0 ? files[0] : null;
        console.log('sele', selectedFile)
        setFile(selectedFile);

        // validateFile(selectedFile);
    };

    const onBrowse = () => {
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    }

    // const validateFile = (file: File | null) => {
    //     console.log('type', file?.type)
    //     if (file && file.type === "application/json") {
    //         setFile(file);
    //         // setError('');
    //     } else {
    //         // setError("Please upload a valid JSON file.");
    //         setFile(null);
    //     }
    // };

    // useEffect(()=>{

    // },[addChat])
    return (
        <div id="chat-input-section" className="border-t border-[#374151] p-4">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col  w-full">
                    <div className="flex  justify-start items-center space-x-2 mb-2">
                        <button id="file-upload-btn"
                            className="bg-[#1A1A2E] cursor-pointer hover:bg-gray-600 text-gray-300 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmit}
                            onClick={onBrowse}
                        // disabled=""
                        >
                            <i className="fa-solid fa-paperclip"></i>
                        </button>
                        <input type="file" id="file-input" className="hidden"
                            // accept=".pdf,.doc,.docx,.txt"
                            // accept=".json"
                            ref={uploadRef}
                            onChange={handleFileChange}
                        />
                        {
                            file && file.name
                        }
                    </div>
                    <div className='w-full  flex gap-3 items-center'>
                        <textarea id="chat-input"
                            value={input}
                            rows={2}
                            placeholder="Select a collection first to start generating test cases..."
                            className="w-full bg-[#1A1A2E] border border-[#374151] rounded-lg p-3 text-[#FFFFFF] placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed"
                            // rows="3" 
                            onChange={(e) => setInput(e.target.value)}

                            disabled={isSubmit}
                        ></textarea>
                        <div>
                            <button id="send-btn"
                                className={` text-gray-400 p-3 rounded-lg ${isSubmit ? 'cursor-not-allowed bg-gray-600' : 'cursor-pointer bg-[#3B82F6]'}`}
                                onClick={handleSend}
                            // disabled={isSubmit}
                            >
                                <i className="fa-solid fa-paper-plane text-white"></i>
                            </button>
                        </div>

                    </div>
                </div>

                <div ref={chatEndRef} />
            </div>
        </div>
    )
}

export default ChatPrompt
