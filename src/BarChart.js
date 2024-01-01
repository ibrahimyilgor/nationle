import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppContext } from "./context/context";
import { useWindowDimensions } from "react-native";
import { colors } from "./Constants";

const BarChart = ({ data }) => {
  const { l } = useAppContext();
  const dim = useWindowDimensions();

  const options = {
    colors: [
      "#000000",
      "#FE0000",
      "#E14D2A",
      "#FFA000",
      "#FEDB39 ",
      "#5F8D4E",
      "#285430",
    ],
    chart: {
      type: "bar",
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
          [0, "transparent"],
          [1, "transparent"],
        ],
      },
      style: {
        fontFamily: "Patrick Hand",
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: [
        l("europe"),
        l("asia"),
        l("africa"),
        l("southAmerica"),
        l("northAmerica"),
        l("oceania"),
      ],
      labels: {
        style: {
          color: colors.yellow,
          font: '"Patrick Hand", bold 12px "Trebuchet MS", Verdana, sans-serif',
          fontSize: dim.height > dim.width ? "13px" : "20px",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      labels: {
        style: {
          color: colors.yellow,
          font: '"Patrick Hand", bold 12px "Trebuchet MS", Verdana, sans-serif',
          fontSize: dim.height > dim.width ? "13px" : "20px",
        },
      },
      allowDecimals: false,
    },
    legend: {
      reversed: true,
      itemStyle: {
        font: '"Patrick Hand", 9pt Trebuchet MS, Verdana, sans-serif',
        color: colors.yellow,
      },
      itemHoverStyle: {
        color: colors.yellow,
      },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: [
      {
        name: `${l("loseChart")}`,
        data: data.map((d) => d[0]),
      },
      {
        name: `${l("guessChart")} 6`,
        data: data.map((d) => d[6]),
      },
      {
        name: `${l("guessChart")} 5`,
        data: data.map((d) => d[5]),
      },
      {
        name: `${l("guessChart")} 4`,
        data: data.map((d) => d[4]),
      },
      {
        name: `${l("guessChart")} 3`,
        data: data.map((d) => d[3]),
      },
      {
        name: `${l("guessChart")} 2`,
        data: data.map((d) => d[2]),
      },
      {
        name: `${l("guessChart")} 1`,
        data: data.map((d) => d[1]),
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
