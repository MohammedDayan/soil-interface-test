'use client'
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import ParameterForm from '../components/ParameterForm' 

import GraphPage from '../components/GraphPCyclic';
import GraphPageStatic from '../components/GraphPStatic';
import { Transition } from "@headlessui/react";
import GraphIllustration from "../components/GraphIllustration";
import Header from '../components/loggedmenu';
import LineGraph from '../components/d3matploty';

interface DashboardLayoutProps {
  Load: (loading: boolean) => void;
}
interface Data {
  x: number;
  y: number;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ Load }) => {
  const [activeTab, setActiveTab] = useState('tab1'); // Default active tab
  const [graphPage, setGraphPage] = useState(false);
  const [showGraph1, setShowGraph1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloadTransition, setReloadTransition] = useState(false);

  const [data, setData] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data[]>([]);
  const [data3, setData3] = useState<Data[]>([]);

  const onDataLoaded = (
    rearrangedData: Data[],
    rearrangedData2: Data[],
    rearrangedData3: Data[]
  ) => {
    console.log("reloadingd triggered")
    setData(rearrangedData);
    setData2(rearrangedData2);
    setData3(rearrangedData3);
    setLoading(false);
  };
  
  const handleDownloadExcel = () => {
    const dataToExport = [
      ['X', 'Y'], // Header row
      ...data.map(item => [item.x, item.y]) // Data rows
    ];

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Add a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    // Generate a binary string from the workbook
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // Convert the binary string to a Blob
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    // Create a download link
    const url = URL.createObjectURL(blob);
    // Initiate the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    // Clean up
    URL.revokeObjectURL(url);
  };
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubmit = (formData: FormData) => {
    setLoading(true);
   
    console.log("logging within Dashboard right before API call");
    console.log(JSON.stringify(formData));
  
    fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok) {
        console.log('Form submitted successfully');
        // Load(true);
      } else {
        console.error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      console.log("Submit API call is complete");
      setGraphPage(true); // removes the graph plot illustration and displays the graph    
      setShowGraph1(true) //shows the first static graph
      setReloadTransition(prevState => !prevState); //toggles the staticci graph to reload
    });

    
  };

  const toggleGraph = () => {
    setLoading(true);
    setTimeout(() => {
      setShowGraph1(true);
      setLoading(false);
    }, 1000);
  };

  const toggleGraph1 = () => {
    setTimeout(() => {
      setShowGraph1(false);
    }, 1000);
  };

  return (
    <> 
    <Header></Header>
    <div className="flex flex-col h-screen">
      {/* Top Menu Bar */}
    
      {/* Left Panel */}
      <div className="flex-1 flex">
      
        <div className="w-1/3 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-2">
        <div className=" text-white bg-gradient-to-r from-gray-900 to-gray-800  p-2">
        {/* Tabs */}
        <div className="flex">
          <button
            className={`mr-2 px-3 py-1 text-sm focus:outline-none ${
              activeTab === 'tab1' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
            onClick={() => handleTabClick('tab1')}
          >
            Model Parameters
          </button>
          <button
            className={`mr-2 px-3 py-1 text-sm focus:outline-none ${
              activeTab === 'tab2' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
            onClick={() => handleTabClick('tab2')}
          >
            Loading Inputs
          </button>
          {/* Add more tabs if needed */}
        </div>
      </div>
          {/* Tab Content */}
          <div>
            {activeTab === 'tab1' &&
              <div>
                Input Model Parameters
                <ParameterForm onSubmit={handleSubmit} />
              </div>}
            {/* Add more tab content if needed */}
          </div>
        </div>
        {/* Main Page */}
        <div className="flex-1 bg-gray-200 p-4">
          {/* Content from Page */}
          <div>
           
          { graphPage? (
 // Render loading indicator when loading is 
 <div>
        
        <div className="">
          {/* Static button */}
          <button
            onClick={() => {
              setShowGraph1(true); 
              // setLoading(true);
            }}
            className= {`bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${showGraph1 ? "bg-blue-700" : "bg-gray-700"}`}
            disabled={showGraph1}
          >
            Static
          </button>
          {/* Cyclic button */}
          <button
            onClick={() => {
              setShowGraph1(false); 
              // setLoading(true);
            }}
            className={`ml-2 bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${!showGraph1 ? "bg-blue-700" : "bg-gray-700"}`}
            disabled={!showGraph1}
          >
            Cyclic
          </button>
          {/* Loader */}
       
        </div>
        <div className="mt-2">
          {/* Conditional rendering based on state */}
          {/* <Transition
            show={showGraph1}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
            {showGraph1 ? (
  loading ? (
    <div>Loading...</div>
  ) : (
    <>
          <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <div className="w-1/2 bg-gray-200 p-4">
          <p className="text-center">Tangential Displacment(m) against Normal Displacment (m)</p>
            <LineGraph data={data} />
          </div>
          <div className="w-1/2 bg-gray-200 p-4">
          <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
            <LineGraph data={data2} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-gray-200 p-4">
          <p className="text-center"> Normal Stress (Pa) against Shear Stress (Pa)</p>
            <LineGraph data={data3} />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download Excel
        </button>
      </div>

      <GraphPageStatic key={reloadTransition.toString()} onDataLoaded={onDataLoaded} />
    </>
  )
) : (
  <GraphPage />
)}
            
            
          
          {/* </Transition> */}
          {/* <Transition
            show={!showGraph1}
            enter="transition-opacity duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
            {/* <Graph shouldFetchData={graphPage} onFetchComplete={handleFetchComplete} /> */}
            
          {/* </Transition> */}
        </div>  
      </div>
        )
        : (
          <GraphIllustration />
      
      )}

          </div>
        </div>
      </div>
    </div>
    </>
     );
};


export default DashboardLayout;
