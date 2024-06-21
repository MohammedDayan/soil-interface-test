// import React, { useEffect, useRef } from 'react';
// import * as echarts from 'echarts/core';
// import { LineChart } from 'echarts/charts';
// import { CanvasRenderer } from 'echarts/renderers';
// import { useResizeObserver } from 'react-resize-observer';

// const eLineChart = ({ data }) => {
//   const chartRef = useRef(null);
//   const resizeObserverRef = useRef(null);

//   const options = {
//     xAxis: {
//       type: 'category',
//       data: data.map(item => item.x),
//     },
//     yAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         data: data.map(item => item.y),
//         type: 'line',
//       },
//     ],
//   };

//   useEffect(() => {
//     const initChart = () => {
//       const chart = echarts.init(chartRef.current, 'light');
//       chart.setOption(options);
//     };

//     if (chartRef.current) {
//       initChart();
//     }

//     return () => {
//       if (chartRef.current) {
//         chartRef.current.innerHTML = '';
//       }
//     };
//   }, [chartRef, data]);

//   const onResize = () => {
//     if (chartRef.current) {
//       echarts.getInstanceByDom(chartRef.current).resize();
//     }
//   };

//   useResizeObserver(resizeObserverRef, onResize);

//   return (
//     <div ref={chartRef} style={{ width: '100%', height: 400 }} />
//   );
// };

// export default eLineChart;
