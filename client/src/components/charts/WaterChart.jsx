import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
    "dato",
    "dato",
    "dato",
    "dato",
  ];

  const [chartData, setChartData] = useState({
    labels,
    datasets: [
      {
        data: [],
        borderColor: "#334155",
        backgroundColor: "#fbbf24",
      },
    ],
  });

  useEffect(() => {
    // const interval = setInterval(async () => {
    const getChartData = async () => {
      const response = await axios.get(
        "https://solvann.azurewebsites.net/api/WaterInflux/all"
      );
      const data = response.data.slice(0, labels.length);
      const oldData = response.data.slice(labels.length, labels.length * 2);
      setChartData({
        labels,
        datasets: [
          {
            data: [...data],
            borderColor: "#438238",
            fill: true,
            backgroundColor: "red",
          },
          {
            label: "Meter",
            data: [...oldData],
            fill: true,
            borderColor: "#334155",
            backgroundColor: "red",
            borderDash: [5, 5],
          },
        ],
      });
    };
    getChartData();
    // }, 60000);
    // return () => clearInterval(interval);
  }, [chartData]);

  return (
    <div className="mx-auto mt-8 flex h-auto w-2/4 justify-center rounded-lg bg-white">
      <Line options={styling} data={chartData} />
    </div>
  );
};

const styling = {
  responsive: true,
  pointRadius: 4,
  tension: 0.2, //avgjør hvor skarpt grafen snur
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
      text: "VANNSTAND",
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
          weight: "bold",
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
      title: {
        display: true,
        text: "Meter",
        color: "#334155",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
      },
    },
  },
};

export default WaterChart;
