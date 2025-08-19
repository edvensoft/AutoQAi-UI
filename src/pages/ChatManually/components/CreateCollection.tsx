import { API_URL } from '@/config';
import { addCollection } from '@/redux/collectionsSlice';
import type { RootState } from '@/redux/store';
import { Portal } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    close: () => void;
}

const CreateCollection = (props: Props) => {
    const { close } = props

    const [collectionName, setCollectionName] = useState("");
    const [inputError, setInputError] = useState("");
    const projectId = useSelector((state: RootState) => state.appState.project_id);
    const userId = useSelector((state: RootState) => state.appState.user_id);

    const dispatch = useDispatch();


    function handleCreateCollection() {
        if (!collectionName) {
            setInputError("Please enter collection name")
        }

        if (collectionName.trim()) {
            let payload = {
                "user_id": userId,
                "project_id": projectId,
                "name": collectionName
            }
            axios.post(`${API_URL}/v1/api/test-cases/create-collection/`, payload).then(
                (resp) => {
                    console.log('resp', resp)
                    if (resp.data) {
                        console.log('resp', resp)
                        dispatch(
                            addCollection({
                                id: resp.data.collection_id,
                                name: collectionName.trim(),
                            }),
                        );

                        setCollectionName("");
                        close()
                        // setIsOpen(false)
                    }
                }
            ).catch(e => {
                alert(`Error ${e.response.data.error}`)
                close()
            })
        }

    }

    return (
        <Portal>
            <div id="create-collection-modal"
                className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto'
            >
                {/* <div className="bg-[#1A1A2E] my-auto rounded-lg p-6 w-full max-w-2xl  border border-[#374151]"></div> */}
                <div className="bg-[#1A1A2E] rounded-lg w-full max-w-md">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-[#FFFFFF] mb-4">Create New Collection</h2>
                        <input type="text" id="feature-name-input"
                            placeholder="Enter feature/collection name..."
                            className="w-full bg-[#0F0F23] border border-brand-border rounded-lg p-3 text-[#FFFFFF] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] "
                            value={collectionName}
                            onFocus={() => setInputError('')}
                            onChange={(e) => setCollectionName(e.target.value)}
                        />
                        {
                            inputError.length > 0 && <p className="text-red-500">{inputError}</p>
                        }
                        <div className="flex justify-end space-x-3 mt-4">
                            <button id="cancel-feature-name" className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                onClick={close}
                            >Cancel</button>
                            <button id="confirm-feature-name"
                                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-lg transition-colors"
                                onClick={handleCreateCollection}
                            >Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default CreateCollection
