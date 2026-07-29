// ======================================================
// InsightGram AI
// File : src/components/Search/SearchBar.tsx
// Part : 1
// ======================================================

import { useEffect, useState } from "react";

import { Search, X } from "lucide-react";

interface SearchBarProps {

    value?: string;

    placeholder?: string;

    onSearch: (
        value: string
    ) => void;

}

export default function SearchBar({

    value = "",

    placeholder = "Search username...",

    onSearch,

}: SearchBarProps) {

    const [

        query,

        setQuery,

    ] = useState(value);

    useEffect(() => {

        setQuery(value);

    }, [value]);

    useEffect(() => {

        const timer = window.setTimeout(() => {

            onSearch(
                query.trim()
            );

        }, 250);

        return () => {

            window.clearTimeout(
                timer
            );

        };

    }, [query, onSearch]);

    const clearSearch = () => {

        setQuery("");

        onSearch("");

    };

    return (

        <div className="search-bar">

            <div className="search-input">

                <Search
                    size={18}
                />

                <input

                    type="text"

                    value={query}

                    placeholder={placeholder}

                    onChange={(event) =>
                        setQuery(
                            event.target.value
                        )
                    }

                    autoComplete="off"

                />
                // ======================================================
// InsightGram AI
// File : src/components/Search/SearchBar.tsx
// Part : 2
// ======================================================

                {query.length > 0 && (

                    <button
                        type="button"
                        className="icon-btn"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >

                        <X
                            size={18}
                        />

                    </button>

                )}

            </div>

        </div>

    );

}