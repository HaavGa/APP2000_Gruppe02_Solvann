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

/**
 * Oppretter en graf
 * @source https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/line/default/App.tsx
 * @param {object} data daten som skal vises
 * @param {string} title tittelen til grafen
 * @param {string} yAxis tittelen til y-aksen på grafen
 * @param {string} color fargen til grafen
 * @returns
 */
const Chart = ({ data, title, yAxis, color }) => {
  const label = title;

  /**
   * Metoden deler tabellen i to deler, basert på splitIndex
   * @param {array} data en tabell
   * @returns et objekt med to tabeller, der de er delt på splitIndex
   */
  const divideData = (data) => {
    const splitIndex = 12;
    const firstHalf = data.splice(0, splitIndex);
    const secondHalf = data.splice(-splitIndex);
    return { firstHalf: firstHalf, secondHalf: secondHalf };
  };

  /**
   * Metoden setter standard verdi for grafen
   */
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

  /**
   * Metoden får inn et objekt med data, og mapper over
   * dette og setter inn tidspunkt på x-aksen og målingen
   * i den respektive grafen (gårsdagens eller i dag)
   */
  useEffect(() => {
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
  }, [chartData]);

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

/**
 * objekt for å style grafen
 */
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
