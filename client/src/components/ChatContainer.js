import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { useTranslation } from 'react-i18next'; // Import the hook

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ChatContainer = () => {
    const { t } = useTranslation(); // Use the hook
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        setSessionId(uuidv4());
        setMessages([
            { sender: 'bot', type: 'text', text: t('initialBotMessage') } // Use translated message
        ]);
    }, [t]); // Add 't' as a dependency to re-run when language changes

    const handleSend = async (messageText) => {
        // ... (rest of the function remains the same)
        if (messageText.trim() === '') return;

        const userMessage = { sender: 'user', type: 'text', text: messageText };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/chat`, {
                message: messageText,
                sessionId: sessionId
            });
            const botMessage = {
                sender: 'bot',
                type: response.data.type || 'text',
                text: response.data.reply,
                data: response.data.data || null
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = { sender: 'bot', type: 'text', text: 'Sorry, something went wrong. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: '800px', width: '100%', margin: 'auto', mt: 2, mb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column' }}>
                <MessageList messages={messages} isLoading={isLoading} />
            </Paper>
            <ChatInput onSend={handleSend} isLoading={isLoading} />
        </Box>
    );
};

export default ChatContainer;