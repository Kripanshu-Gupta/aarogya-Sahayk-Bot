import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Typography, Avatar, CircularProgress, Chip } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// IMPORTANT: In development, this will be 'http://localhost:5000'.
// In production, this will be your deployed Render backend URL.
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';


const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Generate a unique session ID when the component mounts
        setSessionId(uuidv4());
        setMessages([
            { sender: 'bot', text: 'Hello! I am Aarogya Sahayak, your AI health assistant. How can I help you today?' }
        ]);
    }, []);

    useEffect(() => {
        // Auto-scroll to the latest message
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: input,
                sessionId: sessionId
            });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        // We can optionally auto-send when a suggestion is clicked
        // For now, we just populate the input field.
    };

    const suggestionChips = ["What are the symptoms of Dengue?", "How to prevent Malaria?", "Nearest major hospitals in Indore?"];

    return (
        <Box sx={{ maxWidth: '700px', margin: 'auto', mt: 4, height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        mb: 2,
                    }}>
                        {msg.sender === 'bot' && <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>🤖</Avatar>}
                        <Paper elevation={1} sx={{
                            p: 1.5,
                            bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.200',
                            borderRadius: msg.sender === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                        }}>
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                        </Paper>
                        {msg.sender === 'user' && <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>🧑</Avatar>}
                    </Box>
                ))}
                {isLoading && <CircularProgress sx={{ alignSelf: 'center', my: 2 }} />}
                <div ref={messagesEndRef} />
            </Paper>
            <Box sx={{ p: 1 }}>
                {suggestionChips.map(chip => (
                    <Chip key={chip} label={chip} onClick={() => handleSuggestionClick(chip)} sx={{ mr: 1, mb: 1 }} />
                ))}
            </Box>
            <Box sx={{ p: 2, display: 'flex' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                />
                <Button variant="contained" onClick={handleSend} disabled={isLoading} sx={{ ml: 1 }}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatInterface;