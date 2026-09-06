// ======================================================
// InsightGram AI
// File : src/components/Dashboard/OverviewCards.tsx
// ======================================================

import {
    Users,
    UserPlus,
    UserMinus,
    HeartHandshake,
    Clock3,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import StatCard from "./StatCard";

import {
    useAppStore,
} from "../../store/appStore";

import {
    ROUTES,
} from "../../routes";

interface OverviewCardsProps {

    interactive?: boolean;

}

export default function OverviewCards({

    interactive = true,

}: OverviewCardsProps) {

    const {
        statistics,
    } = useAppStore();

    const navigate =
        useNavigate();

    if (!statistics) {

        return null;

    }

    const goToRelationships =
        (
            filter:
                | "all"
                | "mutual"
                | "notFollowingBack"
                | "youDontFollowBack"
        ) => {

            navigate(
                `${ROUTES.RELATIONSHIPS}?filter=${filter}`
            );

        };

    const goToRequests =
        (
            filter:
                | "pending"
                | "recent"
                | "closeFriend"
                | "recentlyUnfollowed"
        ) => {

            navigate(
                `${ROUTES.REQUESTS}?filter=${filter}`
            );

        };

    return (

        <section className="overview-grid">

            {/* Followers */}

            <StatCard

                title="Followers"

                value={
                    statistics.followers
                }

                icon={
                    <Users size={24} />
                }

                color="#18C8FF"

                description="People following you"

                onClick={
                    interactive
                        ? () =>
                              goToRelationships(
                                  "youDontFollowBack"
                              )
                        : undefined
                }

            />

            {/* Following */}

            <StatCard

                title="Following"

                value={
                    statistics.following
                }

                icon={
                    <UserPlus size={24} />
                }

                color="#6D5DF6"

                description="Accounts you follow"

                onClick={
                    interactive
                        ? () =>
                              goToRelationships(
                                  "notFollowingBack"
                              )
                        : undefined
                }

            />

            {/* Not Following Back */}

            <StatCard

                title="Not Following Back"

                value={
                    statistics.notFollowingBack
                }

                icon={
                    <UserMinus size={24} />
                }

                color="#FF5A7A"

                description="You follow them"

                onClick={
                    interactive
                        ? () =>
                              goToRelationships(
                                  "notFollowingBack"
                              )
                        : undefined
                }

            />

            {/* Mutual */}

            <StatCard

                title="Mutual"

                value={
                    statistics.mutual
                }

                icon={
                    <HeartHandshake
                        size={24}
                    />
                }

                color="#34D399"

                description="You follow each other"

                onClick={
                    interactive
                        ? () =>
                              goToRelationships(
                                  "mutual"
                              )
                        : undefined
                }

            />

            {/* Pending */}

            <StatCard

                title="Pending Requests"

                value={
                    statistics.pendingRequests
                }

                icon={
                    <Clock3 size={24} />
                }

                color="#FBBF24"

                description="Waiting for acceptance"

                onClick={
                    interactive
                        ? () =>
                              goToRequests(
                                  "pending"
                              )
                        : undefined
                }

            />

            {/* Relationship Score */}

            <StatCard

                title="Relationship Score"

                value={`${statistics.relationshipScore}%`}

                icon={
                    <HeartHandshake
                        size={24}
                    />
                }

                color="#18C8FF"

                description="AI calculated score"

            />

        </section>

    );

}