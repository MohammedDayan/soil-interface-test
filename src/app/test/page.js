"use client";
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PlotComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/get_cyclic_graph')
            .then(response => response.text())
            .then(data => {
                const rows = data.trim().split('\n').map(row => row.split(/\s+/));
                const column1 = rows.slice(1).map(row => row[1]);
                const column2 = rows.slice(1).map(row => row[2]);
                const column3 = rows.slice(1).map(row => row[3]);
                const column4 = rows.slice(1).map(row => row[4]);

                const trace1 = {
                    x: column2,
                    y: column1,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: { width: 1, color: 'black' },
                    marker: { size: 2 },
                    text: rows.slice(1).map(row => row[3]),
                };

                const trace2 = {
                    x: column2,
                    y: column4,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: { width: 1, color: 'black' },
                    marker: { size: 2 },
                    text: rows.slice(1).map(row => row[3]),
                };

                const trace3 = {
                    x: column3,
                    y: column4,
                    mode: 'lines+markers',
                    type: 'scatter',
                    line: { width: 1, color: 'black' },
                    marker: { size: 2 },
                    text: rows.slice(1).map(row => row[3]),
                };

                setData({
                    trace1,
                    trace2,
                    trace3,
                    layout1: {
                        title: 'Tangential Displacement (m) against Normal Displacement (m)',
                        xaxis: { title: 'Tangential Displacement (m)' },
                        yaxis: { title: 'Normal Displacement (m)' },
                        showlegend: false,
                        paper_bgcolor: 'rgba(245,245,245,0.9)',
                        plot_bgcolor: 'rgba(245,245,245,0.9)',
                    },
                    layout2: {
                        title: 'Normal Stress (Pa) against Shear Stress (Pa)',
                        xaxis: { title: 'Normal Stress (Pa)' },
                        yaxis: { title: 'Shear Stress (Pa)' },
                        showlegend: false,
                        paper_bgcolor: 'rgba(245,245,245,0.9)',
                        plot_bgcolor: 'rgba(245,245,245,0.9)',
                    },
                    layout3: {
                        title: 'Tangential Displacement (m) against Shear Stress (Pa)',
                        xaxis: { title: 'Tangential Displacement (m)' },
                        yaxis: { title: 'Shear Stress (Pa)' },
                        showlegend: false,
                        paper_bgcolor: 'rgba(245,245,245,0.9)',
                        plot_bgcolor: 'rgba(245,245,245,0.9)',
                    },
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Plot data={[data.trace1]} layout={data.layout1} />
            <Plot data={[data.trace2]} layout={data.layout2} />
            <Plot data={[data.trace3]} layout={data.layout3} />
        </div>
    );
};

export default PlotComponent;
