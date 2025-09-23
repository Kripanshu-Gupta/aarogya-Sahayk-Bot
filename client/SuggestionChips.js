import React from 'react';
import { Box, Chip } from '@mui/material';

const SuggestionChips = ({ onChipClick }) => {
    const suggestions = ["What are the symptoms of Dengue?", "How to prevent Malaria?", "Nearest major hospitals in Indore?"];

    return (
        <Box sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {suggestions.map(text => (
                <Chip key={text} label={text} onClick={() => onChipClick(text)} />
            ))}
        </Box>
    );
};

export default SuggestionChips;