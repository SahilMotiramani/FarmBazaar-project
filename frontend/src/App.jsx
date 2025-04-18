import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AddListingPage from './pages/AddListingPage';
import Marketplace from './pages/MarketPlace';
import ListingDetailPage from './pages/ListingDetailPage';
import ChatbotPage from './pages/ChatbotPage';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';

// Placeholder pages
const AboutPage = () => <div className="py-20 px-4 max-w-7xl mx-auto"><h1>About Us</h1></div>;
const ServicesPage = () => <div className="py-20 px-4 max-w-7xl mx-auto"><h1>Services</h1></div>;
const FarmerDashboardPage = () => <div className="py-20 px-4 max-w-7xl mx-auto"><h1>Farmer Dashboard</h1></div>;
const NotFoundPage = () => <div className="py-20 px-4 max-w-7xl mx-auto"><h1>404 Not Found</h1></div>;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showChatWidget, setShowChatWidget] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/me', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          role: userData.userType
        }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        setUser({
          email: userData.email,
          name: userData.fullName,
          userType: userData.userType
        });
        return true;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/v1/auth/logout', {
        credentials: 'include'
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Hide chatbot widget on chatbot page
  const handleRouteChange = (pathname) => {
    setShowChatWidget(!pathname.includes('/chatbot'));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} user={user} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/chatbot" element={<ChatbotPage user={user} />} />
            <Route path="/farmer-dashboard" element={
              isAuthenticated && user?.userType === 'farmer' 
                ? <FarmerDashboardPage /> 
                : <Navigate to="/login" />
            } />
            <Route path="/signup" element={
              !isAuthenticated 
                ? <AuthPage onLogin={handleLogin} isLogin={false} /> 
                : <Navigate to="/" />
            } />
            <Route path="/login" element={
              !isAuthenticated 
                ? <AuthPage onLogin={handleLogin} isLogin={true} /> 
                : <Navigate to="/" />
            } />
             <Route path="/add-listing" element={
              isAuthenticated && user?.userType === 'farmer' 
               ? <AddListingPage user={user} /> 
               : <Navigate to="/login" />
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
        
        {/* Chatbot Widget - Only show when not on the chatbot page */}
        {showChatWidget && isAuthenticated && <ChatbotWidget user={user} />}
      </div>
    </Router>
  );
}

export default App;