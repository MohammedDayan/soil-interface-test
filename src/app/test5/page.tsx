'use client'
import React, {FC, useRef, useState, useEffect, FormEvent} from 'react';
import ParameterForm from '../components/ParameterForm'
import ParameterInputField from "../components/ParameterInputField";
import GraphPage from '../components/GraphPCyclic';
import GraphPageStatic from '../components/GraphPStatic';
import {Transition} from "@headlessui/react";
import GraphIllustration from "../components/GraphIllustration";
import Header from '../components/loggedmenu';
import LineGraph from '../components/d3matploty';
import LineGraph2 from '../components/cylic2ndplot';
import BottomGraph from '../components/buttoncyclicplot';
import * as XLSX from 'xlsx';
import {Progress} from "@nextui-org/progress";
import ProgressBar from '@ramonak/react-progress-bar';
import GraphIllustrationloadinginput from '../components/GraphIllustrationloadinginput';
import GraphIllustrationinitialinput from '../components/GraphIllustrationinitialinput';
import PlotComponent from '../components/newplot';
import io from 'socket.io-client';
import { BounceLoader } from 'react-spinners';
const socket = io('http://127.0.0.1:5000/');

interface ShearTest {
    Load: (loading: boolean) => void;
}

interface DataPoint {
    x: number;
    y: number;
}

const ShearTest: React.FC<ShearTest> = ({Load}) => {
    const [activeTab, setActiveTab] = useState('tab1'); // Default active tab
    const [formData, setFormData] = useState({
        dn0: '12.0d6',
        dt0: '10.0d6',
        mu: '0.3',
        ec0: '0.52',
        lambda: '0.007',
        kd: '15.0',
        a0: '0.07',
        kf: '0.3',
        kp0: '0.04',
        m: '0.0045',
        br1: '1.0d6',
        br2: '1.0d0',
        patm: '100000d0',
        thickness: '0.02',
        tangDispMax: '0.003',
        tangDispMin: '-0.003',
        numCycle: '20',
        numIncrement: '500',
        sigmaN0: '200d3',
        initialVoidRatio: '0.469',
        normalStiffness: '-100d6'
    });
//   const [formData, setFormData] = useState<FormData>({} as FormData);
    const [graphPage, setGraphPage] = useState(false);
    const [showGraph1, setShowGraph1] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [reloadTransition, setReloadTransition] = useState(false);
    const [data, setData] = useState<DataPoint[]>([]);
    const [data2, setData2] = useState<DataPoint[]>([]);
    const [data3, setData3] = useState<DataPoint[]>([]);

    const [datac, setDatac] = useState<DataPoint[]>([]);
    const [datac2, setDatac2] = useState<DataPoint[]>([]);
    const [datac3, setDatac3] = useState<DataPoint[]>([]);
    const [reloadCyclicG, setReloadCyclic] = useState(false);
    const [progress, setProgress] = useState(0); // Progress state
    // Define a default value for currentGraph
    const defaultCurrentGraph = true;
    const form1Ref = useRef<HTMLFormElement>(null);
    const form2Ref = useRef<HTMLFormElement>(null);
    const form3Ref = useRef<HTMLFormElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use useEffect to trigger animation when component mounts
    useEffect(() => {
      setIsVisible(true);
    }, []);
    
    // Retrieve the value from local storage or use the default value
    const getStoredValue = () => {
        if (typeof window !== 'undefined') {
            const storedValue = window.localStorage.getItem('currentGraph');
            return storedValue !== null ? JSON.parse(storedValue) : defaultCurrentGraph;
        }
        return defaultCurrentGraph;
    };

    const [currentGraph, setCurrentGraph] = useState(getStoredValue());

    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('currentGraph', JSON.stringify(currentGraph));
        }
    }, [currentGraph]);

    console.log("is the page being reloaded??")


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleButtonClick = () => {
        if (form1Ref.current) form1Ref.current.requestSubmit();
        if (form2Ref.current) form2Ref.current.requestSubmit();
        if (form3Ref.current) form3Ref.current.requestSubmit();
    };

    const resetReloadCyclicG = () => {
       
        setReloadCyclic(false);
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
                
                
                //checking status

                socket.on('status_update', (data) => {
                    console.log(`Status update received at ${new Date().toLocaleString()}:`, data);

                    if (data) {
                            
                              fetchData();
                              socket.off('status_update');
                    }


            });


                // const checkStatus = async () => {
                //     console.log("checking status ...")
                //     const response = await fetch('http://127.0.0.1:5000/status');
                //     const data = await response.json();
            
                //     if (data.complete) {
                //         //
                //       console.log("complete")
                //       fetchData();
                //       clearInterval(statusInterval);
                //     } else {
                //         console.log("processing")
                //     }
            
                // }
                
                // const statusInterval = setInterval(checkStatus, 2000); 

                //fetchind data
               
                // setTimeout(() => {
                //     fetchData();
                // }, 25000);

                //   setReloadTransition(prevState => !prevState);
                //   setGraphPage(true);
                //   setShowGraph1(true)

                
            });
    };


    
    
    const fetchData = async () => {
        try {
           
            const response = await fetch('http://127.0.0.1:5000/get_text_file');
            const response2 = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
            if (!response.ok || !response2.ok) {
                throw new Error('Failed to fetch data');
            }
            const rawData = await response.text();
            const rawData2 = await response2.text();
            

            const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
            const rearrangedData: DataPoint[] = rows.slice(1).map(row => ({
                x: parseFloat(row[2]),
                y: parseFloat(row[1])
            }));
            const rearrangedData2: DataPoint[] = rows.slice(1).map(row => ({
                x: parseFloat(row[2]),
                y: parseFloat(row[4])
            }));
            const rearrangedData3: DataPoint[] = rows.slice(1).map(row => ({
                x: parseFloat(row[3]),
                y: parseFloat(row[4])
            }));
            // data rearrangement for cylic
            const rowsc = rawData2.trim().split('\n').map(row => row.split(/\s+/));
            const rearrangedDatac: DataPoint[] = rowsc.slice(1).map(row => ({
                x: parseFloat(row[2]),
                y: parseFloat(row[1])
            }));
            const rearrangedDatac2: DataPoint[] = rowsc.slice(1).map(row => ({
                x: parseFloat(row[2]),
                y: parseFloat(row[4])
            }));
            const rearrangedDatac3: DataPoint[] = rowsc.slice(1).map(row => ({
                x: parseFloat(row[3]),
                y: parseFloat(row[4])
            }));



            setDatac(rearrangedDatac);
            setDatac2(rearrangedDatac2);
            setDatac3(rearrangedDatac3);

            setData(rearrangedData);
            setData2(rearrangedData2);
            setData3(rearrangedData3);

            setLoading(false);

            setGraphPage(true);
            setShowGraph1(currentGraph);
            

            
                            
         


        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);

        }
    };

    // useEffect(() => {
    //     if (!loading) {
    //         setProgress(0); // Reset progress when loading is false
    //     } else setProgress(2500);

    // }, [loading]);

    // useEffect(() => {
    //     let interval: NodeJS.Timeout | undefined;

    //     if (loading) {
    //         setProgress(0);
    //         interval = setInterval(() => {
    //             setProgress(prevProgress => {
    //                 if (prevProgress < 100) {
    //                     return prevProgress + 1;
    //                 } else {
    //                     if (interval) {
    //                         clearInterval(interval);
    //                     }
    //                     return 100;
    //                 }
    //             });
    //         }, 250); // 250 ms interval for 1% increment over 25 seconds
    //     } else {
    //         setProgress(0);
    //     }

    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //         }
    //     };
    // }, [loading]);
    const handleDownloadExcel = () => {
        const dataToExport = [
          ['Normal Displacement (m)', 'Tangential Displacement (m)', 'Normal Stress (Pa)', 'Shear Stress (Pa)'],
          ...data.map((item, index) => [item.y, item.x, data3[index].x, data3[index].y])
        ];
    
        const workbook = XLSX.utils.book_new();
        const worksheet1 = XLSX.utils.aoa_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet1, 'Data');
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
    
        URL.revokeObjectURL(url);
      };

      // cyclic download button

      const handleDownloadCylic = () => {
        const dataToExport = [
          ['Normal Displacement (m)', 'Tangential Displacement (m)', 'Normal Stress (Pa)', 'Shear Stress (Pa)'],
          ...data2.map((item, index) => [item.y, item.x, datac3[index].x, datac3[index].y])
        ];
    
        const workbook = XLSX.utils.book_new();
        const worksheet1 = XLSX.utils.aoa_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet1, 'Data');
    
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
    
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
    
        URL.revokeObjectURL(url);
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

                                <div className="flex justify-center">
                                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md"
                                            disabled={loading} onClick={handleButtonClick}>
                                        {loading ? 'Loading...' : 'Calculate'}
                                    </button>
                                </div>
                                {/* Add more tabs if needed */}
                            </div>
                        </div>
                        {/* Tab Content */}
                        <div>
                            {activeTab === 'tab1' &&
                                <div>
                                    Input Model Parameters
                                    <form ref={form1Ref} id="modelParametersForm" className="text-gray-900"
                                          onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="Dn0(Pa)" id="dn0" name="dn0" icon="Δn₀"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.dn0} required/>
                                                    <ParameterInputField label="Dt0(Pa)" id="dt0" name="dt0" icon="Δt₀"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.dt0} required/>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="μc" id="mu" name="mu" icon="μ"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.mu} required/>
                                                    <ParameterInputField label="ec0" id="ec0" name="ec0" icon="e₀"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.ec0} required/>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="lambda" id="lambda" name="lambda"
                                                                         icon="λ" type="text" onChange={handleChange}
                                                                         value={formData.lambda} required/>
                                                    <ParameterInputField label="Kd" id="kd" name="kd" icon="Kd"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.kd} required/>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="A0" id="a0" name="a0" icon="A₀"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.a0} required/>
                                                    <ParameterInputField label="Kf" id="kf" name="kf" icon="Kf"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.kf} required/>
                                                </div>
                                            </div>
                                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="Kp0" id="kp0" name="kp0" icon="Kp₀"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.kp0} required/>
                                                    <ParameterInputField label="m" id="m" name="m" icon="m" type="text"
                                                                         onChange={handleChange} value={formData.m}
                                                                         required/>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="br1(Pa)" id="br1" name="br1" icon="br₁"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.br1} required/>
                                                    <ParameterInputField label="br2" id="br2" name="br2" icon="br₂"
                                                                         type="text" onChange={handleChange}
                                                                         value={formData.br2} required/>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <ParameterInputField label="Patm(Pa)" id="patm" name="patm"
                                                                         icon="Pₐₜₘ" type="text" onChange={handleChange}
                                                                         value={formData.patm} required/>
                                                    <ParameterInputField label="Thickness(m)" id="thickness"
                                                                         name="thickness" icon="t" type="text"
                                                                         onChange={handleChange}
                                                                         value={formData.thickness} required/>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>}
                            <div>
                                {activeTab === 'tab2' &&
                                    <div>
                                        Loading Input
                                        <form ref={form2Ref} id="loadingInputForm" className="text-gray-900"
                                              onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ParameterInputField label="Tang. Disp Max (m)" id="tangDispMax"
                                                                     name="tangDispMax" icon="⇑" type="text"
                                                                     onChange={handleChange}
                                                                     value={formData.tangDispMax} required/>
                                                <ParameterInputField label="Tang. Disp Min (m)" id="tangDispMin"
                                                                     name="tangDispMin" icon="⇓" type="text"
                                                                     onChange={handleChange}
                                                                     value={formData.tangDispMin} required/>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ParameterInputField label="Number of Cycle" id="numCycle"
                                                                     name="numCycle" icon="🔄" type="number"
                                                                     onChange={handleChange} value={formData.numCycle}
                                                                     required/>
                                                <ParameterInputField label="Number of Increment" id="numIncrement"
                                                                     name="numIncrement" icon="➕" type="number"
                                                                     onChange={handleChange}
                                                                     value={formData.numIncrement} required/>
                                            </div>
                                        </form>
                                    </div>


                                }
                            </div>


                            <div>
                                {activeTab === 'tab3' && (
                                    <div>
                                        Initial Condition
                                        <form ref={form3Ref} id="initialConditionForm" className="text-gray-900"
                                              onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ParameterInputField label="Sigma-n0 (Pa)" id="sigmaN0" name="sigmaN0"
                                                                     icon="σ" type="text" onChange={handleChange}
                                                                     value={formData.sigmaN0} required/>
                                                <ParameterInputField label="Initial Void Ratio (e0)"
                                                                     id="initialVoidRatio" name="initialVoidRatio"
                                                                     icon="e₀" type="text" onChange={handleChange}
                                                                     value={formData.initialVoidRatio} required/>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <ParameterInputField label="Normal Stiffness (Pa/m)=-K"
                                                                     id="normalStiffness" name="normalStiffness"
                                                                     icon="K" type="text" onChange={handleChange}
                                                                     value={formData.normalStiffness} required/>
                                            </div>
                                        </form>
                                    </div>


                                )}
                            </div>

                            {/* Add more tab content if needed */}
                        </div>
                    </div>
                    {/* Main Page */}
                    <div className="flex-1 bg-white p-4">
                        {/* Content from Page */}
                        <div>

                            {graphPage ? 
                                (
                                    <>
                                        <div className='bg-white'>
                                        <div>
                                            {/* Conditional rendering based on the value of 'loading' */}
                                            {/* old progress bar */}
                                            {/* {loading ? (
                                                <div className="block">
                                                    loading....
                                                    <ProgressBar
                                                        completed={progress}
                                                        transitionDuration="0s"
                                                        animateOnRender={false}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="hidden">
                                                    <ProgressBar
                                                        completed={progress}
                                                        transitionDuration="0s"
                                                        animateOnRender={false}
                                                    />
                                                </div>
                                            )} */}
                                        </div>
                                        <div className="">
                                            {/* Static button */}
                                            <button
                                                onClick={() => {
                                                    setShowGraph1(true);
                                                    setCurrentGraph(true)

                                                }}
                                                className={`bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ${showGraph1 ? "bg-blue-700" : "bg-gray-700"}`}
                                                disabled={showGraph1}
                                            >
                                               Static
                                            </button>
                                            {/* Cyclic button */}
                                            <button
                                                onClick={() => {


                                                    setShowGraph1(false);
                                                    setCurrentGraph(false);

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


                                            {showGraph1 ? (
                                                    //   <GraphPageStatic key={reloadTransition.toString() }  ></GraphPageStatic>
                                                    <div style={{  backgroundColor:'white' }}>
                                                         <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                                         <div className="transition-opacity duration-1000 opacity-100">
                                                        <div className="flex flex-col" style={{  backgroundColor:'white' }}>
                                                            <div className="flex justify-between mb-4">
                                                                <div className="w-1/2 bg-white p-4">
                                                                   
                                                                                  
                                                                <LineGraph data={data2} xLabel={"Tangential Displacement (mm)"}
                                                                               yLabel={"Shear Stress (kPa)"}/>
                                                                </div>
                                                                <div className="w-1/2 bg-white p-4">
                                                                     
                                                                    <LineGraph2 data={data} xLabel={"Tangential Displacement (mm)"}
                                                                               yLabel={"Normal Displacement (mm)"}/>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center">
                                                                <div className="bg-white p-4">
                                                                   
                                                                               <LineGraph data={data3} yLabel={"Shear Stress (kPa)"}
                                                                               xLabel={"Normal Stress (kPa)"}/>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center mt-4">
                                                            <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                            Download Excel
                                                            </button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                ) :
                                                <>
                                                   {/* cylic graph */}
                                                   {loading? (
                                                            <>
                                                            <div style={{display:'block',}}>

                                                            
                                                            <div className="flex justify-center items-center h-screen" style={{
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '70%',
                                                            transform: 'translate(-50%, -50%)'
                                                            }}>
                                                            <BounceLoader size="250" color="#4C49EB" />
                                                            
                                                            
                                                            </div>
                                                            <div style={{  fontSize:30, fontWeight:'bold', float:'right'}} >
                                                                Loading....
                                                            </div>

                                                            </div>
                                                            </>
                                                        ):

                                                        
                                                        <>
                                                        <div style={{  backgroundColor:'white' }}>

                                                        

<div className="flex flex-col" style={{  backgroundColor:'white' }}>

   

    <div className="flex justify-between mb-4">
        <div className="w-1/2 bg-white p-4">
           
                          
        <LineGraph data={datac2} xLabel={"Tangential Displacement (mm)"}
                       yLabel={"Shear Stress (kPa)"}/>
        </div>
        <div className="w-1/2 bg-white p-4">
             
            <LineGraph2 data={datac} xLabel={"Tangential Displacement (mm)"}
                       yLabel={"Normal Displacement (mm)"}/>
        </div>
    </div>
    <div className="flex justify-center">
        <div className="bg-white p-4">
           
                       <BottomGraph data={datac3} yLabel={"Shear Stress (kPa)"}
                       xLabel={"Normal Stress (kPa)"}/>
            
        </div>
    </div>
    <div className="flex justify-center mt-4">
    <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Download Excel
    </button>
</div>
</div>
</div>
                                                        </>
                                                        
                                                        }  

                                                    

                                                </>
                                                

                                            }


                                            {/* </Transition> */}
                                            
                                            {/* <Graph shouldFetchData={graphPage} onFetchComplete={handleFetchComplete} /> */}

                                            {/* </Transition> */}
                                        </div>
                                    </div>      
                                    </>
                                )
                                :

                                (
                                    <>
                                        {/* <div>
                                                        
                                                        {loading ? (
                                                            <div className="block">
                                                                <ProgressBar
                                                                    completed={progress}
                                                                    transitionDuration="0s"
                                                                    animateOnRender={false}
                                                                />
                                                            </div>
                                                        ) : (
                                                          
                                                            <div className="none">
                                                            
                                                        </div>
                                                        )}
                                         </div> */}
                                        <div>

                                            {activeTab === 'tab1' &&
                                                <div>


                                                <GraphIllustration/>


                                                </div>
                                            }

                                        </div>

                                        <div>

                                            {activeTab === 'tab2' &&
                                                <div
                                                >
                                                    <GraphIllustrationloadinginput></GraphIllustrationloadinginput>
                                                </div>
                                            }

                                        </div>
                                        <div>

                                            {activeTab === 'tab3' &&
                                                <div
                                                >
                                                    <GraphIllustrationinitialinput></GraphIllustrationinitialinput>
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
