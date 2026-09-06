// ======================================================
// InsightGram AI
// File : src/components/Dashboard/StatCard.tsx
// ======================================================

import type {
    ReactNode,
} from "react";

import {
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

interface StatCardProps {

    title: string;

    value:
        | number
        | string;

    icon: ReactNode;

    color?: string;

    change?: number;

    description?: string;

    onClick?: () => void;

}

export default function StatCard({

    title,

    value,

    icon,

    color = "#18C8FF",

    change,

    description,

    onClick,

}: StatCardProps) {

    const positive =
        (change ?? 0) >= 0;

    const clickable =
        Boolean(onClick);

    return (

        <div

            className="card stat-card glow-border fade-scale"

            role={
                clickable
                    ? "button"
                    : undefined
            }

            tabIndex={
                clickable
                    ? 0
                    : undefined
            }

            onClick={
                onClick
            }

            onKeyDown={
                clickable
                    ? (
                        event
                    ) => {

                        if (
                            event.key ===
                                "Enter" ||
                            event.key ===
                                " "
                        ) {

                            event.preventDefault();

                            onClick?.();

                        }

                    }
                    : undefined
            }

            style={{

                cursor:
                    clickable
                        ? "pointer"
                        : "default",

            }}

        >

            <div
                className="stat-card-header"
            >

                <div
                    className="stat-icon"
                    style={{
                        color,
                    }}
                >

                    {icon}

                </div>

                {clickable && (

                    <ArrowUpRight
                        size={17}
                        color={color}
                    />

                )}

                {typeof change ===
                    "number" && (

                    <div
                        className={
                            positive
                                ? "badge badge-success"
                                : "badge badge-danger"
                        }
                    >

                        {positive ? (

                            <ArrowUpRight
                                size={14}
                            />

                        ) : (

                            <ArrowDownRight
                                size={14}
                            />

                        )}

                        {Math.abs(
                            change
                        )}%

                    </div>

                )}

            </div>

            <div
                className="stat-card-body"
            >

                <h3
                    className="stat-title"
                >

                    {title}

                </h3>

                <h2
                    className="stat-value gradient-text"
                >

                    {value}

                </h2>

                {description && (

                    <p
                        className="stat-description"
                    >

                        {description}

                    </p>

                )}

            </div>

        </div>

    );

}