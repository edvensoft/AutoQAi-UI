import LinkIcon  from '../../assets/LinkIcon.svg';
import FolderIcon  from '../../assets/FolderIcon.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from "react";
import UploadCases from './UploadCases';
import ManualTestCollections from './ManualTestCollections';

export default function TestCaseOptions() {
  const [testCase, setTestCase] = useState("");

  const options = [
    {
      icon: <FileUploadIcon className="text-blue-500" style={{ fontSize: 40 }} />,
      title: "Upload Cases",
      description: "Upload test cases from CSV or Excel files",
    },
    {
      icon: <img src={LinkIcon} alt="link" className="w-10 h-10" />,
      //<LinkIcon className="text-blue-500" style={{ fontSize: 40 }} />,
      title: "Test Management",
      description: "Integrate with external test management tools",
    },
    {
      icon:<img src={FolderIcon} alt="link" className="w-10 h-10" />,
      // <FolderIcon className="text-blue-500" style={{ fontSize: 40 }} />,
      title: "Manual Collections",
      description: "Select from existing manual test case collections",
    },
  ];

  return (
    <>
      {!testCase && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((item, index) => (
            <div
              key={index}
              className="bg-[#1A1B2E] border border-white/20 rounded-lg p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer hover:border-blue-500"
              onClick={() => {
                setTestCase(item.title);
              }}
            >
              {item.icon}
              <h3 className="text-white font-semibold text-xl mt-4">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {testCase === "Upload Cases" && <div><UploadCases setTestCase={setTestCase}/></div>}
      {testCase === "Test Management" && <></>}
      {testCase === "Manual Collections" && <ManualTestCollections />}
    </>
  );
}
