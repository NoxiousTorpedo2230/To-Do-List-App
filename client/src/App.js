import React, { useState, useEffect } from 'react';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import Todo from './Component/Pages/Todo';

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Verify the token is still valid by checking its structure
        const tokenParts = savedToken.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          // Make sure user object has the required _id field
          if (!userData._id && payload.userId) {
            userData._id = payload.userId;
            localStorage.setItem('user', JSON.stringify(userData));
          }
          setToken(savedToken);
          setUser(userData);
          setCurrentView('todo');
        } else {
          // Invalid token, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('todo');
  };

  const handleRegister = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('todo');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentView('login');
  };

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {user && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9'
        }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Welcome, {user.username}!
          </span>
          <button 
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}

      {currentView === 'login' && (
        <Login 
          onLogin={handleLogin} 
          onSwitchToRegister={switchToRegister}
        />
      )}
      
      {currentView === 'register' && (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={switchToLogin}
        />
      )}
      
      {currentView === 'todo' && user && (
        <Todo 
          user={user}
          token={token}
        />
      )}
    </div>
  );
};

export default App;