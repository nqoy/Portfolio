import React from "react";
import { Pie, Bar, Line, Doughnut } from "react-chartjs-2";
import styles from "./Chart.module.css";
import { chartStyles } from "./chartStyles";
import { defaultOptions, ChartType } from "./chartOptions";

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

type ChartProps = {
  title?: string;
  labels: string[];
  chartType: ChartType;
  labelValues: number[];
  options?: ChartOptions<ChartType>;
};

const chartTypes: Record<ChartType, React.ElementType> = {
  pie: Pie,
  bar: Bar,
  line: Line,
  doughnut: Doughnut,
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
    <div className={styles.ChartContainer}>
      {title && <h3>{title}</h3>}
      <ChartComponent data={data} options={options || defaultOptions} />
    </div>
  );
};
