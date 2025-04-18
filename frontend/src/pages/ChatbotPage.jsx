import { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import useAIChat from '../hooks/useAIChat';

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Hindi', name: 'हिन्दी' },
  { code: 'Bengali', name: 'বাংলা' },
  { code: 'Tamil', name: 'தமிழ்' },
  { code: 'Telugu', name: 'తెలుగు' },
  { code: 'Marathi', name: 'मराठी' },
  { code: 'Punjabi', name: 'ਪੰਜਾਬੀ' }
];

const FARMER_SUGGESTIONS = [
  "What crops are in high demand this season?",
  "How can I improve my crop listing photos?",
  "What's a fair price for organic tomatoes?",
  "How do I handle pest infestation in rice?",
  "Best practices for storing wheat"
];

const BUYER_SUGGESTIONS = [
  "How to identify quality produce?",
  "What fruits are in season now?",
  "Storage tips for bulk vegetable purchases",
  "Are pesticide-free products worth the price?",
  "Local specialty crops in Maharashtra"
];

const ChatbotPage = ({ user }) => {
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('English');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  const userType = user?.userType || 'guest';
  const suggestions = userType === 'farmer' ? FARMER_SUGGESTIONS : BUYER_SUGGESTIONS;
  
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    initializeChat 
  } = useAIChat({ 
    userType, 
    language 
  });

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault(); // Prevent form submission refresh
    
    if (!message.trim() || isLoading) return;
    
    const userMessage = message;
    setMessage('');
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    // Focus on the input after setting the message
    setTimeout(() => {
      document.querySelector('textarea')?.focus();
    }, 0);
  };

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-200px)] mb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">FarmBazaar Assistant</h1>
        <p className="text-gray-600 mt-2">
          Your agricultural companion for farming and buying needs
        </p>
        <div className="mt-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row gap-4 h-full">
        <div className="hidden md:block w-64 p-4 bg-green-50 rounded-lg h-full">
          <h3 className="font-medium text-green-800 mb-3">Suggested Questions:</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  type="button" // Important to prevent form submission
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left w-full p-2 text-sm hover:bg-green-100 rounded-md transition-colors text-gray-700"
                  aria-label={`Ask: ${suggestion}`}
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-1">
                    <span className="text-green-700 text-xs font-bold">FB</span>
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-lg max-w-[75%] chat-message ${
                    msg.type === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                {msg.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ml-2 mt-1">
                    <span className="text-white text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-1">
                  <span className="text-green-700 text-xs font-bold">FB</span>
                </div>
                <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none max-w-[75%]">
                  <div className="flex items-center space-x-2">
                    <Loader size={16} className="animate-spin" />
                    <span>Typing...</span>
                  </div>
                  <div className="mt-2 flex space-x-1">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="md:hidden overflow-x-auto whitespace-nowrap px-4 py-2 border-t border-gray-200">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="inline-block mr-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm whitespace-nowrap"
                aria-label={`Ask: ${suggestion}`}
              >
                {suggestion.length > 25 ? suggestion.substring(0, 22) + '...' : suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 py-2 px-3 bg-gray-100 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="2"
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`p-2 rounded-md ${
                  message.trim() && !isLoading
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                aria-label="Send Message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;