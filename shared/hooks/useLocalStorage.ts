/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useLocaleStorage 
 * 
 * A reactive - SSR safe custom hook to interact with local storage
 * 
 * @param {string} dataKey - a key to associate with the saved data
 * @param {T} initialValue - Optional initial value of the data if no stored data
 * 
 * @returns {UseLocalStorageReturn<T>}
 * - data -> The current stored data, reactive on data change
 * - saveIntoLocalStorage -> save a new data to local storage and update the state to trigger a re-render
 * - removeFromLocalStorage -> remove the data from local storage and update the state to trigger a re-render
 */

export interface UseLocalStorageReturn<T> {
    data: T | null;
    saveIntoLocalStorage: (data: T) => void;
    removeFromLocalStorage: () => void;
}

function safeParser<T>(rawData: string, dataKey: string): T | null {
    try {
        console.log(rawData)
        return JSON.parse(rawData) as T;
    }
    catch (error) {
        console.error(`[useLocalStorage] Parse Error: Failed to parse ${dataKey}`, error);
        return null;
    }
}

function safeStringify<T>(data: T): string | null {
    try {
        return JSON.stringify(data);
    }
    catch (error) {
        console.error('[useLocalStorage] Stringify Error: ', error);

        return null;
    }
}

function readFromLocalStorage<T>(dataKey: string, initialValue?: T): T | null {
    if (typeof window === 'undefined') return initialValue || null;

    const storedData = localStorage.getItem(dataKey);

    if (storedData !== null) {
        return safeParser<T>(storedData, dataKey);
    }

    if (initialValue !== undefined) {
        const serializedData = safeStringify<T>(initialValue);

        if (serializedData !== null) localStorage.setItem(dataKey, serializedData);

        return initialValue;
    }

    return null;
}

export default function useLocalStorage<T>(dataKey: string, initialValue?: T): UseLocalStorageReturn<T> {
    const isOnClient: boolean = typeof window !== 'undefined';

    const [data, setData] = useState<T | null>((): T | null => {
        return readFromLocalStorage<T>(dataKey, initialValue);
    });

    useEffect(() => {
        setData(readFromLocalStorage<T>(dataKey));
    }, [dataKey]);

    // 1)- setter
    const saveIntoLocalStorage = useCallback((data: T): void => {
        if (!isOnClient) return;

        const serializedData = safeStringify(data);
        if (serializedData === null) return;

        localStorage.setItem(dataKey, serializedData);
        setData(data);

    }, [dataKey]);

    // 3)- remove
    const removeFromLocalStorage = useCallback((): void => {
        if (!isOnClient) return;

        localStorage.removeItem(dataKey);
        setData(null);

    }, [dataKey]);

    return { data, saveIntoLocalStorage, removeFromLocalStorage };
}


