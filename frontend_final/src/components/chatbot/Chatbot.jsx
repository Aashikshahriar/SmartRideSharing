import { useState } from "react";

import {
    Fab,
    Paper,
    Box,
    Typography,
    TextField,
    IconButton,
    Stack,
    CircularProgress,
} from "@mui/material";

import { askAssistant } from "../../services/chatbot";

export default function Chatbot() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const [messages, setMessages] = useState([
        {
            from: "bot",
            text: "Hi! Ask me about ETA, fraud checks, driver recommendations, or ride booking.",
        },
    ]);

    async function handleSend(e) {

        e.preventDefault();

        const text = message.trim();

        if (!text || sending) return;

        setMessages((prev) => [...prev, { from: "user", text }]);
        setMessage("");
        setSending(true);

        try {

            const data = await askAssistant(text);

            setMessages((prev) => [
                ...prev,
                { from: "bot", text: data.response },
            ]);

        } catch {

            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Sorry, something went wrong. Please try again." },
            ]);

        } finally {

            setSending(false);

        }

    }

    return (

        <>

            <Fab

                color="primary"

                onClick={() => setOpen((v) => !v)}

                sx={{

                    position: "fixed",

                    bottom: 24,

                    right: 24,

                    zIndex: 1300,

                }}

            >

                💬

            </Fab>

            {open && (

                <Paper

                    elevation={6}

                    sx={{

                        position: "fixed",

                        bottom: 96,

                        right: 24,

                        width: 320,

                        maxHeight: 440,

                        display: "flex",

                        flexDirection: "column",

                        borderRadius: 3,

                        overflow: "hidden",

                        zIndex: 1300,

                    }}

                >

                    <Box sx={{ p: 2, backgroundColor: "primary.main" }}>

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "primary.contrastText" }}>
                            SmartRideAI Assistant
                        </Typography>

                    </Box>

                    <Stack

                        spacing={1}

                        sx={{

                            p: 2,

                            overflowY: "auto",

                            flexGrow: 1,

                        }}

                    >

                        {messages.map((m, i) => (

                            <Box

                                key={i}

                                sx={{

                                    alignSelf: m.from === "user" ? "flex-end" : "flex-start",

                                    backgroundColor: m.from === "user" ? "secondary.main" : "background.default",

                                    color: m.from === "user" ? "secondary.contrastText" : "text.primary",

                                    px: 1.5,

                                    py: 1,

                                    borderRadius: 2,

                                    maxWidth: "85%",

                                }}

                            >

                                <Typography variant="body2" sx={{ color: "inherit" }}>
                                    {m.text}
                                </Typography>

                            </Box>

                        ))}

                        {sending && <CircularProgress size={20} />}

                    </Stack>

                    <Box
                        component="form"
                        onSubmit={handleSend}
                        sx={{ p: 1.5, display: "flex", gap: 1 }}
                    >

                        <TextField

                            size="small"

                            fullWidth

                            placeholder="Type a message..."

                            value={message}

                            onChange={(e) => setMessage(e.target.value)}

                        />

                        <IconButton type="submit" color="primary">
                            ➤
                        </IconButton>

                    </Box>

                </Paper>

            )}

        </>

    );

}
