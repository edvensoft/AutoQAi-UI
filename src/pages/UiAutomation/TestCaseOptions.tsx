import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";
import UploadCases from './UploadCases';
import ManualTestCollections from './ManualTestCollections';

export default function TestCaseOptions() {
   const [testCase,setTestCase]=useState("")
  const options = [
    {
      icon: <FileUploadIcon  className="text-blue-500" />,
      title: "Upload Cases",
      description: "Upload test cases from CSV or Excel files",
    },
    {
      icon: <FileUploadIcon  className="text-blue-500" />,
      title: "Test Management",
      description: "Integrate with external test management tools",
    },
    {
      icon: <FileUploadIcon  className="text-blue-500" />,
      title: "Manual Collections",
      description: "Select from existing manual test case collections",
    },
  ];

  return (
    <>
       {!testCase&& <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((item, index) => (
          <div
            key={index}
            className="bg-[#10122E] rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            onClick={()=>{
                setTestCase(item.title)
            }}
          >
            {item.icon}
            <h3 className="text-white font-semibold text-xl mt-4">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{item.description}</p>
          </div>
        ))}
        </div>
        }
{
    testCase==="Upload Cases"&&<div><UploadCases/></div>
}
{
    testCase==="Test Management"&&<></>
}
{
    testCase==="Manual Collections"&&<ManualTestCollections/>
}
    </>
    
  );
}
