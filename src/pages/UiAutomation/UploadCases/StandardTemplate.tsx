// import React from 'react'
import DownloadIcon from '@mui/icons-material/Download';

const StandardTemplate = () => {

   const handleDownload = () => {
    const url = '/StandardTestCase.xlsx';
    const link = document.createElement('a');
    link.href = url;
    link.download = 'standard_format.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
       <div className="bg-[#0f0f1a] mt-6 rounded-lg p-4 border border-gray-700">
        <h2 className="text-lg font-semibold mb-2">Standard Template Download</h2>
        <p className="text-sm text-gray-400 mb-4">
          Download our sample template to see the expected format and structure
        </p>
        <button className="bg-purple-400 hover:bg-purple-600 text-white px-4 py-2 rounded" onClick={()=>{
          handleDownload()
        }}>
          <DownloadIcon/> Download Sample Template
        </button>
      </div>
  )
}

export default StandardTemplate