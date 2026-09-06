// ======================================================
// InsightGram AI
// File : src/components/Relationships/Pagination.tsx
// ======================================================

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {

    page: number;

    totalPages: number;

    totalItems: number;

    pageSize: number;

    onPageChange: (
        page: number
    ) => void;

    onPageSizeChange: (
        size: number
    ) => void;

}

const PAGE_SIZES = [
    10,
    25,
    50,
    100,
];

export default function Pagination({

    page,

    totalPages,

    totalItems,

    pageSize,

    onPageChange,

    onPageSizeChange,

}: PaginationProps) {

    if (totalItems === 0) {

        return null;

    }

    return (

        <section
            className="card"
            style={{

                marginTop: "24px",

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap",

                gap: "16px",

            }}
        >

            <div>

                <strong>

                    {totalItems}

                </strong>

                {" "}Users

            </div>

            <div
                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: "12px",

                }}
            >

                <label>

                    Show

                </label>

                <select

                    value={pageSize}

                    onChange={(event) =>

                        onPageSizeChange(

                            Number(
                                event.target.value
                            )

                        )

                    }

                    className="input"

                    style={{

                        width: "90px",

                    }}

                >

                    {PAGE_SIZES.map(

                        (size) => (

                            <option

                                key={size}

                                value={size}

                            >

                                {size}

                            </option>

                        )

                    )}

                </select>

            </div>

            <div
                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: "12px",

                }}
            >

                <button

                    className="btn btn-secondary"

                    disabled={
                        page === 1
                    }

                    onClick={() =>

                        onPageChange(

                            page - 1

                        )

                    }

                >

                    <ChevronLeft
                        size={18}
                    />

                </button>

                <span>

                    Page{" "}

                    <strong>

                        {page}

                    </strong>

                    {" "}of{" "}

                    <strong>

                        {totalPages}

                    </strong>

                </span>

                <button

                    className="btn btn-secondary"

                    disabled={
                        page === totalPages
                    }

                    onClick={() =>

                        onPageChange(

                            page + 1

                        )

                    }

                >

                    <ChevronRight
                        size={18}
                    />

                </button>

            </div>

        </section>

    );

}