import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileUpload from './FileUpload';
import StandardTemplate from './StandardTemplate';
import {useState} from 'react';

export default function UploadCases() {

    const [template, setTemplate] = useState<string>("");

  const templates = [
    {
      icon: <FileUploadIcon className="text-blue-500" />,
      title: "Standard Template",
      description: "Use our predefined template structure with standard columns",
      subtext: "Includes: Test Case Name, Test Steps, Expected Result, Test Data",
    },
    {
      icon: <FileUploadIcon className="text-blue-500" />,
      title: "Custom Template",
      description: "Map your own column structure to our fields",
      subtext: "Flexible mapping for any CSV/Excel format",
    },
  ];

  return (
      <div className="bg-[#10122E] rounded-lg p-8 w-full max-w-5xl">
        {/* Heading */}
        <h1 className="text-white text-2xl font-semibold mb-4">Upload Test Cases</h1>
        <h2 className="text-white text-lg font-medium mb-2">Select Template Type</h2>
        <p className="text-gray-400 mb-8">
          Choose one template type to proceed with your file upload
        </p>

        {/* Template Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-[#0F112B] rounded-lg p-6 border border-gray-400 hover:border-blue-600 
                         flex flex-col items-center text-center cursor-pointer transition-all"
              onClick={()=>{
                setTemplate(template?.title)
              }}
            >
              {template.icon}
              <h3 className="text-white font-semibold text-lg mt-4">{template.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{template.description}</p>
              <p className="text-gray-500 text-xs mt-1">{template.subtext}</p>
            </div>
          ))}
        </div>
       
{template==="Standard Template"&&<StandardTemplate/>  }     
{template&& <FileUpload/>}

        {/* Divider */}
        <hr className="my-6 border-gray-700" />

        {/* Buttons */}
        <div className="flex justify-between">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
         <ArrowBackIcon/> Back
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md">
        Next <ArrowForwardIcon/>
          </button>
        </div>
      </div>
  );
}
