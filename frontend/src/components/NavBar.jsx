import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Bell, MessageSquare, FileText, Brain, BookOpen, LogOut, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ isAuthenticated, user, onLogout, cartItemCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAiDropdown = (e) => {
    e.stopPropagation();
    setAiDropdownOpen(!aiDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    const closeDropdown = () => setAiDropdownOpen(false);
    if (aiDropdownOpen) {
      document.addEventListener('click', closeDropdown);
    }
    return () => document.removeEventListener('click', closeDropdown);
  }, [aiDropdownOpen]);

  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white text-xl font-bold">FarmBazaar</Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/marketplace" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">Marketplace</Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/signup" className="bg-white text-green-700 hover:bg-green-100 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              </>
            ) : (
              <>
                {user?.userType === 'farmer' && (
                  <>
                    <Link to="/farmer-dashboard" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                    <Link to="/add-listing" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                      <Plus size={18} className="mr-1" /> Add Listing
                    </Link>
                    
                    <div className="relative">
                      <button 
                        onClick={toggleAiDropdown} 
                        className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        <Brain size={18} className="mr-1" /> AI Predictor <ChevronDown size={16} className="ml-1" />
                      </button>
                      {aiDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                          <Link to="/ai/crop-prediction" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Crop Prediction</Link>
                          <Link to="/ai/price-forecast" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Price Forecast</Link>
                          <Link to="/ai/disease-detection" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Disease Detection</Link>
                        </div>
                      )}
                    </div>
                    
                    <Link to="/education" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                      <BookOpen size={18} className="mr-1" /> Education
                    </Link>
                  </>
                )}
                
                {user?.userType === 'buyer' && (
                  <Link to="/buyer-dashboard" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                )}
                
                <Link to="/contracts" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FileText size={18} className="mr-1" /> Contracts
                </Link>
                <Link to="/chatbot" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <MessageSquare size={18} className="mr-1" /> Chatbot
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <LogOut size={18} className="mr-1" /> Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-200 focus:outline-none focus:text-green-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/marketplace" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Marketplace</Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                <Link to="/signup" className="bg-white text-green-700 hover:bg-green-100 block px-3 py-2 rounded-md text-base font-medium">Sign Up</Link>
              </>
            ) : (
              <>
                {user?.userType === 'farmer' && (
                  <>
                    <Link to="/farmer-dashboard" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                    <Link to="/add-listing" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                      <Plus size={18} className="mr-1" /> Add Listing
                    </Link>
                    <Link to="/notifications" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                      <Bell size={18} className="mr-2" /> Notifications
                    </Link>
                    <div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setAiDropdownOpen(!aiDropdownOpen);
                        }} 
                        className="text-white hover:bg-green-600 w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                      >
                        <span className="flex items-center"><Brain size={18} className="mr-2" /> AI Predictor</span>
                        <ChevronDown size={16} className={`ml-1 ${aiDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                      {aiDropdownOpen && (
                        <div className="pl-8 bg-green-800">
                          <Link to="/ai/crop-prediction" className="block px-3 py-2 text-base text-white hover:bg-green-600">Crop Prediction</Link>
                          <Link to="/ai/price-forecast" className="block px-3 py-2 text-base text-white hover:bg-green-600">Price Forecast</Link>
                          <Link to="/ai/disease-detection" className="block px-3 py-2 text-base text-white hover:bg-green-600">Disease Detection</Link>
                        </div>
                      )}
                    </div>
                    <Link to="/education" className="text-white hover:bg-green-600 px-3 py-2 rounded-md text-base font-medium flex items-center">
                      <BookOpen size={18} className="mr-2" /> Education
                    </Link>
                  </>
                )}
                
                {user?.userType === 'buyer' && (
                  <Link to="/buyer-dashboard" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                )}
                
                <Link to="/contracts" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <FileText size={18} className="mr-2" /> Contracts
                </Link>
                <Link to="/chatbot" className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center">
                  <MessageSquare size={18} className="mr-2" /> Chatbot
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-white hover:bg-green-600 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <LogOut size={18} className="mr-2" /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  onLogout: PropTypes.func,
  cartItemCount: PropTypes.number
};

Navbar.defaultProps = {
  isAuthenticated: false,
  user: null,
  onLogout: () => {},
  cartItemCount: 0
};