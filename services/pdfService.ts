// ======================================================
// InsightGram AI
// File : src/services/pdfService.ts
// Complete Version
// ======================================================

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import html2canvas from "html2canvas";

import type {
    DashboardStatistics,
    InstagramUser,
} from "../types/instagram";

export interface PDFReportData {

    users: InstagramUser[];

    statistics: DashboardStatistics;

    fileName?: string;

    generatedAt?: string;

    aiSummary?: string;

    chartSelectors?: string[];

}

class PDFService {

    private readonly PAGE_WIDTH =
        210;

    private readonly MARGIN =
        15;

    private readonly PRIMARY =
        "#18C8FF";

    private readonly TEXT =
        "#1F2937";

    private readonly MUTED =
        "#6B7280";

    // ======================================================
    // Create PDF
    // ======================================================

    private createDocument():
        jsPDF {

        return new jsPDF({

            orientation:
                "portrait",

            unit:
                "mm",

            format:
                "a4",

            compress:
                true,

        });

    }

    // ======================================================
    // Date
    // ======================================================

    private formatDate(
        date?: string
    ): string {

        return new Date(
            date ??
                new Date().toISOString()
        ).toLocaleString();

    }

    // ======================================================
    // Filename
    // ======================================================

    private getFileName(
        name?: string
    ): string {

        if (name) {

            return name.endsWith(
                ".pdf"
            )
                ? name
                : `${name}.pdf`;

        }

        const now =
            new Date();

        const timestamp =
            `${now.getFullYear()}-${String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            )}-${String(
                now.getDate()
            ).padStart(
                2,
                "0"
            )}_${String(
                now.getHours()
            ).padStart(
                2,
                "0"
            )}-${String(
                now.getMinutes()
            ).padStart(
                2,
                "0"
            )}`;

        return `InsightGram_Report_${timestamp}.pdf`;

    }

    // ======================================================
    // Title
    // ======================================================

    private drawTitle(
        pdf: jsPDF,
        title: string,
        y: number
    ): void {

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            22
        );

        pdf.setTextColor(
            this.hexToRgb(
                this.PRIMARY
            ).r,
            this.hexToRgb(
                this.PRIMARY
            ).g,
            this.hexToRgb(
                this.PRIMARY
            ).b
        );

        pdf.text(
            title,
            this.MARGIN,
            y
        );

    }

    // ======================================================
    // Subtitle
    // ======================================================

    private drawSubtitle(
        pdf: jsPDF,
        text: string,
        y: number
    ): void {

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            10
        );

        const rgb =
            this.hexToRgb(
                this.MUTED
            );

        pdf.setTextColor(
            rgb.r,
            rgb.g,
            rgb.b
        );

        const lines =
            pdf.splitTextToSize(
                text,
                180
            );

        pdf.text(
            lines,
            this.MARGIN,
            y
        );

    }

    // ======================================================
    // Section
    // ======================================================

    private drawSection(
        pdf: jsPDF,
        title: string,
        y: number
    ): void {

        const rgb =
            this.hexToRgb(
                this.PRIMARY
            );

        pdf.setFillColor(
            rgb.r,
            rgb.g,
            rgb.b
        );

        pdf.roundedRect(
            this.MARGIN,
            y,
            180,
            10,
            2,
            2,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            12
        );

        pdf.setTextColor(
            255,
            255,
            255
        );

        pdf.text(
            title,
            this.MARGIN + 4,
            y + 6.5
        );

    }

    // ======================================================
    // Label / Value
    // ======================================================

    private drawLabelValue(
        pdf: jsPDF,
        label: string,
        value: string | number,
        x: number,
        y: number
    ): void {

        const rgb =
            this.hexToRgb(
                this.TEXT
            );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            10
        );

        pdf.setTextColor(
            rgb.r,
            rgb.g,
            rgb.b
        );

        pdf.text(
            `${label}:`,
            x,
            y
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            String(value),
            x + 42,
            y
        );

    }

    // ======================================================
    // Cover Page
    // ======================================================

    private drawCoverPage(
        pdf: jsPDF,
        data: PDFReportData
    ): void {

        const primary =
            this.hexToRgb(
                this.PRIMARY
            );

        pdf.setFillColor(
            primary.r,
            primary.g,
            primary.b
        );

        pdf.rect(
            0,
            0,
            this.PAGE_WIDTH,
            62,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            29
        );

        pdf.setTextColor(
            255,
            255,
            255
        );

        pdf.text(
            "InsightGram AI",
            this.MARGIN,
            27
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            13
        );

        pdf.text(
            "Professional Instagram Analytics Report",
            this.MARGIN,
            38
        );

        let y = 80;

        this.drawSection(
            pdf,
            "Report Information",
            y
        );

        y += 19;

        this.drawLabelValue(
            pdf,
            "File",
            data.fileName ??
                "Instagram Export",
            this.MARGIN,
            y
        );

        y += 10;

        this.drawLabelValue(
            pdf,
            "Generated",
            this.formatDate(
                data.generatedAt
            ),
            this.MARGIN,
            y
        );

        y += 10;

        this.drawLabelValue(
            pdf,
            "Users",
            data.users.length,
            this.MARGIN,
            y
        );

        y += 22;

        pdf.setFillColor(
            245,
            247,
            250
        );

        pdf.roundedRect(
            this.MARGIN,
            y,
            180,
            76,
            4,
            4,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            16
        );

        const text =
            this.hexToRgb(
                this.TEXT
            );

        pdf.setTextColor(
            text.r,
            text.g,
            text.b
        );

        pdf.text(
            "Executive Summary",
            this.MARGIN + 8,
            y + 14
        );

        const summary =
            data.aiSummary ??
            "This report contains an analysis of your Instagram relationship data including followers, following, mutual connections, pending requests, relationship score and AI-generated insights.";

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            10
        );

        const muted =
            this.hexToRgb(
                this.MUTED
            );

        pdf.setTextColor(
            muted.r,
            muted.g,
            muted.b
        );

        const lines =
            pdf.splitTextToSize(
                summary,
                160
            );

        pdf.text(
            lines,
            this.MARGIN + 8,
            y + 26
        );

        pdf.addPage();

    }

    // ======================================================
    // Statistics
    // ======================================================

    private drawStatistics(
        pdf: jsPDF,
        statistics: DashboardStatistics
    ): void {

        let y = 20;

        this.drawTitle(
            pdf,
            "Instagram Statistics",
            y
        );

        this.drawSubtitle(
            pdf,
            "Relationship overview generated by InsightGram AI",
            y + 8
        );

        y += 20;

        this.drawSection(
            pdf,
            "Statistics Dashboard",
            y
        );

        y += 18;

        const cards = [

            {
                title:
                    "Followers",

                value:
                    statistics.followers,

                color:
                    [24, 200, 255],

            },

            {
                title:
                    "Following",

                value:
                    statistics.following,

                color:
                    [52, 211, 153],

            },

            {
                title:
                    "Mutual",

                value:
                    statistics.mutual,

                color:
                    [99, 102, 241],

            },

            {
                title:
                    "Not Following Back",

                value:
                    statistics.notFollowingBack,

                color:
                    [255, 90, 122],

            },

            {
                title:
                    "You Don't Follow Back",

                value:
                    statistics.youDontFollowBack,

                color:
                    [251, 191, 36],

            },

            {
                title:
                    "Pending Requests",

                value:
                    statistics.pendingRequests,

                color:
                    [168, 85, 247],

            },

        ];

        let x =
            this.MARGIN;

        let rowY =
            y;

        cards.forEach(
            (card, index) => {

                const [
                    r,
                    g,
                    b,
                ] = card.color;

                pdf.setFillColor(
                    r,
                    g,
                    b
                );

                pdf.roundedRect(
                    x,
                    rowY,
                    55,
                    34,
                    3,
                    3,
                    "F"
                );

                pdf.setFont(
                    "helvetica",
                    "bold"
                );

                pdf.setFontSize(
                    9
                );

                pdf.setTextColor(
                    255,
                    255,
                    255
                );

                pdf.text(
                    card.title,
                    x + 4,
                    rowY + 9
                );

                pdf.setFontSize(
                    17
                );

                pdf.text(
                    String(
                        card.value
                    ),
                    x + 4,
                    rowY + 24
                );

                x += 60;

                if (
                    (index + 1) %
                        3 ===
                    0
                ) {

                    x =
                        this.MARGIN;

                    rowY += 42;

                }

            }
        );

        y =
            rowY + 50;

        this.drawSection(
            pdf,
            "Relationship Score",
            y
        );

        y += 19;

        const score =
            Math.max(
                0,
                Math.min(
                    100,
                    statistics.relationshipScore
                )
            );

        pdf.setFillColor(
            235,
            235,
            235
        );

        pdf.roundedRect(
            this.MARGIN,
            y,
            180,
            10,
            3,
            3,
            "F"
        );

        const width =
            180 *
            score /
            100;

        let color:
            [number, number, number] =
            [255, 90, 122];

        let message =
            "Relationship network needs improvement.";

        if (
            score >= 80
        ) {

            color =
                [52, 211, 153];

            message =
                "Excellent relationship network.";

        } else if (
            score >= 60
        ) {

            color =
                [24, 200, 255];

            message =
                "Healthy relationship network.";

        } else if (
            score >= 40
        ) {

            color =
                [251, 191, 36];

            message =
                "Average relationship quality.";

        }

        pdf.setFillColor(
            color[0],
            color[1],
            color[2]
        );

        pdf.roundedRect(
            this.MARGIN,
            y,
            width,
            10,
            3,
            3,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            14
        );

        const text =
            this.hexToRgb(
                this.TEXT
            );

        pdf.setTextColor(
            text.r,
            text.g,
            text.b
        );

        pdf.text(
            `${score}%`,
            this.MARGIN,
            y + 20
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            10
        );

        const muted =
            this.hexToRgb(
                this.MUTED
            );

        pdf.setTextColor(
            muted.r,
            muted.g,
            muted.b
        );

        pdf.text(
            message,
            this.MARGIN,
            y + 29
        );

        pdf.addPage();

    }

    // ======================================================
    // Relationship Table
    // ======================================================

    private drawRelationshipTable(
        pdf: jsPDF,
        users: InstagramUser[]
    ): void {

        this.drawTitle(
            pdf,
            "Relationship Details",
            20
        );

        this.drawSubtitle(
            pdf,
            "Complete relationship list exported from InsightGram AI",
            28
        );

        const rows =
            users.map(
                (user) => {

                    let status =
                        "Unknown";

                    if (
                        user.followsYou &&
                        user.youFollow
                    ) {

                        status =
                            "Mutual";

                    } else if (
                        user.youFollow
                    ) {

                        status =
                            "Not Following Back";

                    } else if (
                        user.followsYou
                    ) {

                        status =
                            "You Don't Follow Back";

                    } else if (
                        user.isPending
                    ) {

                        status =
                            "Pending";

                    } else if (
                        user.isRecentRequest
                    ) {

                        status =
                            "Recent Request";

                    } else if (
                        user.isRecentlyUnfollowed
                    ) {

                        status =
                            "Recently Unfollowed";

                    } else if (
                        user.isCloseFriend
                    ) {

                        status =
                            "Close Friend";

                    }

                    return [

                        `@${user.username}`,

                        user.followsYou
                            ? "Yes"
                            : "No",

                        user.youFollow
                            ? "Yes"
                            : "No",

                        user.isPending
                            ? "Yes"
                            : "No",

                        status,

                    ];

                }
            );

        autoTable(
            pdf,
            {

                startY:
                    38,

                head:
                    [[
                        "Username",
                        "Follows You",
                        "You Follow",
                        "Pending",
                        "Status",
                    ]],

                body:
                    rows,

                theme:
                    "grid",

                styles:
                    {

                        font:
                            "helvetica",

                        fontSize:
                            7.5,

                        cellPadding:
                            2.5,

                        overflow:
                            "linebreak",

                        valign:
                            "middle",

                        lineColor:
                            [225, 225, 225],

                        lineWidth:
                            0.2,

                    },

                headStyles:
                    {

                        fillColor:
                            [24, 200, 255],

                        textColor:
                            [255, 255, 255],

                        fontStyle:
                            "bold",

                        halign:
                            "center",

                        fontSize:
                            8,

                    },

                alternateRowStyles:
                    {

                        fillColor:
                            [248, 250, 252],

                    },

                columnStyles:
                    {

                        0:
                            {
                                cellWidth:
                                    42,
                            },

                        1:
                            {
                                cellWidth:
                                    27,
                                halign:
                                    "center",
                            },

                        2:
                            {
                                cellWidth:
                                    27,
                                halign:
                                    "center",
                            },

                        3:
                            {
                                cellWidth:
                                    24,
                                halign:
                                    "center",
                            },

                        4:
                            {
                                cellWidth:
                                    60,
                            },

                    },

                margin:
                    {

                        left:
                            this.MARGIN,

                        right:
                            this.MARGIN,

                    },

                didDrawPage:
                    () => {

                        pdf.setFont(
                            "helvetica",
                            "bold"
                        );

                        pdf.setFontSize(
                            9
                        );

                        const text =
                            this.hexToRgb(
                                this.TEXT
                            );

                        pdf.setTextColor(
                            text.r,
                            text.g,
                            text.b
                        );

                        pdf.text(
                            "Relationship Table",
                            this.MARGIN,
                            12
                        );

                    },

            }
        );

        pdf.addPage();

    }

    // ======================================================
    // AI Insights
    // ======================================================

    private drawAIInsights(
        pdf: jsPDF,
        data: PDFReportData
    ): void {

        const statistics =
            data.statistics;

        let y =
            20;

        this.drawTitle(
            pdf,
            "AI Insights",
            y
        );

        this.drawSubtitle(
            pdf,
            "AI-powered analysis of your Instagram relationship network",
            y + 8
        );

        y += 20;

        this.drawSection(
            pdf,
            "Overall Assessment",
            y
        );

        y += 19;

        let scoreColor:
            [number, number, number] =
            [255, 90, 122];

        let assessment =
            "Your relationship network requires significant improvement.";

        if (
            statistics.relationshipScore >= 80
        ) {

            scoreColor =
                [52, 211, 153];

            assessment =
                "Excellent! Your Instagram relationship network is healthy and well balanced.";

        } else if (
            statistics.relationshipScore >= 60
        ) {

            scoreColor =
                [24, 200, 255];

            assessment =
                "Your relationship network is healthy with a few areas for improvement.";

        } else if (
            statistics.relationshipScore >= 40
        ) {

            scoreColor =
                [251, 191, 36];

            assessment =
                "Average relationship quality. Consider reviewing inactive connections.";

        }

        pdf.setFillColor(
            scoreColor[0],
            scoreColor[1],
            scoreColor[2]
        );

        pdf.roundedRect(
            this.MARGIN,
            y,
            180,
            32,
            4,
            4,
            "F"
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(
            18
        );

        pdf.setTextColor(
            255,
            255,
            255
        );

        pdf.text(
            `${statistics.relationshipScore}%`,
            this.MARGIN + 8,
            y + 12
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            9
        );

        const assessmentLines =
            pdf.splitTextToSize(
                assessment,
                150
            );

        pdf.text(
            assessmentLines,
            this.MARGIN + 8,
            y + 22
        );

        y += 44;

        this.drawSection(
            pdf,
            "AI Recommendations",
            y
        );

        y += 18;

        const recommendations:
            string[] = [];

        if (
            statistics.notFollowingBack > 0
        ) {

            recommendations.push(
                `Review ${statistics.notFollowingBack} account(s) that do not follow you back.`
            );

        }

        if (
            statistics.youDontFollowBack > 0
        ) {

            recommendations.push(
                `Review ${statistics.youDontFollowBack} follower(s) that you do not follow back.`
            );

        }

        if (
            statistics.pendingRequests > 0
        ) {

            recommendations.push(
                `Review ${statistics.pendingRequests} pending follow request(s).`
            );

        }

        if (
            statistics.relationshipScore < 60
        ) {

            recommendations.push(
                "Focus on meaningful mutual connections to improve relationship quality."
            );

        }

        if (
            recommendations.length === 0
        ) {

            recommendations.push(
                "No major issues detected. Keep maintaining healthy relationships."
            );

        }

        recommendations.forEach(
            (item) => {

                pdf.setFillColor(
                    24,
                    200,
                    255
                );

                pdf.circle(
                    this.MARGIN + 3,
                    y - 1,
                    1.2,
                    "F"
                );

                const lines =
                    pdf.splitTextToSize(
                        item,
                        165
                    );

                pdf.setFont(
                    "helvetica",
                    "normal"
                );

                pdf.setFontSize(
                    10
                );

                const text =
                    this.hexToRgb(
                        this.TEXT
                    );

                pdf.setTextColor(
                    text.r,
                    text.g,
                    text.b
                );

                pdf.text(
                    lines,
                    this.MARGIN + 8,
                    y
                );

                y +=
                    lines.length *
                        6 +
                    3;

            }
        );

        y += 8;

        this.drawSection(
            pdf,
            "AI Summary",
            y
        );

        y += 18;

        const summary =
            data.aiSummary ??
            "InsightGram AI analyzed your Instagram relationship network based on followers, following, pending requests and mutual relationships.";

        const summaryLines =
            pdf.splitTextToSize(
                summary,
                175
            );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(
            10
        );

        const text =
            this.hexToRgb(
                this.TEXT
            );

        pdf.setTextColor(
            text.r,
            text.g,
            text.b
        );

        pdf.text(
            summaryLines,
            this.MARGIN,
            y
        );

        pdf.addPage();

    }

    // ======================================================
    // Chart Capture
    // ======================================================

    private async captureElement(
        element: HTMLElement
    ): Promise<HTMLCanvasElement> {

        return html2canvas(
            element,
            {

                scale:
                    2,

                backgroundColor:
                    "#ffffff",

                useCORS:
                    true,

            }
        );

    }

    // ======================================================
    // Charts
    // ======================================================

    private async drawCharts(
        pdf: jsPDF,
        selectors: string[]
    ): Promise<void> {

        if (
            selectors.length === 0
        ) {

            return;

        }

        this.drawTitle(
            pdf,
            "Analytics Charts",
            20
        );

        this.drawSubtitle(
            pdf,
            "Dashboard visualizations captured from InsightGram AI",
            28
        );

        let y =
            42;

        for (
            const selector of selectors
        ) {

            const element =
                document.querySelector(
                    selector
                ) as HTMLElement | null;

            if (!element) {

                continue;

            }

            try {

                const canvas =
                    await this.captureElement(
                        element
                    );

                const image =
                    canvas.toDataURL(
                        "image/png"
                    );

                const imageWidth =
                    180;

                const imageHeight =
                    (
                        canvas.height *
                        imageWidth
                    ) /
                    canvas.width;

                if (
                    y +
                        imageHeight >
                    275
                ) {

                    pdf.addPage();

                    y =
                        20;

                }

                const title =
                    selector
                        .replace(
                            /^#/,
                            ""
                        )
                        .replace(
                            /-/g,
                            " "
                        )
                        .replace(
                            /\b\w/g,
                            (letter) =>
                                letter.toUpperCase()
                        );

                pdf.setFont(
                    "helvetica",
                    "bold"
                );

                pdf.setFontSize(
                    10
                );

                const text =
                    this.hexToRgb(
                        this.TEXT
                    );

                pdf.setTextColor(
                    text.r,
                    text.g,
                    text.b
                );

                pdf.text(
                    title,
                    this.MARGIN,
                    y
                );

                y += 5;

                pdf.addImage(
                    image,
                    "PNG",
                    this.MARGIN,
                    y,
                    imageWidth,
                    imageHeight
                );

                y +=
                    imageHeight +
                    14;

            } catch (
                error
            ) {

                console.warn(
                    `Unable to capture chart ${selector}:`,
                    error
                );

            }

        }

        pdf.addPage();

    }

    // ======================================================
    // Main Generate
    // ======================================================

    public async generate(
        data: PDFReportData
    ): Promise<void> {

        if (
            !data.users ||
            !data.statistics
        ) {

            throw new Error(
                "PDF report data is incomplete."
            );

        }

        const pdf =
            this.createDocument();

        this.drawCoverPage(
            pdf,
            data
        );

        this.drawStatistics(
            pdf,
            data.statistics
        );

        this.drawRelationshipTable(
            pdf,
            data.users
        );

        this.drawAIInsights(
            pdf,
            data
        );

        if (
            data.chartSelectors &&
            data.chartSelectors.length >
                0
        ) {

            await this.drawCharts(
                pdf,
                data.chartSelectors
            );

        }

        this.addFooter(
            pdf
        );

        pdf.save(
            this.getFileName(
                data.fileName
            )
        );

    }

    // ======================================================
    // Dashboard Export
    // ======================================================

    public async generateFromDashboard(
        data: PDFReportData,
        selectors: string[] = []
    ): Promise<void> {

        await this.generate({

            ...data,

            chartSelectors:
                selectors,

        });

    }

    // ======================================================
    // Export Alias
    // ======================================================

    public async export(
        data: PDFReportData
    ): Promise<void> {

        await this.generate(
            data
        );

    }

    // ======================================================
    // Footer
    // ======================================================

    private addFooter(
        pdf: jsPDF
    ): void {

        const pageCount =
            pdf.getNumberOfPages();

        const muted =
            this.hexToRgb(
                this.MUTED
            );

        for (
            let page = 1;
            page <= pageCount;
            page++
        ) {

            pdf.setPage(
                page
            );

            pdf.setDrawColor(
                220,
                220,
                220
            );

            pdf.line(
                this.MARGIN,
                287,
                195,
                287
            );

            pdf.setFont(
                "helvetica",
                "normal"
            );

            pdf.setFontSize(
                8
            );

            pdf.setTextColor(
                muted.r,
                muted.g,
                muted.b
            );

            pdf.text(
                "Generated by InsightGram AI",
                this.MARGIN,
                293
            );

            pdf.text(
                `Page ${page} of ${pageCount}`,
                171,
                293
            );

        }

    }

    // ======================================================
    // HEX → RGB
    // ======================================================

    private hexToRgb(
        hex: string
    ): {
        r: number;
        g: number;
        b: number;
    } {

        const clean =
            hex.replace(
                "#",
                ""
            );

        const value =
            clean.length === 3

                ? clean
                      .split("")
                      .map(
                          (char) =>
                              char + char
                      )
                      .join("")

                : clean;

        return {

            r: parseInt(
                value.substring(
                    0,
                    2
                ),
                16
            ),

            g: parseInt(
                value.substring(
                    2,
                    4
                ),
                16
            ),

            b: parseInt(
                value.substring(
                    4,
                    6
                ),
                16
            ),

        };

    }

}

export const pdfService =
    new PDFService();

export default pdfService;