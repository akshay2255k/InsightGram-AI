// ======================================================
// InsightGram AI
// File : src/parser/instagramParser.ts
// Part : 1
// ======================================================

import JSZip from "jszip";

import type {
    InstagramExport,
    InstagramUser,
} from "../types/instagram";

const INSTAGRAM_BASE_URL =
    "https://www.instagram.com/";

interface InstagramLink {
    href: string;
    value: string;
    timestamp?: number;
}

interface InstagramEntry {
    string_list_data: InstagramLink[];
}

type JsonFile = InstagramEntry[];

function extractUsername(
    url: string
): string {
    try {
        const pathname = new URL(url).pathname;

        return pathname
            .replace(/\//g, "")
            .trim();
    } catch {
        return "";
    }
}

function mapUsers(
    data: JsonFile
): InstagramUser[] {
    return data.flatMap((item) =>
        item.string_list_data.map((entry) => {
            const username = extractUsername(
                entry.href
            );

            return {
                username,
                profileUrl:
                    `${INSTAGRAM_BASE_URL}${username}/`,
                followsYou: false,
                youFollow: false,
                createdAt: entry.timestamp
                    ? new Date(
                          entry.timestamp * 1000
                      ).toISOString()
                    : undefined,
            };
        })
    );
}

async function readJson(
    zip: JSZip,
    path: string
): Promise<JsonFile> {
    const file = zip.file(path);

    if (!file) {
        return [];
    }

    const text = await file.async("text");

    return JSON.parse(text) as JsonFile;
}

export async function loadInstagramZip(
    file: File
): Promise<{
    zip: JSZip;
}> {
    const zip = await JSZip.loadAsync(file);

    return { zip };
}
// ======================================================
// InsightGram AI
// File : src/parser/instagramParser.ts
// Part : 2
// ======================================================

export async function parseInstagramExport(
    zip: JSZip
): Promise<InstagramExport> {
    const base =
        "connections/followers_and_following/";

    const followers = mapUsers(
        await readJson(
            zip,
            `${base}followers_1.json`
        )
    ).map((user) => ({
        ...user,
        followsYou: true,
    }));

    const following = mapUsers(
        await readJson(
            zip,
            `${base}following.json`
        )
    ).map((user) => ({
        ...user,
        youFollow: true,
    }));

    const pendingRequests = mapUsers(
        await readJson(
            zip,
            `${base}pending_follow_requests.json`
        )
    ).map((user) => ({
        ...user,
        isPending: true,
    }));

    const recentRequests = mapUsers(
        await readJson(
            zip,
            `${base}recent_follow_requests.json`
        )
    ).map((user) => ({
        ...user,
        isRecentRequest: true,
    }));

    const recentlyUnfollowed = mapUsers(
        await readJson(
            zip,
            `${base}recently_unfollowed_profiles.json`
        )
    ).map((user) => ({
        ...user,
        isRecentlyUnfollowed: true,
    }));

    const closeFriends = mapUsers(
        await readJson(
            zip,
            `${base}close_friends.json`
        )
    ).map((user) => ({
        ...user,
        isCloseFriend: true,
    }));

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
// InsightGram AI
// File : src/parser/instagramParser.ts
// Part : 3
// ======================================================

export function buildRelationshipMap(
    data: InstagramExport
): InstagramUser[] {
    const users = new Map<string, InstagramUser>();

    for (const follower of data.followers) {
        users.set(follower.username, {
            ...follower,
        });
    }

    for (const following of data.following) {
        const existing = users.get(
            following.username
        );

        if (existing) {
            existing.youFollow = true;
        } else {
            users.set(following.username, {
                ...following,
            });
        }
    }

    for (const pending of data.pendingRequests) {
        const existing = users.get(
            pending.username
        );

        if (existing) {
            existing.isPending = true;
        } else {
            users.set(pending.username, {
                ...pending,
            });
        }
    }

    for (const recent of data.recentRequests) {
        const existing = users.get(
            recent.username
        );

        if (existing) {
            existing.isRecentRequest = true;
        } else {
            users.set(recent.username, {
                ...recent,
            });
        }
    }

    for (const unfollowed of data.recentlyUnfollowed) {
        const existing = users.get(
            unfollowed.username
        );

        if (existing) {
            existing.isRecentlyUnfollowed = true;
        } else {
            users.set(unfollowed.username, {
                ...unfollowed,
            });
        }
    }

    for (const closeFriend of data.closeFriends) {
        const existing = users.get(
            closeFriend.username
        );

        if (existing) {
            existing.isCloseFriend = true;
        } else {
            users.set(closeFriend.username, {
                ...closeFriend,
            });
        }
    }

    return [...users.values()].sort((a, b) =>
        a.username.localeCompare(b.username)
    );
}

export function getNotFollowingBack(
    users: InstagramUser[]
): InstagramUser[] {
    return users.filter(
        (user) =>
            user.youFollow &&
            !user.followsYou
    );
}

export function getYouDontFollowBack(
    users: InstagramUser[]
): InstagramUser[] {
    return users.filter(
        (user) =>
            user.followsYou &&
            !user.youFollow
    );
}

export function calculateRelationshipScore(
    users: InstagramUser[]
): number {
    if (users.length === 0) {
        return 100;
    }

    const mutual = users.filter(
        (user) =>
            user.youFollow &&
            user.followsYou
    ).length;

    return Math.round(
        (mutual / users.length) * 100
    );
}