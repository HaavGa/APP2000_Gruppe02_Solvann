import React, { useEffect, useState } from "react";
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

const Chart = ({ data, title, yAxis, color }) => {
  const label = title;

  const divideData = (data) => {
    const splitIndex = 12;
    const firstHalf = data.splice(0, splitIndex);
    const secondHalf = data.splice(-splitIndex);
    return { firstHalf: firstHalf, secondHalf: secondHalf };
  };

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
    const interval = setInterval(() => {
      const getChartData = async () => {
        const { firstHalf, secondHalf } = divideData(data);
        setChartData({
          labels: firstHalf
            .slice(0)
            .reverse()
            .map((item) => item.tidspunkt),
          datasets: [
            {
              label: label,
              data: firstHalf.map((item) => item.maling),
              borderColor: "gray",
              backgroundColor: "gray",
              borderDash: [5, 5],
            },
            {
              label: label,
              data: secondHalf.map((item) => item.maling),
              borderColor: color,
              backgroundColor: color,
            },
          ],
        });
      };
      getChartData();
    }, 2000);
    return () => clearInterval(interval);
  }, []); // chartData inn her for automatisk oppdatering

  return (
    <div className="relative h-full w-full rounded-lg bg-white">
      <h1 className="flex translate-y-10 justify-center text-2xl font-bold text-black">
        {title}
      </h1>
      <h2 className="absolute z-20 flex translate-y-40 rotate-[270deg] text-xl font-bold text-black">
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
      bottom: 0,
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
        padding: { top: 0, left: 0, right: 0, bottom: 0 },
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
        padding: { top: 0, left: 0, right: 0, bottom: 0 },
      },
    },
  },
};

export default Chart;
