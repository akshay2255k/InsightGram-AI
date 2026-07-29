// ======================================================
// InsightGram AI
// File : src/charts/chartConfig.ts
// ======================================================

import type { ChartOptions } from "chart.js";

export const doughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
    },

    plugins: {
        legend: {
            display: true,
            position: "bottom",
            labels: {
                color: "#E5E7EB",
                boxWidth: 14,
                boxHeight: 14,
                padding: 20,
                usePointStyle: true,
                pointStyle: "circle",
                font: {
                    size: 13,
                    family: "Inter",
                },
            },
        },

        tooltip: {
            enabled: true,
            backgroundColor: "#111827",
            titleColor: "#FFFFFF",
            bodyColor: "#E5E7EB",
            borderColor: "#374151",
            borderWidth: 1,
            cornerRadius: 10,
            padding: 12,
            displayColors: true,
        },
    },
};

export const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
        duration: 1000,
    },

    plugins: {
        legend: {
            display: false,
        },

        tooltip: {
            enabled: true,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: "#CBD5E1",
            },
        },

        y: {
            beginAtZero: true,
            grid: {
                color: "rgba(255,255,255,0.08)",
            },
            ticks: {
                color: "#CBD5E1",
            },
        },
    },
};

export const lineChartOptions: ChartOptions<"line"> = {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
        duration: 1000,
    },

    plugins: {
        legend: {
            display: true,
            position: "top",
        },

        tooltip: {
            enabled: true,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
        },

        y: {
            beginAtZero: true,
        },
    },
};

export default {
    doughnutChartOptions,
    barChartOptions,
    lineChartOptions,
};