// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { BounceLoader } from 'react-spinners';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 10, right: 10, bottom: 40, left: 40 };
//     const boxWidth = 500;
//     const boxHeight = 250;
//     const width = boxWidth - margin.left - margin.right;
//     const height = boxHeight - margin.top - margin.bottom;

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
//       .nice()
//       .range([height, 0]);

//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     svg.append('g')
//       .call(d3.axisLeft(y));

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

//     setLoading(false); // Data has been loaded and chart is drawn, set loading to false
//   }, [data]);

//   return (
//     <div style={{ position: 'relative', width: '500px', height: '250px' }}>
//       {loading && (
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)'
//         }}>
//           <BounceLoader color="#36D7B7" />
//           Loading....
//         </div>
//       )}
//       <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//     </div>
//   );
// };

// export default LineGraph;


// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { BounceLoader } from 'react-spinners';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 10, right: 10, bottom: 20, left: 30 };
//     const boxWidth = 500;
//     const boxHeight = 250;
//     const width = boxWidth - margin.left - margin.right;
//     const height = boxHeight - margin.top - margin.bottom;

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
//       .nice()
//       .range([height, 0]);

//     // Append x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(10))
//       .call(g => g.select(".domain").remove());

//     // Append y-axis
//     svg.append('g')
//       .call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(10))
//       .call(g => g.select(".domain").remove());

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', '#4285F4')
//       .attr('stroke-width', 2);

//     setLoading(false); // Data has been loaded and chart is drawn, set loading to false
//   }, [data]);

//   return (
//     <div style={{ position: 'relative', width: '500px', height: '250px' }}>
//       {loading && (
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)'
//         }}>
//           <BounceLoader color="#36D7B7" />
//           Loading....
//         </div>
//       )}
//       <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//     </div>
//   );
// };

// export default LineGraph;


// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import { BounceLoader } from 'react-spinners';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 10, right: 10, bottom: 40, left: 40 };
//     const boxWidth = 500;
//     const boxHeight = 250;
//     const width = boxWidth - margin.left - margin.right;
//     const height = boxHeight - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr('width', boxWidth)
//       .attr('height', boxHeight)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const xExtent = d3.extent(data, d => d.x);
//     const yExtent = d3.extent(data, d => d.y);

//     const x = d3.scaleLinear()
//       .domain([-Math.max(Math.abs(xExtent[0]), Math.abs(xExtent[1])), Math.max(Math.abs(xExtent[0]), Math.abs(xExtent[1]))])
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain([-Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1])), Math.max(Math.abs(yExtent[0]), Math.abs(yExtent[1]))])
//       .nice()
//       .range([height, 0]);

//     // Append x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x).ticks(7).tickPadding(10));

//     // Append y-axis
//     svg.append('g')
//       .call(d3.axisLeft(y).ticks(7).tickPadding(10));

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', '#4285F4')
//       .attr('stroke-width', 2);

//     // Add a border around the graph
//     svg.append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', width)
//       .attr('height', height)
//       .attr('fill', 'none')
//       .attr('stroke', 'black')
//       .attr('stroke-width', 1);

//     setLoading(false); // Data has been loaded and chart is drawn, set loading to false
//   }, [data]);

//   return (
//     <div style={{ position: 'relative', width: '500px', height: '250px' }}>
//       {loading && (
//         <div style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)'
//         }}>
//           <BounceLoader color="#36D7B7" />
//           Loading....
//         </div>
//       )}
//       <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//     </div>
//   );
// };

// export default LineGraph;

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BounceLoader } from 'react-spinners';

const LineGraph = ({ data }) => {
  const svgRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) return;

    const margin = { top: 10, right: 10, bottom: 50, left: 50 };
    const padding = 30;
    const boxWidth = 500;
    const boxHeight = 250;
    const width = boxWidth - margin.left - margin.right;
    const height = boxHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', boxWidth)
      .attr('height', boxHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xExtent = d3.extent(data, d => d.x);
    const yExtent = d3.extent(data, d => d.y);

    const x = d3.scaleLinear()
      .domain([xExtent[0], xExtent[1]])
      .range([padding, width - padding]);

    const y = d3.scaleLinear()
      .domain([yExtent[0], yExtent[1]])
      .nice()
      .range([height - padding, padding]);

    // Append x-axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - padding})`)
      .call(d3.axisBottom(x)
        .ticks(7)
        .tickPadding(10)
        .tickFormat(d => d3.format(".2e")(d)));

    // Append y-axis
    svg.append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .call(d3.axisLeft(y)
        .ticks(7)
        .tickPadding(10)
        .tickFormat(d => d3.format(".2e")(d)));

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#4285F4')
      .attr('stroke-width', 2);

    // Add a border around the graph
    svg.append('rect')
      .attr('x', padding)
      .attr('y', padding)
      .attr('width', width - 2 * padding)
      .attr('height', height - 2 * padding)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    // Add x-axis label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .attr('text-anchor', 'middle')
      .text('X Axis Label');

    // Add y-axis label
    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Y Axis Label');

    setLoading(false); // Data has been loaded and chart is drawn, set loading to false
  }, [data]);

  return (
    <div style={{ position: 'relative', width: '500px', height: '250px' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <BounceLoader color="#36D7B7" />
          Loading....
        </div>
      )}
      <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
    </div>
  );
};

export default LineGraph;
