import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem, FormControl } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useTranslation } from 'react-i18next'; // Import the hook

const Header = () => {
  const { t, i18n } = useTranslation(); // Use the hook

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value); // This function changes the language
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <HealthAndSafetyIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('headerTitle')} {/* Use translated title */}
        </Typography>
        <FormControl size="small">
          <Select
            value={i18n.language} // The select value is now controlled by i18next
            onChange={handleLanguageChange}
            sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.5)' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '.MuiSvgIcon-root': { color: 'white' } }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hi">हिन्दी</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Header;