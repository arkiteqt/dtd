import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Onboarding/Register';
import Login from './components/Onboarding/Login';
import Profile from './components/Account/Profile';
import Membership from './components/Account/Membership';

const App = () => {
    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYXJraXRlcTIiLCJpYXQiOjE3MzU0MTg3NTUsImV4cCI6MTczNTQyMjM1NX0.wNiVdnFxDhVpkkm6pGeJSs8l5Bo4RvdUWNEzewybGXA");

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
                                <Navigate to="/profile" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />

                    <Route
                        path="/login"
                        element={<Login setToken={setToken} />}
                    />

                    <Route
                        path="/register"
                        element={<Register setToken={setToken} />}
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
                </Routes>

                {/* Logout Button */}
                {token && (
                    <button onClick={() => setToken(null)} style={{ marginTop: '20px' }}>
                        Logout
                    </button>
                )}
            </div>
        </Router>
    );
};

export default App;