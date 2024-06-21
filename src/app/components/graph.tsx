"use client"  
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DataPoint {
  x: number;
  y: number;
}

const Graph = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const scatterChart = useRef<Chart<"scatter"> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://127.0.0.1:5000/get_text_file');
             const response = await fetch('http://127.0.0.1:5000/get_cyclic_graph');
        const text = await response.text();
        const rows = text.trim().split('\n').map(row => row.split(/\s+/));
        const newData = rows.slice(1).map(row => ({ x: parseFloat(row[1]), y: parseFloat(row[2]) }));
        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && data.length > 0) {
      if (scatterChart.current) {
        scatterChart.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        scatterChart.current = new Chart(ctx, {
          type: 'scatter',
          data: {
            datasets: [{
              label: 'Scatter Plot',
              data: data,
              backgroundColor: '#8884d8',
            }]
          },
          options: {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                  display: true,
                  text: 'Column 1'
                }
              },
              y: {
                type: 'linear',
                position: 'left',
                title: {
                  display: true,
                  text: 'Column 2'
                }
              }
            }
          }
        });
      }
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};

export default Graph;
