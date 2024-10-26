import React, { useEffect, useState, useCallback } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the existing product details
    const getProduct = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:3001/products/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 200) {
                setProductName(data.productname); // Ensure these keys match your DB column names
                setDescription(data.description);
                setProductPrice(data.price);
                setQuantity(data.quantity);
            } else {
                setError("Failed to fetch product data.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again later.");
        }
    }, [id]);

    useEffect(() => {
        getProduct(); // Fetch the product data when the component mounts
    }, [getProduct]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !description || productPrice === undefined || quantity === undefined) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productname: productName, // Match the property names with your API
                    description: description,
                    price: productPrice,
                    quantity: quantity
                })
            });

            if (response.status === 200) {
                alert("Product Updated Successfully. Click OK to continue");
                navigate('/products');
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Something went wrong. Please try updating again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid p-5'>
            <h1>Update Product Information</h1>
            <form onSubmit={updateProduct}>
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
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="form-control fs-5"
                        id="description"
                        placeholder="Enter Description"
                        
                    />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="product_price" className="form-label fs-4 fw-bold">Product Price</label>
                    <input
                        type="float"
                        onChange={(e) => setProductPrice(e.target.value)}
                        value={productPrice}
                        className="form-control fs-5"
                        id="product_price"
                        placeholder="Enter Product Price"
                        required
                    />
                </div>
                <div className="mt-3 col-lg-6 col-md-6 col-12">
                    <label htmlFor="quantity" className="form-label fs-4 fw-bold">Quantity</label>
                    <input
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        className="form-control fs-5"
                        id="quantity"
                        placeholder="Enter Quantity"
                        required
                    />
                </div>
                <div className='d-flex justify-content-center col-lg-6 col-md-6 mt-3'>
                    <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                    <button type="submit" className="btn btn-primary fs-4" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
                {error && <div className="text-danger text-center mt-3 fs-5 fw-bold">{error}</div>}
            </form>
        </div>
    );
}
