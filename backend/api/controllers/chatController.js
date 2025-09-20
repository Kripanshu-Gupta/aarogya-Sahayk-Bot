const axios = require('axios');
const conversationHistories = {};

exports.handleChatMessage = async (req, res) => {
    const { message, sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required.' });
    }

    if (!conversationHistories[sessionId]) {
        conversationHistories[sessionId] = [];
    }

    conversationHistories[sessionId].push(`User: ${message}`);

    const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
    const AI_MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_API_KEY}`;

    const systemPrompt = `You are "Aarogya Sahayak," an AI public health chatbot for residents of Indore, Madhya Pradesh, India. Your purpose is to provide clear, accurate, and accessible information on diseases, symptoms, and preventive healthcare. The current date is ${new Date().toLocaleDateString('en-IN')}.

RULES:
1. DO NOT PROVIDE A MEDICAL DIAGNOSIS. Never guess a user's condition.
2. Base your information on reliable sources like WHO and the Indian Ministry of Health (MoHFW).
3. If asked about local health facilities, mention major hospitals in Indore like MY Hospital, Choithram Hospital, or Apollo Hospitals, but advise the user to call ahead.
4. Mention local context: Dengue, Malaria, and Chikungunya are common during/after monsoon season (July-October).
5. Always end every health-related response with the disclaimer: "This information is for educational purposes only. Please consult a qualified doctor for medical advice."
6. If the user asks something outside public health, politely decline.`;

    const recentHistory = conversationHistories[sessionId].slice(-6).join('\n');
    const fullPrompt = `${systemPrompt}\n\nHere is the recent conversation history:\n${recentHistory}\n\nUser: ${message}\nAarogya Sahayak:`;

    try {
        const response = await axios.post(AI_MODEL_URL, {
            contents: [{ parts: [{ text: fullPrompt }] }],
        });

        const botResponse = response.data.candidates[0].content.parts[0].text;

        conversationHistories[sessionId].push(`Aarogya Sahayak: ${botResponse}`);
        res.json({ reply: botResponse });
    } catch (error) {
        console.error("Error calling AI Service:", error.response ? error.response.data : error.message);
        res.status(500).json({ reply: "⚠️ I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later." });
    }
};
