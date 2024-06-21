// import React, { useEffect } from 'react';
// import Plot from 'react-plotly.js';

// interface GraphProps {
//   xValues: number[]npm install recharts
// ;
//   yValues: number[];
// }

// const Graph: React.FC<GraphProps> = ({ xValues, yValues }) => {
//   useEffect(() => {
//     // Optionally, you can customize the graph layout or add other configurations here
//   }, []);

//   // Ensure xValues and yValues have the same length
//   if (xValues.length !== yValues.length) {
//     throw new Error('xValues and yValues must have the same length.');
//   }

//   // Format data for Plotly.js - using scatter plot type
//   const data = [{
//     x: xValues,
//     y: yValues,
//     type: 'scatter', // Ensure type is 'scatter' for scatter plot
//     mode: 'lines+points',
//     marker: { color: 'blue' },
//   }];

//   return (
//     <div>
//       <Plot
//         data={data}

        
//         layout={{ width: 800, height: 400, title: 'Your Graph Title' }}
//       />
//     </div>
//   );
// };

// export default Graph;
