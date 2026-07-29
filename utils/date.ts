// ======================================================
// InsightGram AI
// File : src/utils/date.ts
// ======================================================

import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function formatDate(
    value: Date | string | number,
    pattern = "dd MMM yyyy"
): string {
    return format(new Date(value), pattern);
}

export function formatDateTime(
    value: Date | string | number
): string {
    return format(new Date(value), "dd MMM yyyy • HH:mm");
}

export function formatTime(
    value: Date | string | number
): string {
    return format(new Date(value), "HH:mm");
}

export function fromNow(
    value: Date | string | number
): string {
    return formatDistanceToNow(new Date(value), {
        addSuffix: true,
    });
}

export function isTodayDate(
    value: Date | string | number
): boolean {
    return isToday(new Date(value));
}

export function isYesterdayDate(
    value: Date | string | number
): boolean {
    return isYesterday(new Date(value));
}

export function getCurrentTimestamp(): string {
    return new Date().toISOString();
}

export function getCurrentDate(): Date {
    return new Date();
}

export function formatForFilename(): string {
    return format(new Date(), "yyyy-MM-dd_HH-mm-ss");
}

export function daysBetween(
    start: Date | string | number,
    end: Date | string | number
): number {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();

    return Math.floor(
        Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)
    );
}