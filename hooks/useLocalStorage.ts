// ======================================================
// InsightGram AI
// File : src/hooks/useLocalStorage.ts
// ======================================================

import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const readValue = (): T => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item =
                window.localStorage.getItem(key);

            return item
                ? (JSON.parse(item) as T)
                : initialValue;
        } catch {
            return initialValue;
        }
    };

    const [storedValue, setStoredValue] =
        useState<T>(readValue);

    const setValue = useCallback(
        (
            value:
                | T
                | ((
                      current: T
                  ) => T)
        ) => {
            try {
                const valueToStore =
                    value instanceof Function
                        ? value(storedValue)
                        : value;

                setStoredValue(valueToStore);

                if (
                    typeof window !==
                    "undefined"
                ) {
                    window.localStorage.setItem(
                        key,
                        JSON.stringify(
                            valueToStore
                        )
                    );
                }
            } catch (error) {
                console.error(error);
            }
        },
        [key, storedValue]
    );

    const remove = useCallback(() => {
        if (
            typeof window !== "undefined"
        ) {
            window.localStorage.removeItem(
                key
            );
        }

        setStoredValue(initialValue);
    }, [initialValue, key]);

    useEffect(() => {
        setStoredValue(readValue());
    }, [key]);

    return {
        value: storedValue,
        setValue,
        remove,
    };
}

export default useLocalStorage;