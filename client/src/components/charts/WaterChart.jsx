import React, { useEffect, useState } from 'react';
import Axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WaterChart = () => {

  const labels = [
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
    "dato",
  ];

  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        label: "Meter",
        data: [30.7, 39.2, 31.2, 38.5, 41.0, 33.1, 37.9, 29.6, 35.4, 31.9],
        borderColor: "#334155",
        backgroundColor: "#fbbf24",
      },
    ],
  });

  useEffect(() => {
    const fetchData= async()=> {
      const waterData = await Axios.get("https://solvann.azurewebsites.net/api/WaterInflux/all")
      setChartData({
        labels,
        datasets: [
          {
            label: "Meter",
            data: [30.7, 39.2, 31.2, 38.5, 41.0, 33.1, 37.9, 29.6, 35.4, 31.9], //funker ikke med waterData.data
            borderColor: "#334155",
            backgroundColor: "#fbbf24",
          },
        ],
      });
    }
    fetchData(); 
  }, []);

  return (
    <div className="mx-auto mt-8 flex h-auto w-2/4 justify-center rounded-lg bg-white">
      <Line options={styling} data={chartData} />
    </div>
  ); 
}; 

const styling = {
  responsive: true,
  pointRadius: 4,
  // tension: 0.4,  //avgjør hvor skarpt grafen snur
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 30,
    },
  },
  plugins: {
    legend: {
      display: false,
      // position: "top",
    },
    title: {
      display: true,
      text: "VANNSTAND: SISTE 10 MÅLINGER",
      color: "#334155",
      font: {
        size: 20,
      },
      padding: {
        bottom: 20,
        top: 10,
      },
    },
  },
  scales: {
    x: {
      display: true,
      // ticks: {
      //   font: {
      //     size: 14,
      //     weight: 'bold',
      //   },
      // },
      title: {
        display: true,
        text: "Tidspunkt",
        color: "#334155",
        font: {
          size: 18,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
    y: {
      display: true,
      // ticks: {
      //   font: {
      //     size: 14,
      //     weight: 'bold',
      //   },
      // },
      min: 20,
      max: 45,
      title: {
        display: true,
        text: "Meter",
        color: "#334155",
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
      },
    },
  },
};




export default WaterChart; 
