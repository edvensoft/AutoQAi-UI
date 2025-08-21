import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '@/config';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

function Loader() {
  const location = useLocation();
  const navigate = useNavigate();
  // const {projectId}=useParams()
  const projectId = useSelector((state) => state.appState.project_id);

  const hasSubmitted = useRef(false);

  useEffect(() => {
    const formValues = location.state?.formValues;
    console.log(formValues, "formvalues")
    if (!formValues?.file) {
      // toast.error("❌ No file data found.");
      navigate('/');
      return;
    }

    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const navigatePrevious = (error) => {
      toast.error("There is an Error in Execution!");
      if (formValues?.column_mapping) {
        navigate("/project/ui-automation/column-mapping/");
      } else {
        navigate("/project/ui-automation/", {
          state: {
            ...(location?.state || {}),
            from: "column-mapping",
          },
          replace: true,
        });
      }
    };

    const submitStandardFile = async () => {
      const formData = new FormData();
      Object.entries(formValues).map(([keyframes, value]) => {
        formData.append(keyframes, keyframes === "column_mapping" ? JSON.stringify(value) : value);
      })
      formData.append("project_id", projectId)
      formData.append('llm', '1');
      formData.append('is_custom_test_case', formValues?.column_mapping ? "1" : "0");



      try {
        axios.post(`${API_URL}/v1/api/ui-automation/upload-testcase/`, formData).then((response)=>{
                    console.log(response,"testResult")
        const testResult = response?.data; 
           navigate(`/project/ui-automation/execution/`, { state: { testResult } }); 
        }).catch((e)=>{
          console.log(e,"error")
           navigatePrevious()
        });
  

         
     

      } catch (error) {
      
            console.log(error,"error")
      }
    };

    submitStandardFile();
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <ToastContainer/>
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full color-white animate-spin mb-4" />
      <p className="text-white-600 text-lg font-medium">Executing... Please wait</p>
    </div>
  );
}

export default Loader;