// ======================================================
// InsightGram AI
// File : src/utils/validators.ts
// ======================================================

import { z } from "zod";

export const usernameSchema = z
    .string()
    .trim()
    .min(1)
    .max(30)
    .regex(
        /^[a-zA-Z0-9._]+$/,
        "Invalid Instagram username"
    );

export const zipFileSchema = z.object({
    name: z.string().endsWith(".zip"),
    size: z.number().positive(),
});

export function isValidUsername(
    username: string
): boolean {
    return usernameSchema.safeParse(username).success;
}

export function isValidZipFile(
    file: File
): boolean {
    return zipFileSchema.safeParse({
        name: file.name.toLowerCase(),
        size: file.size,
    }).success;
}

export function isValidUrl(
    value: string
): boolean {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

export function isEmpty(
    value: unknown
): boolean {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === "string") {
        return value.trim().length === 0;
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    return false;
}

export function isPositiveNumber(
    value: number
): boolean {
    return Number.isFinite(value) && value > 0;
}

export function isNonNegativeNumber(
    value: number
): boolean {
    return Number.isFinite(value) && value >= 0;
}

export function hasRequiredInstagramFiles(
    files: string[]
): boolean {
    const required = [
        "followers_1.json",
        "following.json",
    ];

    return required.every((file) =>
        files.some((item) =>
            item.toLowerCase().endsWith(file)
        )
    );
}

export function isJsonFile(
    filename: string
): boolean {
    return filename
        .toLowerCase()
        .endsWith(".json");
}

export function isZipFilename(
    filename: string
): boolean {
    return filename
        .toLowerCase()
        .endsWith(".zip");
}