import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Loader } from 'lucide-react';
import useAIChat from '../../hooks/useAIChat';

const LANGUAGES = [
  { code: 'English', name: 'English' },
  { code: 'Hindi', name: 'हिन्दी' },
  { code: 'Bengali', name: 'বাংলা' },
  { code: 'Tamil', name: 'தமிழ்' },
  { code: 'Telugu', name: 'తెలుగు' },
  { code: 'Marathi', name: 'मराठी' },
  { code: 'Punjabi', name: 'ਪੰਜਾਬੀ' }
];

const ChatbotWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState('English');
  const messagesEndRef = useRef(null);
  
  const userType = user?.userType || 'guest';
  
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
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message;
    setMessage('');
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center z-50 transition-all duration-300"
        aria-label="Open Chatbot"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-3/4 max-h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
          <div className="flex items-center justify-between px-4 py-3 bg-green-600 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-xs">FB</span>
              </div>
              <h3 className="font-semibold">FarmBazaar Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm text-gray-800 bg-white rounded px-2 py-1 border-none outline-none"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-100"
                aria-label="Close Chatbot"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
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

          <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
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
                onClick={handleSend}
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
            <div className="text-xs text-gray-500 mt-1 text-center">
              Powered by FarmBazaar AI
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;