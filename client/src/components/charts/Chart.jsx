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

const Chart = ({ data, title, yAxis }) => {
  const label = title;

  const [chartData, setChartData] = useState({
    labels: [],
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
      setChartData({
        labels: data.map((item) => item.tidspunkt),
        datasets: [
          {
            label: label,
            data: data.map((item) => item.maling),
            borderColor: "#438238",
            backgroundColor: "red",
          },
          {
            label: "Meter",
            data: [],
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
    <div className="h-full w-full rounded-lg bg-white">
      <h1 className="z-50 translate-y-14 text-2xl font-bold text-black">
        {title}
      </h1>
      <h2 className="z-50 -translate-x-[21.7rem] translate-y-[11.4rem] rotate-[270deg] text-xl font-bold text-black">
        {yAxis}
      </h2>
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
      text: "",
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
        display: false,
        text: "",
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
        text: "",
        color: "",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: { top: 0, left: 0, right: 0, bottom: 10 },
      },
    },
  },
};

export default Chart;
