import React, { useEffect, useRef, useState } from 'react'
import ViewTestCaseModal from './ViewTestCaseModal'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setActiveCollection, setTestCases } from '@/redux/collectionsSlice';
import { API_URL } from '@/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const CollectionsSidebar = ({ getCollections }) => {
    const [isTestCasesOpen, setIsTestCasesOpen] = useState(false)
    const [selectedCollections, setSelectedCollections] = useState([])
    const collections = useSelector((state: RootState) => state.collections.list);
    const testCases = useSelector((state: RootState) => state.collections.testCases);

    const activeCollectionId = useSelector((state: RootState) => state.collections.activeCollectionId);

    const selectAllRef = useRef<HTMLInputElement>(null)

    // console.log(collections, 'col')
    const dispatch = useDispatch();

    const openTestCases = (e: React.MouseEvent<HTMLDivElement>, colId) => {
        e.stopPropagation()
        setIsTestCasesOpen(true)
        dispatch(setActiveCollection(colId))
    }
    const closeTestCases = () => {
        setIsTestCasesOpen(false)
        let updateTestCases = testCases.filter(item => item.id !== 'new')
        dispatch(setTestCases(updateTestCases))
    }

    const handleSection = (event: React.MouseEvent<HTMLDivElement>, colId) => {
        event.stopPropagation();
        // event.preventDefault()
        // event.nativeEvent.stopImmediatePropagation();
        // console.log(event,'eve')
        // if (event.target.checked) {
        //     setSelectedCollections([...selectedCollections, colId]);
        // } else {
        //     setSelectedCollections(selectedCollections.filter((id: any) => id !== colId));
        // }
        if (selectedCollections.includes(colId)) {
            setSelectedCollections(selectedCollections.filter((id: any) => id !== colId));
        } else {
            setSelectedCollections([...selectedCollections, colId]);
        }
    }
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const updatedElements = collections.map(item => item.id)
            setSelectedCollections([...updatedElements])
        } else {
            setSelectedCollections([])
        }
    }


    useEffect(() => {
        console.log('ss', selectAllRef.current, selectedCollections.length, collections.length)
        if (selectAllRef.current) {
            if (selectedCollections.length === 0) {
                selectAllRef.current.indeterminate = false;
                selectAllRef.current.checked = false;
            } else if (selectedCollections.length === collections.length) {
                selectAllRef.current.checked = true;
                selectAllRef.current.indeterminate = false;
            } else {
                selectAllRef.current.indeterminate = true;
                selectAllRef.current.checked = false;
            }
        }


    }, [selectedCollections]);

    const deleteCollections = () => {
        const collectionIds = collections.map(item => item.id);
        console.log('ids', collectionIds)
        const payLoad = {
            "collection_ids": [...collectionIds]
        }
        axios.delete(`${API_URL}/v1/api/test-cases/delete-collection/`, {
            data: payLoad
        }).then(
            res => {
                console.log('res', res)
                if (res.data.message === "Sucessfully Deleted collections") {
                    getCollections()
                    toast.success("Test Case deleted successfully!");

                }
            }
        )
    }

    return (
        <div id="collections-sidebar" className="w-full h-full bg-[#1A1A2E] border-l border-[#374151]">
            <div className="p-6 border-b border-[#374151]">
                <h2 className="text-lg font-semibold text-[#FFFFFF]">Test Collections</h2>
            </div>
            <div id="collections-list" className="p-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" id="select-all-collections"
                            // checked={selectAll}
                            onChange={handleSelectAll}
                            ref={selectAllRef}
                            className="w-4 h-4 cursor-pointer text-[#3B82F6] bg-[#0F0F23] border-[#374151] rounded focus:ring-[#3B82F6] focus:ring-2"
                        />
                        <span className="text-sm font-medium text-[#FFFFFF]">Select All</span>
                    </label>
                    {
                        selectedCollections.length > 0 &&
                        <div id="collection-actions" className=" flex flex-row items-center gap-4">
                            <div className="tooltip">
                                <button
                                    className="cursor-pointer bg-[#8B5CF6] hover:bg-purple-700 text-white p-2 rounded transition-colors group relative"
                                    data-api-id="API_001"
                                    data-api-name="Export Selected"
                                    title="Export Selected"
                                >
                                    <i className="fa-solid fa-download"></i>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Export Selected
                                    </div>
                                </button>

                                {/* <span className="tooltiptext">Export Selected</span> */}
                            </div>
                            <div className="tooltip">
                                <button
                                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded transition-colors group relative"
                                    data-api-id="API_001"
                                    data-api-name="Delete Selected"
                                    title="Delete Selected"
                                    onClick={deleteCollections}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Delete Selected
                                    </div>
                                </button>
                                {/* <span className="tooltiptext">Delete Selected</span> */}
                            </div>
                        </div>
                    }

                </div>
                {
                    collections.length > 0 &&
                    collections.map(col => (
                        <div className={`border ${activeCollectionId === col.id ? 'border-[#3B82F6]' : 'border-[#374151]'}  bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors`}
                            data-collection="login-feature"
                            onClick={(e) => openTestCases(e, col.id)}
                            key={col.id}
                        >
                            <div className="flex items-start space-x-3">
                                <input type="checkbox"
                                    checked={selectedCollections.includes(col.id)}
                                    // onChange={() => handleSection(e:,col.id)}
                                    onClick={(e) => handleSection(e, col.id)}
                                    className="collection-checkbox w-4 h-4 text-[#3B82F6] bg-[#0F0F23] border-[#374151] rounded focus:ring-[#3B82F6] focus:ring-2 mt-1"
                                />
                                <div className="flex-1 cursor-pointer"
                                // onclick="openCollectionDetails('Login Feature', 'login-feature')"
                                >
                                    <h3 className="font-semibold text-[#FFFFFF]">{col.name}</h3>
                                    <p className="text-sm text-gray-400">5 test cases</p>
                                </div>
                            </div>
                        </div>
                    ))
                }


                {/* <div className="collection-item bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors"
                    data-collection="payment-flow">
                    <div className="flex items-start space-x-3">
                        <input type="checkbox"
                            className="collection-checkbox w-4 h-4 text-[#3B82F6] bg-[#0F0F23] border-[#374151] rounded focus:ring-[#3B82F6] focus:ring-2 mt-1"

                        />
                        <div className="flex-1 cursor-pointer"
                        // onclick="openCollectionDetails('Payment Flow', 'payment-flow')"
                        >
                            <h3 className="font-semibold text-[#FFFFFF]">Payment Flow</h3>
                            <p className="text-sm text-gray-400">8 test cases</p>
                        </div>
                    </div>
                </div>

                <div className="collection-item bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors"
                    data-collection="user-registration">
                    <div className="flex items-start space-x-3">
                        <input type="checkbox"
                            className="collection-checkbox w-4 h-4 text-[#3B82F6] bg-[#0F0F23] border-[#374151] rounded focus:ring-[#3B82F6] focus:ring-2 mt-1"
                        />
                        <div className="flex-1 cursor-pointer"
                        // onclick="openCollectionDetails('User Registration', 'user-registration')"
                        >
                            <h3 className="font-semibold text-[#FFFFFF]">User Registration</h3>
                            <p className="text-sm text-gray-400">12 test cases</p>
                        </div>
                    </div>
                </div> */}
            </div>

            {
                isTestCasesOpen &&
                <ViewTestCaseModal
                    close={closeTestCases}
                    from='collection'
                />
            }
        </div>
    )
}

export default CollectionsSidebar
