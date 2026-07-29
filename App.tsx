// ======================================================
// InsightGram AI
// File : src/App.tsx
// ======================================================

export default function App() {
    return (
        <>
            <main className="container">
                <section
                    className="flex-center"
                    style={{
                        minHeight: "100vh",
                        flexDirection: "column",
                        gap: "24px",
                        textAlign: "center"
                    }}
                >
                    <span className="badge badge-primary pulse">
                        AI Powered Instagram Intelligence
                    </span>

                    <h1
                        className="gradient-text"
                        style={{
                            fontSize: "4rem",
                            fontWeight: 800,
                            letterSpacing: "-2px"
                        }}
                    >
                        InsightGram AI
                    </h1>

                    <p
                        style={{
                            maxWidth: "700px",
                            fontSize: "1.1rem"
                        }}
                    >
                        Professional Instagram Relationship Intelligence Dashboard
                    </p>

                    <div
                        className="card glow-border fade-scale"
                        style={{
                            width: "100%",
                            maxWidth: "700px",
                            padding: "60px"
                        }}
                    >
                        <h2
                            style={{
                                marginBottom: "16px"
                            }}
                        >
                            🚀 Project Initialized Successfully
                        </h2>

                        <p>
                            The project structure has been created successfully.
                            The next step is building the complete application
                            layout, routing, sidebar, navigation, upload system,
                            dashboard and AI engine.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}