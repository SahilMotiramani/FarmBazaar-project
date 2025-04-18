import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import DOMPurify from 'dompurify';

const API_KEY = "AIzaSyDYajWAeVRqI91N7sZYkPXucIQejq1UqsE";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `You are now an AI assistant integrated into FarmBazaar, an agricultural marketplace platform that connects farmers and buyers in India.

You answer all farming-related questions and provide expert guidance on agriculture topics. Your goal is to support both farmers and buyers on the platform.

Please format your responses clearly using:
- Bullet points (- or •) for lists
- Numbered lists (1., 2., etc.) for steps
- Line breaks between paragraphs
- Bold text (**text**) for important points
- Avoid complex markdown or HTML tags

Example format:
For better crop yield, consider:

• Proper irrigation scheduling
• Soil nutrient management
• Pest control measures

1. First prepare the soil
2. Then plant the seeds
3. Maintain regular watering

For farmers, you help with:
- Best farming practices and crop recommendations
- Information on pesticides, fertilizers, and organic farming
- Guidance on pricing produce competitively
- Tips for listing items effectively
- Crop disease identification and treatment

For buyers, you help with:
- Information about seasonal crops
- Tips for finding quality produce
- Knowledge about storage and preservation
- General market trends and pricing
- Understanding organic certification`;

const useAIChat = ({ userType = 'guest', language = 'English', region = '' }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getContextualPrompt = () => {
    let contextualPrompt = SYSTEM_PROMPT;
    
    if (userType === 'farmer') {
      contextualPrompt += "\n\nThe user is a farmer selling produce on FarmBazaar.";
    } else if (userType === 'buyer') {
      contextualPrompt += "\n\nThe user is a buyer looking to purchase agricultural products on FarmBazaar.";
    }
    
    if (region) {
      contextualPrompt += `\n\nThe user is from the ${region} region in India.`;
    }
    
    contextualPrompt += `\n\nPlease respond in ${language} and use appropriate formatting.`;
    
    return contextualPrompt;
  };

  const formatResponse = (text) => {
    // Convert markdown-style formatting to HTML
    let formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\n\s*[-•]\s*(.*?)(?=\n|$)/g, '<li>$1</li>') // List items
      .replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>') // Wrap lists in ul
      .replace(/\n\s*\d+\.\s*(.*?)(?=\n|$)/g, '<li>$1</li>') // Numbered items
      .replace(/(<li>.*<\/li>)+/g, '<ol>$&</ol>') // Wrap numbered lists in ol
      .replace(/\n{2,}/g, '</p><p>') // Paragraphs
      .replace(/\n/g, '<br />'); // Line breaks

    // Ensure we have proper paragraph tags
    if (!formattedText.startsWith('<p>')) {
      formattedText = `<p>${formattedText}</p>`;
    }

    return DOMPurify.sanitize(formattedText);
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;
    
    const userMessage = { type: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const contextualPrompt = getContextualPrompt();
      
      const historyText = messages
        .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n');
      
      const finalPrompt = `${contextualPrompt}\n\nConversation history:\n${historyText}\n\nUser: ${messageText}\nAssistant:`;
      
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topK: 40,
          topP: 0.95
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      });
      
      const responseText = result.response.text();
      const formattedResponse = formatResponse(responseText);
      
      setMessages(prev => [...prev, { type: 'bot', content: formattedResponse }]);
      
    } catch (err) {
      console.error('Error generating AI response:', err);
      setError('Failed to get response. Please try again.');
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: '<p>Sorry, I encountered an error. Please try again later.</p>' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage = userType === 'farmer'
        ? '<p>Welcome to FarmBazaar Assistant! I can help you with:</p><ul><li>Farming practices</li><li>Crop pricing</li><li>Marketplace tips</li></ul><p>How can I assist you today?</p>'
        : '<p>Welcome to FarmBazaar Assistant! I can help you with:</p><ul><li>Finding quality produce</li><li>Seasonal availability</li><li>Agricultural products</li></ul><p>How can I assist you today?</p>';
      
      setMessages([{ type: 'bot', content: welcomeMessage }]);
    }
  };

  return {
    messages,
    setMessages,
    isLoading,
    error,
    sendMessage,
    initializeChat
  };
};

export default useAIChat;