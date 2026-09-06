// ======================================================
// InsightGram AI
// File : src/components/Relationships/SearchBar.tsx
// ======================================================

import {
    Search,
    X,
} from "lucide-react";

interface SearchBarProps {

    value: string;

    onChange: (
        value: string
    ) => void;

    placeholder?: string;

}

export default function SearchBar({

    value,

    onChange,

    placeholder = "Search users...",

}: SearchBarProps) {

    return (

        <div
            className="card"
            style={{
                marginBottom: "18px",
            }}
        >

            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                }}
            >

                <Search
                    size={20}
                    style={{
                        position: "absolute",
                        left: "16px",
                        color: "#98A2B3",
                    }}
                />

                <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                        onChange(
                            event.target.value
                        )
                    }
                    placeholder={placeholder}
                    className="input"
                    style={{
                        width: "100%",
                        paddingLeft: "46px",
                        paddingRight:
                            value
                                ? "46px"
                                : "16px",
                    }}
                />

                {value && (

                    <button
                        type="button"
                        onClick={() =>
                            onChange("")
                        }
                        className="icon-button"
                        style={{
                            position: "absolute",
                            right: "10px",
                        }}
                        aria-label="Clear search"
                    >

                        <X size={18} />

                    </button>

                )}

            </div>

        </div>

    );

}