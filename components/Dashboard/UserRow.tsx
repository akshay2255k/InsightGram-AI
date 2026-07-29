// ======================================================
// InsightGram AI
// File : src/components/Dashboard/UserRow.tsx
// Part : 1
// ======================================================

import {
    CheckCircle2,
    ExternalLink,
    Star,
    Pin,
    Tag,
    StickyNote,
} from "lucide-react";

import type {
    InstagramUser,
} from "../../types/instagram";

import {
    openInstagramProfile,
} from "../../utils/helpers";

interface UserRowProps {

    user: InstagramUser;

    reviewed?: boolean;

    onReview?: (
        username: string
    ) => void;

}

export default function UserRow({

    user,

    reviewed = false,

    onReview,

}: UserRowProps) {

    const handleOpen = () => {

        onReview?.(
            user.username
        );

        openInstagramProfile(
            user.username
        );

    };

    return (

        <tr>

            <td>

                <strong>

                    {user.username}

                </strong>

            </td>

            <td>

                {user.youFollow &&
                user.followsYou ? (

                    <span className="badge badge-success">

                        Mutual

                    </span>

                ) : user.youFollow ? (

                    <span className="badge badge-warning">

                        Not Following Back

                    </span>

                ) : (

                    <span className="badge badge-primary">

                        Follows You

                    </span>

                )}

            </td>

            <td>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >

                    {user.favorite && (

                        <Star
                            size={16}
                        />

                    )}

                    {user.pinned && (

                        <Pin
                            size={16}
                        />

                    )}

                    {user.label && (

                        <Tag
                            size={16}
                        />

                    )}

                    {user.note && (

                        <StickyNote
                            size={16}
                        />

                    )}

                </div>

            </td>
            // ======================================================
// InsightGram AI
// File : src/components/Dashboard/UserRow.tsx
// Part : 2
// ======================================================

            <td>

                {reviewed ? (

                    <CheckCircle2
                        size={18}
                    />

                ) : (

                    "-"

                )}

            </td>

            <td>

                <button
                    className="btn btn-primary"
                    onClick={handleOpen}
                >

                    <ExternalLink
                        size={16}
                    />

                    Open

                </button>

            </td>

        </tr>

    );

}