// ======================================================
// InsightGram AI
// File : src/services/exportService.ts
// ======================================================

import type {
    DashboardStatistics,
    InstagramUser,
} from "../types/instagram";

export interface ExportData {

    users: InstagramUser[];

    statistics: DashboardStatistics;

    generatedAt?: string;

    fileName?: string;

}

class ExportService {

    private getTimestamp(): string {

        const now = new Date();

        const date = [
            now.getFullYear(),
            String(
                now.getMonth() + 1
            ).padStart(2, "0"),
            String(
                now.getDate()
            ).padStart(2, "0"),
        ].join("-");

        const time = [
            String(
                now.getHours()
            ).padStart(2, "0"),
            String(
                now.getMinutes()
            ).padStart(2, "0"),
            String(
                now.getSeconds()
            ).padStart(2, "0"),
        ].join("-");

        return `${date}_${time}`;

    }

    private download(
        content: BlobPart,
        type: string,
        fileName: string
    ): void {

        const blob = new Blob(
            [content],
            {
                type,
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }

    // ======================================================
    // CSV
    // ======================================================

    exportCSV(
        data: ExportData
    ): void {

        const headers = [

            "Username",
            "Follows You",
            "You Follow",
            "Pending",
            "Recent Request",
            "Recently Unfollowed",
            "Close Friend",
            "Reviewed",
            "Favorite",
            "Pinned",
            "Label",
            "Note",
            "Profile URL",

        ];

        const rows =
            data.users.map(
                (user) => [

                    user.username,

                    user.followsYou
                        ? "Yes"
                        : "No",

                    user.youFollow
                        ? "Yes"
                        : "No",

                    user.isPending
                        ? "Yes"
                        : "No",

                    user.isRecentRequest
                        ? "Yes"
                        : "No",

                    user.isRecentlyUnfollowed
                        ? "Yes"
                        : "No",

                    user.isCloseFriend
                        ? "Yes"
                        : "No",

                    user.reviewed
                        ? "Yes"
                        : "No",

                    user.favorite
                        ? "Yes"
                        : "No",

                    user.pinned
                        ? "Yes"
                        : "No",

                    user.label ?? "",

                    user.note ?? "",

                    user.profileUrl,

                ]
            );

        const csv = [

            headers,
            ...rows,

        ]
            .map(
                (row) =>
                    row
                        .map(
                            (value) =>
                                `"${String(
                                    value
                                ).replace(
                                    /"/g,
                                    '""'
                                )}"`
                        )
                        .join(",")
            )
            .join("\r\n");

        this.download(

            csv,

            "text/csv;charset=utf-8;",

            `InsightGram_Report_${this.getTimestamp()}.csv`

        );

    }

    // ======================================================
    // JSON
    // ======================================================

    exportJSON(
        data: ExportData
    ): void {

        const backup = {

            application:
                "InsightGram AI",

            version:
                "1.0.0",

            generatedAt:
                data.generatedAt ??
                new Date().toISOString(),

            fileName:
                data.fileName ??
                null,

            statistics:
                data.statistics,

            users:
                data.users,

        };

        const json =
            JSON.stringify(
                backup,
                null,
                2
            );

        this.download(

            json,

            "application/json",

            `InsightGram_Backup_${this.getTimestamp()}.json`

        );

    }

    // ======================================================
    // Text Summary
    // ======================================================

    exportSummary(
        data: ExportData
    ): void {

        const s =
            data.statistics;

        const report = [

            "InsightGram AI Report",

            "=====================",

            "",

            `Generated: ${new Date(
                data.generatedAt ??
                new Date().toISOString()
            ).toLocaleString()}`,

            `File: ${
                data.fileName ??
                "Instagram Export"
            }`,

            "",

            `Followers: ${s.followers}`,

            `Following: ${s.following}`,

            `Mutual: ${s.mutual}`,

            `Not Following Back: ${s.notFollowingBack}`,

            `You Don't Follow Back: ${s.youDontFollowBack}`,

            `Pending Requests: ${s.pendingRequests}`,

            `Recent Requests: ${s.recentRequests}`,

            `Recently Unfollowed: ${s.recentlyUnfollowed}`,

            `Close Friends: ${s.closeFriends}`,

            `Relationship Score: ${s.relationshipScore}%`,

            "",

            "Generated by InsightGram AI",

        ].join("\r\n");

        this.download(

            report,

            "text/plain;charset=utf-8;",

            `InsightGram_Summary_${this.getTimestamp()}.txt`

        );

    }

    // ======================================================
    // Export All
    // ======================================================

    exportAll(
        data: ExportData
    ): void {

        this.exportCSV(data);

        this.exportJSON(data);

        this.exportSummary(data);

    }

    // ======================================================
    // Copy Summary
    // ======================================================

    async copySummary(
        data: ExportData
    ): Promise<void> {

        const s =
            data.statistics;

        const text = [

            "InsightGram AI",

            "",

            `Followers: ${s.followers}`,

            `Following: ${s.following}`,

            `Mutual: ${s.mutual}`,

            `Not Following Back: ${s.notFollowingBack}`,

            `You Don't Follow Back: ${s.youDontFollowBack}`,

            `Pending Requests: ${s.pendingRequests}`,

            `Recent Requests: ${s.recentRequests}`,

            `Recently Unfollowed: ${s.recentlyUnfollowed}`,

            `Close Friends: ${s.closeFriends}`,

            `Relationship Score: ${s.relationshipScore}%`,

        ].join("\n");

        if (
            !navigator.clipboard
        ) {

            throw new Error(
                "Clipboard API is not available."
            );

        }

        await navigator.clipboard.writeText(
            text
        );

    }

}

// ======================================================
// Service Instance
// ======================================================

export const exportService =
    new ExportService();

// ======================================================
// Backward-compatible named exports
// ======================================================

export const exportAsCSV = (
    data: ExportData
): void => {

    exportService.exportCSV(data);

};

export const exportAsJSON = (
    data: ExportData
): void => {

    exportService.exportJSON(data);

};

export const exportAsPDF = async (
    data: ExportData
): Promise<void> => {

    const {
        default: pdfService,
    } = await import(
        "./pdfService"
    );

    await pdfService.generate({

        users:
            data.users,

        statistics:
            data.statistics,

        fileName:
            data.fileName,

        generatedAt:
            data.generatedAt,

    });

};

export const exportAll = (
    data: ExportData
): void => {

    exportService.exportAll(data);

};

export default exportService;