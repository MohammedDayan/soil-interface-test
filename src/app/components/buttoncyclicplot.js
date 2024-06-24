import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineGraph = ({ data, xLabel, yLabel, lineColor, legend }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    const margin = { top: 40, right: 30, bottom: 60, left: 75 };
    const boxWidth = 500;
    const boxHeight = 400;
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
      .domain([Math.min(0, d3.min(data, d => d.x)), d3.max(data, d => d.x)])
      // .domain(d3.extent(data, d => d.x))
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
      .attr('transform', 'rotate(0)')
      .style('font-size', '18px');  // Increase font size here

    // Create the y-axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSizeOuter(0))
      .selectAll('text')
      .style('font-size', '18px');  // Increase font size here

    // Add x-axis label
    g.append('text')
      .attr('transform', `translate(${width / 2},${height + margin.top + 10})`)
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
      .text(xLabel);

    // Add y-axis label
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '18px')
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
      .attr('stroke-width', 1.5);

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
    <svg ref={svgRef} style={{ width: 'auto', height: 'auto' , backgroundColor:'white' ,fontFamily:'arial',fontWeight:'normal' }}></svg>
  );
};

LineGraph.defaultProps = {
 
  lineColor: 'black',
  legend: null
};

export default LineGraph;
