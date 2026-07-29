// ======================================================
// InsightGram AI
// File : src/services/storageService.ts
// ======================================================

export function saveItem<T>(
    key: string,
    value: T
): boolean {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Storage save failed:",
            error
        );

        return false;

    }

}

export function getItem<T>(
    key: string,
    defaultValue: T
): T {

    try {

        const item =
            localStorage.getItem(key);

        if (item === null) {

            return defaultValue;

        }

        return JSON.parse(item) as T;

    } catch (error) {

        console.error(
            "Storage read failed:",
            error
        );

        return defaultValue;

    }

}

export function removeItem(
    key: string
): boolean {

    try {

        localStorage.removeItem(key);

        return true;

    } catch (error) {

        console.error(
            "Storage remove failed:",
            error
        );

        return false;

    }

}

export function clearStorage(): boolean {

    try {

        localStorage.clear();

        return true;

    } catch (error) {

        console.error(
            "Storage clear failed:",
            error
        );

        return false;

    }

}

export function hasItem(
    key: string
): boolean {

    return (
        localStorage.getItem(key) !== null
    );

}

export default {

    saveItem,

    getItem,

    removeItem,

    clearStorage,

    hasItem,

};