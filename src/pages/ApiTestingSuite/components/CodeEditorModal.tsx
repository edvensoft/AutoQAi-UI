import { Portal } from '@mui/material'
import React, { useState } from 'react'



interface ModalProps {
    onClose: () => void
    // codeData:
}


// const CodeBlock = ({ code, language }) => {
//     return (
//         <SyntaxHighlighter language={language} style={vscDarkPlus} showLineNumbers>
//             {code}
//         </SyntaxHighlighter>
//     );
// };

const CodeEditorModal = ({ onClose }: ModalProps) => {
    const [isEditable, setIsEditable] = useState<boolean>(false)

    const onEdit = () => {
        setIsEditable(true)
    }

    return (
        <Portal>
            <div id="code-editor-modal" className="fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="w-full h-full bg-[#0F0F23] flex flex-col">
                    <div className="bg-[#1A1A2E] border-b border-[#374151] p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-[#FFFFFF]">Code Editor</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">API:</span>
                                <span id="editor-api-name" className="text-sm text-[#3B82F6] font-medium">User Authentication</span>
                                <span className="text-sm text-gray-400">|</span>
                                <span id="editor-api-id" className="text-sm text-gray-300">API_001</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button id="copy-code-btn" className="bg-[#8B5CF6] hover:bg-[#8B5CF6]/80 text-white px-4 py-2 rounded-lg transition-colors">
                                <i className="fa-solid fa-copy mr-2"></i>Copy
                            </button>
                            {
                                isEditable ? <>
                                    <button id="save-code-btn" className=" bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        <i className="fa-solid fa-save mr-2"></i>Save
                                    </button>
                                    <button id="cancel-edit-btn"
                                        className=" bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={() => setIsEditable(false)}
                                    >
                                        <i className="fa-solid fa-times mr-2"></i>Cancel
                                    </button>
                                </>
                                    : <button id="edit-code-btn"
                                        className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={onEdit}
                                    >
                                        <i className="fa-solid fa-edit mr-2"></i>Edit
                                    </button>
                            }



                            <button id="close-editor-btn"
                                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                onClick={() => onClose()}
                            >
                                <i className="fa-solid fa-times mr-2"></i>Close
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="bg-[#1A1A2E] border-b border-[#374151] px-4 py-2">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <i className="fa-solid fa-file-code text-[#3B82F6]"></i>
                                    <span className="text-sm text-[#FFFFFF]">main.py</span>
                                </div>
                                <div id="file-status"
                                    className={`text-xs ${isEditable ? "text-yellow-400" : "text-gray-400"} `}
                                >
                                    {
                                        isEditable ? "Editing" : "Read Only"
                                    }

                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="absolute inset-0 flex">
                                <div className="w-12 bg-[#1A1A2E] border-r border-[#374151] flex flex-col text-center text-xs text-gray-400 py-4">
                                    <div className="py-1">1</div>
                                    <div className="py-1">2</div>
                                    <div className="py-1">3</div>
                                    <div className="py-1">4</div>
                                    <div className="py-1">5</div>
                                    <div className="py-1">6</div>
                                    <div className="py-1">7</div>
                                    <div className="py-1">8</div>
                                    <div className="py-1">9</div>
                                    <div className="py-1">10</div>
                                    <div className="py-1">11</div>
                                    <div className="py-1">12</div>
                                    <div className="py-1">13</div>
                                    <div className="py-1">14</div>
                                    <div className="py-1">15</div>
                                    <div className="py-1">16</div>
                                    <div className="py-1">17</div>
                                    <div className="py-1">18</div>
                                    <div className="py-1">19</div>
                                    <div className="py-1">20</div>
                                </div>
                                <div className="flex-1">
                                    {/* <textarea id="code-editor-textarea" className="w-full h-full bg-[#0F0F23] text-[#FFFFFF] font-mono text-sm p-4 border-none outline-none resize-none" spellcheck="false" readonly="">import requests
                                        import json
                                        from typing import Dict, Any, Optional

                                        className UserAuthenticationAPI:
                                        def __init__(self, base_url: str, api_key: Optional[str] = None):
                                        self.base_url = base_url.rstrip('/')
                                        self.api_key = api_key
                                        self.session = requests.Session()

                                        if self.api_key:
                                        self.session.headers.update({'Authorization': f'Bearer {self.api_key}'})

                                        def authenticate_user(self, username: str, password: str) -&gt; Dict[str, Any]:
                                        """
                                        Authenticate user with username and password

                                        Args:
                                        username (str): User's username
                                        password (str): User's password

                                        Returns:
                                        Dict[str, Any]: Authentication response containing user data and token
                                        """
                                        endpoint = f"{self.base_url}/auth/login"

                                        payload = {
                                            "username": username,
                                        "password": password
        }

                                        try:
                                        response = self.session.post(endpoint, json=payload)
                                        response.raise_for_status()

                                        return response.json()

                                        except requests.exceptions.HTTPError as e:
                                        if response.status_code == 401:
                                        raise Exception("Invalid credentials")
                                        else:
                                        raise Exception(f"HTTP Error: {e}")
                                        except requests.exceptions.RequestException as e:
                                        raise Exception(f"Request failed: {e}")

                                        def logout_user(self, token: str) -&gt; Dict[str, Any]:
                                        """
                                        Logout user and invalidate token

                                        Args:
                                        token (str): User's authentication token

                                        Returns:
                                        Dict[str, Any]: Logout response
                                        """
                                        endpoint = f"{self.base_url}/auth/logout"

                                        headers = {'Authorization': f'Bearer {token}'}

                                        try:
                                        response = self.session.post(endpoint, headers=headers)
                                        response.raise_for_status()

                                        return response.json()

                                        except requests.exceptions.RequestException as e:
                                        raise Exception(f"Logout failed: {e}")

                                        # Usage Example
                                        if __name__ == "__main__":
                                        auth_api = UserAuthenticationAPI("https://api.example.com")

                                        try:
                                        # Authenticate user
                                        result = auth_api.authenticate_user("john_doe", "secure_password")
                                        print(f"Authentication successful: {result}")

                                        # Logout user
                                        logout_result = auth_api.logout_user(result.get('token'))
                                        print(f"Logout successful: {logout_result}")

                                        except Exception as e:
                                        print(f"Error: {e}")</textarea> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default CodeEditorModal
