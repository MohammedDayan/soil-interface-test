// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const Graph = () => {
//     const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
//         const text = await response.text();
//         const rows = text.trim().split('\n').map(row => row.split(/\s+/));
//         const data = rows.slice(1).map(row => ({ x: parseFloat(row[1]), y: parseFloat(row[2]) }));
//         drawScatterPlot(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error
//       }
//     };

//     fetchData();
//   }, []);

//   const drawScatterPlot = (data) => {
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const width = 400 - margin.left - margin.right;
//     const height = 400 - margin.top - margin.bottom;

//     const x = d3.scaleLinear()
//       .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])
//       .range([height, 0]);

//     const svg = d3.select(svgRef.current)
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     svg.selectAll("circle")
//       .data(data)
//       .enter().append("circle")
//       .attr("cx", d => x(d.x))
//       .attr("cy", d => y(d.y))
//       .attr("r", 4)
//       .style("fill", "#8884d8");

//     svg.append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));

//     svg.append("g")
//       .call(d3.axisLeft(y));
//   };

//   return <svg ref={svgRef}></svg>;
// };

// export default Graph;
