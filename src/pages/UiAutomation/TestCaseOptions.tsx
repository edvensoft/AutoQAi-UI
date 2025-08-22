import LinkIcon  from '../../assets/LinkIcon.svg';
import FolderIcon  from '../../assets/FolderIcon.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState, useEffect } from "react";
import UploadCases from './UploadCases';
import ManualTestCollections from './ManualTestCollections';
import { useLocation } from 'react-router-dom';
import TestManagement from './TestManagement/TestManagement';

export default function TestCaseOptions() {
  const [testCase, setTestCase] = useState("");
  const location=useLocation();

  const options = [
    {
      icon: <FileUploadIcon className="text-blue-500" style={{ fontSize: 45 }} />,
      title: "Upload Cases",
      description: "Upload test cases from CSV or Excel files",
    },
    {
      icon: <img src={LinkIcon} alt="link" className="w-14 h-14" />,
      //<LinkIcon className="text-blue-500" style={{ fontSize: 40 }} />,
      title: "Test Management",
      description: "Integrate with external test management tools",
    },
    {
      icon:<img src={FolderIcon} alt="link" className="w-14 h-14" />,
      // <FolderIcon className="text-blue-500" style={{ fontSize: 40 }} />,
      title: "Manual Collections",
      description: "Select from existing manual test case collections",
    },
  ];

  useEffect(() => {
    if(location?.state?.from==="column-mapping"){
      setTestCase("Upload Cases");
    }    
  }, [])
  

  return (
    <>
      {!testCase && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-2">
          {options.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1B2E] border border-white/20 rounded-lg p-5 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer hover:border-blue-500"
              onClick={() => {
                setTestCase(item.title);
              }}
            >
              {item.icon}
              <h3 className="text-white font-semibold text-2xl mt-4">{item.title}</h3>
              <p className="text-gray-400 text-xl mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {testCase === "Upload Cases" && <div className="w-full"><UploadCases setTestCase={setTestCase}/></div>}
      {testCase === "Test Management" && <div className="w-full"><TestManagement/></div>}
      {testCase === "Manual Collections" && <ManualTestCollections />}
    </>
  );
}
