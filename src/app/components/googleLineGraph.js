// // components/GoogleLineGraph.js
// import React from 'react';
// import { Chart } from 'react-google-charts';

// const GoogleLineGraph = ({ data }) => {
//   const chartData = [
//     ['X', 'Y'],
//     ...data.map(point => [point.x, point.y])
//   ];

//   const options = {
//     // title: 'Line Graph',
//     hAxis: { title: 'X' },
//     vAxis: { title: 'Y' },
//     lineWidth: 1,
//     legend: 'none',
//   };

//   return (
//     <Chart
//       chartType="LineChart"
//       width="500px"
//       height="250px"
//       data={chartData}
//       options={options}
//     />
//   );
// };

// export default GoogleLineGraph;


import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { BounceLoader } from 'react-spinners';

const GoogleLineGraph = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const chartData = [
    ['X', 'Y'],
    ...data.map(point => [point.x, point.y])
  ];

  const options = {
    // title: 'Line Graph',
    hAxis: { title: 'X' },
    vAxis: { title: 'Y' },
    lineWidth: 1,
    legend: 'none',
  };

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
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={chartData}
        options={options}
        chartEvents={[
          {
            eventName: 'ready',
            callback: () => {
              setLoading(false);
            },
          },
        ]}
      />
    </div>
  );
};

export default GoogleLineGraph;
