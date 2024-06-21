"use client"  

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface Graph2Props {
  onFetchComplete: () => void; // Define the type of the onLoad prop
    shouldFetchData: boolean;

  }

const Graph_Cyclic: React.FC<Graph2Props> = ({ onFetchComplete, shouldFetchData }) => {
    const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Array<Partial<Plotly.Data>>>([]);
  const [data2, setData2] = useState<Array<Partial<Plotly.Data>>>([]);
  const [data3, setData3] = useState<Array<Partial<Plotly.Data>>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
        const text = await response.text();
        const rows = text.trim().split('\n').map(row => row.split(/\s+/));
        const column1 = rows.slice(1).map(row => parseFloat(row[1]));
        const column2 = rows.slice(1).map(row => parseFloat(row[2]));
        const column3 = rows.slice(1).map(row => parseFloat(row[3]));
        const column4 = rows.slice(1).map(row => parseFloat(row[4]));
        const newData: Partial<Plotly.Data> = {
          x: column2,
          y: column1,
          mode: 'markers',
          type: 'scatter',
          name: 'Scatter Plot',
          marker: { color: '#8884d8', size:2 }
        };
        const newData2: Partial<Plotly.Data> = {
            x:column2,
            y:column4,
            mode: 'markers',
            type: 'scatter',
            name: 'Scatter Plot',
            marker: { color: '#8884d8', size:2 }
          };
          const newData3: Partial<Plotly.Data> = {
            x:column3,
            y:column4,
            mode: 'markers',
            type: 'scatter',
            name: 'Scatter Plot',
            marker: { color: '#8884d8', size:2 }
          };
        setData([newData]);
        setData2([newData2]);
        setData3([newData3]);
        
        console.log("loggin after fetching cyclic data")
        onFetchComplete(); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    };

    
    if (shouldFetchData) {
      fetchData();
  } 
},[shouldFetchData, onFetchComplete]);
  if (loading) {
    return <div className='flex justify-center items-center h-screen'>
       <svg
              className="animate-spin h-5 w-5 ml-2 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014.01 4.374L6.01 6.374m2 10a8 8 0 0010-10h-4a4 4 0 11-8 0v4"
              ></path>
            </svg>
      </div>; // Show loading indicator while fetching data
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="" >      
      <Plot className=""
        data={data}
        layout={{
          width: 500,
          height: 350,
          title: 'Tangential Displacment(m) against Normal Displacment (m)',
          xaxis: { title: 'Tangential Displacment(m)'  },
          yaxis: { title: ' Normal Displacment (m)' }
        }}
      />
      
      </div>
      <div className="">
      <Plot
        data={data2}
        layout={{
          width: 450,
          height: 350,          
          title: 'Tangential Displacment(m) against Shear Stress (Pa)',
          xaxis: { title: 'Tangential Displacment(m)' },
          yaxis: { title: ' Shear Stress (Pa)' }
        }}
      />
      </div>
      
        <div className=''>
        <Plot
        data={data3}
        layout={{
          width: 450,
          height: 350,
          title: 'Normal Stress (Pa) against Shear Stress (Pa)',
          xaxis: { title: 'Normal Stress (Pa)' },
          yaxis: { title: 'Shear Stress (Pa)' }
        }}
      />
        </div>
    </div>
  );
};

export default Graph_Cyclic;
