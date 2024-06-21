"use client"  
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Graph = () => {
    const [data, setData] = useState<number[][]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
        // const response = await fetch('http://127.0.0.1:5000/get_text_file');
        
        const text = await response.text();
        const rows = text.trim().split('\n').map(row => row.split(/\s+/));
        const newData = rows.slice(1).map(row => [parseFloat(row[1]), parseFloat(row[2])]);
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: {
      type: 'scatter'
    },
    borderWidth: 1,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotShadow: true,
    plotBorderWidth: 1,
    title: {
      text: 'Scatter Plot'
    },
    xAxis: {
      title: {
        text: 'Column 1'
      },
      type: 'linear'
    },
    yAxis: {
      title: {
        text: 'Column 2'
      },
      type: 'linear'
    },
    series: [{
      name: 'Data',
      data: data
    }]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
