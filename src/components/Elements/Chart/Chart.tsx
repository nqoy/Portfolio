import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

type ChartType = "pie" | "bar" | "line" | "doughnut";

type ChartProps = {
  title?: string;
  labels: string[];
  chartType: ChartType;
  labelValues: number[];
  options?: ChartOptions<ChartType>;
};

const chartStyles = {
  backgroundColor: [
    "rgb(246, 109, 68)",
    "rgb(254, 174, 101)",
    "rgb(230, 246, 157)",
    "rgb(170, 222, 167)",
    "rgb(60, 172, 226)",
    "rgb(220, 83, 226)",
    "rgb(138, 86, 226)",
    "rgb(100, 194, 166)",
    "rgb(45, 135, 187)",
    "rgb(99, 129, 226)",
    "rgb(21, 215, 226)",
    "rgb(219, 215, 226)",
    "rgb(179, 193, 226)",
    "rgb(139, 171, 226)",
    "rgb(99, 149, 226)",
    "rgb(59, 127, 226)",
    "rgb(19, 105, 226)",
    "rgb(180, 61, 226)",
  ],
  borderColor: "#000",
  borderWidth: 3,
};

const chartTypes: Record<ChartType, React.ElementType> = {
  pie: Pie,
  bar: Bar,
  line: Line,
  doughnut: Doughnut,
};

const defaultOptions: ChartOptions<ChartType> = {
  responsive: true,
  animation: {
    duration: 1600,
  },
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const size = context.raw as number;
          return `Size: ${size} bytes`;
        },
      },
    },
  },
};

export const Chart = ({
  chartType,
  title,
  labels,
  labelValues,
  options,
}: ChartProps) => {
  const ChartComponent = chartTypes[chartType];

  const data: ChartData<typeof chartType> = {
    labels,
    datasets: [
      {
        data: labelValues,
        backgroundColor: chartStyles.backgroundColor,
        borderColor: chartStyles.borderColor,
        borderWidth: chartStyles.borderWidth,
      },
    ],
  };

  return (
    <div>
      <h3>{title}</h3>
      <ChartComponent data={data} options={options || defaultOptions} />
    </div>
  );
};
