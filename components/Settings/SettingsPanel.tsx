
import { useState } from "react";

import {
    Settings,
    Moon,
    Sun,
    Trash2,
    Database,
} from "lucide-react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

export default function SettingsPanel() {

    const {

        value: darkMode,

        setValue: setDarkMode,

    } = useLocalStorage(
        "dark-mode",
        true
    );

    const [

        confirmReset,

        setConfirmReset,

    ] = useState(false);

    const toggleTheme = () => {

        document.body.classList.toggle(
            "light-theme"
        );

        setDarkMode(
            !darkMode
        );

    };

    return (

        <section className="card">

            <div className="table-header">

                <h2>

                    <Settings size={22} />

                    {" "}

                    Settings

                </h2>

            </div>

            <div className="settings-grid">

                <div className="setting-item">

                    <div>

                        <h4>

                            Appearance

                        </h4>

                        <p>

                            Switch between light and dark mode.

                        </p>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={toggleTheme}
                    >

                        {darkMode ? (

                            <Sun size={18} />

                        ) : (

                            <Moon size={18} />

                        )}

                    </button>

                </div>

                <div className="setting-item">

                    <div>

                        <h4>

                            Database

                        </h4>

                        <p>

                            Manage locally stored Instagram data.

                        </p>

                    </div>

                    <button
                        className="btn btn-secondary"
                    >

                        <Database
                            size={18}
                        />

                        Open Database

                    </button>

                </div>

                <div className="setting-item">

                    <div>

                        <h4>

                            Reset Application

                        </h4>

                        <p>

                            Clear saved settings, history,
                            notes, favorites and cached data.

                        </p>

                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            setConfirmReset(true)
                        }
                    >

                        <Trash2
                            size={18}
                        />

                        Reset

                    </button>

                </div>

            </div>

            {confirmReset && (

                <div
                    className="card"
                    style={{
                        marginTop: "20px",
                        border:
                            "1px solid rgba(255,90,122,.35)",
                    }}
                >

                    <h4>

                        Confirm Reset

                    </h4>

                    <p>

                        This will permanently remove
                        your locally stored settings,
                        history, notes, favorites,
                        labels and cached data.

                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "16px",
                        }}
                    >

                        <button
                            className="btn btn-secondary"
                            onClick={() =>
                                setConfirmReset(false)
                            }
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                        >

                            Confirm Reset

                        </button>

                    </div>

                </div>

            )}

        </section>

    );

}