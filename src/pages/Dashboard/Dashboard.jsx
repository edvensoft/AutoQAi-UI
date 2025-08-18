import React from 'react';
import AutomationAnalysis from './AutomationAnalysis';
import PerformanceMetrics from './PerformanceMetrics';
import Pages from './Pages';
import ApexChartsExample from './ApexChartExample';
import Header from '@/layout/Header';

const Dashboard = () => {
  return (
    <div className='p-10 bg-[#0f0f1a] w-full m-auto'>
        <Header />
        <h3 className='text-3xl font-bold mt-5 mb-5'>
			Dashboard
			</h3>
        <AutomationAnalysis/>
        <PerformanceMetrics/>
        <Pages/>
        {/* <ApexChartsExample/> */}
    </div>
  )
}

export default Dashboard