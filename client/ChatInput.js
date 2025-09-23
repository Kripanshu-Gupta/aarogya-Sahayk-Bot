import React, { useState } from 'react';
import { Box, TextField, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SuggestionChips from './SuggestionChips';
import { useTranslation } from 'react-i18next'; // Import hook

const ChatInput = ({ onSend, isLoading }) => {
    const { t, i18n } = useTranslation(); // Get i18n instance for language
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false); // State to track listening

    const handleSendClick = () => {
        onSend(input);
        setInput('');
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendClick();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Sorry, your browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US'; // Set language for recognition
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript); // Set the input field with the transcribed text
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    return (
        <Box>
            <SuggestionChips onChipClick={handleSuggestionClick} />
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'background.paper', borderRadius: '0 0 4px 4px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    // Translated placeholder
                    placeholder={t('inputPlaceholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyPress}
                    disabled={isLoading}
                />
                <IconButton 
                    color={isListening ? "error" : "primary"} // Change color when listening
                    onClick={handleVoiceInput} 
                    disabled={isLoading} 
                    sx={{ mx: 1 }}
                >
                    <MicIcon />
                </IconButton>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendClick} disabled={isLoading || !input.trim()}>
                    {t('sendButton')} {/* Translated Button Text */}
                </Button>
            </Box>
        </Box>
    );
};

export default ChatInput;