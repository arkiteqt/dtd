import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Onboarding/Register';
import Login from './components/Onboarding/Login';
import Profile from './components/Account/Profile';
import Membership from './components/Account/Membership';
import Dashboard from './components/Account/Dashboard';
const App = () => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    // Save token to localStorage
    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    // Logout function
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        // Automatically check if token exists on app load
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Protected Route Component
    const ProtectedRoute = ({ children }) => {
        return token ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <div>
                <Routes>
                    {/* Home Route */}
                    <Route
                        path="/"
                        element={
                            token ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login setToken={handleSetToken} />}
                    />

                    <Route
                        path="/register"
                        element={<Register setToken={handleSetToken} />}
                    />
                    
                    {/* Protected Routes */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile token={token} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/membership"
                        element={
                            <ProtectedRoute>
                                <Membership token={token} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard token={token} logout={handleLogout}/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;