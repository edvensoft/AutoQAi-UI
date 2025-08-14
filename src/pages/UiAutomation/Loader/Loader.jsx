import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';

function Loader() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasSubmitted = useRef(false);

  useEffect(() => {
    const formValues = location.state?.formValues;
    console.log(formValues,"formvalues")
    if (!formValues?.file) {
      // toast.error("❌ No file data found.");
      navigate('/');
      return;
    }

    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    const submitStandardFile = async () => {
      const formData = new FormData();
      Object.entries(formValues).map(([keyframes,value])=>{
        formData.append(keyframes,value);
      })
      // formData.append('file', f);
      formData.append('llm', '1');
      formData.append('is_custom_test_case', '0');

      try {
        const response = await axios.post('http://13.203.56.29/api/testcases/', formData);
        const testResult = response.data; // make sure your API returns the test data

        // toast.success('✅ File uploaded successfully!');
        navigate('/project/ui-automation/execution', { state: { testResult } }); // pass result to execution
      } catch (error) {
        // toast.error('❌ Upload failed!');
        navigate('/');
      }
    };

    submitStandardFile();
  }, [location.state, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full color-white animate-spin mb-4" />
      <p className="text-white-600 text-lg font-medium">Executing... Please wait</p>
    </div>
  );
}

export default Loader;