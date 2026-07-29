/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],

    theme: {
        extend: {
            colors: {
                background: "#07070A",
                surface: "#12161F",
                primary: "#6D5DF6",
                secondary: "#18C8FF",
                success: "#34D399",
                warning: "#FBBF24",
                danger: "#FF5A7A"
            },

            fontFamily: {
                sans: ["Inter", "sans-serif"]
            },

            borderRadius: {
                lg: "22px",
                xl: "30px"
            },

            boxShadow: {
                glass: "0 15px 40px rgba(0,0,0,.35)",
                glow: "0 0 40px rgba(24,200,255,.20)"
            },

            animation: {
                float: "float 5s ease-in-out infinite",
                fade: "fade .4s ease",
                pulseGlow: "pulse 2s infinite",
                aurora: "auroraMove 22s linear infinite alternate"
            },

            keyframes: {
                float: {
                    "0%,100%": {
                        transform: "translateY(0)"
                    },
                    "50%": {
                        transform: "translateY(-8px)"
                    }
                },

                fade: {
                    from: {
                        opacity: "0"
                    },
                    to: {
                        opacity: "1"
                    }
                },

                pulse: {
                    "0%": {
                        boxShadow: "0 0 0 0 rgba(24,200,255,.5)"
                    },
                    "70%": {
                        boxShadow: "0 0 0 18px rgba(24,200,255,0)"
                    },
                    "100%": {
                        boxShadow: "0 0 0 0 rgba(24,200,255,0)"
                    }
                },

                auroraMove: {
                    "0%": {
                        transform: "translate(-4%,-3%) scale(1)"
                    },
                    "50%": {
                        transform: "translate(3%,4%) scale(1.08)"
                    },
                    "100%": {
                        transform: "translate(-2%,2%) scale(1.03)"
                    }
                }
            }
        }
    },

    plugins: []
};