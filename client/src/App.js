import React from 'react';
import ChatInterface from './components/ChatInterface';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" component="h1" sx={{ my: 3, color: 'primary.main' }}>
        Aarogya Sahayak 🏥
      </Typography>
      <Typography variant="h6" component="h2" sx={{ mb: 3, color: 'text.secondary' }}>
        AI-Driven Public Health Chatbot
      </Typography>
      <ChatInterface />
    </Box>
  );
}

export default App;