import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "light",

        primary: {
            main: "#2563EB",
            dark: "#1D4ED8",
            light: "#60A5FA",
            contrastText: "#FFFFFF",
        },

        secondary: {
            main: "#0D9488",
            contrastText: "#FFFFFF",
        },

        success: {
            main: "#16A34A",
        },

        warning: {
            main: "#D97706",
        },

        error: {
            main: "#DC2626",
        },

        background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#0F172A",
            secondary: "#64748B",
        },

        divider: "#E2E8F0",

    },

    typography: {

        fontFamily: "'Inter', 'Roboto', sans-serif",

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.02em",
        },

        h5: {
            fontWeight: 600,
            letterSpacing: "-0.01em",
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            fontWeight: 600,
            textTransform: "none",
        },

    },

    shape: {

        borderRadius: 12,

    },

    shadows: [
        "none",
        "0 1px 2px rgba(15, 23, 42, 0.06)",
        "0 1px 3px rgba(15, 23, 42, 0.08)",
        "0 2px 6px rgba(15, 23, 42, 0.08)",
        "0 2px 8px rgba(15, 23, 42, 0.10)",
        ...Array(20).fill("0 8px 24px rgba(15, 23, 42, 0.12)"),
    ],

    components: {

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#0F172A",
                    borderBottom: "1px solid #E2E8F0",
                },
            },
            defaultProps: {
                elevation: 0,
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 10,
                },
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    border: "1px solid #E2E8F0",
                    backgroundImage: "none",
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
            },
        },

    },

});

export default theme;
