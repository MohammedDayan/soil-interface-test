import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({ data, xLabel, yLabel, lineColor, legend }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 40, right: 30, bottom: 50, left: 75 };
    const boxWidth = 500;
    const boxHeight = 250;
    const width = boxWidth - margin.left - margin.right;
    const height = boxHeight - margin.top - margin.bottom;

    // Select the SVG element and remove existing content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Append a new group for drawing elements
    const g = svg
      .attr('width', boxWidth)
      .attr('height', boxHeight)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .nice()
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .nice()
      .range([height, 0]);

    // Create the x-axis
    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    // Create the y-axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0));

    // Add x-axis label
    g.append('text')
      .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
      .style('text-anchor', 'middle')
      .text(xLabel);

    // Add y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(yLabel);

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    g.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', lineColor)
      .attr('stroke-width', 2);

    // Add legend
    if (legend) {
      g.append('circle')
        .attr('cx', width - 50)
        .attr('cy', margin.top + 10)
        .attr('r', 5)
        .style('fill', lineColor);

      g.append('text')
        .attr('x', width - 40)
        .attr('y', margin.top + 10)
        .text(legend);
    }
  }, [data, xLabel, yLabel, lineColor, legend]);
  return (
    <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
  );
};

LineGraph.defaultProps = {
 
  lineColor: 'black',
  legend: null
};

export default LineGraph;

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data, xLabel, yLabel, lineColor, legend }) => {
//   const svgRef = useRef();

//   useEffect(() => {
    
//     if (!data) return;

//     const margin = { top: 40, right: 30, bottom: 50, left: 75 };
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
//       .nice()
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .nice()
//       .range([height, 0]);

//     // Create the x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))
//       .selectAll('text')
//       .style('text-anchor', 'end')
//       .attr('transform', 'rotate(-45)');

//     // Create the y-axis
//     svg.append('g')
//       .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0));

//     // Add x-axis label
//     svg.append('text')
//       .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
//       .style('text-anchor', 'middle')
//       .text(xLabel);

//     // Add y-axis label
//     svg.append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', 0 - margin.left)
//       .attr('x', 0 - (height / 2))
//       .attr('dy', '1em')
//       .style('text-anchor', 'middle')
//       .text(yLabel);

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', lineColor)
//       .attr('stroke-width', 2);

//     // Add legend
//     if (legend) {
//       svg.append('circle')
//         .attr('cx', width - 50)
//         .attr('cy', margin.top + 10)
//         .attr('r', 5)
//         .style('fill', lineColor);

//       svg.append('text')
//         .attr('x', width - 40)
//         .attr('y', margin.top + 10)
//         .text(legend);
//     }

//   }, [data, xLabel, yLabel, lineColor, legend]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// LineGraph.defaultProps = {
 
//   lineColor: 'black',
//   legend: null
// };

// export default LineGraph;

////with grid
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data, xLabel, yLabel, lineColor, legend }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 30, right: 30, bottom: 50, left: 50 };
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
//       .nice()
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .nice()
//       .range([height, 0]);

//     // Create the x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))
//       .selectAll('text')
//       .style('text-anchor', 'end')
//       .attr('transform', 'rotate(-45)');

//     // Create the y-axis
//     svg.append('g')
//       .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0));

//     // Add x-axis label
//     svg.append('text')
//       .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
//       .style('text-anchor', 'middle')
//       .text(xLabel);

//     // Add y-axis label
//     svg.append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', 0 - margin.left)
//       .attr('x', 0 - (height / 2))
//       .attr('dy', '1em')
//       .style('text-anchor', 'middle')
//       .text(yLabel);

//     // Add gridlines
//     svg.append('g')
//       .attr('class', 'grid')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(-height)
//         .tickFormat('')
//       );

//     svg.append('g')
//       .attr('class', 'grid')
//       .call(d3.axisLeft(y)
//         .tickSize(-width)
//         .tickFormat('')
//       );

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', lineColor)
//       .attr('stroke-width', 2);

//     // Add legend
//     if (legend) {
//       svg.append('circle')
//         .attr('cx', width - 50)
//         .attr('cy', margin.top + 10)
//         .attr('r', 5)
//         .style('fill', lineColor);

//       svg.append('text')
//         .attr('x', width - 40)
//         .attr('y', margin.top + 10)
//         .text(legend);
//     }

//   }, [data, xLabel, yLabel, lineColor, legend]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// LineGraph.defaultProps = {
//   xLabel: 'X Axis',
//   yLabel: 'Y Axis',
//   lineColor: 'black',
//   legend: null
// };

// export default LineGraph;

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data, xLabel, yLabel, lineColor }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 30, right: 30, bottom: 50, left: 50 };
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
//       .nice()
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .nice()
//       .range([height, 0]);

//     // Create the x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x))
//       .selectAll('text')
//       .style('text-anchor', 'end')
//       .attr('transform', 'rotate(-45)');

//     // Create the y-axis
//     svg.append('g')
//       .call(d3.axisLeft(y));

//     // Add x-axis label
//     svg.append('text')
//       .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
//       .style('text-anchor', 'middle')
//       .text(xLabel);

//     // Add y-axis label
//     svg.append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', 0 - margin.left)
//       .attr('x', 0 - (height / 2))
//       .attr('dy', '1em')
//       .style('text-anchor', 'middle')
//       .text(yLabel);

//     // Add gridlines
//     svg.append('g')
//       .attr('class', 'grid')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x)
//         .tickSize(-height)
//         .tickFormat('')
//       );

//     svg.append('g')
//       .attr('class', 'grid')
//       .call(d3.axisLeft(y)
//         .tickSize(-width)
//         .tickFormat('')
//       );

//     const line = d3.line()
//       .x(d => x(d.x))
//       .y(d => y(d.y));

//     svg.append('path')
//       .datum(data)
//       .attr('class', 'line')
//       .attr('d', line)
//       .attr('fill', 'none')
//       .attr('stroke', lineColor)
//       .attr('stroke-width', 2);

//   }, [data, xLabel, yLabel, lineColor]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// LineGraph.defaultProps = {
//   xLabel: 'X Axis',
//   yLabel: 'Y Axis',
//   lineColor: 'black'
// };

// export default LineGraph;

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();

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
//       .nice() // Adjust the y-axis to fit the data nicely
//       .range([height, 0]);

//     // Create the x-axis
//     svg.append('g')
//       .attr('transform', `translate(0, ${height})`)
//       .call(d3.axisBottom(x));

//     // Create the y-axis
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

//   }, [data]);

//   return (
//     <svg ref={svgRef} style={{ width: '500px', height: '250px' }}></svg>
//   );
// };

// export default LineGraph;


// import React, {useState, useEffect, useRef , useLayoutEffect} from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data}) => {
//   const svgRef = useRef();
 

//   useEffect(() => {
    
//     if (!data) {
//       console.log("data not yet availalble to d3....")
//       setLoading(false);

//       return};
//       console.log("data avaialbe to d3 now ready smile")
//     const width = 300; // Reduced width
//     const height = 150; // Reduced height
//     const margin = { top: 10, right: 10, bottom: 20, left: 20 }; // Reduced margins

//     const svg = d3.select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height);

//     const x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.x))
//       .range([margin.left, width - margin.right]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .range([height - margin.bottom, margin.top]);

//     const xAxis = d3.axisBottom(x).ticks(3); // Reduced number of ticks
//     const yAxis = d3.axisLeft(y).ticks(3); // Reduced number of ticks

//     svg.selectAll("*").remove();
    
//     svg.append('g')
//       .attr('transform', `translate(0,${height - margin.bottom})`)
//       .call(xAxis);

//     svg.append('g')
//       .attr('transform', `translate(${margin.left},0)`)
//       .call(yAxis);

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

      
//       console.log("plot now ready..")
//   }, [data]);



//   return (
//     <div>    
//     <svg ref={svgRef}></svg>
//   </div>
//   );
// };

// export default LineGraph;



// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;
//     const width = screenWidth * 0.8 - margin.left - margin.right;
//     const height = screenHeight * 0.8 - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr('width', screenWidth * 0.8)
//       .attr('height', screenHeight * 0.8)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.x))
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .range([height, 0]);

//     const xAxis = d3.axisBottom(x).tickSizeOuter(0);
//     const yAxis = d3.axisLeft(y).tickSizeOuter(0);

//     svg.append('g')
//       .attr('transform', `translate(0,${height})`)
//       .call(xAxis);

//     svg.append('g')
//       .call(yAxis);

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
      

//   }, [data]);

//   return (
//     <svg ref={svgRef} style={{ width: '400', height: '200', float: 'left' }}></svg>
//   );
// };

// export default LineGraph;


// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const LineGraph = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     if (!data) return;

//     const margin = { top: 40, right: 40, bottom: 40, left: 40 };
//     const screenWidth = window.innerWidth;
//     const screenHeight = window.innerHeight;
//     const width = screenWidth * 0.8 - margin.left - margin.right;
//     const height = screenHeight * 0.8 - margin.top - margin.bottom;

//     const svg = d3.select(svgRef.current)
//       .attr('width', screenWidth * 0.8)
//       .attr('height', screenHeight * 0.8)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.x))
//       .range([0, width]);

//     const y = d3.scaleLinear()
//       .domain(d3.extent(data, d => d.y))
//       .range([height, 0]);

   

//     // Append y-axis line
//     svg.append("g")
//       .attr("transform", `translate(${width / 2},0)`) // Move y-axis line to the middle of the graph
//       .append("line")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", 0)
//       .attr("y2", height)
//       .attr("stroke", "black");

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

//   }, [data]);

//   return (
//     <svg ref={svgRef} style={{ width: '80vw', height: '80vh', float: 'left' }}></svg>
//   );
// };

// export default LineGraph;

