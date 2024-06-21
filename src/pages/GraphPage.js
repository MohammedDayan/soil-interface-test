import React, { useState, useEffect } from 'react';
import LineGraph from '../app/components/d3matploty';
// import LineGraph from '../app/components/bigd3';
const GraphPage = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
        // const response = await fetch('http://127.0.0.1:5000/get_text_file');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const rawData = await response.text();

        // Rearrange data
        const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
        const rearrangedData = rows.slice(1).map(row => ({
          x: parseFloat(row[2]), // Using column 2 as x
          y: parseFloat(row[1])  // Using column 1 as y
        }));
        const rearrangedData2 = rows.slice(1).map(row => ({
          x: parseFloat(row[2]), // Using column 2 as x
          y: parseFloat(row[4])  // Using column 1 as y
        }));

       
        setData(rearrangedData);
        setData2(rearrangedData2);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h1>Tangential Displacment(m) against Normal Displacment (m)</h1>
      <LineGraph data={data} />
    </div>
    <div>
      <h1>Normal Stress (Pa) against Shear Stress (Pa)</h1>
      <LineGraph data={data2} />
    </div>
    </>
    
    
  );
};

export default GraphPage;
