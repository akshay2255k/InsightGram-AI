// ======================================================
// InsightGram AI
// File : src/components/Dashboard/OverviewCards.tsx
// Part : 1
// ======================================================

import {
    Users,
    UserPlus,
    UserMinus,
    HeartHandshake,
} from "lucide-react";

import StatCard from "./StatCard";

import { useAppStore } from "../../store/appStore";

export default function OverviewCards() {

    const {

        statistics,

    } = useAppStore();

    if (!statistics) {

        return null;

    }

    return (

        <section
            className="overview-grid"
        >

            <StatCard

                title="Followers"

                value={
                    statistics.followers
                }

                icon={
                    <Users size={24}/>
                }

                color="#18C8FF"

                description="People following you"

            />

            <StatCard

                title="Following"

                value={
                    statistics.following
                }

                icon={
                    <UserPlus size={24}/>
                }

                color="#6D5DF6"

                description="Accounts you follow"

            />

            <StatCard

                title="Not Following Back"

                value={
                    statistics.notFollowingBack
                }

                icon={
                    <UserMinus size={24}/>
                }

                color="#FF5A7A"

                description="You follow them"

            />

            <StatCard
            // ======================================================
// InsightGram AI
// File : src/components/Dashboard/OverviewCards.tsx
// Part : 2
// ======================================================

            <StatCard

                title="Mutual"

                value={
                    statistics.mutual
                }

                icon={
                    <HeartHandshake size={24}/>
                }

                color="#34D399"

                description="You follow each other"

            />

            <StatCard

                title="Pending Requests"

                value={
                    statistics.pendingRequests
                }

                icon={
                    <UserPlus size={24}/>
                }

                color="#FBBF24"

                description="Waiting for acceptance"

            />

            <StatCard

                title="Relationship Score"

                value={`${statistics.relationshipScore}%`}

                icon={
                    <HeartHandshake size={24}/>
                }

                color="#18C8FF"

                description="AI calculated score"

            />

        </section>

    );

}