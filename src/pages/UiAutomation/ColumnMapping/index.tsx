import React, { useState, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import useMapping from "./Hooks/useMapping";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";




let options = [
  { label: "Select Mapping...",key:"" },
  {label:"Test Data", key:"test_data"},
  {
    key: "test_id",
    label: "Test ID",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "steps",
    label: "Steps",
  },
  {
    key: "expected_result",
    label: "Expected Result",
  },
  {
    key: "pre_condition",
    label: "Pre Condition",
  },

]

const requiredFields = options.map((option, i) => i === 0 ? null : option?.label).filter((label) => label);
const requiredKeys = options.map((option, i) => i === 0 ? null : option?.key).filter((key) => key);
let defaultObj={ "test_id": "", "pre_condition": "", "steps": "", "expected_result": "", "description": "" }


const ColumnMapping: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const {
   file,
   rows,
    headers = [],
   ...rest
  } = location.state || {};

const [mappings, setMappings] = useState<Record<string, string>>({});
  const { selectedFields } = useMapping(mappings);
  // const {projectId}=useParams()
    const projectId = useSelector((state: RootState) => state.appState.project_id);



  useEffect(() => {
    if (!file || headers.length === 0) {
      navigate('/upload');
    }
  }, [file]);



  useEffect(() => {
    if (headers?.length)
      setMappings(Object.fromEntries(headers.map((header: string) => {
        return [header, ""];
      })))
  }, [headers])

  const allRequiredMapped =requiredKeys.every((key)=>key==="test_data"?true:Object.values(mappings)?.includes(key));


  const hasAnySelection = Object.values(mappings).some(Boolean);

  const handleChange = (field: string, e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (
      Object.values(mappings).includes(value) &&
      value !== mappings[field] &&
      value !== ""
    ) {
      setError(`"${value}" has already been selected in another field.`);
      return;
    }

    setError("");
    setSuccess(false);
    setSaved(false);
    setMappings((prev) => ({ ...prev, [field]: value }));
  };


  const handleSave = () => {
     console.log("inside")
    if (!file) {
      return;
    }
   
    let mappedvalues=Object.values(mappings);
    let missedValues=requiredKeys?.filter((key)=>!mappedvalues?.includes(key));
    let column_mapping = Object.fromEntries(Object.entries(mappings).map(([keyframes, value]) => [value, keyframes]));
    if (missedValues.length > 0) {
      missedValues.forEach((key) => {
        column_mapping[key] = ""
      })
    }
    let formValues = {
      file,
      ...rest,
      column_mapping,
    }

    // navigate(`/project/ui-automation/loader/${projectId}`, {
    //   state: {
    //    formValues
    //   },
    // });
    navigate(`/project/ui-automation/loader/`, {
      state: {
       formValues
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
      <div className="bg-[#141428] w-full p-6 rounded-lg border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Column Mapping</h2>
            <p className="text-gray-400 text-sm">
              Map your file columns to the required fields. Fields marked with * are mandatory.
            </p>
          </div>

          {/* <button
            disabled={!hasAnySelection}
            onClick={() => { setSaved(true); setSuccess(false); }}
            className={`px-4 py-2 rounded-md flex items-center gap-2 font-medium
              ${!hasAnySelection
                ? "bg-purple-300 text-white cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-500"}`}
          >
            <CollectionsBookmarkIcon fontSize="small" /> Save Mapping
          </button> */}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 text-sm bg-red-900/40 border border-red-600 text-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Required Fields */}
        <div className="mb-2 text-white font-semibold">Required Fields</div>
     
        <div className="bg-[#0d0d1a] p-4 rounded-md flex flex-wrap gap-2 mb-6 border border-gray-700">
          {requiredFields.map((field) => {
         const key = options.find(option => option.label === field)?.key ?? "";
          const ok = selectedFields?.selected?.includes(key) ?? false;
            return (
              <span
                key={field}
                className={
                  field === "Pre Condition" ? "bg-blue-500/20 border border-blue-500 text-blue-500 px-3 py-1 rounded-full text-sm" :
                    ok
                      ? "bg-green-500/20 border border-green-500 text-green-500 px-3 py-1 rounded-full text-sm"
                      : "bg-red-500/20 border border-red-500 text-red-500 px-3 py-1 rounded-full text-sm"
                }
              >
                {field} *
              </span>
            );
          })}
        </div>
        {/* Mapping Fields */}
        {headers.map((item:string) => {
          const selectedValue = mappings[item]==="Select Mapping..."?null:  mappings[item];
          const showCheck = !!selectedValue;

          return (
            <div
              key={item}
              className="mb-6 bg-[#0d0d1a] border border-gray-700 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="w-[70%] flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-blue-500">
                    <ViewColumnIcon fontSize="small" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item}</div>
                    <div className="text-gray-400 text-sm">{item}</div>
                  </div>
                </div>

                {/* Select + status */}
                <div className="flex items-center gap-2 w-[50%]">
                  <div className="relative flex-1">
                    <select
                      value={selectedValue}
                      onChange={(e) => handleChange(item, e)}
                      disabled={saved && !!selectedValue}
                      className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
                    >
                      {options.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <KeyboardArrowDownIcon className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
                   
                    {!selectedFields?.mappedFields?.includes(item) && (
                      <span className="absolute right-[-10%] top-2.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                        <CheckIcon className="w-3.5 h-3.5 text-black bg-green" style={{ fontSize: "15px" }} />
                      </span>
                    )}
                  </div>

                  {/* Filled green check */}


                  {/* Edit (after saved) */}
                  {showCheck && saved && (
                    <button
                      onClick={() => { setMappings((p) => ({ ...p, [item]: "" })); setSaved(false); setSuccess(false); }}
                      className="text-white bg-blue-600 hover:bg-blue-500 text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1"
                    >
                      <EditIcon className="w-4 h-4" /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Success banner (exact style of first image) */}
        {success && (
          <div className="mb-4">
            <div className="flex items-start gap-3 p-4 rounded-md border border-green-600 bg-green-900/30">
              <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500">
                <CheckIcon className="w-4 h-4 text-white" />
              </span>
              <div className="text-green-200">
                <div className="font-semibold">Mapping Saved Successfully</div>
                <div className="text-sm text-green-300">
                  All required fields have been mapped correctly.
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Footer buttons */}
        <div className="flex justify-between mt-6" >
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex items-center gap-2" onClick={()=>{
          navigate("/testcases",{state:{from:"column-mapping"}})
        }}>
            <ArrowBackIosNewIcon className="w-4 h-4" /> Back
          </button>

          <button
            disabled={ !selectedFields?.mappedFields?.length?false:!allRequiredMapped}
            onClick={() => {
              if (!selectedFields?.mappedFields?.length||allRequiredMapped) handleSave()
            }}
            className={`px-4 py-2 rounded-md flex items-center gap-2
              ${!selectedFields?.mappedFields?.length?false:!allRequiredMapped
                ? "bg-blue-600/60 text-white/80 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"}`}
          >
            Save and Execute
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnMapping;
