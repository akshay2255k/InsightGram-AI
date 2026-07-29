// ======================================================
// InsightGram AI
// File : src/components/Dashboard/RelationshipTable.tsx
// Part : 1
// ======================================================

import { useMemo, useState } from "react";

import {
    ExternalLink,
    CheckCircle2,
} from "lucide-react";

import type {
    InstagramUser,
} from "../../types/instagram";

import {
    openInstagramProfile,
} from "../../utils/helpers";

interface RelationshipTableProps {

    users: InstagramUser[];

    title?: string;

}

export default function RelationshipTable({

    users,

    title = "Relationships",

}: RelationshipTableProps) {

    const [

        reviewed,

        setReviewed,

    ] = useState<
        Set<string>
    >(new Set());

    const sortedUsers = useMemo(
        () =>
            [...users].sort((a, b) =>
                a.username.localeCompare(
                    b.username
                )
            ),
        [users]
    );

    const handleOpenProfile = (
        username: string
    ) => {

        openInstagramProfile(
            username
        );

        setReviewed(
            (previous) => {

                const next =
                    new Set(previous);

                next.add(username);

                return next;

            }
        );

    };

    return (

        <section className="card">

            <div
                className="table-header"
            >

                <h2>

                    {title}

                </h2>

                <span
                    className="badge badge-primary"
                >

                    {sortedUsers.length} Users

                </span>

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Username
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Reviewed
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        // ======================================================
// InsightGram AI
// File : src/components/Dashboard/RelationshipTable.tsx
// Part : 2
// ======================================================

                        {sortedUsers.map(
                            (user) => {

                                const isReviewed =
                                    reviewed.has(
                                        user.username
                                    );

                                return (

                                    <tr
                                        key={
                                            user.username
                                        }
                                    >

                                        <td>

                                            <strong>

                                                {
                                                    user.username
                                                }

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

                                            {isReviewed ? (

                                                <CheckCircle2
                                                    size={
                                                        18
                                                    }
                                                />

                                            ) : (

                                                "-"

                                            )}

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    handleOpenProfile(
                                                        user.username
                                                    )
                                                }
                                            >

                                                <ExternalLink
                                                    size={
                                                        16
                                                    }
                                                />

                                                Open

                                            </button>

                                        </td>

                                    </tr>

                                );

                            }
                        )}
                        // ======================================================
// InsightGram AI
// File : src/components/Dashboard/RelationshipTable.tsx
// Part : 3
// ======================================================

                        {sortedUsers.length === 0 && (

                            <tr>

                                <td
                                    colSpan={4}
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >

                                    <div
                                        className="empty-state"
                                    >

                                        <h3>

                                            No users found

                                        </h3>

                                        <p>

                                            Upload an Instagram ZIP
                                            export to view relationship
                                            data.

                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            <div
                className="table-footer"
            >

                <span>

                    Showing{" "}
                    <strong>

                        {sortedUsers.length}

                    </strong>{" "}

                    account(s)

                </span>
                // ======================================================
// InsightGram AI
// File : src/components/Dashboard/RelationshipTable.tsx
// Part : 4
// ======================================================

                <span>

                    Reviewed{" "}

                    <strong>

                        {reviewed.size}

                    </strong>{" "}

                    /{" "}

                    <strong>

                        {sortedUsers.length}

                    </strong>

                </span>

            </div>

        </section>

    );

}