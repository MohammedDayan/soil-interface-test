// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data,reload}) => {
//   const svgRef = useRef();
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (!data) return;

//     const updateGraph = () => {
//       const dataLength = Object.keys(data).length;
//       console.log(`Current data length: ${dataLength}`);

//       if (dataLength >= 40000) {
//         console.log("Data length reached 4000, updating graph...");

//         // Clear the interval once the condition is met
//         clearInterval(intervalRef.current);

//         const margin = { top: 10, right: 10, bottom: 40, left: 40 };
//         const boxWidth = 500;
//         const boxHeight = 250;
//         const width = boxWidth - margin.left - margin.right;
//         const height = boxHeight - margin.top - margin.bottom;

//         // Clear any previous svg elements
//         d3.select(svgRef.current).selectAll('*').remove();

//         const svg = d3.select(svgRef.current)
//           .attr('width', boxWidth)
//           .attr('height', boxHeight)
//           .append('g')
//           .attr('transform', `translate(${margin.left},${margin.top})`);

//         const x = d3.scaleLinear()
//           .domain(d3.extent(data, d => d.x))
//           .range([0, width]);

//         const y = d3.scaleLinear()
//           .domain(d3.extent(data, d => d.y))
//           .nice() // Adjust the y-axis to fit the data nicely
//           .range([height, 0]);

//         // Create the x-axis with formatted ticks
//         svg.append('g')
//           .attr('transform', `translate(0, ${height})`)
//           .call(d3.axisBottom(x).tickFormat(d3.format('.1e'))); // Adjust the format as needed

//         // Create the y-axis with formatted ticks
//         svg.append('g')
//           .call(d3.axisLeft(y).tickFormat(d3.format('.1e'))); // Adjust the format as needed

//         const line = d3.line()
//           .x(d => x(d.x))
//           .y(d => y(d.y));

//         svg.append('path')
//           .datum(data)
//           .attr('class', 'line')
//           .attr('d', line)
//           .attr('fill', 'none')
//           .attr('stroke', 'black')
//           .attr('stroke-width', 2);

//         console.log("Graph updated.");
//       }
//       reload();
//     };

//     // Set the interval to check data length every second
//     intervalRef.current = setInterval(updateGraph, 1000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalRef.current);

//   }, [data]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// export default LineGraph;


// import React, {useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';


// const LineGraph = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;
//     console.log("how is data structured.....")
    
//     console.log(Object.keys(data).length);    
    
//       const checkDataLength = setInterval(() => {
//       const dataLength = Object.keys(data).length;
//       if (dataLength >= 4000) {
//         // Clear the interval once the condition is met
//         clearInterval(checkDataLength);
      
//     const margin = { top: 10, right: 10, bottom: 40, left: 40 };
//     const boxWidth = 500;
//     const boxHeight = 250;
//     const width = boxWidth - margin.left - margin.right;
//     const height = boxHeight - margin.top - margin.bottom;

//     // Clear any previous svg elements
//     d3.select(svgRef.current).selectAll('*').remove();

//     const svg = d3.select(svgRef.current)
//       .attr('width', boxWidth)
//       .attr('height', boxHeight)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.x))
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .nice() // Adjust the y-axis to fit the data nicely
//       .range([height, 0]);

//     // Create the x-axis with formatted ticks
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x).tickFormat(d3.format('.1e'))); // Adjust the format as needed

//     // Create the y-axis with formatted ticks
//     svg.append('g')
//       .call(d3.axisLeft(y).tickFormat(d3.format('.1e'))); // Adjust the format as needed

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', 'black')
//       .attr('stroke-width', 2);

//       }
//     }, 1000); // Check every second

//     // Cleanup interval on component unmount
//     return () => clearInterval(checkDataLength);
    
//   }, [data]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// export default LineGraph;


import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 10, right: 10, bottom: 40, left: 40 };
    const boxWidth = 500;
    const boxHeight = 250;
    const width = boxWidth - margin.left - margin.right;
    const height = boxHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', boxWidth)
      .attr('height', boxHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .nice() // Adjust the y-axis to fit the data nicely
      .range([height, 0]);

    // Create the x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    // Create the y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

  }, [data]);

  return (
    <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
  );
};

export default LineGraph;

