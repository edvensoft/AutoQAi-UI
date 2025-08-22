import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <svg className="text-blue-500" xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16"><path fill="currentColor" d="M12.736.064c.52.2.787.805.598 1.353L8.546 15.305c-.19.548-.763.83-1.282.631c-.52-.2-.787-.805-.598-1.353L11.454.695c.19-.548.763-.83 1.282-.631M2.414 8.256L5.95 11.99c.39.412.39 1.08 0 1.492a.963.963 0 0 1-1.414 0L.293 9.003a1.1 1.1 0 0 1 0-1.493l4.243-4.48a.963.963 0 0 1 1.414 0a1.1 1.1 0 0 1 0 1.494zm15.172 0L14.05 4.524a1.1 1.1 0 0 1 0-1.493a.963.963 0 0 1 1.414 0l4.243 4.479c.39.412.39 1.08 0 1.493l-4.243 4.478a.963.963 0 0 1-1.414 0a1.1 1.1 0 0 1 0-1.492z"/></svg>,
    title: "API Testing",
    description:
      "Comprehensive API testing framework with automated validation and reporting capabilities.",
    linkText: "25 Test Cases",
    linkColor: "text-blue-400",
     link:"/project/api-testing-suite"
  },
  {
    icon:  <svg  className="text-purple-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 8.04L7.878 20.164a2.857 2.857 0 1 1-4.041-4.04L15.959 4M7 13h8m4 2l1.5 1.6a2 2 0 1 1-3 0zM15 3l6 6"/></svg>,
    title: "Test Cases Generator",
    description:
      "AI-powered test case generation tool for automated test scenario creation.",
    linkText: "Auto Generate",
    linkColor: "text-purple-400",
    link:"/project/manual-test-cases",
  },
  {
    icon:  <svg className="text-green-500" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><path fill="currentColor" d="M32.5 3h-29A1.5 1.5 0 0 0 2 4.5v21A1.5 1.5 0 0 0 3.5 27h29a1.5 1.5 0 0 0 1.5-1.5v-21A1.5 1.5 0 0 0 32.5 3M32 25H4V5h28Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M7.7 8.76h20.43l1.81-1.6H6.1V23h1.6z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M26 32h-1.74a3.6 3.6 0 0 1-1.5-2.52v-1.35h-1.52v1.37a4.2 4.2 0 0 0 .93 2.5h-8.34a4.2 4.2 0 0 0 .93-2.52v-1.35h-1.52v1.37a3.6 3.6 0 0 1-1.5 2.5h-1.8a1 1 0 1 0 0 2h16.12a.92.92 0 0 0 1-1A1 1 0 0 0 26 32" class="clr-i-outline clr-i-outline-path-3"/><path fill="none" d="M0 0h36v36H0z"/></svg>,
    title: "UI Automation",
    description:
      "Automated UI testing framework for web applications with cross-browser support.",
    linkText: "18 Scenarios",
    linkColor: "text-green-400",
    link:"/project/ui-automation"
  },
  {
    icon:  <svg className="text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20 18c0 2.21-3.582 4-8 4s-8-1.79-8-4v-4.026c.502.617 1.215 1.129 2.008 1.525C7.58 16.285 9.7 16.75 12 16.75s4.42-.465 5.992-1.25c.793-.397 1.506-.91 2.008-1.526z"/><path fill="currentColor" d="M12 10.75c2.3 0 4.42-.465 5.992-1.25c.793-.397 1.506-.91 2.008-1.526V12c0 .5-1.786 1.591-2.679 2.158c-1.323.661-3.203 1.092-5.321 1.092s-3.998-.43-5.321-1.092C5.5 13.568 4 12.5 4 12V7.974c.502.617 1.215 1.129 2.008 1.525C7.58 10.285 9.7 10.75 12 10.75"/><path fill="currentColor" d="M17.321 8.158C15.998 8.819 14.118 9.25 12 9.25s-3.998-.43-5.321-1.092c-.515-.202-1.673-.843-2.477-1.879a.8.8 0 0 1-.162-.621c.023-.148.055-.301.096-.396C4.828 3.406 8.086 2 12 2s7.172 1.406 7.864 3.262c.041.095.073.248.096.396a.8.8 0 0 1-.162.621c-.804 1.036-1.962 1.677-2.477 1.879"/></svg>,
    title: "Database Testing",
    description:
      "Database validation and performance testing tools for data integrity verification.",
    linkText: "12 Queries",
    linkColor: "text-yellow-400",
  },
];

export default function Pages() {
  const navigate=useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#0f1120] mt-4">
      {features.map((item, index) => (
        <div
          key={index}
          className="bg-[#181a2e] border border-gray-700 rounded-xl p-6 flex flex-col justify-between hover:border-gray-500 transition"
          onClick={()=>{
navigate(item.link);
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#1f2238]">{item.icon}</div>
            <h2 className="text-white font-bold text-lg">{item.title}</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">{item.description}</p>
          <div className="flex justify-between items-center">
            <a
              href="#"
              className={`${item.linkColor} text-sm font-semibold hover:underline`}
            >
              {item.linkText}
            </a>
            <span className="text-gray-500 text-xl">&rarr;</span>
          </div>
        </div>
      ))}
    </div>
  );
}
