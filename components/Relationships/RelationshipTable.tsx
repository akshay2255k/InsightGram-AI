// ======================================================
// InsightGram AI
// File : src/components/Relationships/RelationshipTable.tsx
// ======================================================

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    ExternalLink,
    Users,
} from "lucide-react";

import {
    useSearchParams,
} from "react-router-dom";

import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";

import {
    useAppStore,
    type RelationshipFilter,
} from "../../store/appStore";

import type {
    InstagramUser,
} from "../../types/instagram";

const VALID_FILTERS:
    RelationshipFilter[] = [

        "all",
        "mutual",
        "notFollowingBack",
        "youDontFollowBack",

    ];

export default function RelationshipTable() {

    const {
        users,
    } = useAppStore();

    const [
        searchParams,
    ] = useSearchParams();

    const [
        search,
        setSearch,
    ] = useState("");

    const [
        filter,
        setFilter,
    ] =
        useState<RelationshipFilter>(
            "all"
        );

    const [
        page,
        setPage,
    ] = useState(1);

    const [
        pageSize,
        setPageSize,
    ] = useState(25);

    // ==================================================
    // URL filter
    // ==================================================

    useEffect(() => {

        const value =
            searchParams.get(
                "filter"
            );

        if (
            value &&
            VALID_FILTERS.includes(
                value as RelationshipFilter
            )
        ) {

            setFilter(
                value as RelationshipFilter
            );

        } else {

            setFilter(
                "all"
            );

        }

    }, [
        searchParams,
    ]);

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
    // Filter data
    // ==================================================

    const filteredUsers =
        useMemo(
            () => {

                let list:
                    InstagramUser[] =
                    [...users];

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
                                    ) ||
                                user.fullName
                                    ?.toLowerCase()
                                    .includes(
                                        keyword
                                    )
                        );

                }

                switch (
                    filter
                ) {

                    case "mutual":

                        list =
                            list.filter(
                                (
                                    user
                                ) =>
                                    user.followsYou &&
                                    user.youFollow
                            );

                        break;

                    case "notFollowingBack":

                        list =
                            list.filter(
                                (
                                    user
                                ) =>
                                    user.youFollow &&
                                    !user.followsYou
                            );

                        break;

                    case "youDontFollowBack":

                        list =
                            list.filter(
                                (
                                    user
                                ) =>
                                    user.followsYou &&
                                    !user.youFollow
                            );

                        break;

                    case "all":

                    default:

                        break;

                }

                return list;

            },
            [
                users,
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
        useMemo(
            () => {

                const start =
                    (
                        safePage -
                        1
                    ) *
                    pageSize;

                return filteredUsers.slice(
                    start,
                    start + pageSize
                );

            },
            [
                filteredUsers,
                safePage,
                pageSize,
            ]
        );

    // ==================================================
    // Status
    // ==================================================

    const getStatus = (
        user: InstagramUser
    ): string => {

        if (
            user.followsYou &&
            user.youFollow
        ) {

            return "Mutual";

        }

        if (
            user.youFollow
        ) {

            return "Not Following Back";

        }

        if (
            user.followsYou
        ) {

            return "You Don't Follow Back";

        }

        return "Unknown";

    };

    const getBadgeClass = (
        user: InstagramUser
    ): string => {

        if (
            user.followsYou &&
            user.youFollow
        ) {

            return "badge-success";

        }

        if (
            user.youFollow
        ) {

            return "badge-danger";

        }

        if (
            user.followsYou
        ) {

            return "badge-warning";

        }

        return "badge";

    };

    // ==================================================
    // Empty
    // ==================================================

    if (
        users.length === 0
    ) {

        return (

            <section
                className="card"
                style={{
                    padding:
                        "48px 24px",
                    textAlign:
                        "center",
                    marginTop:
                        "24px",
                }}
            >

                <Users
                    size={
                        36
                    }
                    color="#18C8FF"
                />

                <h2
                    style={{
                        marginTop:
                            "14px",
                    }}
                >

                    No Relationship Data

                </h2>

                <p
                    style={{
                        color:
                            "#98A2B3",
                        marginTop:
                            "8px",
                    }}
                >

                    Upload an Instagram ZIP export
                    to view relationships.

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
                placeholder="Search username..."
            />

            <FilterPanel />

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

                        <h2
                            style={{
                                margin:
                                    0,
                            }}
                        >

                            Relationship List

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

                    <span
                        className="badge"
                    >

                        {filter ===
                        "all"
                            ? "All"
                            : filter ===
                              "mutual"
                            ? "Mutual"
                            : filter ===
                              "notFollowingBack"
                            ? "Not Following Back"
                            : "You Don't Follow Back"}

                    </span>

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
                                    Follows You
                                </th>

                                <th>
                                    You Follow
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Instagram
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paginatedUsers.map(
                                (
                                    user
                                ) => (

                                    <tr
                                        key={
                                            user.username
                                        }
                                    >

                                        <td>

                                            <strong>

                                                @
                                                {
                                                    user.username
                                                }

                                            </strong>

                                            {user.fullName && (

                                                <small
                                                    style={{
                                                        display:
                                                            "block",
                                                        color:
                                                            "#98A2B3",
                                                        marginTop:
                                                            "4px",
                                                    }}
                                                >

                                                    {
                                                        user.fullName
                                                    }

                                                </small>

                                            )}

                                        </td>

                                        <td>

                                            {user.followsYou
                                                ? "✅"
                                                : "❌"}

                                        </td>

                                        <td>

                                            {user.youFollow
                                                ? "✅"
                                                : "❌"}

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    `badge ${getBadgeClass(
                                                        user
                                                    )}`
                                                }
                                            >

                                                {
                                                    getStatus(
                                                        user
                                                    )
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
                                                aria-label={
                                                    `Open @${user.username}`
                                                }
                                            >

                                                <ExternalLink
                                                    size={
                                                        18
                                                    }
                                                />

                                            </a>

                                        </td>

                                    </tr>

                                )
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

                        No users match this filter.

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