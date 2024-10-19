import React from 'react';

const SearchResults = ({ query, filteredProducts }) => {
    return (
        <div>
            <h1>Search Results for: "{query}"</h1>
            <div>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id}>
                            {/* Render product details here */}
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
