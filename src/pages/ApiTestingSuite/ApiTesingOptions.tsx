import CustomeFileCodeIcon from '@/assets/customeIcons/CustomeFileCodeIcon'
import CustomeLinkIcon from '@/assets/customeIcons/CustomeLinkIcon'
import CustomeTerminalIcon from '@/assets/customeIcons/CustomeTerminalIcon'
import CustomeUploadIcon from '@/assets/customeIcons/CustomeUploadIcon'
import { API_URL } from '@/config'
import type { RootState } from '@/redux/store'
import axios from 'axios'
import React, { useRef, useState, type DragEvent } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, } from 'react-router-dom'

const ApiTesingOptions = () => {
    const [activeFormate, setActiveFormate] = useState<number | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const [url, setUrl] = useState<string | null>('')
    const [curlCommand, setCurlCommand] = useState<string | null>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const uploadRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // const { projectId } = useParams();

    const projectId = useSelector((state: RootState) => state.appState.project_id);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const files = e?.target?.files;
        const selectedFile = files && files.length > 0 ? files[0] : null;
        console.log('sele', selectedFile)
        validateFile(selectedFile);
    };

    const onBrowse = () => {
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('drop', e)
        const files = e?.dataTransfer?.files;
        const selectedFile = files && files.length > 0 ? files[0] : null;
        validateFile(selectedFile);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const validateFile = (file: File | null) => {
        console.log('type', file?.type)
        if (file && file.type === "application/json") {
            setFile(file);
            setError('');
        } else {
            setError("Please upload a valid JSON file.");
            setFile(null);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // console.log('change', value, e)
        setUrl(value)
        let checkUrl = validateUrl(value)
        if (checkUrl) {
            setError('')
        } else {
            setError('Please provide valid url')
        }
    }

    const handleCurlCommandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value

        setCurlCommand(value)
        let checkCurlCommand = validateCurlCommand(curlCommand)
        console.log(checkCurlCommand, 'chelc')
        if (checkCurlCommand) {
            setError('')
        } else {
            setError("Please provide valid cURL command")
        }
        // console.log('validate url',validateUrl(value))
    }

    const handleCurlCommndPaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {

        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const text = clipboardData.getData('text');
        setCurlCommand(text)
        // console.log('past', text)
        // if (text) {
        //     setError('')
        // } else {
        //     setError("Please provide valid cURL command")
        // }
        // setPastedText(text);

    };


    const handleSubmit = () => {

        if (activeFormate === 1 && file) {
            console.log('file submit')

        } else if (activeFormate === 1 && !file) {
            alert('Please provide Postman collection to proceed...')

        } else if ((activeFormate === 0 || activeFormate === 2) && url) {
            console.log('url submit')
            console.log('validate url', validateUrl(url))
            // navigate(`/project/api-testing-suite/api-list/${projectId}`)
            setIsSubmitting(true)
            if (activeFormate === 0) {
                const formData = new FormData()
                formData.append('project_id', projectId)
                formData.append('type', '1')
                formData.append('url', url)

                axios.post(`${API_URL}/v1/api/projects/add-api-doc/`, formData).then(
                    respons => {
                        if (respons.status === 200) {
                            setIsSubmitting(false)

                            navigate(`/project/api-testing-suite/api-list/`)

                        }

                    }
                ).catch(() => {
                    setIsSubmitting(false)
                })

            }

            // navigate(`/project/api-testing-suite/api-list/${'e2c9d5d5-1a93-4c78-b7ad-47a284a4ce84'}`)

        } else if ((activeFormate === 0) && !url) {
            alert('Please provide JSON end point to proceed...')
        } else if ((activeFormate === 2) && !url) {
            alert('Please provide Postman Documentation JSON Endpoint to proceed...')
        } else if (activeFormate === 3 && curlCommand) {
            console.log('curl submit', validateCurlCommand(curlCommand))
        } else if (activeFormate === 3 && !curlCommand) {
            // console.log('curl submit', validateCurlCommand(curlCommand))
            alert('Please provide cURL command to proceed...')
        }
    }





    const validateCurlCommand = (command: string) => {
        // console.log('comm', command)
        if (!command.trim().startsWith('curl')) {
            // return 'Command must start with "curl"';
            //setError
            return false
        }
        const urlRegex = /(['"])?([a-z][a-z0-9+\-.]*:\/\/[^\s'"]+)\1?/gi;
        const matches = [...command.matchAll(urlRegex)];

        for (const match of matches) {
            const url = match[2];
            try {
                const parsed = new URL(url);
                if (parsed) { return true }
                else {
                    return false
                }

                // return true
            } catch (e) {

                return false
            }
        }

        return false;
    };

    const handleOptions = (index: number) => {
        setError('')
        setActiveFormate(index)
    }

    const validateUrl = (input: string) => {
        const pattern = new RegExp(
            '^(https?:\\/\\/)' +
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
            'localhost|' +
            '\\d{1,3}(\\.\\d{1,3}){3})' +
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' +
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
            '(\\#[-a-zA-Z\\d_]*)?$',
            'i'
        );
        console.log('chek', pattern.test(input))
        return pattern.test(input);
    };

    const allFormates = [
        {
            title: 'Swagger',
            subTitle: 'JSON endpoint',
            icon: <CustomeFileCodeIcon width={30} height={30} fill={'#3b82f6'} />
        },
        {
            title: 'Postman Collection',
            subTitle: 'Upload file',
            icon: <CustomeUploadIcon width={30} height={30} fill={'#3b82f6'} />
        },
        {
            title: 'Postman Doc',
            subTitle: 'JSON endpoint',
            icon: <CustomeLinkIcon width={30} height={30} fill={'#3b82f6'} />
        },
        {
            title: 'Single API cURL',
            subTitle: 'Command input',
            icon: <CustomeTerminalIcon width={30} height={30} fill={'#3b82f6'} />
        },
    ]


    interface ApiFormateProps {
        item: {
            title: string;
            subTitle: string;
            icon?: React.ReactNode;
        };
        index: number;
    }

    const ApiFormate: React.FC<ApiFormateProps> = ({ item, index }) => {
        return (
            <label className='api-format-option cursor-pointer' key={index} onClick={() => handleOptions(index)}>

                <div className={`format-card border-2 ${index === activeFormate ? 'border-[#3b82f6]' : 'border-[#374151]'}  rounded-lg p-4 hover:border-[#3b82f6] transition-colors text-center `}>

                    <div className='flex justify-center'>
                        {item.icon}
                    </div>


                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.subTitle}</p>
                </div>
            </label>
        )

    }


    return (
        <div className='min-h-screen px-8 pb-14'>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#FFFFFF] mb-2">API Testing</h1>
                <p className="text-gray-400">Test APIs using different formats: Swagger, Postman collections, or cURL commands</p>
            </div>
            <div className='bg-[#1a1a2e] rounded-lg p-6 border border-[#374151]'>
                <h2 className="text-2xl font-semibold text-white mb-6">Select API Format</h2>

                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>

                    {
                        allFormates.map((item, index) => (
                            <ApiFormate item={item} index={index} />
                        ))
                    }
                </div>
                {
                    activeFormate === 0 &&

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">Swagger JSON Endpoint</label>
                        <input
                            type="url"
                            id="swagger-url"

                            className={`w-full bg-brand-bg border border-[#374151] rounded-lg p-3 text-white focus:outline-none focus:ring-2 ${error.length > 0 ? 'focus:ring-red-500' : 'focus:ring-[#3b82f6]'} `}
                            placeholder="https://api.example.com/swagger.json"
                            onChange={handleUrlChange}
                        />
                        {
                            error.length > 0 && <p className='text-red-500'>{error}</p>
                        }
                    </div>

                }
                {
                    activeFormate === 1 &&
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">Upload Postman Collection</label>
                        <div className={`border-2 border-dashed ${error.length > 0 ? 'border-red-500' : 'border-[#374151]'} rounded-lg p-8 text-center`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}

                        >
                            <i className="text-4xl text-[#3b82f6] mb-4 flex justify-center" data-fa-i2svg="">
                                <svg className="svg-inline--fa fa-cloud-arrow-up " width={36} height={36} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cloud-arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path></svg></i>
                            <p className="text-lg text-white mb-2">Upload Postman Collection</p>
                            <p className="text-gray-400 mb-4">Drag and drop or click to browse (.json files)</p>
                            <input type="file" id="postman-file" className="hidden"
                                accept=".json" ref={uploadRef} onChange={handleFileChange} />
                            <button id="browse-postman"
                                className="bg-[#3b82f6] cursor-pointer hover:bg-[#3b82f6]-dark text-white px-6 py-2 rounded-lg transition-colors"
                                onClick={onBrowse}
                            >
                                Browse Files
                            </button>
                        </div>
                        {
                            file &&
                            <div id="postman-file-info" className=" mt-4 p-3 bg-brand-bg rounded-lg border border-[#374151]">
                                <div className="flex items-center space-x-3">
                                    <i className="text-[#3b82f6]" data-fa-i2svg="">
                                        <svg className="svg-inline--fa fa-file-lines" width={16} height={16} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-lines" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg></i>
                                    <span id="postman-filename" className="text-white ">{file?.name}</span>
                                    <button id="remove-postman-file" className="text-red-400 cursor-pointer hover:text-red-300"
                                        onClick={() => setFile(null)}
                                    >
                                        <i data-fa-i2svg="">
                                            <svg className="svg-inline--fa fa-xmark" width={18} height={18} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg></i>
                                    </button>
                                </div>
                            </div>
                        }
                        {error.length > 0 && (
                            <div className="mt-4 text-center text-red-500">
                                <p>{error}</p>
                            </div>
                        )}

                    </div>
                }
                {
                    activeFormate === 2 &&
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">Postman Documentation JSON Endpoint</label>
                        <input type="url" id="postman-doc-url"
                            className={`w-full bg-brand-bg border border-[#374151] rounded-lg p-3 text-white focus:outline-none focus:ring-2 ${error.length > 0 ? 'focus:ring-red-500' : 'focus:ring-[#3b82f6]'} `}
                            placeholder="https://documenter.getpostman.com/view/..."
                            onChange={handleUrlChange}
                        />
                        {
                            error.length > 0 && <p className='text-red-500'>{error}</p>
                        }
                    </div>
                }
                {activeFormate === 3 &&
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-white mb-2">cURL Command</label>
                        <textarea id="curl-command" rows={8}
                            className={`w-full bg-brand-bg border border-[#374151] rounded-lg p-3 text-white focus:outline-none focus:ring-2 ${error.length > 0 ? 'focus:ring-red-500' : 'focus:ring-[#3b82f6]'} font-mono text-sm`}
                            placeholder="curl -X GET 'https://api.example.com/endpoint' \
  -H 'Authorization: Bearer token' \
  -H 'Content-Type: application/json' \
  -d '{
    &quot;key&quot;: &quot;value&quot;
  }'"
                            onChange={handleCurlCommandChange}
                            onPaste={handleCurlCommndPaste}
                        >

                        </textarea>
                        {
                            error.length > 0 && <p className='text-red-500'>{error}</p>
                        }
                    </div>
                }
                {
                    activeFormate !== null &&
                    <div className="flex justify-end" >
                        <button id="submit-api-test"
                            className="bg-[#3b82f6] hover:bg-[#3b82f6]-dark cursor-pointer text-white px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >

                            {
                                isSubmitting ?
                                    <>
                                        <span id="submit-text">Processing</span>
                                        {/* <Spinner className={'border-white w-6 h-6 border-2'} /> */}
                                    </>

                                    : <span id="submit-text">Submit</span>
                            }

                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ApiTesingOptions
