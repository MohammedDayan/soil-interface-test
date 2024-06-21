'use client'
import React, {FC, useState,FormEvent } from 'react';
import ParameterForm from '../components/ParameterForm' 
import ParameterInputField from "../components/ParameterInputField";
import GraphPage from '../components/GraphPCyclic';
import GraphPageStatic from '../components/GraphPStatic';
import { Transition } from "@headlessui/react";
import GraphIllustration from "../components/GraphIllustration";
import Header from '../components/loggedmenu';

interface ShearTest {
  Load: (loading: boolean) => void;
}

const ShearTest: React.FC<ShearTest> = ({ Load }) => {
  const [activeTab, setActiveTab] = useState('tab1'); // Default active tab
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [graphPage, setGraphPage] = useState(false);
  const [showGraph1, setShowGraph1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadTransition, setReloadTransition] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const handleSubmit  = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        
      } else {
        console.error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      console.log("Submit API call is complete");
      setLoading(false);
      setReloadTransition(prevState => !prevState);
      setGraphPage(true);
      setShowGraph1(true)
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
          <button
            className={`mr-2 px-3 py-1 text-sm focus:outline-none ${
              activeTab === 'tab3' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
            onClick={() => handleTabClick('tab3')}
          >
            Initial Condition
          </button>
          {/* Add more tabs if needed */}
        </div>
      </div>
          {/* Tab Content */}
          <div>
            {activeTab === 'tab1' &&
              <div>
                Input Model Parameters
                <form id="engineeringForm" className="text-gray-900" method="post" onSubmit={handleSubmit}>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
  <div className="col-span-1 md:col-span-2 lg:col-span-3">

  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="Dn0(Pa)" id="dn0" name="dn0" icon="Δn₀" type="text" onChange={handleChange} 
required />
    <ParameterInputField label="Dt0(Pa)" id="dt0" name="dt0" icon="Δt₀" type="text" onChange={handleChange} required />
  </div>

  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="μc" id="mu" name="mu" icon="μ" type="text" onChange={handleChange} required />
    <ParameterInputField label="ec0" id="ec0" name="ec0" icon="e₀" type="text" onChange={handleChange} required />
  </div>

  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="lambda" id="lambda" name="lambda" icon="λ" type="text" onChange={handleChange} required />
    <ParameterInputField label="Kd" id="kd" name="kd" icon="Kd" type="text" onChange={handleChange} required />
  </div>

  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="A0" id="a0" name="a0" icon="A₀" type="text" onChange={handleChange} required />
  <ParameterInputField label="Kf" id="kf" name="kf" icon="Kf" type="text" onChange={handleChange} required />
  </div>         
   
  </div>
  <div className="col-span-1 md:col-span-2 lg:col-span-3">
  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="Kp0" id="kp0" name="kp0" icon="Kp₀" type="text" onChange={handleChange} required />
    <ParameterInputField label="m" id="m" name="m" icon="m" type="text" onChange={handleChange} required />
  </div>
  <div className="grid grid-cols-2 gap-4">  
  <ParameterInputField label="br1(Pa)" id="br1" name="br1" icon="br₁" type="text" onChange={handleChange} required />
    <ParameterInputField label="br2" id="br2" name="br2" icon="br₂" type="text" onChange={handleChange} required />
  </div>
  <div className="grid grid-cols-2 gap-4">  
    <ParameterInputField label="Patm(Pa)" id="patm" name="patm" icon="Pₐₜₘ" type="text" onChange={handleChange} required />
    <ParameterInputField label="Thickness(m)" id="thickness" name="thickness" icon="t" type="text" onChange={handleChange} required />
  </div>
  </div>
</div>
<div className="flex justify-center">
  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" disabled={loading}>
    {loading ? 'Loading...' : 'Submit'}
  </button>
</div>

</form>
              </div>}
              <div>
  {activeTab === 'tab2' &&
              <div>
                Loading Input
                <form id="engineeringForm" className="text-gray-900" method="post" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">  
                
                 <ParameterInputField
        label="Tang. Disp Max (m)"
        id="tangDispMax"
        name="tangDispMax"
        icon="⇑"
        type="text"
        onChange={handleChange}
        required
      />
      <ParameterInputField
        label="Tang. Disp Min (m)"
        id="tangDispMin"
        name="tangDispMin"
        icon="⇓"
        type="text"
        onChange={handleChange}
        required
      />
      </div>
                 <div className="grid grid-cols-2 gap-4">  
                 <ParameterInputField
        label="Number of Cycle"
        id="numCycle"
        name="numCycle"
        icon="🔄"
        type="number"
        onChange={handleChange}
        required
      />
      <ParameterInputField
        label="Number of Increment"
        id="numIncrement"
        name="numIncrement"
        icon="➕"
        type="number"
        onChange={handleChange}
        required
      />
                 </div>
                </form>
                </div>
                
              
          }
  </div>


  <div>
  {activeTab === 'tab3' &&
              <div>
                Initial Condition
                <form id="engineeringForm" className="text-gray-900" method="post" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">  
                
                <ParameterInputField
        label="Sigma-n0 (Pa)"
        id="sigmaN0"
        name="sigmaN0"
        icon="σ"
        type="text"
        onChange={handleChange}
        required
      />
      <ParameterInputField
        label="Initial Void Ratio (e0)"
        id="initialVoidRatio"
        name="initialVoidRatio"
        icon="e₀"
        type="text"
        onChange={handleChange}
        required
      />
      
      </div>
                 <div className="grid grid-cols-2 gap-4">  
                 <ParameterInputField
        label="Normal Stiffness (Pa/m)=-K"
        id="normalStiffness"
        name="normalStiffness"
        icon="K"
        type="text"
        onChange={handleChange}
        required
      />
                 </div>
                </form>
                </div>
                
              
          }
  </div>
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
            { showGraph1?(
              <GraphPageStatic key={reloadTransition.toString() }  ></GraphPageStatic>
            ):
            // <GraphPage></GraphPage>
            <div></div>
            }   
            
            
          
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
        : 
        
        (
        <>
        <div>

        {activeTab === 'tab1' &&
              <div             
              >

<GraphIllustration />
              </div>
        }

        </div>

        <div>

{activeTab === 'tab2' &&
      <div             
      >
          hi
      </div>
}

</div>
<div>

{activeTab === 'tab3' &&
      <div             
      >
          hello
      </div>
}

</div>
        </>
          
      
      )}

          </div>
        </div>
      </div>
    </div>
    </>
     );
};


export default ShearTest;
