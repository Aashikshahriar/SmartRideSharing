import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "dark",

        primary: {
            main: "#00C853",
        },

        secondary: {
            main: "#2979FF",
        },

        background: {

            default: "#121212",

            paper: "#1E1E1E",

        },

    },

    typography: {

        fontFamily: "Roboto, sans-serif",

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

    },

    shape: {

        borderRadius: 12,

    },

});

export default theme;