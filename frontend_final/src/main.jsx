import React from "react";
import ReactDOM from "react-dom/client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./styles/theme";

import App from "./App";

ReactDOM.createRoot(

    document.getElementById("root")

).render(

    <React.StrictMode>

        <BrowserRouter>

            <ThemeProvider theme={theme}>

                <CssBaseline />

                <App />

            </ThemeProvider>

        </BrowserRouter>

    </React.StrictMode>

);