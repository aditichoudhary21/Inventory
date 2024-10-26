import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("default");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Hardcoded verification code
    const verificationCode = "220059";

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const validateCode = (code) => {
        if (code === verificationCode) {
            setIsAuthenticated(true);
            return true; // Indicate successful verification
        } else {
            return false; // Indicate failed verification
        }
    };

    return (
        <div className="App">
            <Router>
                <Navbar title="IMS" about="About" onSearch={handleSearch} onSort={handleSort} />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route 
                        path="/products" 
                        element={<Products searchQuery={searchQuery} sortOrder={sortOrder} isAuthenticated={isAuthenticated} onVerify={validateCode} />} 
                    />
                    <Route 
                        path="/insertproduct" 
                        element={isAuthenticated ? <InsertProduct /> : <Navigate to="/login" />}
                    />
                    <Route 
                        path="/updateproduct/:id" 
                        element={isAuthenticated ? <UpdateProduct /> : <Navigate to="/login" />}
                    />
                    <Route path="/login" element={<Login onLogin={validateCode} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
