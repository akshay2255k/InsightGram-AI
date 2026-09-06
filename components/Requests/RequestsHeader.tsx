// ======================================================
// InsightGram AI
// File : src/components/Requests/RequestsHeader.tsx
// ======================================================

import {
    Clock3,
    UserRoundPlus,
    UserCheck,
    UserMinus,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useAppStore,
} from "../../store/appStore";

import {
    ROUTES,
} from "../../routes";

export default function RequestsHeader() {

    const {
        statistics,
    } = useAppStore();

    const navigate =
        useNavigate();

    if (!statistics) {

        return null;

    }

    const cards = [

        {
            title:
                "Pending Requests",

            value:
                statistics.pendingRequests,

            icon:
                <Clock3 size={22} />,

            color:
                "#FBBF24",

            filter:
                "pending",
        },

        {
            title:
                "Recent Requests",

            value:
                statistics.recentRequests,

            icon:
                <UserRoundPlus
                    size={22}
                />,

            color:
                "#18C8FF",

            filter:
                "recent",
        },

        {
            title:
                "Close Friends",

            value:
                statistics.closeFriends,

            icon:
                <UserCheck size={22} />,

            color:
                "#34D399",

            filter:
                "closeFriend",
        },

        {
            title:
                "Recently Unfollowed",

            value:
                statistics.recentlyUnfollowed,

            icon:
                <UserMinus size={22} />,

            color:
                "#FF5A7A",

            filter:
                "recentlyUnfollowed",
        },

    ] as const;

    return (

        <section
            className="relationship-header"
            style={{

                display:
                    "grid",

                gridTemplateColumns:
                    "repeat(auto-fit,minmax(220px,1fr))",

                gap:
                    "20px",

                marginBottom:
                    "30px",

            }}
        >

            {cards.map(
                (card) => (

                    <button
                        key={
                            card.title
                        }
                        type="button"
                        className="card"
                        onClick={() =>
                            navigate(
                                `${ROUTES.REQUESTS}?filter=${card.filter}`
                            )
                        }
                        style={{

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",

                            width:
                                "100%",

                            textAlign:
                                "left",

                            cursor:
                                "pointer",

                            border:
                                "1px solid rgba(255,255,255,.08)",

                        }}
                    >

                        <div>

                            <small
                                style={{
                                    color:
                                        "#98A2B3",
                                    display:
                                        "block",
                                    marginBottom:
                                        "8px",
                                }}
                            >

                                {
                                    card.title
                                }

                            </small>

                            <h2
                                style={{
                                    margin:
                                        0,
                                }}
                            >

                                {
                                    card.value
                                }

                            </h2>

                        </div>

                        <div
                            style={{
                                width:
                                    "56px",
                                height:
                                    "56px",
                                borderRadius:
                                    "18px",
                                background:
                                    `${card.color}20`,
                                color:
                                    card.color,
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                            }}
                        >

                            {
                                card.icon
                            }

                        </div>

                    </button>

                )
            )}

        </section>

    );

}