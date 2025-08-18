import type React from "react"

interface TestHeaderProps {
    title: string,
    submitBtnText: string,
    submitBtnClass:string,
    submitBtnIcon:React.ReactElement,
    submitBtnClick: (id) => void,
    selectedApis: []
}


const TestCaseHeader = (props: TestHeaderProps) => {
    const { title, submitBtnText,submitBtnClass, submitBtnClick, selectedApis,submitBtnIcon } = props
    return (
        <div className="p-6 border-b border-[#374151]">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-[#FFFFFF]">{title}</h2>
                {
                    selectedApis.length > 0 &&
                    <div id="approve-button-container" className="">
                        <button id="approve-selected-btn"
                            // className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
                            className={submitBtnClass}
                            onClick={()=>submitBtnClick(null)}
                        >
                            {/* <i className="fa-solid fa-check"></i> */}
                            {submitBtnIcon}
                            {/* <span>Approve Code</span> */}
                            <span>{submitBtnText}</span>
                        </button>
                    </div>
                }

            </div>
        </div>
    )
}

export default TestCaseHeader
