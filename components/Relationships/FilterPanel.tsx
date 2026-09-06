// ======================================================
// InsightGram AI
// File : src/components/Relationships/FilterPanel.tsx
// ======================================================

import {
    Filter,
} from "lucide-react";

import {
    useSearchParams,
} from "react-router-dom";

import {
    type RelationshipFilter,
    useAppStore,
} from "../../store/appStore";

const FILTERS:
    Array<{
        label: string;
        value: RelationshipFilter;
    }> = [

        {
            label:
                "All",

            value:
                "all",
        },

        {
            label:
                "Mutual",

            value:
                "mutual",
        },

        {
            label:
                "Not Following Back",

            value:
                "notFollowingBack",
        },

        {
            label:
                "You Don't Follow Back",

            value:
                "youDontFollowBack",
        },

    ];

export default function FilterPanel() {

    const [
        searchParams,
        setSearchParams,
    ] =
        useSearchParams();

    const {
        setRelationshipFilter,
    } =
        useAppStore();

    const current =
        searchParams.get(
            "filter"
        ) as RelationshipFilter | null;

    const active:
        RelationshipFilter =
        current &&
        FILTERS.some(
            (
                filter
            ) =>
                filter.value ===
                current
        )
            ? current
            : "all";

    const handleFilter =
        (
            value:
                RelationshipFilter
        ) => {

            setRelationshipFilter(
                value
            );

            if (
                value ===
                "all"
            ) {

                setSearchParams(
                    {}
                );

            } else {

                setSearchParams({
                    filter:
                        value,
                });

            }

        };

    return (

        <section
            className="card"
            style={{
                marginTop:
                    "18px",
                marginBottom:
                    "24px",
            }}
        >

            <div
                style={{
                    display:
                        "flex",
                    alignItems:
                        "center",
                    gap:
                        "10px",
                    flexWrap:
                        "wrap",
                }}
            >

                <Filter
                    size={
                        20
                    }
                />

                <strong
                    style={{
                        marginRight:
                            "4px",
                    }}
                >
                    Filter
                </strong>

                {FILTERS.map(
                    (
                        filter
                    ) => (

                        <button
                            key={
                                filter.value
                            }
                            type="button"
                            className={
                                active ===
                                filter.value
                                    ? "btn btn-primary"
                                    : "btn btn-secondary"
                            }
                            onClick={() =>
                                handleFilter(
                                    filter.value
                                )
                            }
                        >

                            {
                                filter.label
                            }

                        </button>

                    )
                )}

            </div>

        </section>

    );

}