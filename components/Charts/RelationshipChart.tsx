import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

import { useAppStore } from "../../store/appStore";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function RelationshipChart() {

    const { statistics } = useAppStore();

    const data = useMemo(() => {

        if (!statistics) {

            return {
                labels: [],
                datasets: [],
            };

        }

        return {

            labels: [
                "Mutual",
                "Not Following Back",
                "You Don't Follow Back",
            ],

            datasets: [
                {
                    data: [
                        statistics.mutual,
                        statistics.notFollowingBack,
                        statistics.youDontFollowBack,
                    ],

                    backgroundColor: [
                        "#34D399",
                        "#FF5A7A",
                        "#18C8FF",
                    ],

                    borderColor: [
                        "#34D399",
                        "#FF5A7A",
                        "#18C8FF",
                    ],

                    borderWidth: 2,

                    hoverOffset: 8,

                },
            ],

        };

    }, [statistics]);

    return (

        <section
            className="card"
            style={{
                height: "fit-content",
            }}
        >

            <div
                className="table-header"
                style={{
                    marginBottom: "20px",
                }}
            >

                <h2>

                    Relationship Distribution

                </h2>

            </div>

            {statistics ? (

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "340px",
                        maxHeight: "340px",
                        overflow: "hidden",
                    }}
                >

                    <Doughnut
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: false,
                            plugins: {
                                legend: {
                                    position: "bottom",
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            },
                        }}
                    />

                </div>

            ) : (

                <div
                    className="empty-state"
                    style={{
                        height: "340px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <p>

                        Upload an Instagram ZIP to view relationship statistics.

                    </p>

                </div>

            )}

        </section>

    );

}