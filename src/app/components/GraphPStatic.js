import React, { useState, useEffect } from 'react';
import LineGraph from './d3matploty';
// graph with no scale and axis
// import LineGraph from './bigd3';
const GraphPageStatic = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://127.0.0.1:5000/get_text_file');
        const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');     
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
        const rearrangedData3 = rows.slice(1).map(row => ({
            x: parseFloat(row[3]), // Using column 2 as x
            y: parseFloat(row[4])  // Using column 1 as y
          }));

       
        setData(rearrangedData);
        setData3(rearrangedData3);
        setData2(rearrangedData2);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>

<div class="flex flex-col">
  <div class="flex justify-between mb-4">
    <div class="w-1/2 bg-gray-200 p-4">
    <LineGraph data={data} />
    </div>
    <div class="w-1/2 bg-gray-200 p-4">
    <LineGraph data={data2} />
    </div>
  </div>
  <div class="flex justify-center">
    <div class="bg-gray-200 p-4"><LineGraph data={data3} /></div>
  </div>
</div>

    {/* <div>
      <h1>Tangential Displacment(m) against Normal Displacment (m)</h1>
      
    </div>
    <div>
      <h1>Normal Stress (Pa) against Shear Stress (Pa)</h1>
      
    </div>
    <div>
      <h1>Normal Stress (Pa) against Shear Stress (Pa)</h1>
      
    </div> */}
    </>
    
    
  );
};

export default GraphPageStatic;


// import React, { useState, useEffect } from 'react';
// import LineGraph from './d3matploty';
// import * as XLSX from 'xlsx';


// const GraphPageStatic = ({ key }) => { 
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [loading, setLoading] = useState(true); 
//   const [allDataFetched, setAllDataFetched] = useState(false); // State to track if all data is fetched

//   useEffect(() => {
  
     
//     const fetchData = async () => {
//       try {
       

//         const response = await fetch('http://127.0.0.1:5000/get_text_file');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const rawData = await response.text();

//         const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
//         const rearrangedData = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]), 
//           y: parseFloat(row[1])  
//         }));
//         const rearrangedData2 = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]), 
//           y: parseFloat(row[4])  
//         }));
//         const rearrangedData3 = rows.slice(1).map(row => ({
//           x: parseFloat(row[3]), 
//           y: parseFloat(row[4])  
//         }));

      

//         setData(rearrangedData);
//         setData3(rearrangedData3);
//         setData2(rearrangedData2);
//         console.log("note ... plot data ready !!")
          
//         setTimeout(() => {
//           setLoading(false);
//         }, 5000);


        
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [key]);

//   const handleDownloadExcel = () => {
//     const dataToExport = [
//       ['X', 'Y'], // Header row
//       ...data.map(item => [item.x, item.y]) // Data rows
//     ];

//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();
//     // Add a worksheet
//     const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
//     // Add the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

//     // Generate a binary string from the workbook
//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     // Convert the binary string to a Blob
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     // Create a download link
//     const url = URL.createObjectURL(blob);
//     // Initiate the download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.xlsx';
//     a.click();
//     // Clean up
//     URL.revokeObjectURL(url);
//   };

  

//   return (
//     <>
//       <div className="flex flex-col">
//         <div className="flex justify-between mb-4">
//           <div className="w-1/2 bg-gray-200 p-4">
//           <p className="text-center">Tangential Displacment(m) against Normal Displacment (m)</p>
//             <LineGraph data={data} />
//           </div>
//           <div className="w-1/2 bg-gray-200 p-4">
//           <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//             <LineGraph data={data2} />
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <div className="bg-gray-200 p-4">
//           <p className="text-center"> Normal Stress (Pa) against Shear Stress (Pa)</p>
//             <LineGraph data={data3} />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Download Excel
//         </button>
//       </div>
//     </>
//   );
// };

// export default GraphPageStatic;


// import React, { useState, useEffect, useCallback } from 'react';
// import LineGraph from './d3matploty';
// import * as XLSX from 'xlsx';

// const GraphPageStatic = () => {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reloadKey, setReloadKey] = useState(true); // State variable to trigger re-render

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);

//       const response = await fetch('http://127.0.0.1:5000/get_text_file');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const rawData = await response.text();

//       const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
//       const rearrangedData = rows.slice(1).map(row => ({
//         x: parseFloat(row[2]),
//         y: parseFloat(row[1])
//       }));
//       const rearrangedData2 = rows.slice(1).map(row => ({
//         x: parseFloat(row[2]),
//         y: parseFloat(row[4])
//       }));
//       const rearrangedData3 = rows.slice(1).map(row => ({
//         x: parseFloat(row[3]),
//         y: parseFloat(row[4])
//       }));

//       setData(rearrangedData);
//       setData3(rearrangedData3);
//       setData2(rearrangedData2);

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     // This effect will trigger when data changes, causing a reload
//     setReloadKey(prevKey => !prevKey);
//   }, [data, data2, data3]);

//   const handleDownloadExcel = () => {
//     const dataToExport = [
//       ['X', 'Y'], // Header row
//       ...data.map(item => [item.x, item.y]) // Data rows
//     ];

//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.xlsx';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="flex flex-col">
//           <div className="flex justify-between mb-4">
//             <div className="w-1/2 bg-gray-200 p-4">
//               <p className="text-center">Tangential Displacement(m) against Normal Displacement (m)</p>
//               <LineGraph key={reloadKey} data={data} />
//             </div>
//             <div className="w-1/2 bg-gray-200 p-4">
//               <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//               <LineGraph key={reloadKey} data={data2} />
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <div className="bg-gray-200 p-4">
//               <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//               <LineGraph reload={reloadKey} data={data3} />
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-center mt-4">
//         <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Download Excel
//         </button>
//       </div>
//     </>
//   );
// };

// export default GraphPageStatic;

// "use client"
// import React, { useState, useEffect } from 'react';
// import LineGraph from './d3matploty';
// import * as XLSX from 'xlsx';

// const GraphPageStatic = () => {
//   const [data, setData] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [data3, setData3] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reloadKey, setReloadKey] = useState(true); // State variable to trigger re-render

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // const response = await fetch('http://127.0.0.1:5000/get_text_file');
//         const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const rawData = await response.text();

//         const rows = rawData.trim().split('\n').map(row => row.split(/\s+/));
//         const rearrangedData = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]),
//           y: parseFloat(row[1])
//         }));
//         const rearrangedData2 = rows.slice(1).map(row => ({
//           x: parseFloat(row[2]),
//           y: parseFloat(row[4])
//         }));
//         const rearrangedData3 = rows.slice(1).map(row => ({
//           x: parseFloat(row[3]),
//           y: parseFloat(row[4])
//         }));

//         setData(rearrangedData);
//         setData3(rearrangedData3);
//         setData2(rearrangedData2);

//         setLoading(false);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setLoading(false);
        
//       }
//     };

//     fetchData();
//   }, [reloadKey]); // useEffect depends on reloadKey

//   const handleDownloadExcel = () => {
//     const dataToExport = [
//       ['Tangential Displacement', 'Normal Displacement'], // Header row
//       ...data.map(item => [item.x, item.y]) // Data rows
//     ];

//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

//     const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.xlsx';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const handleReloadData = () => {
//     // Toggle reloadKey to trigger re-render
    
//     setReloadKey(prevKey => !prevKey);
//   };

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="flex flex-col">
//           <div className="flex justify-between mb-4">
//             <div className="w-1/2 bg-gray-200 p-4">
//               <p className="text-center">Tangential Displacement(m) against Normal Displacement (m)</p>
//               <LineGraph key={reloadKey} data={data} />
//             </div>
//             <div className="w-1/2 bg-gray-200 p-4">
//               <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//               <LineGraph key={reloadKey} data={data2} />
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <div className="bg-gray-200 p-4">
//               <p className="text-center">Normal Stress (Pa) against Shear Stress (Pa)</p>
//               <LineGraph key={reloadKey} data={data3} />
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="flex justify-center mt-4">
//         <button onClick={handleReloadData} className=" bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Update Plot
//         </button>
//         <button onClick={handleDownloadExcel} className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
//          Download data
//         </button>
//       </div>
//     </>
//   );
// };

// export default GraphPageStatic;