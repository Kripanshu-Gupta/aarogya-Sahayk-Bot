import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Message from './Message';

const MessageList = ({ messages, isLoading }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return (
        <Box>
            {messages.map((msg, index) => (
                <Message key={index} message={msg} />
            ))}
            {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
            <div ref={messagesEndRef} />
        </Box>
    );
};

export default MessageList;