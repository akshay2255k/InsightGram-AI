// ======================================================
// InsightGram AI
// File : src/components/Requests/RequestTable.tsx
// ======================================================

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    CheckCircle2,
    Circle,
    ExternalLink,
} from "lucide-react";

import {
    useSearchParams,
} from "react-router-dom";

import SearchBar
    from "../Relationships/SearchBar";

import Pagination
    from "../Relationships/Pagination";

import RequestFilterPanel
    from "./RequestFilterPanel";

import {
    useAppStore,
    type RequestFilter,
    type RequestReviewKey,
} from "../../store/appStore";

interface RequestUser {

    username: string;

    profileUrl: string;

    type:
        | "pending"
        | "recent"
        | "closeFriend"
        | "recentlyUnfollowed";

}

const VALID_FILTERS:
    RequestFilter[] = [

        "all",
        "pending",
        "recent",
        "closeFriend",
        "recentlyUnfollowed",

    ];

export default function RequestTable() {

    const {

        exportData,

        statistics,

        isRequestReviewed,

        setRequestReviewed,

    } =
        useAppStore();

    const [
        search,
        setSearch,
    ] =
        useState("");

    const [
        searchParams,
    ] =
        useSearchParams();

    const [
        page,
        setPage,
    ] =
        useState(1);

    const [
        pageSize,
        setPageSize,
    ] =
        useState(25);

    const queryFilter =
        searchParams.get(
            "filter"
        );

    const filter:
        RequestFilter =
        VALID_FILTERS.includes(
            queryFilter as RequestFilter
        )
            ? queryFilter as RequestFilter
            : "all";

    // ==================================================
    // Reset pagination
    // ==================================================

    useEffect(() => {

        setPage(1);

    }, [
        search,
        filter,
    ]);

    // ==================================================
    // Build list
    // ==================================================

    const allUsers =
        useMemo<RequestUser[]>(
            () => {

                if (
                    !exportData
                ) {

                    return [];

                }

                const list:
                    RequestUser[] =
                    [];

                exportData.pendingRequests
                    .forEach(
                        (
                            user
                        ) => {

                            list.push({

                                username:
                                    user.username,

                                profileUrl:
                                    user.profileUrl,

                                type:
                                    "pending",

                            });

                        }
                    );

                exportData.recentRequests
                    .forEach(
                        (
                            user
                        ) => {

                            list.push({

                                username:
                                    user.username,

                                profileUrl:
                                    user.profileUrl,

                                type:
                                    "recent",

                            });

                        }
                    );

                exportData.closeFriends
                    .forEach(
                        (
                            user
                        ) => {

                            list.push({

                                username:
                                    user.username,

                                profileUrl:
                                    user.profileUrl,

                                type:
                                    "closeFriend",

                            });

                        }
                    );

                exportData.recentlyUnfollowed
                    .forEach(
                        (
                            user
                        ) => {

                            list.push({

                                username:
                                    user.username,

                                profileUrl:
                                    user.profileUrl,

                                type:
                                    "recentlyUnfollowed",

                            });

                        }
                    );

                return list;

            },
            [
                exportData,
            ]
        );

    // ==================================================
    // Filter
    // ==================================================

    const filteredUsers =
        useMemo(
            () => {

                let list =
                    [...allUsers];

                const keyword =
                    search
                        .trim()
                        .toLowerCase();

                if (
                    keyword
                ) {

                    list =
                        list.filter(
                            (
                                user
                            ) =>
                                user.username
                                    .toLowerCase()
                                    .includes(
                                        keyword
                                    )
                        );

                }

                if (
                    filter !==
                    "all"
                ) {

                    list =
                        list.filter(
                            (
                                user
                            ) =>
                                user.type ===
                                filter
                        );

                }

                return list;

            },
            [
                allUsers,
                search,
                filter,
            ]
        );

    // ==================================================
    // Pagination
    // ==================================================

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredUsers.length /
                    pageSize
            )
        );

    const safePage =
        Math.min(
            page,
            totalPages
        );

    const paginatedUsers =
        filteredUsers.slice(
            (
                safePage -
                1
            ) *
                pageSize,
            safePage *
                pageSize
        );

    // ==================================================
    // Type information
    // ==================================================

    const getTypeInfo =
        (
            type:
                RequestUser["type"]
        ) => {

            switch (
                type
            ) {

                case "pending":

                    return {

                        label:
                            "Pending",

                        badge:
                            "badge-warning",

                    };

                case "recent":

                    return {

                        label:
                            "Recent Request",

                        badge:
                            "badge-primary",

                    };

                case "closeFriend":

                    return {

                        label:
                            "Close Friend",

                        badge:
                            "badge-success",

                    };

                default:

                    return {

                        label:
                            "Recently Unfollowed",

                        badge:
                            "badge-danger",

                    };

            }

        };

    // ==================================================
    // Review
    // ==================================================

    const toggleReviewed =
        (
            user:
                RequestUser
        ) => {

            const type =
                user.type as RequestReviewKey;

            const reviewed =
                isRequestReviewed(
                    type,
                    user.username
                );

            setRequestReviewed(
                type,
                user.username,
                !reviewed
            );

        };

    // ==================================================
    // Empty
    // ==================================================

    if (
        allUsers.length ===
        0
    ) {

        return (

            <section className="card">

                <h2>
                    Requests
                </h2>

                <p
                    style={{
                        color:
                            "#98A2B3",
                        marginTop:
                            "8px",
                    }}
                >
                    No request data available.
                </p>

            </section>

        );

    }

    return (

        <>

            <SearchBar

                value={
                    search
                }

                onChange={
                    setSearch
                }

                placeholder="Search requests..."

            />

            <RequestFilterPanel />

            <section
                className="card"
                style={{
                    marginTop:
                        "24px",
                }}
            >

                <div
                    className="table-header"
                    style={{
                        marginBottom:
                            "20px",
                    }}
                >

                    <div>

                        <h2>
                            Request List
                        </h2>

                        <p
                            style={{
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "6px",
                            }}
                        >

                            {
                                filteredUsers.length
                            } matching users

                        </p>

                    </div>

                    {statistics && (

                        <span
                            className="badge badge-warning"
                        >

                            {
                                statistics.pendingRequests
                            } pending remaining

                        </span>

                    )}

                </div>

                <div
                    style={{
                        overflowX:
                            "auto",
                    }}
                >

                    <table
                        className="relationship-table"
                    >

                        <thead>

                            <tr>

                                <th>
                                    Username
                                </th>

                                <th>
                                    Type
                                </th>

                                <th>
                                    Instagram
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Clear
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paginatedUsers.map(
                                (
                                    user
                                ) => {

                                    const typeInfo =
                                        getTypeInfo(
                                            user.type
                                        );

                                    const reviewed =
                                        isRequestReviewed(
                                            user.type as RequestReviewKey,
                                            user.username
                                        );

                                    return (

                                        <tr
                                            key={
                                                `${user.type}-${user.username}`
                                            }
                                        >

                                            <td>

                                                <strong>

                                                    @
                                                    {
                                                        user.username
                                                    }

                                                </strong>

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        `badge ${typeInfo.badge}`
                                                    }
                                                >

                                                    {
                                                        typeInfo.label
                                                    }

                                                </span>

                                            </td>

                                            <td>

                                                <a
                                                    href={
                                                        user.profileUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="icon-button"
                                                    title="Open Instagram"
                                                >

                                                    <ExternalLink
                                                        size={
                                                            18
                                                        }
                                                    />

                                                </a>

                                            </td>

                                            <td>

                                                {reviewed ? (

                                                    <span
                                                        className="badge badge-success"
                                                    >

                                                        <CheckCircle2
                                                            size={
                                                                14
                                                            }
                                                        />

                                                        Cleared

                                                    </span>

                                                ) : (

                                                    <span
                                                        style={{
                                                            color:
                                                                "#98A2B3",
                                                        }}
                                                    >

                                                        Remaining

                                                    </span>

                                                )}

                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className={
                                                        reviewed
                                                            ? "btn btn-primary"
                                                            : "btn btn-secondary"
                                                    }
                                                    onClick={() =>
                                                        toggleReviewed(
                                                            user
                                                        )
                                                    }
                                                >

                                                    {reviewed ? (

                                                        <CheckCircle2
                                                            size={
                                                                16
                                                            }
                                                        />

                                                    ) : (

                                                        <Circle
                                                            size={
                                                                16
                                                            }
                                                        />

                                                    )}

                                                    {reviewed
                                                        ? "Cleared"
                                                        : "Clear"}

                                                </button>

                                            </td>

                                        </tr>

                                    );

                                }
                            )}

                        </tbody>

                    </table>

                </div>

                {filteredUsers.length ===
                    0 && (

                    <div
                        style={{
                            padding:
                                "40px",
                            textAlign:
                                "center",
                            color:
                                "#98A2B3",
                        }}
                    >

                        No users found.

                    </div>

                )}

            </section>

            {filteredUsers.length >
                0 && (

                <Pagination

                    page={
                        safePage
                    }

                    totalPages={
                        totalPages
                    }

                    pageSize={
                        pageSize
                    }

                    totalItems={
                        filteredUsers.length
                    }

                    onPageChange={
                        setPage
                    }

                    onPageSizeChange={
                        (
                            size
                        ) => {

                            setPageSize(
                                size
                            );

                            setPage(
                                1
                            );

                        }
                    }

                />

            )}

        </>

    );

}