import React from 'react';

export default function Navbar(props) {
    const handleSearchChange = (e) => {
        props.onSearch(e.target.value);
    };

    const handleSortChange = (e) => {
        props.onSort(e.target.value);  // Call the onSort function passed from App.js
    };

    // Check if the current page is the home page
    const isHomePage = window.location.pathname === '/';

    return (
        <div>
            <nav className="navbar navbar-expand-lg custom-navbar"> 
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active text-white fs-4" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active text-white fs-4" aria-current="page" href="/products">Products</a>
                            </li>
                        </ul>
                        
                        {/* Only render search and sort on non-home pages */}
                        {!isHomePage && (
                            <div className="d-flex align-items-center ms-auto">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={handleSearchChange}
                                    style={{ maxWidth: "300px" }} // Adjust maxWidth for better fit
                                />
                                <select className="form-select" onChange={handleSortChange} aria-label="Sort options">
                                    <option value="default">Sort By</option>
                                    <option value="alphabet">Sort Alphabetical (A-Z)</option>
                                    <option value="price">Sort by Price (Low to High)</option>
                                    <option value="quantity">Sort by Available Quantity</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
