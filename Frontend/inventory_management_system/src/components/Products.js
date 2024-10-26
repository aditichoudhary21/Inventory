import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import CodePrompt from './CodePrompt'; // Import the CodePrompt component

export default function Products({ searchQuery, sortOrder, isAuthenticated, onVerify }) {
    const [productData, setProductData] = useState([]);
    const [error, setError] = useState(null);
    const [showCodePrompt, setShowCodePrompt] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:3001/products", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (res.status === 200) {
                setProductData(data);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("Failed to fetch products.");
        }
    };

    const handleCodeSubmit = async (code) => {
        const isValid = await onVerify(code);
        if (isValid) {
            if (pendingAction === 'add') {
                navigate('/insertproduct');
            } else if (pendingAction === 'update') {
                navigate(`/updateproduct/${selectedProductId}`);
            }
        } else {
            alert("Invalid verification code. Please try again."); // Notify user
        }
        setShowCodePrompt(false);
    };

    const handleAddProduct = () => {
        setPendingAction('add');
        setShowCodePrompt(true);
    };

    const handleUpdateProduct = (id) => {
        setSelectedProductId(id);
        setPendingAction('update');
        setShowCodePrompt(true);
    };

    const deleteProduct = async (id) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                getProducts();
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    const filteredAndSortedProducts = productData
        .filter(product => product.productname.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "alphabet") return a.productname.localeCompare(b.productname);
            if (sortOrder === "price") return a.price - b.price;
            if (sortOrder === "quantity") return a.quantity - b.quantity;
            return 0;
        });

    return (
        <div className='container-fluid p-5'>
            <h1>Products Inventory</h1>
            <div className='add_button'>
            <button 
                onClick={handleAddProduct} 
                className='btn' 
                style={{
                    backgroundColor: '#309FCF', // Desired color
                    color: 'white', // Text color for better contrast
                    border: 'none', // Remove default border
                    padding: '12px 30px', // Padding for better appearance
                    fontSize: '1.1rem' // Slightly larger font size
                }}
            >
                + Add New Product
            </button>
            </div>
            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="custom-row">
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedProducts.map((product, id) => (
                                <tr key={product.productid}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{product.productname}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price} Rs. </td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <button className="btn custom-btn" onClick={() => handleUpdateProduct(product.productid)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn custom-btn" onClick={() => deleteProduct(product.productid)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showCodePrompt && (
                <CodePrompt
                    onSubmit={handleCodeSubmit}
                    onClose={() => setShowCodePrompt(false)}
                />
            )}
        </div>
    );
}
