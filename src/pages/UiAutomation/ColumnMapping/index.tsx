import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckIcon from "@mui/icons-material/Check";
import useMapping from "./Hooks/useMapping";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from 'lucide-react';

const labelMap = {
  test_id: ['id', 'test id', 'testcase id'],
  pre_condition: ['precondition', 'pre condition', 'pre-condition'],
  steps: ['steps', 'test steps', 'procedure'],
  expected_result: ['expected result', 'result', 'expected'],
  description: ['description', 'testcase description', 'desc'],
  test_data: ['testdata', 'test data', 'input data'],
};

const normalize = (str) =>
  str.toLowerCase().replace(/[\s_-]+/g, '').trim();

const requiredFields = ["Test Case Name", "Test Steps", "Expected Result", "Test Data", "Precondition"];

const matchBackendField = (header) => {
  const normalizedHeader = normalize(header);
  for (let field of requiredFields) {
    const aliases = labelMap[field] || [];
    if (
      aliases.some((alias) => normalizedHeader.includes(normalize(alias)))
    ) {
      return field;
    }
  }
  return ''; // No match
};

const ColumnMapping: React.FC = () => {
  // const [mappings, setMappings] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // const [requiredFields, requiredFields] = useState(false);
  const [options, setOptions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    file,
    headers = [],
    sheetName = '',
    headerStarts = '',
    mappings: passedMappings = {},
  } = location.state || {};
const [mappings, setMappings] = useState<Record<string, string>>(() => {
    const initial = {};
    headers.forEach((header) => {
      if (passedMappings[header]) {
        initial[header] = passedMappings[header];
      } else {
        initial[header] = matchBackendField(header);
      }
    });
    return initial;
  });
    const { selectedFields } = useMapping(mappings);

  //   const handleChange = (header, selectedBackendField) => {
  //   setMappings({ ...mappings, [header]: selectedBackendField });
  // };


  useEffect(() => {
    if (!file || headers.length === 0) {
      // toast.error('Missing file or h eader data. Please upload again.');
      navigate('/upload');
    }
  }, [file, headers, navigate]);


  // const options = [
  //   { value: "", label: "Select mapping..." },
  //   { value: "Test Case Name", label: "Test Case Name" },
  //   { value: "Test Steps", label: "Test Steps" },
  //   { value: "Expected Result", label: "Expected Result" },
  //   { value: "Test Data", label: "Test Data" },
  //   { value: "Precondition", label: "Precondition" },
  // ];


  const allRequiredMapped = requiredFields.every((field) => Object.values(mappings).includes(field));

  const hasAnySelection = Object.values(mappings).some(Boolean);

  const handleChange = (field: string) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // prevent duplicate mapping selection
    if (Object.values(mappings).includes(value) && value !== mappings[field] && value !== "") {
      setError(`"${value}" has already been selected in another field.`);
      return;
    }

    setError("");
    setSuccess(false); // hide success banner on any change
    setSaved(false);   // require saving again after change
    setMappings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!file) {
      // toast.error('❌ No file found to upload.');
      return;
    }

    const selectedFields = Object.values(mappings).filter(
      (v) => v && v !== 'Ignore'
    );
    const uniqueValues = new Set(selectedFields);

    if (selectedFields.length !== uniqueValues.size) {
      // toast.error('⚠️ Each backend field should be mapped uniquely.');
      return;
    }

    const backendMapping = {};
    Object.entries(mappings).forEach(([header, backendField]) => {
      if (backendField && backendField !== 'Ignore') {
        backendMapping[backendField] = header;
      }
    });
    const requiredFields = ['test_id', 'steps', 'expected_result', 'test_data'];

    requiredFields.forEach((field) => {
      if (!backendMapping[field]) {
        backendMapping[field] = ''; // Assign empty string if not mapped
      }
    });
    if (Object.values(backendMapping).length === 0) {
      // toast.error('❌ No valid mappings found.');
      return;
    }

    navigate('/customloader', {
      state: {
        file,
        sheet_name: sheetName,
        header_starts: headerStarts,
        column_mapping: backendMapping,
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
            const ok = selectedFields?.includes(field);
            return (
              <span
                key={field}
                className={
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
        {headers.map((item) => {
          const selectedValue = mappings[item.field] || "";
          const showCheck = !!selectedValue;

          return (
            <div
              key={item.field}
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
                    <div className="text-gray-400 text-sm">{item.col}</div>
                  </div>
                </div>

                {/* Select + status */}
                <div className="flex items-center gap-2 w-[50%]">
                  <div className="relative flex-1">
                    <select
                      value={mappings[item]}
                      onChange={(e) => handleChange(header, e.target.value)}
                      disabled={saved && !!selectedValue}
                      className="appearance-none w-full bg-[#141428] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
                    >
                      {requiredFields.map((option) => (
                        <option key={option} value={option}>
                          {option.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                    <KeyboardArrowDownIcon className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>

                  {/* Filled green check */}
                  {showCheck && (
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                      <CheckIcon className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}

                  {/* Edit (after saved) */}
                  {showCheck && saved && (
                    <button
                      onClick={() => { setMappings((p) => ({ ...p, [item.field]: "" })); setSaved(false); setSuccess(false); }}
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
          <div className="max-w-5xl mx-auto mb-4">
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
        <div className="flex justify-between mt-6">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 flex items-center gap-2">
            <ArrowBackIosNewIcon className="w-4 h-4" /> Back
          </button>

          <button
            disabled={!allRequiredMapped || !saved}
            onClick={() => {
              if (allRequiredMapped && saved) setSuccess(true);
            }}
            className={`px-4 py-2 rounded-md flex items-center gap-2
              ${!allRequiredMapped || !saved
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
