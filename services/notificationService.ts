// ======================================================
// InsightGram AI
// File : src/services/notificationService.ts
// ======================================================

import type {
    NotificationItem,
} from "../types/app";

const STORAGE_KEY =
    "insightgram-notifications";

function load(): NotificationItem[] {

    try {

        const value =
            localStorage.getItem(
                STORAGE_KEY
            );

        return value
            ? JSON.parse(value)
            : [];

    } catch {

        return [];

    }

}

function save(
    notifications: NotificationItem[]
): void {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            notifications
        )

    );

}

export function getNotifications(): NotificationItem[] {

    return load();

}

export function addNotification(

    title: string,

    message: string,

    type: NotificationItem["type"] = "info"

): NotificationItem {

    const notifications =
        load();

    const notification: NotificationItem = {

        id:
            crypto.randomUUID?.() ??
            Date.now().toString(),

        title,

        message,

        type,

        createdAt:
            new Date().toISOString(),

        read: false,

    };

    notifications.unshift(
        notification
    );

    save(notifications);

    return notification;

}

export function markAsRead(
    id: string
): void {

    const notifications =
        load().map((item) =>

            item.id === id

                ? {
                      ...item,
                      read: true,
                  }

                : item

        );

    save(notifications);

}

export function removeNotification(
    id: string
): void {

    save(

        load().filter(

            (item) => item.id !== id

        )

    );

}

export function clearNotifications(): void {

    localStorage.removeItem(
        STORAGE_KEY
    );

}

export function unreadCount(): number {

    return load().filter(

        (item) => !item.read

    ).length;

}

export default {

    getNotifications,

    addNotification,

    markAsRead,

    removeNotification,

    clearNotifications,

    unreadCount,

};