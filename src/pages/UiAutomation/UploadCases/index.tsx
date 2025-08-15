import DescriptionIcon from "@mui/icons-material/Description";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Settings } from "lucide-react";
import { useState, useRef, type JSX, createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";
import StandardTemplate from "./StandardTemplate";
import type { FileUploadRef } from "./FileUpload";

interface MyContextType {
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadTestCaseContext = createContext<MyContextType | undefined>(undefined);

interface UploadCasesProps {
   setTestCase: (val:string) => void;
}

interface TemplateOption {
  icon?: JSX.Element;
  title: string;
  description?: string;
  subtext?: string;
}

export default function UploadCases({ setTestCase }: UploadCasesProps) {
  const [template, setTemplate] = useState<string>("");
  const [isEnable, setIsEnable] = useState<boolean>(false);  
  const uploadRef = useRef<FileUploadRef | null>(null);
  const navigate = useNavigate();
  const location=useLocation();
 
  // This will be passed to FileUpload so it can control button state
  const setEnable = ({ isError, hasValue }: { isError: boolean; hasValue: boolean }) => {
  
    setIsEnable(!isError && hasValue);
  };

  const templates: TemplateOption[] = [
    {
      icon: <DescriptionIcon className="text-blue-500" style={{ fontSize: 32 }} />,
      title: "Standard Template",
      description: "Use our predefined template structure with standard columns",
      subtext: "Includes: Test Case Name, Test Steps, Expected Result, Test Data",
    },
    {
      icon: <Settings className="text-blue-500" style={{ fontSize: 32 }} />,
      title: "Custom Template",
      description: "Map your own column structure to our fields",
      subtext: "Flexible mapping for any CSV/Excel format",
    },
  ];

  const handleTemplateSelect = (selected: string) => {
    setTemplate(selected);
    // setTestCase(selected);
  };

 

  return (
    <UploadTestCaseContext.Provider value={{template,setTemplate}}>
       <div className="bg-[#1A1B2E] rounded-lg p-8 w-full max-w-5xl border border-white/20 shadow-lg">
      <h1 className="text-white text-2xl font-semibold mb-4">Upload Test Cases</h1>
      <h2 className="text-white text-lg font-medium mb-2">Select Template Type</h2>
      <p className="text-gray-400 mb-8">
        Choose one template type to proceed with your file upload
      </p>

      {/* Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((item, index) => {
          const isActive = template === item.title;
          return (
            <div
              key={index}
              className={`rounded-lg p-6 border flex flex-col items-center text-center cursor-pointer transition-all shadow-md
                ${isActive ? "border-blue-600 shadow-blue-600/50 bg-[#0D0D1A]" : "border-white/20 hover:border-blue-600 hover:shadow-xl bg-[#0D0D1A]"}`}
              onClick={() => handleTemplateSelect(item.title)}
            >
              {item.icon}
              <h3 className="text-white font-semibold text-lg mt-4">{item.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{item.description}</p>
              <p className="text-gray-500 text-xs mt-1">{item.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Template specific UI */}
      {template === "Standard Template" && <StandardTemplate />}
      {template && <FileUpload ref={uploadRef} template={template} setEnable={setEnable} />}

      <hr className="my-6 border-gray-700" />

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
            onClick={() => {
              setTestCase("");
              if (location?.state?.from) {
                navigate(location.pathname, {
                  state: {
                    ...location?.state, // keep existing state
                    from: "", // add or update
                  },
                  replace: true, // prevents adding a new entry to history
                });
              }
              
            }}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          <ArrowBackIcon /> Back
        </button>

        <button
          onClick={() => {
            if (template === "Standard Template") {
            
              uploadRef.current?.onSave?.();
            } else {
             uploadRef.current?.handleSheetConfirm()
            }
          }}
          disabled={!isEnable}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            !isEnable ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white"
          }`}
        >
          {template === "Standard Template" ? "Save & Execute" : "Next"}
          {template !== "Standard Template" && <ArrowForwardIcon />}
        </button>
      </div>
    </div>
    </UploadTestCaseContext.Provider>
   
  );
}
