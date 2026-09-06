// ======================================================
// InsightGram AI
// File : src/components/Settings/SettingsHeader.tsx
// ======================================================

import {
    Settings,
    ShieldCheck,
    Palette,
} from "lucide-react";

export default function SettingsHeader() {

    return (

        <section
            className="card"
            style={{
                marginBottom: "28px",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "24px",
                }}
            >

                <div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            marginBottom: "12px",
                        }}
                    >

                        <Settings
                            size={34}
                            color="#18C8FF"
                        />

                        <h1
                            style={{
                                margin: 0,
                            }}
                        >

                            Settings

                        </h1>

                    </div>

                    <p
                        style={{
                            color: "#98A2B3",
                            lineHeight: 1.8,
                            margin: 0,
                            maxWidth: "760px",
                        }}
                    >

                        Customize InsightGram AI according to your
                        preferences. Manage appearance, privacy,
                        notifications, storage and application
                        behavior from one place.

                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "18px",
                        flexWrap: "wrap",
                    }}
                >

                    <div
                        className="glass"
                        style={{
                            minWidth: "190px",
                            padding: "18px",
                            borderRadius: "18px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "12px",
                            }}
                        >

                            <Palette
                                size={22}
                                color="#A855F7"
                            />

                            <strong>

                                Theme

                            </strong>

                        </div>

                        <div
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Dark Mode

                        </div>

                    </div>

                    <div
                        className="glass"
                        style={{
                            minWidth: "190px",
                            padding: "18px",
                            borderRadius: "18px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "12px",
                            }}
                        >

                            <ShieldCheck
                                size={22}
                                color="#34D399"
                            />

                            <strong>

                                Security

                            </strong>

                        </div>

                        <div
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Local Storage Only

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}