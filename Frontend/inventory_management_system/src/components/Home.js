import React from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css'; // Ensure to create this file or include the styles in your existing CSS file

export default function Home() {
    return (
        <div className='home-container p-5 text'>
            <div className='text-center'> {/* Added a wrapper div for centering */}
                <h2>Welcome to Your Inventory Management System</h2>
                <p>Go to the Products Section to view and manage the list of products in your inventory.</p>
                <NavLink to="/products" className='btn btn-primary btn-lg mt-3'>
                    View Products
                </NavLink>
            </div>
            <div> 
            <h3>About the website:</h3>
            <p>
                This website is a simple inventory management system that allows you to view, add, and update products in your inventory. 
                The website consists of the following pages:
                <ul>
                    <li><b>Home:</b> This page displays a welcome message and provides a button to navigate to the Products page.</li>
                    <li><b>Products:</b> This page displays a list of products in your inventory. You can search for products by name and sort the products by price. 
                        You can also add new products or update existing products.</li>
                    <li><b>Insert Product:</b> This page allows you to add a new product to your inventory.</li>
                    <li><b>Update Product:</b> This page allows you to update the details of an existing product.</li>
                    <li><b>Login:</b> This page allows you to enter a verification code to access the product management features.</li>
                </ul>
            </p>
            </div>
        </div>
    );
}
