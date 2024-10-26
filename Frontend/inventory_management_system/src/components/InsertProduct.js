import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        console.log('Product Name:', productName);
        console.log('Description:', description);
        console.log('Product Price:', productPrice);
        console.log('Quantity:', quantity);
        if (!productName || !description || !productPrice || !quantity) {
            setError("*Please fill in all the required fields.");
            return;
        }
        if (quantity%1) {
            setError("*Quantity must be a whole number.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/insertproduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    productname: productName, 
                    description: description, 
                    price: productPrice, 
                    quantity: quantity 
                })
            });

            if (res.status === 201) {
                alert("Product Inserted Successfully. Click OK to continue");
                setProductName("");
                setDescription("");
                setProductPrice(0);
                setQuantity(0);
                navigate('/products');
            } else {
                setError("Something went wrong. Please try inserting again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <h1>Enter Product Information</h1>
            <form onSubmit={addProduct}>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_name" className="form-label fs-4 fw-bold">Product Name</label>
                    <input
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        value={productName}
                        className="form-control fs-5"
                        id="product_name"
                        placeholder="Enter Product Name"
                        required
                    />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="description" className="form-label fs-4 fw-bold">Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="form-control fs-5" id="description" placeholder="Enter Description" required />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                    <input type="number" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Enter Product Price" required />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="quantity" className="form-label fs-4 fw-bold">Quantity</label>
                    <input type="number" onChange={(e) => setQuantity(e.target.value)} value={quantity} className="form-control fs-5" id="quantity" placeholder="Enter Quantity" required />
                </div>
                <div className='d-flex justify-content-center col-lg-6 col-md-6 mt-3'>
                    <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                    <button type="submit" className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Inserting...' : 'Insert'}</button>
                </div>
                {error && <div className="text-danger text-center mt-3 fs-5 fw-bold">{error}</div>}
            </form>
        </div>
    );
}
