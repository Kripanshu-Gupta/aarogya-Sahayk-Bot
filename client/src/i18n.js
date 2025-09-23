import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// The translations
const resources = {
  en: {
    translation: {
      "headerTitle": "Aarogya Sahayak",
      "initialBotMessage": "Namaste! I am Aarogya Sahayak, your AI health assistant. How can I help you today?",
      "inputPlaceholder": "Type your message...",
      "sendButton": "Send"
    }
  },
  hi: {
    translation: {
      "headerTitle": "आरोग्य सहायक",
      "initialBotMessage": "नमस्ते! मैं आरोग्य सहायक हूं, आपका एआई स्वास्थ्य सहायक। मैं आज आपकी मदद कैसे कर सकता हूं?",
      "inputPlaceholder": "अपना संदेश टाइप करें...",
      "sendButton": "भेजें"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;