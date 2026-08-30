import Navbar from "../components/navbar/Navbar";
import Chatbot from "../components/chatbot/Chatbot";

import { Box } from "@mui/material";

export default function MainLayout({

    children,

}) {

    return (

        <>

            <Navbar />

            <Box

                sx={{

                    mt: 8,

                    p: 3,

                    minHeight: "100vh",

                    backgroundColor: "background.default",

                }}

            >

                {children}

            </Box>

            <Chatbot />

        </>

    );

}