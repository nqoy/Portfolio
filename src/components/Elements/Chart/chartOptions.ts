import { ChartOptions } from "chart.js";

export type ChartType = "pie" | "bar" | "line" | "doughnut";

export const defaultOptions: ChartOptions<ChartType> = {
  responsive: true,
  animation: {
    duration: 1600,
  },
  plugins: {
    legend: {
      align: "start",
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
