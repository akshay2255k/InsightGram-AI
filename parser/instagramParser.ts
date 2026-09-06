// ======================================================
// InsightGram AI
// File : src/parser/instagramParser.ts
// ======================================================

import JSZip from "jszip";

import type {
    InstagramExport,
    InstagramUser,
} from "../types/instagram";

// ======================================================
// Constants
// ======================================================

const INSTAGRAM_BASE_URL =
    "https://www.instagram.com/";

// ======================================================
// Raw Instagram Structures
// ======================================================

interface InstagramLink {

    href?: string;

    value?: string;

    timestamp?: number;

}

interface InstagramEntry {

    title?: string;

    string_list_data?: InstagramLink[];

    label_values?: Array<{

        label?: string;

        value?: string;

    }>;

    timestamp?: number;

}

type JsonFile =
    InstagramEntry[];

// ======================================================
// Username Normalization
// ======================================================

function normalizeUsername(
    username: string
): string {

    return username
        .trim()
        .replace(/^@/, "")
        .toLowerCase();

}

// ======================================================
// Extract Username From Instagram URL
// ======================================================

function extractUsername(
    url: string
): string {

    if (!url) {

        return "";

    }

    try {

        const parsed =
            new URL(url);

        const parts =
            parsed.pathname
                .split("/")
                .filter(
                    Boolean
                );

        if (
            parts.length === 0
        ) {

            return "";

        }

        /*
         * Instagram exports may contain:
         *
         * https://www.instagram.com/user/
         *
         * https://www.instagram.com/_u/user/
         *
         * We always use the last pathname segment.
         */

        return normalizeUsername(
            parts[
                parts.length - 1
            ]
        );

    } catch {

        /*
         * Fallback for malformed URLs.
         */

        const cleaned =
            url
                .replace(
                    /^https?:\/\//i,
                    ""
                )
                .replace(
                    /^www\./i,
                    ""
                )
                .replace(
                    /^instagram\.com\//i,
                    ""
                )
                .split("/")
                .filter(
                    Boolean
                );

        return normalizeUsername(
            cleaned[
                cleaned.length - 1
            ] ?? ""
        );

    }

}

// ======================================================
// Build Profile URL
// ======================================================

function buildProfileUrl(
    username: string
): string {

    return `${INSTAGRAM_BASE_URL}${encodeURIComponent(
        username
    )}/`;

}

// ======================================================
// Create Instagram User
// ======================================================

function createUser(
    username: string,
    timestamp?: number
): InstagramUser | null {

    const normalized =
        normalizeUsername(
            username
        );

    if (!normalized) {

        return null;

    }

    return {

        username:
            normalized,

        profileUrl:
            buildProfileUrl(
                normalized
            ),

        followsYou:
            false,

        youFollow:
            false,

        createdAt:
            typeof timestamp ===
            "number"

                ? new Date(
                      timestamp * 1000
                  ).toISOString()

                : undefined,

    };

}

// ======================================================
// Map Followers / Following Style Data
// ======================================================

function mapUsers(
    data: JsonFile
): InstagramUser[] {

    const users =
        new Map<
            string,
            InstagramUser
        >();

    for (
        const item of data
    ) {

        if (
            !item ||
            typeof item !==
                "object"
        ) {

            continue;

        }

        // ==================================================
        // Followers / Following
        // ==================================================

        if (
            Array.isArray(
                item.string_list_data
            )
        ) {

            const firstEntry =
                item.string_list_data[0];

            if (!firstEntry) {

                continue;

            }

            /*
             * Instagram export formats:
             *
             * Followers:
             *   value = username
             *
             * Following:
             *   title = username
             *
             * Some exports:
             *   username only inside href
             */

            const username =
                firstEntry.value ||
                item.title ||
                extractUsername(
                    firstEntry.href ??
                        ""
                );

            const user =
                createUser(
                    username,
                    firstEntry.timestamp ??
                        item.timestamp
                );

            if (!user) {

                continue;

            }

            users.set(
                user.username,
                user
            );

            continue;

        }

        // ==================================================
        // Pending / Recent / Special Lists
        // ==================================================

        if (
            Array.isArray(
                item.label_values
            )
        ) {

            const usernameField =
                item.label_values.find(
                    (field) =>
                        field.label
                            ?.trim()
                            .toLowerCase() ===
                        "username"
                );

            /*
             * Fallback to Name/URL is intentionally
             * avoided because those are not guaranteed
             * to contain the Instagram username.
             */

            if (
                !usernameField?.value
            ) {

                continue;

            }

            const user =
                createUser(
                    usernameField.value,
                    item.timestamp
                );

            if (!user) {

                continue;

            }

            users.set(
                user.username,
                user
            );

        }

    }

    return Array.from(
        users.values()
    );

}

// ======================================================
// Read JSON File From ZIP
// ======================================================

async function readJson(
    zip: JSZip,
    path: string
): Promise<JsonFile> {

    const file =
        zip.file(path);

    if (!file) {

        return [];

    }

    try {

        const text =
            await file.async(
                "text"
            );

        const json =
            JSON.parse(
                text
            );

        // ==================================================
        // Direct Array
        // ==================================================

        if (
            Array.isArray(json)
        ) {

            return json as JsonFile;

        }

        // ==================================================
        // Nested Array
        // ==================================================

        if (
            json &&
            typeof json ===
                "object"
        ) {

            /*
             * Example:
             *
             * {
             *   "relationships_following": [...]
             * }
             */

            const firstArray =
                Object.values(
                    json as Record<
                        string,
                        unknown
                    >
                ).find(
                    (
                        value
                    ) =>
                        Array.isArray(
                            value
                        )
                );

            if (
                Array.isArray(
                    firstArray
                )
            ) {

                return firstArray as JsonFile;

            }

        }

        return [];

    } catch (
        error
    ) {

        console.error(
            `Unable to read Instagram JSON: ${path}`,
            error
        );

        return [];

    }

}

// ======================================================
// Load Instagram ZIP
// ======================================================

export async function loadInstagramZip(
    file: File
): Promise<{
    zip: JSZip;
}> {

    if (!file) {

        throw new Error(
            "No Instagram ZIP file was selected."
        );

    }

    const fileName =
        file.name.toLowerCase();

    if (
        !fileName.endsWith(
            ".zip"
        )
    ) {

        throw new Error(
            "Please select a valid Instagram ZIP file."
        );

    }

    try {

        const zip =
            await JSZip.loadAsync(
                file
            );

        return {
            zip,
        };

    } catch (
        error
    ) {

        console.error(
            "Unable to load Instagram ZIP:",
            error
        );

        throw new Error(
            "The selected file could not be opened as an Instagram ZIP export."
        );

    }

}

// ======================================================
// Parse Instagram Export
// ======================================================

export async function parseInstagramExport(
    zip: JSZip
): Promise<InstagramExport> {

    const base =
        "connections/followers_and_following/";

    // ==================================================
    // Followers
    // ==================================================

    const followersRaw =
        await readJson(
            zip,
            `${base}followers_1.json`
        );

    const followers =
        mapUsers(
            followersRaw
        ).map(
            (user) => ({

                ...user,

                followsYou:
                    true,

            })
        );

    // ==================================================
    // Following
    // ==================================================

    const followingRaw =
        await readJson(
            zip,
            `${base}following.json`
        );

    const following =
        mapUsers(
            followingRaw
        ).map(
            (user) => ({

                ...user,

                youFollow:
                    true,

            })
        );

    // ==================================================
    // Pending Requests
    // ==================================================

    const pendingRaw =
        await readJson(
            zip,
            `${base}pending_follow_requests.json`
        );

    const pendingRequests =
        mapUsers(
            pendingRaw
        ).map(
            (user) => ({

                ...user,

                isPending:
                    true,

            })
        );

    // ==================================================
    // Recent Follow Requests
    // ==================================================

    const recentRaw =
        await readJson(
            zip,
            `${base}recent_follow_requests.json`
        );

    const recentRequests =
        mapUsers(
            recentRaw
        ).map(
            (user) => ({

                ...user,

                isRecentRequest:
                    true,

            })
        );

    // ==================================================
    // Recently Unfollowed
    // ==================================================

    const recentlyUnfollowedRaw =
        await readJson(
            zip,
            `${base}recently_unfollowed_profiles.json`
        );

    const recentlyUnfollowed =
        mapUsers(
            recentlyUnfollowedRaw
        ).map(
            (user) => ({

                ...user,

                isRecentlyUnfollowed:
                    true,

            })
        );

    // ==================================================
    // Close Friends
    // ==================================================

    const closeFriendsRaw =
        await readJson(
            zip,
            `${base}close_friends.json`
        );

    const closeFriends =
        mapUsers(
            closeFriendsRaw
        ).map(
            (user) => ({

                ...user,

                isCloseFriend:
                    true,

            })
        );

    // ==================================================
    // Validate Main Data
    // ==================================================

    if (
        followers.length === 0 &&
        following.length === 0
    ) {

        throw new Error(
            "No followers or following data was found in this Instagram export."
        );

    }

    return {

        followers,

        following,

        pendingRequests,

        recentRequests,

        recentlyUnfollowed,

        closeFriends,

    };

}

// ======================================================
// Build Unified Relationship Map
// ======================================================

export function buildRelationshipMap(
    data: InstagramExport
): InstagramUser[] {

    const users =
        new Map<
            string,
            InstagramUser
        >();

    // ==================================================
    // Merge Helper
    // ==================================================

    const mergeUser = (
        incoming: InstagramUser
    ): void => {

        const username =
            normalizeUsername(
                incoming.username
            );

        if (!username) {

            return;

        }

        const existing =
            users.get(
                username
            );

        if (!existing) {

            users.set(
                username,
                {

                    ...incoming,

                    username,

                    profileUrl:
                        incoming.profileUrl ||
                        buildProfileUrl(
                            username
                        ),

                }
            );

            return;

        }

        /*
         * Merge all relationship flags.
         */

        existing.followsYou =
            existing.followsYou ||
            incoming.followsYou;

        existing.youFollow =
            existing.youFollow ||
            incoming.youFollow;

        existing.isPending =
            existing.isPending ||
            incoming.isPending;

        existing.isRecentRequest =
            existing.isRecentRequest ||
            incoming.isRecentRequest;

        existing.isRecentlyUnfollowed =
            existing.isRecentlyUnfollowed ||
            incoming.isRecentlyUnfollowed;

        existing.isCloseFriend =
            existing.isCloseFriend ||
            incoming.isCloseFriend;

        if (
            incoming.fullName &&
            !existing.fullName
        ) {

            existing.fullName =
                incoming.fullName;

        }

        if (
            incoming.profilePicture &&
            !existing.profilePicture
        ) {

            existing.profilePicture =
                incoming.profilePicture;

        }

        if (
            incoming.createdAt &&
            !existing.createdAt
        ) {

            existing.createdAt =
                incoming.createdAt;

        }

        if (
            incoming.updatedAt
        ) {

            existing.updatedAt =
                incoming.updatedAt;

        }

    };

    // ==================================================
    // Followers
    // ==================================================

    for (
        const follower of
        data.followers
    ) {

        mergeUser(
            follower
        );

    }

    // ==================================================
    // Following
    // ==================================================

    for (
        const following of
        data.following
    ) {

        mergeUser(
            following
        );

    }

    // ==================================================
    // Pending
    // ==================================================

    for (
        const pending of
        data.pendingRequests
    ) {

        mergeUser(
            pending
        );

    }

    // ==================================================
    // Recent Requests
    // ==================================================

    for (
        const recent of
        data.recentRequests
    ) {

        mergeUser(
            recent
        );

    }

    // ==================================================
    // Recently Unfollowed
    // ==================================================

    for (
        const unfollowed of
        data.recentlyUnfollowed
    ) {

        mergeUser(
            unfollowed
        );

    }

    // ==================================================
    // Close Friends
    // ==================================================

    for (
        const closeFriend of
        data.closeFriends
    ) {

        mergeUser(
            closeFriend
        );

    }

    return Array.from(
        users.values()
    ).sort(
        (a, b) =>
            a.username.localeCompare(
                b.username
            )
    );

}

// ======================================================
// Mutual Relationships
// ======================================================

export function getMutualUsers(
    users: InstagramUser[]
): InstagramUser[] {

    return users.filter(
        (user) =>
            user.youFollow &&
            user.followsYou
    );

}

// ======================================================
// Not Following Back
// ======================================================

export function getNotFollowingBack(
    users: InstagramUser[]
): InstagramUser[] {

    return users.filter(
        (user) =>
            user.youFollow &&
            !user.followsYou
    );

}

// ======================================================
// You Don't Follow Back
// ======================================================

export function getYouDontFollowBack(
    users: InstagramUser[]
): InstagramUser[] {

    return users.filter(
        (user) =>
            user.followsYou &&
            !user.youFollow
    );

}

// ======================================================
// Pending Users
// ======================================================

export function getPendingUsers(
    users: InstagramUser[]
): InstagramUser[] {

    return users.filter(
        (user) =>
            user.isPending === true
    );

}

// ======================================================
// Relationship Score
// ======================================================

export function calculateRelationshipScore(
    users: InstagramUser[]
): number {

    if (
        users.length === 0
    ) {

        return 0;

    }

    const mutual =
        getMutualUsers(
            users
        ).length;

    /*
     * The score represents the percentage of
     * unified relationship records that are mutual.
     */

    return Math.round(
        (
            mutual /
            users.length
        ) *
            100
    );

}

// ======================================================
// Calculate Basic Relationship Statistics
// ======================================================

export function calculateRelationshipStatistics(
    data: InstagramExport
): {

    followers: number;

    following: number;

    mutual: number;

    notFollowingBack: number;

    youDontFollowBack: number;

    pendingRequests: number;

    recentRequests: number;

    recentlyUnfollowed: number;

    closeFriends: number;

    relationshipScore: number;

} {

    const users =
        buildRelationshipMap(
            data
        );

    const mutual =
        getMutualUsers(
            users
        ).length;

    const notFollowingBack =
        getNotFollowingBack(
            users
        ).length;

    const youDontFollowBack =
        getYouDontFollowBack(
            users
        ).length;

    const relationshipScore =
        calculateRelationshipScore(
            users
        );

    return {

        followers:
            data.followers.length,

        following:
            data.following.length,

        mutual,

        notFollowingBack,

        youDontFollowBack,

        pendingRequests:
            data.pendingRequests.length,

        recentRequests:
            data.recentRequests.length,

        recentlyUnfollowed:
            data.recentlyUnfollowed.length,

        closeFriends:
            data.closeFriends.length,

        relationshipScore,

    };

}

// ======================================================
// Default Export
// ======================================================

export default {

    loadInstagramZip,

    parseInstagramExport,

    buildRelationshipMap,

    getMutualUsers,

    getNotFollowingBack,

    getYouDontFollowBack,

    getPendingUsers,

    calculateRelationshipScore,

    calculateRelationshipStatistics,

};