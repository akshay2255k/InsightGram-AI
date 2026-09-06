
import { useCallback } from "react";

import { useDropzone } from "react-dropzone";

import {
    UploadCloud,
    FileArchive,
    ShieldCheck,
} from "lucide-react";

import { useInstagramZip } from "../../hooks/useInstagramZip";

export default function UploadZone() {

    const {

        uploadZip,

        loading,

        error,

    } = useInstagramZip();

    const onDrop = useCallback(

        async (files: File[]) => {

            if (!files.length) {

                return;

            }

            await uploadZip(files[0]);

        },

        [uploadZip]

    );

    const {

        getRootProps,

        getInputProps,

        isDragActive,

    } = useDropzone({

        onDrop,

        multiple: false,

        maxFiles: 1,

        accept: {

            "application/zip": [
                ".zip",
            ],

        },

    });

    return (

        <section className="upload-section">

            <div

                {...getRootProps()}

                className={`upload-zone ${
                    isDragActive
                        ? "drag-active"
                        : ""
                }`}

            >

                <input

                    {...getInputProps()}

                />

                <div className="upload-icon">

                    <UploadCloud
                        size={72}
                    />

                </div>

                <h2>

                    Upload Instagram ZIP Export

                </h2>

                <p>

                    Drag & Drop your official Instagram
                    data export ZIP here

                </p>

                <div className="upload-features">

                    <div className="upload-feature">

                        <FileArchive
                            size={20}
                        />

                        <span>

                            Official Instagram ZIP

                        </span>

                    </div>

                    <div className="upload-feature">

                        <ShieldCheck
                            size={20}
                        />

                        <span>

                            100% Offline Processing

                        </span>

                    </div>

                </div>

                <button

                    className="btn btn-primary"

                    type="button"

                >

                    Choose ZIP File

                </button>

                {loading && (

                    <div
                        style={{
                            marginTop: "28px",
                        }}
                    >

                        <div className="loader" />

                        <p
                            style={{
                                marginTop: "16px",
                            }}
                        >

                            Parsing Instagram export...

                        </p>

                    </div>

                )}

                {error && (

                    <div
                        className="card"
                        style={{
                            marginTop: "24px",
                            border:
                                "1px solid rgba(255,90,122,.35)",
                        }}
                    >

                        <strong>

                            Upload Failed

                        </strong>

                        <p>

                            {error}

                        </p>

                    </div>

                )}

            </div>

            <div className="upload-footer">

                <div className="card">

                    <strong>
                        Privacy First
                    </strong>

                    <p>

                        Your Instagram ZIP is processed
                        entirely inside your browser.

                        No uploads.

                        No servers.

                        No tracking.

                    </p>

                </div>

                <div className="card">

                    <strong>
                        Supported Data
                    </strong>

                    <ul
                        style={{
                            marginTop: "12px",
                            paddingLeft: "18px",
                        }}
                    >

                        <li>Followers</li>

                        <li>Following</li>

                        <li>Pending Requests</li>

                        <li>Recent Requests</li>

                        <li>Recently Unfollowed</li>

                        <li>Close Friends</li>

                    </ul>

                </div>

            </div>

        </section>

    );

}