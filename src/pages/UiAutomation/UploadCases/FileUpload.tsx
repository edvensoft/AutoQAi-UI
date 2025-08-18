import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { ChangeEvent } from "react";
import TaskIcon from "@mui/icons-material/Task";
import ClearIcon from "@mui/icons-material/Clear";
import * as XLSX from "xlsx";
import { useNavigate } from 'react-router-dom';
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/redux/store";

// =================== Types ===================
interface FormValues {
  file?: File | null;
  test_suite_name?: string;
  sheet_name?: string;
  header_starts?: string;
}

interface FormErrors {
  file?: string | null;
  test_suite_name?: string | null;
  sheet_name?: string | null;
  header_starts?: string | null;
}

interface WorkbookState {
  sheetNames: string[];
  wb: XLSX.WorkBook;
}

interface FileUploadProps {
  template: string;
  setEnable: (val: { isError?: boolean; hasValue?: boolean }) => void;
}

export interface FileUploadRef {
  isError?: boolean;
  hasValue?: boolean;
  onSave?: () => void;
  handleSheetConfirm?: () => void;
}

// =================== Regex ===================
const allowedExtensions = /\.(csv|xls|xlsx)$/i;

// =================== Component ===================
const FileUpload = forwardRef<FileUploadRef, FileUploadProps>(
  ({ template, setEnable }, ref) => {
    const [formValues, setFormValues] = useState<FormValues>({
      file: null,
      test_suite_name: "",
      sheet_name: "",
      header_starts: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
      file: null,
      test_suite_name: null,
      sheet_name: null,
      header_starts: null,
    });
    const [webBooks, setWebBooks] = useState<WorkbookState | null>(null);
    const [showSheetSelector, setShowSheetSelector] = useState(false);
    const navigate = useNavigate();
    const { projectId } = useParams()
    // ---------- Memoized values ----------
    const isError = useMemo(
      () => Object.values(formErrors).some((error) => !!error),
      [formErrors]
    );

    const hasValue = useMemo(
      () =>
        Object.entries(formValues).every(
          ([key, value]) => template === "Standard Template" && (key === "sheet_name" || key === "header_starts") ? true : value !== null && value !== ""
        ),
      [formValues]
    );

    // ---------- Enable/Disable Parent ----------
    useEffect(() => {
      setEnable({ isError, hasValue });
    }, [isError, hasValue]);

    // ---------- Imperative handle ----------
    useImperativeHandle(ref, () => ({
      isError,
      hasValue,
      onSave: () => {
        if (template) {
          // navigate(`/project/ui-automation/loader/${projectId}`, { state: { formValues } });
          navigate(`/project/ui-automation/loader/`, { state: { formValues } });

        }
        console.log("Save clicked", formValues, webBooks);
      },
      handleSheetConfirm: () => {
        if (!formValues.sheet_name || !webBooks?.wb) return;

        const sheet = webBooks.wb.Sheets[formValues.sheet_name];
        if (!sheet) return;

        const parsedRows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          range: Number(formValues.header_starts) - 1,
        });

        if (!parsedRows.length || !parsedRows[0]) return;

        // const headers = parsedRows[0].filter(
        //   (cell) => cell && cell.toString().trim() !== ""
        // );

        // parsedRows is an array of arrays (rows)
        const headers: string[] = (parsedRows[0] as (string | number | null | undefined)[])
          .filter((cell): cell is string | number => cell !== null && cell !== undefined && cell.toString().trim() !== "")
          .map(cell => cell.toString());


        if (!headers.length) return;

        // navigate(`/project/ui-automation/column-mapping/${projectId}`, {
        //   state: {
        //     ...formValues,
        //     rows: parsedRows,
        //     headers
        //   },
        // });
         navigate(`/project/ui-automation/column-mapping/`, {
          state: {
            ...formValues,
            rows: parsedRows,
            headers
          },
        });
      },
    }));
    console.log(webBooks, "webbooks")
    // ---------- Validation ----------
    const validateExcelSheetName = (name: string): string | null => {
      // if (!name.trim()) return "Sheet name cannot be empty or only spaces.";
      if (name.length > 31) return "Sheet name cannot exceed 31 characters.";
      if (/[\\\/\?\*\[\]:]/.test(name))
        return "Sheet name cannot contain \\ / ? * [ ] : characters.";
      if (name.startsWith("'") || name.endsWith("'"))
        return "Sheet name cannot begin or end with a single quote (').";
      if (!webBooks?.sheetNames.includes(name))
        return "Sheet name does not exist in the workbook.";
      return null;
    };

    const validateTestSuiteName = (name: string): string | null => {
      if (!name.trim()) return "Test suite name is required.";
      if (!/^(?=.{3,50}$)(?! )[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(name))
        return "Test suite name must be 3–50 characters, start with a letter/number, and can contain spaces, underscores, or hyphens.";
      return null;
    };

    // ---------- Handlers ----------
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setFormValues((prev) => ({ ...prev, file }));

      if (!allowedExtensions.test(file.name)) {
        setFormErrors((prev) => ({ ...prev, file: "Invalid file type" }));
        return;
      }

      setFormErrors((prev) => ({ ...prev, file: null }));

      if (template !== "standard") {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (!e.target?.result) return;
          const data = new Uint8Array(e.target.result as ArrayBuffer);
          const wb = XLSX.read(data, { type: "array" });
          setWebBooks({ sheetNames: wb.SheetNames, wb });
          setShowSheetSelector(true);
        };
        reader.readAsArrayBuffer(file);
      }
    };

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));

      if (name === "sheet_name") {
        setFormErrors((prev) => ({
          ...prev,
          [name]: validateExcelSheetName(value),
        }));
      } else if (name === "header_starts") {
        setFormErrors((prev) => ({
          ...prev,
          [name]: /^\d+$/.test(value) ? null : "Value must be a number",
        }));
      } else if (name === "test_suite_name") {
        setFormErrors((prev) => ({
          ...prev,
          [name]: validateTestSuiteName(value),
        }));
      }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const formatFileSizeMB = (bytes?: number) => {
      if (!bytes) return "";
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    // ---------- JSX ----------
    return (
      <div className="mt-6 min-h-screen text-white space-y-6">
        <h2 className="text-lg font-semibold mb-4">Upload Your File</h2>

        {/* Test Suite Name */}
        <label className="block mb-2 text-sm font-medium">
          Test Suite Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="test_suite_name"
          value={formValues.test_suite_name}
          onChange={handleValueChange}
          placeholder="e.g., Regression, Sanity, Smoke, Integration"
          className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-0"
        />
        {formErrors.test_suite_name && (
          <p className="text-xm text-red-500 mt-1">
            {formErrors.test_suite_name}
          </p>
        )}

        {/* File Upload Box */}
        <div className="mt-4 p-6 border-2 border-dashed border-gray-600 rounded-lg bg-[#1a1a2e] text-center">
          <CloudUploadIcon className="mb-2 text-blue-400" />
          <p className="text-mb text-white-500 mb-2">Upload CSV or Excel File</p>
          <p className="text-sm text-gray-400 mb-4">Drag and drop or click to browse</p>
          <label>
            <input
              type="file"
              accept=".csv,.xls,.xlsx"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Browse Files
            </span>
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Supported formats: CSV, XLS, XLSX (Max 10MB)
          </p>
        </div>

        {/* File Info */}
        {formValues.file && (
          <div className="flex items-center justify-between rounded-lg bg-[#0f0f1a] p-3 border border-gray-700 mt-2">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#0A3E1E]">
                <TaskIcon className="text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white truncate max-w-[220px]">
                  {formValues.file.name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatFileSizeMB(formValues.file.size)}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setFormValues({
                  file: null,
                  test_suite_name: formValues.test_suite_name,
                  sheet_name: "",
                  header_starts: "",
                });
                setShowSheetSelector(false);
              }}
              className="text-red-500 hover:text-red-400"
            >
              <ClearIcon />
            </button>
          </div>
        )}

        {/* Sheet Selector */}
        {showSheetSelector && (
          <div className="flex gap-2 mt-4">
            {/* Sheet Name */}
            {/* <div className="w-[50%]">
              <label className="block mb-2 text-sm font-medium">
                Sheet Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="sheet_name"
                value={formValues.sheet_name}
                onChange={handleValueChange}
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {formErrors.sheet_name && (
                <p className="text-xm text-red-500 mt-2">
                  {formErrors.sheet_name}
                </p>
              )}
            </div> */}
            <div className="w-[50%]">
              <label className="block mb-2 text-sm font-medium">
                Sheet Name<span className="text-red-500">*</span>
              </label>
              <div className="relative flex-1">
                <select
                  value={formValues?.sheet_name}
                  name="sheet_name"
                  onChange={(e) => handleChange(e)}
                  // className="appearance-none w-full p-2 bg-[#0f0f1a] border border-gray-600 text-white text-sm px-4 py-2 rounded-md pr-8"
                   className="appearance-none w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option key="" value="">
                      Select
                    </option>
                  {(webBooks?.sheetNames || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <KeyboardArrowDownIcon className="absolute right-3 top-2.5 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>


              {/* {!selectedFields?.mappedFields?.includes(item) && (
                      <span className="absolute right-[-10%] top-2.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                        <CheckIcon className="w-3.5 h-3.5 text-black bg-green" style={{ fontSize: "15px" }} />
                      </span>
                    )} */}
            </div>

            {/* Header Starts */}
            <div className="w-[50%]">
              <label className="block mb-2 text-sm font-medium">
                Header Starts <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="header_starts"
                value={formValues.header_starts}
                onChange={handleValueChange}
                className="w-full p-2 rounded bg-[#0f0f1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {formErrors.header_starts && (
                <p className="text-xm text-red-500 mt-2">
                  {formErrors.header_starts}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default FileUpload;
