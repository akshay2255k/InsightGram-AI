// ======================================================
// InsightGram AI
// File : src/components/Filters/FilterPanel.tsx
// Part : 1
// ======================================================

import { Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

export interface FilterState {

    mutual: boolean;

    notFollowingBack: boolean;

    followersOnly: boolean;

    favorites: boolean;

    reviewed: boolean;

}

interface FilterPanelProps {

    onChange: (
        filters: FilterState
    ) => void;

}

const defaultFilters: FilterState = {

    mutual: false,

    notFollowingBack: false,

    followersOnly: false,

    favorites: false,

    reviewed: false,

};

export default function FilterPanel({

    onChange,

}: FilterPanelProps) {

    const [

        filters,

        setFilters,

    ] = useState(defaultFilters);

    const toggle = (
        key: keyof FilterState
    ) => {

        const next = {

            ...filters,

            [key]: !filters[key],

        };

        setFilters(next);

        onChange(next);

    };

    const resetFilters = () => {

        setFilters(defaultFilters);

        onChange(defaultFilters);

    };

    return (

        <section className="card">

            <div className="table-header">

                <h2>

                    <Filter size={20} />

                    {" "}

                    Filters

                </h2>

                <button
                    className="btn btn-secondary"
                    onClick={resetFilters}
                >

                    <RotateCcw size={16} />

                    Reset

                </button>

            </div>

            <div className="filter-grid">
                // ======================================================
// InsightGram AI
// File : src/components/Filters/FilterPanel.tsx
// Part : 2
// ======================================================

                {(
                    Object.keys(filters) as Array<
                        keyof FilterState
                    >
                ).map((key) => (

                    <label
                        key={key}
                        className="filter-item"
                    >

                        <input
                            type="checkbox"
                            checked={filters[key]}
                            onChange={() =>
                                toggle(key)
                            }
                        />

                        <span>
                            {key
                                .replace(
                                    /([A-Z])/g,
                                    " $1"
                                )
                                .replace(
                                    /^./,
                                    (text) =>
                                        text.toUpperCase()
                                )}
                        </span>

                    </label>

                ))}

            </div>

        </section>

    );

}