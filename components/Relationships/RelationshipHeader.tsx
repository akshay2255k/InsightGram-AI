// ======================================================
// InsightGram AI
// File : src/components/Relationships/RelationshipHeader.tsx
// ======================================================

import {
    Users,
    HeartHandshake,
    UserMinus,
    UserPlus,
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

export default function RelationshipHeader() {

    const {
        statistics,
        users,
    } = useAppStore();

    const navigate =
        useNavigate();

    if (!statistics) {

        return null;

    }

    const cards = [

        {
            title:
                "Total Users",

            value:
                users.length,

            icon:
                <Users size={22} />,

            color:
                "#18C8FF",

            filter:
                "all",
        },

        {
            title:
                "Mutual",

            value:
                statistics.mutual,

            icon:
                <HeartHandshake
                    size={22}
                />,

            color:
                "#34D399",

            filter:
                "mutual",
        },

        {
            title:
                "Not Following Back",

            value:
                statistics.notFollowingBack,

            icon:
                <UserMinus
                    size={22}
                />,

            color:
                "#FF5A7A",

            filter:
                "notFollowingBack",
        },

        {
            title:
                "You Don't Follow Back",

            value:
                statistics.youDontFollowBack,

            icon:
                <UserPlus
                    size={22}
                />,

            color:
                "#FBBF24",

            filter:
                "youDontFollowBack",
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
                                `${ROUTES.RELATIONSHIPS}?filter=${card.filter}`
                            )
                        }
                        style={{

                            border:
                                "1px solid rgba(255,255,255,.08)",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",

                            textAlign:
                                "left",

                            width:
                                "100%",

                            cursor:
                                "pointer",

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