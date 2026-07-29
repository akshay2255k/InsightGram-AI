// ======================================================
// InsightGram AI
// File : src/database/db.ts
// ======================================================

import Dexie, { type Table } from "dexie";

import type {
    InstagramUser,
    ZipHistory,
} from "../types/instagram";

export interface FavoriteUser extends InstagramUser {
    id: string;
}

export interface PinnedUser extends InstagramUser {
    id: string;
}

export interface UserNote {
    id: string;
    username: string;
    note: string;
    updatedAt: string;
}

export interface UserLabel {
    id: string;
    username: string;
    label: string;
    color?: string;
}

export interface ReviewedUser {
    id: string;
    username: string;
    reviewedAt: string;
}

export class InsightGramDatabase extends Dexie {
    favorites!: Table<FavoriteUser, string>;

    pinnedUsers!: Table<PinnedUser, string>;

    reviewedUsers!: Table<ReviewedUser, string>;

    notes!: Table<UserNote, string>;

    labels!: Table<UserLabel, string>;

    history!: Table<ZipHistory, string>;

    constructor() {
        super("InsightGramAI");

        this.version(1).stores({
            favorites: "id,username",
            pinnedUsers: "id,username",
            reviewedUsers: "id,username",
            notes: "id,username",
            labels: "id,username",
            history: "id,fileName,importedAt",
        });
    }
}

export const db = new InsightGramDatabase();

export default db;