// ======================================================
// InsightGram AI
// File : src/components/Requests/RequestFilterPanel.tsx
// ======================================================

import {
    Filter,
} from "lucide-react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import type {
    RequestFilter,
} from "../../store/appStore";

import {
    ROUTES,
} from "../../routes";

const filters: Array<{
    label: string;
    value: RequestFilter;
}> = [

    {
        label:
            "All",

        value:
            "all",
    },

    {
        label:
            "Pending",

        value:
            "pending",
    },

    {
        label:
            "Recent Requests",

        value:
            "recent",
    },

    {
        label:
            "Close Friends",

        value:
            "closeFriend",
    },

    {
        label:
            "Recently Unfollowed",

        value:
            "recentlyUnfollowed",
    },

];

export default function RequestFilterPanel() {

    const [
        searchParams,
    ] = useSearchParams();

    const navigate =
        useNavigate();

    const active =
        (
            searchParams.get(
                "filter"
            ) as RequestFilter
        ) || "all";

    const handleChange =
        (
            value: RequestFilter
        ) => {

            navigate(
                value === "all"
                    ? ROUTES.REQUESTS
                    : `${ROUTES.REQUESTS}?filter=${value}`
            );

        };

    return (

        <section
            className="card"
            style={{
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
                        "14px",
                    flexWrap:
                        "wrap",
                }}
            >

                <Filter
                    size={20}
                />

                {filters.map(
                    (filter) => (

                        <button
                            key={
                                filter.value
                            }
                            type="button"
                            onClick={() =>
                                handleChange(
                                    filter.value
                                )
                            }
                            className={
                                active ===
                                filter.value
                                    ? "btn btn-primary"
                                    : "btn btn-secondary"
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