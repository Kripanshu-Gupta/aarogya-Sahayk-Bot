import React from 'react';
import { Box, Paper, Typography, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Message = ({ message }) => {
    const isUser = message.sender === 'user';

    const renderContent = () => {
        switch (message.type) {
            case 'infographic':
                return <img src={message.data.url} alt="Infographic" style={{ maxWidth: '100%', borderRadius: '10px' }} />;
            case 'text':
            default:
                return <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{message.text}</Typography>;
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
            mb: 2,
            alignItems: 'flex-start'
        }}>
            {!isUser && <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}><SmartToyIcon /></Avatar>}
            <Paper elevation={1} sx={{
                p: 1.5,
                bgcolor: isUser ? 'primary.light' : 'grey.200',
                maxWidth: '75%',
                borderRadius: isUser ? '20px 20px 5px 20px' : '5px 20px 20px 20px',
            }}>
                {renderContent()}
            </Paper>
            {isUser && <Avatar sx={{ bgcolor: 'secondary.main', ml: 1.5 }}><PersonIcon /></Avatar>}
        </Box>
    );
};

export default Message;