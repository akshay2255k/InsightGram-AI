// ======================================================
// InsightGram AI
// File : src/types/chart.ts
// ======================================================

import type {
    ChartData,
    ChartDataset,
    ChartOptions,
} from "chart.js";

export type SupportedChartType =
    | "line"
    | "bar"
    | "pie"
    | "doughnut"
    | "radar"
    | "polarArea";

export interface ChartSeries {

    label: string;

    data: number[];

    backgroundColor?:
        | string
        | string[];

    borderColor?:
        | string
        | string[];

    borderWidth?: number;

    fill?: boolean;

    tension?: number;

}

export interface InsightChartData {

    labels: string[];

    datasets: ChartSeries[];

}

export interface ChartTheme {

    background: string;

    text: string;

    grid: string;

    border: string;

    primary: string;

    secondary: string;

    success: string;

    warning: string;

    danger: string;

}

export interface RelationshipChartProps {

    title?: string;

    type?: SupportedChartType;

    data: ChartData;

    options?: ChartOptions;

    height?: number;

}

export interface ChartStatistic {

    label: string;

    value: number;

    color?: string;

}

export interface ChartExport {

    name: string;

    createdAt: string;

    type: SupportedChartType;

    data: ChartData;

}

export type DoughnutDataset =
    ChartDataset<
        "doughnut",
        number[]
    >;

export type BarDataset =
    ChartDataset<
        "bar",
        number[]
    >;

export type LineDataset =
    ChartDataset<
        "line",
        number[]
    >;

export default {};